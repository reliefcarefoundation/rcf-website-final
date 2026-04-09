import { useState, useEffect, useRef } from 'react';
import { Lock, Trash2, Play, CreditCard as Edit, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Episode {
  id: string;
  episode_number: number;
  title: string;
  guest_name: string;
  guest_title: string;
  description: string;
  date: string;
  tags: string | null;
  type: 'audio' | 'video';
  audio_url?: string | null;
  video_url?: string | null;
}

const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([^&\s?]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const getYouTubeThumbnailUrl = (url: string): string | null => {
  const videoId = extractYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

const getYouTubeWatchUrl = (url: string): string | null => {
  const videoId = extractYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
};

const parseTags = (tags: string | null): string[] => {
  if (!tags) return [];
  return tags.split(',').map(t => t.trim()).filter(Boolean);
};

export default function Podcast() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [adminCollapsed, setAdminCollapsed] = useState(true);
  const [episodeType, setEpisodeType] = useState<'audio' | 'video'>('audio');
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    episodeNumber: '', title: '', guestName: '', guestTitle: '',
    date: '', description: '', tags: '', audioUrl: '', embedUrl: ''
  });

  useEffect(() => { fetchEpisodes(); }, []);

  const fetchEpisodes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setEpisodes(data);
    setLoading(false);
  };

  const handleUnlock = () => {
    if (adminPassword === 're1ief@5') {
      setAdminUnlocked(true);
      setPasswordError('');
      setAdminCollapsed(false);
    } else {
      setPasswordError('Incorrect password. Try again.');
    }
  };

  const resetForm = () => {
    setFormData({ episodeNumber: '', title: '', guestName: '', guestTitle: '', date: '', description: '', tags: '', audioUrl: '', embedUrl: '' });
    setShowAddForm(false);
    setEditingEpisode(null);
  };

  const validateForm = (): boolean => {
    if (!formData.episodeNumber || !formData.title || !formData.guestName || !formData.guestTitle || !formData.date || !formData.description) {
      alert('Please fill in all required fields'); return false;
    }
    const n = parseInt(formData.episodeNumber);
    if (isNaN(n) || n < 1) { alert('Episode number must be a positive whole number'); return false; }
    if (episodeType === 'audio' && !formData.audioUrl) { alert('Please provide an audio file URL'); return false; }
    if (episodeType === 'video' && !formData.embedUrl) { alert('Please provide a video URL'); return false; }
    return true;
  };

  const handleAddEpisode = async () => {
    if (!validateForm()) return;
    setSaving(true);
    const { error } = await supabase.from('podcast_episodes').insert({
      episode_number: parseInt(formData.episodeNumber),
      title: formData.title, guest_name: formData.guestName, guest_title: formData.guestTitle,
      description: formData.description, date: formData.date,
      tags: formData.tags || null, type: episodeType,
      audio_url: formData.audioUrl || null, video_url: formData.embedUrl || null,
    });
    setSaving(false);
    if (error) { alert('Error saving episode: ' + error.message); return; }
    resetForm(); fetchEpisodes();
  };

  const handleDeleteEpisode = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this episode?')) return;
    const { error } = await supabase.from('podcast_episodes').delete().eq('id', id);
    if (error) { alert('Error deleting: ' + error.message); return; }
    fetchEpisodes();
  };

  const handleEditEpisode = (episode: Episode) => {
    setEditingEpisode(episode);
    setEpisodeType(episode.type);
    setFormData({
      episodeNumber: episode.episode_number.toString(), title: episode.title,
      guestName: episode.guest_name, guestTitle: episode.guest_title,
      date: episode.date, description: episode.description,
      tags: episode.tags || '', audioUrl: episode.audio_url || '', embedUrl: episode.video_url || ''
    });
    setShowAddForm(true);
    setTimeout(() => adminRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleSaveEdit = async () => {
    if (!validateForm()) return;
    setSaving(true);
    const { error } = await supabase.from('podcast_episodes').update({
      episode_number: parseInt(formData.episodeNumber),
      title: formData.title, guest_name: formData.guestName, guest_title: formData.guestTitle,
      description: formData.description, date: formData.date,
      tags: formData.tags || null, type: episodeType,
      audio_url: formData.audioUrl || null, video_url: formData.embedUrl || null,
    }).eq('id', editingEpisode!.id);
    setSaving(false);
    if (error) { alert('Error updating: ' + error.message); return; }
    resetForm(); fetchEpisodes();
  };

  const audioEpisodes = episodes.filter(ep => ep.type === 'audio').sort((a, b) => a.episode_number - b.episode_number);
  const videoEpisodes = episodes.filter(ep => ep.type === 'video').sort((a, b) => a.episode_number - b.episode_number);

  const inputCls = "border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full";

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-gradient-to-br from-[#00529b] to-[#003d75] rounded-lg p-12 text-center text-white mb-12">
          <div className="flex justify-center mb-4">
            <img src="/Diabetes_roundtable_logo_design.png" alt="The Diabetes Roundtable Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#f58220] object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <p className="text-[#f58220] text-sm font-bold uppercase tracking-wider mb-2">THE OFFICIAL PODCAST OF RELIEF CARE FOUNDATION</p>
          <h1 className="text-5xl font-bold mb-6">The Diabetes Roundtable</h1>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            The Diabetes Roundtable is where we sit down with physicians, dietitians, certified diabetes educators, and other healthcare professionals to have real conversations about diabetes. Each episode covers a different aspect of living with, managing, and understanding diabetes so that patients and families can feel more informed and confident in their care.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-[#00529b]" />
          </div>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00529b] mb-6">Audio Episodes</h2>
              {audioEpisodes.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg text-slate-600">No audio episodes yet. Check back soon.</div>
              ) : (
                <div className="space-y-4">
                  {audioEpisodes.map((episode) => (
                    <div key={episode.id} className="bg-white rounded-lg p-6 shadow-md">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-[#e0f2f7] text-[#00529b] font-bold px-3 py-1 rounded text-sm">#{episode.episode_number}</span>
                            {parseTags(episode.tags).slice(0, 2).map((tag, i) => (
                              <span key={i} className="bg-[#fff5e0] text-[#f58220] font-medium px-3 py-1 rounded text-sm">{tag}</span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">{episode.title}</h3>
                          <p className="text-slate-600 mb-1"><span className="font-bold">{episode.guest_name}</span> • {episode.guest_title}</p>
                          <p className="text-sm text-slate-500 mb-4">{episode.date}</p>
                          <p className="text-slate-700 leading-relaxed mb-4">{episode.description}</p>
                        </div>
                        {adminUnlocked && (
                          <div className="flex flex-col space-y-2 ml-4">
                            <button onClick={() => handleEditEpisode(episode)} className="bg-[#00529b] text-white font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-[#003d75] transition-colors flex items-center space-x-1">
                              <Edit className="w-4 h-4" /><span>Edit</span>
                            </button>
                            <button onClick={() => handleDeleteEpisode(episode.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center space-x-1">
                              <Trash2 className="w-4 h-4" /><span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                      {episode.audio_url && (
                        <audio controls className="w-full mt-3">
                          <source src={episode.audio_url} type="audio/mpeg" />
                        </audio>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {(audioEpisodes.length > 0 || videoEpisodes.length > 0) && <div className="border-t-2 border-gray-300 my-12" />}

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00529b] mb-6">Audio & Video Episodes</h2>
              {videoEpisodes.length === 0 ? (
                <div className="text-center p-8 bg-white rounded-lg text-slate-600">No video episodes yet. Check back soon.</div>
              ) : (
                <div className="space-y-4">
                  {videoEpisodes.map((episode) => (
                    <div key={episode.id} className="bg-white rounded-lg p-6 shadow-md">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-[#e0f2f7] text-[#00529b] font-bold px-3 py-1 rounded text-sm">#{episode.episode_number}</span>
                            {parseTags(episode.tags).slice(0, 2).map((tag, i) => (
                              <span key={i} className="bg-[#fff5e0] text-[#f58220] font-medium px-3 py-1 rounded text-sm">{tag}</span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">{episode.title}</h3>
                          <p className="text-slate-600 mb-1"><span className="font-bold">{episode.guest_name}</span> • {episode.guest_title}</p>
                          <p className="text-sm text-slate-500 mb-4">{episode.date}</p>
                          <p className="text-slate-700 leading-relaxed mb-4">{episode.description}</p>
                        </div>
                        {adminUnlocked && (
                          <div className="flex flex-col space-y-2 ml-4">
                            <button onClick={() => handleEditEpisode(episode)} className="text-[#00529b] hover:text-[#003d75] font-semibold text-sm flex items-center space-x-1">
                              <Edit className="w-4 h-4" /><span>Edit</span>
                            </button>
                            <button onClick={() => handleDeleteEpisode(episode.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center space-x-1">
                              <Trash2 className="w-4 h-4" /><span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                      {episode.video_url && (() => {
                        const thumb = getYouTubeThumbnailUrl(episode.video_url!);
                        const watch = getYouTubeWatchUrl(episode.video_url!);
                        return thumb && watch ? (
                          <div className="relative rounded-xl overflow-hidden cursor-pointer group mb-4" onClick={() => window.open(watch, '_blank')}>
                            <img src={thumb} alt={episode.title} className="w-full" />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <Play className="w-10 h-10 text-[#00529b] ml-1" fill="currentColor" />
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                      {episode.audio_url && (
                        <audio controls className="w-full">
                          <source src={episode.audio_url} type="audio/mpeg" />
                        </audio>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        <div className="bg-white rounded-lg p-8 shadow-md" ref={adminRef}>
          <button onClick={() => setAdminCollapsed(!adminCollapsed)} className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4">
            <Lock className="w-4 h-4" /><span className="font-medium text-sm">Admin</span>
          </button>

          {!adminCollapsed && !adminUnlocked && (
            <div className="max-w-md mb-4">
              <p className="text-slate-600 mb-3 text-sm">Enter password to manage episodes:</p>
              <div className="flex space-x-2">
                <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()} placeholder="Enter password"
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]" />
                <button onClick={handleUnlock} className="bg-[#00529b] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#003d75] transition-colors text-sm">Unlock</button>
              </div>
              {passwordError && <p className="text-red-600 mt-2 text-sm">{passwordError}</p>}
            </div>
          )}

          {adminUnlocked && !adminCollapsed && (
            <div>
              <p className="text-green-600 font-medium mb-4 text-sm">✓ Admin access unlocked</p>
              {!showAddForm ? (
                <button onClick={() => setShowAddForm(true)} className="bg-[#00529b] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#003d75] transition-colors text-sm">
                  Add New Episode
                </button>
              ) : (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Episode Number *</label>
                    <input type="number" placeholder="e.g. 1" min="1" step="1" value={formData.episodeNumber}
                      onChange={(e) => setFormData({ ...formData, episodeNumber: e.target.value })} className={inputCls} />
                    <p className="text-xs text-slate-600 mt-1">Enter just the number. The # symbol is added automatically.</p>
                  </div>
                  <input type="text" placeholder="Episode Title *" value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputCls} />
                  <input type="text" placeholder="Guest Name *" value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className={inputCls} />
                  <input type="text" placeholder="Guest Title / Role *" value={formData.guestTitle}
                    onChange={(e) => setFormData({ ...formData, guestTitle: e.target.value })} className={inputCls} />
                  <textarea placeholder="Short Description *" value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3} className={inputCls} />
                  <input type="date" value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputCls} />
                  <input type="text" placeholder="Tags (comma-separated)" value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className={inputCls} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Episode Type *</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" value="audio" checked={episodeType === 'audio'}
                          onChange={(e) => setEpisodeType(e.target.value as 'audio' | 'video')} className="w-4 h-4" />
                        <span className="text-sm text-slate-700">Audio Only</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" value="video" checked={episodeType === 'video'}
                          onChange={(e) => setEpisodeType(e.target.value as 'audio' | 'video')} className="w-4 h-4" />
                        <span className="text-sm text-slate-700">Audio + Video</span>
                      </label>
                    </div>
                  </div>
                  {episodeType === 'audio' && (
                    <input type="text" placeholder="Direct Audio File URL *" value={formData.audioUrl}
                      onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })} className={inputCls} />
                  )}
                  {episodeType === 'video' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">YouTube Video URL *</label>
                        <input type="text" placeholder="YouTube Video URL *" value={formData.embedUrl}
                          onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })} className={inputCls} />
                        <p className="text-xs text-slate-600 mt-1">Paste the regular YouTube share link — for example https://www.youtube.com/watch?v=VIDEO_ID.</p>
                      </div>
                      <input type="text" placeholder="Audio File URL (optional)" value={formData.audioUrl}
                        onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })} className={inputCls} />
                    </div>
                  )}
                  <div className="flex space-x-4">
                    <button onClick={editingEpisode ? handleSaveEdit : handleAddEpisode} disabled={saving}
                      className="flex-1 bg-[#00529b] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#003d75] transition-colors text-sm disabled:opacity-60 flex items-center justify-center space-x-2">
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>{saving ? 'Saving...' : editingEpisode ? 'Save Changes' : 'Publish Episode'}</span>
                    </button>
                    <button onClick={resetForm} className="flex-1 border border-slate-300 text-slate-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
