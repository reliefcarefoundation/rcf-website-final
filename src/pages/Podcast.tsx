import { useState, useEffect, useRef } from 'react';
import { Mic, Lock, Trash2, Play, CreditCard as Edit } from 'lucide-react';

interface Episode {
  id: number;
  episodeNumber: number;
  title: string;
  guestName: string;
  guestTitle: string;
  description: string;
  date: string;
  tags: string[];
  type: 'audio' | 'video';
  audioUrl?: string;
  embedUrl?: string;
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

export default function Podcast() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [adminCollapsed, setAdminCollapsed] = useState(true);
  const [episodeType, setEpisodeType] = useState<'audio' | 'video'>('audio');
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    episodeNumber: '',
    title: '',
    guestName: '',
    guestTitle: '',
    date: '',
    description: '',
    tags: '',
    audioUrl: '',
    embedUrl: ''
  });

  useEffect(() => {
    const savedEpisodes = localStorage.getItem('rcf_podcast_episodes');
    if (savedEpisodes) {
      setEpisodes(JSON.parse(savedEpisodes));
    }
  }, []);

  const saveEpisodes = (newEpisodes: Episode[]) => {
    localStorage.setItem('rcf_podcast_episodes', JSON.stringify(newEpisodes));
    setEpisodes(newEpisodes);
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

  const handleAddEpisode = () => {
    if (!formData.episodeNumber || !formData.title || !formData.guestName || !formData.guestTitle || !formData.date || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const episodeNum = parseInt(formData.episodeNumber);
    if (isNaN(episodeNum) || episodeNum < 1) {
      alert('Episode number must be a positive whole number');
      return;
    }

    if (episodeType === 'audio' && !formData.audioUrl) {
      alert('Please provide an audio file URL');
      return;
    }

    if (episodeType === 'video' && !formData.embedUrl) {
      alert('Please provide a video URL');
      return;
    }

    const newEpisode: Episode = {
      id: Date.now(),
      episodeNumber: episodeNum,
      title: formData.title,
      guestName: formData.guestName,
      guestTitle: formData.guestTitle,
      description: formData.description,
      date: formData.date,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      type: episodeType,
      audioUrl: formData.audioUrl || undefined,
      embedUrl: formData.embedUrl || undefined
    };

    saveEpisodes([newEpisode, ...episodes]);
    setShowAddForm(false);
    setFormData({
      episodeNumber: '',
      title: '',
      guestName: '',
      guestTitle: '',
      date: '',
      description: '',
      tags: '',
      audioUrl: '',
      embedUrl: ''
    });
  };

  const handleDeleteEpisode = (id: number) => {
    if (window.confirm('Are you sure you want to delete this episode?')) {
      saveEpisodes(episodes.filter(ep => ep.id !== id));
    }
  };

  const handleEditEpisode = (episode: Episode) => {
    setEditingEpisode(episode);
    setEpisodeType(episode.type);
    setFormData({
      episodeNumber: episode.episodeNumber.toString(),
      title: episode.title,
      guestName: episode.guestName,
      guestTitle: episode.guestTitle,
      date: episode.date,
      description: episode.description,
      tags: episode.tags.join(', '),
      audioUrl: episode.audioUrl || '',
      embedUrl: episode.embedUrl || ''
    });
    setShowAddForm(true);
    setTimeout(() => {
      adminRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveEdit = () => {
    if (!formData.episodeNumber || !formData.title || !formData.guestName || !formData.guestTitle || !formData.date || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const episodeNum = parseInt(formData.episodeNumber);
    if (isNaN(episodeNum) || episodeNum < 1) {
      alert('Episode number must be a positive whole number');
      return;
    }

    if (episodeType === 'audio' && !formData.audioUrl) {
      alert('Please provide an audio file URL');
      return;
    }

    if (episodeType === 'video' && !formData.embedUrl) {
      alert('Please provide a video URL');
      return;
    }

    const updatedEpisode: Episode = {
      id: editingEpisode!.id,
      episodeNumber: episodeNum,
      title: formData.title,
      guestName: formData.guestName,
      guestTitle: formData.guestTitle,
      description: formData.description,
      date: formData.date,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      type: episodeType,
      audioUrl: formData.audioUrl || undefined,
      embedUrl: formData.embedUrl || undefined
    };

    saveEpisodes(episodes.map(ep => ep.id === editingEpisode!.id ? updatedEpisode : ep));
    setShowAddForm(false);
    setEditingEpisode(null);
    setFormData({
      episodeNumber: '',
      title: '',
      guestName: '',
      guestTitle: '',
      date: '',
      description: '',
      tags: '',
      audioUrl: '',
      embedUrl: ''
    });
  };

  const handleCancelEdit = () => {
    setShowAddForm(false);
    setEditingEpisode(null);
    setFormData({
      episodeNumber: '',
      title: '',
      guestName: '',
      guestTitle: '',
      date: '',
      description: '',
      tags: '',
      audioUrl: '',
      embedUrl: ''
    });
  };

  const audioEpisodes = episodes.filter(ep => ep.type === 'audio').sort((a, b) => a.episodeNumber - b.episodeNumber);
  const videoEpisodes = episodes.filter(ep => ep.type === 'video').sort((a, b) => a.episodeNumber - b.episodeNumber);

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#00529b] to-[#003d75] rounded-lg p-12 text-center text-white mb-12">
          <div className="flex justify-center mb-4">
            <img
              src="/Diabetes_roundtable_logo_design.png"
              alt="The Diabetes Roundtable Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#f58220] object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <p className="text-[#f58220] text-sm font-bold uppercase tracking-wider mb-2">
            THE OFFICIAL PODCAST OF RELIEF CARE FOUNDATION
          </p>

          <h1 className="text-5xl font-bold mb-6">
            The Diabetes Roundtable
          </h1>

          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            The Diabetes Roundtable is where we sit down with physicians, dietitians, certified diabetes educators, and other healthcare professionals to have real conversations about diabetes. Each episode covers a different aspect of living with, managing, and understanding diabetes so that patients and families can feel more informed and confident in their care.
          </p>
        </div>

        {audioEpisodes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#00529b] mb-6">Audio Episodes</h2>
            <div className="space-y-4">
              {audioEpisodes.map((episode) => (
                <div key={episode.id} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-[#e0f2f7] text-[#00529b] font-bold px-3 py-1 rounded text-sm">
                          #{episode.episodeNumber}
                        </span>
                        {episode.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="bg-[#fff5e0] text-[#f58220] font-medium px-3 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {episode.title}
                      </h3>
                      <p className="text-slate-600 mb-1">
                        <span className="font-bold">{episode.guestName}</span> • {episode.guestTitle}
                      </p>
                      <p className="text-sm text-slate-500 mb-4">{episode.date}</p>
                      <p className="text-slate-700 leading-relaxed mb-4">
                        {episode.description}
                      </p>
                    </div>
                    {adminUnlocked && (
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleEditEpisode(episode)}
                          className="bg-[#00529b] text-white font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-[#003d75] transition-colors flex items-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEpisode(episode.id)}
                          className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {episode.audioUrl && (
                    <audio controls className="w-full mt-3">
                      <source src={episode.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              ))}
            </div>
            {audioEpisodes.length === 0 && (
              <div className="text-center p-8 text-slate-600">No audio episodes yet. Check back soon.</div>
            )}
          </section>
        )}

        {audioEpisodes.length === 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#00529b] mb-6">Audio Episodes</h2>
            <div className="text-center p-8 bg-white rounded-lg text-slate-600">
              No audio episodes yet. Check back soon.
            </div>
          </section>
        )}

        {(audioEpisodes.length > 0 || videoEpisodes.length > 0) && (
          <div className="border-t-2 border-gray-300 my-12"></div>
        )}

        {videoEpisodes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#00529b] mb-6">Audio & Video Episodes</h2>
            <div className="space-y-4">
              {videoEpisodes.map((episode) => (
                <div key={episode.id} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-[#e0f2f7] text-[#00529b] font-bold px-3 py-1 rounded text-sm">
                          #{episode.episodeNumber}
                        </span>
                        {episode.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="bg-[#fff5e0] text-[#f58220] font-medium px-3 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {episode.title}
                      </h3>
                      <p className="text-slate-600 mb-1">
                        <span className="font-bold">{episode.guestName}</span> • {episode.guestTitle}
                      </p>
                      <p className="text-sm text-slate-500 mb-4">{episode.date}</p>
                      <p className="text-slate-700 leading-relaxed mb-4">
                        {episode.description}
                      </p>
                    </div>
                    {adminUnlocked && (
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleEditEpisode(episode)}
                          className="text-[#00529b] hover:text-[#003d75] font-semibold text-sm flex items-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEpisode(episode.id)}
                          className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {episode.embedUrl && (() => {
                    const thumbnailUrl = getYouTubeThumbnailUrl(episode.embedUrl);
                    const watchUrl = getYouTubeWatchUrl(episode.embedUrl);
                    return thumbnailUrl && watchUrl ? (
                      <div
                        className="relative rounded-xl overflow-hidden cursor-pointer group mb-4"
                        onClick={() => window.open(watchUrl, '_blank')}
                      >
                        <img
                          src={thumbnailUrl}
                          alt={episode.title}
                          className="w-full"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <Play className="w-10 h-10 text-[#00529b] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                  {episode.audioUrl && (
                    <audio controls className="w-full">
                      <source src={episode.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              ))}
            </div>
            {videoEpisodes.length === 0 && (
              <div className="text-center p-8 text-slate-600">No video episodes yet. Check back soon.</div>
            )}
          </section>
        )}

        {videoEpisodes.length === 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#00529b] mb-6">Audio & Video Episodes</h2>
            <div className="text-center p-8 bg-white rounded-lg text-slate-600">
              No video episodes yet. Check back soon.
            </div>
          </section>
        )}

        <div className="bg-white rounded-lg p-8 shadow-md" ref={adminRef}>
          <button
            onClick={() => setAdminCollapsed(!adminCollapsed)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4"
          >
            <Lock className="w-4 h-4" />
            <span className="font-medium text-sm">Admin</span>
          </button>

          {!adminCollapsed && !adminUnlocked && (
            <div className="max-w-md mb-4">
              <p className="text-slate-600 mb-3 text-sm">Enter password to manage episodes:</p>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                  placeholder="Enter password"
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]"
                />
                <button
                  onClick={handleUnlock}
                  className="bg-[#00529b] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#003d75] transition-colors text-sm"
                >
                  Unlock
                </button>
              </div>
              {passwordError && <p className="text-red-600 mt-2 text-sm">{passwordError}</p>}
            </div>
          )}

          {adminUnlocked && !adminCollapsed && (
            <div>
              <p className="text-green-600 font-medium mb-4 text-sm">✓ Admin access unlocked</p>

              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#00529b] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#003d75] transition-colors text-sm"
                >
                  Add New Episode
                </button>
              ) : (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Episode Number *</label>
                    <input
                      type="number"
                      placeholder="e.g. 1"
                      min="1"
                      step="1"
                      value={formData.episodeNumber}
                      onChange={(e) => setFormData({ ...formData, episodeNumber: e.target.value })}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                    />
                    <p className="text-xs text-slate-600 mt-1">Enter just the number. The # symbol is added automatically.</p>
                  </div>

                  <input
                    type="text"
                    placeholder="Episode Title *"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                  />

                  <input
                    type="text"
                    placeholder="Guest Name *"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                  />

                  <input
                    type="text"
                    placeholder="Guest Title / Role *"
                    value={formData.guestTitle}
                    onChange={(e) => setFormData({ ...formData, guestTitle: e.target.value })}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                  />

                  <textarea
                    placeholder="Short Description *"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                  />

                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                  />

                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                  />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Episode Type *</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="audio"
                          checked={episodeType === 'audio'}
                          onChange={(e) => setEpisodeType(e.target.value as 'audio' | 'video')}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-slate-700">Audio Only</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="video"
                          checked={episodeType === 'video'}
                          onChange={(e) => setEpisodeType(e.target.value as 'audio' | 'video')}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-slate-700">Audio + Video</span>
                      </label>
                    </div>
                  </div>

                  {episodeType === 'audio' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Direct Audio File URL *"
                        value={formData.audioUrl}
                        onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                      />
                    </div>
                  )}

                  {episodeType === 'video' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">YouTube Video URL *</label>
                        <input
                          type="text"
                          placeholder="YouTube Video URL *"
                          value={formData.embedUrl}
                          onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                        />
                        <p className="text-xs text-slate-600 mt-1">Paste the regular YouTube share link — for example https://www.youtube.com/watch?v=VIDEO_ID. The thumbnail is generated automatically.</p>
                      </div>
                      <input
                        type="text"
                        placeholder="Audio File URL (optional)"
                        value={formData.audioUrl}
                        onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full"
                      />
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={editingEpisode ? handleSaveEdit : handleAddEpisode}
                      className="flex-1 bg-[#00529b] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#003d75] transition-colors text-sm"
                    >
                      {editingEpisode ? 'Save Changes' : 'Publish Episode'}
                    </button>
                    <button
                      onClick={editingEpisode ? handleCancelEdit : () => setShowAddForm(false)}
                      className="flex-1 border border-slate-300 text-slate-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                    >
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
