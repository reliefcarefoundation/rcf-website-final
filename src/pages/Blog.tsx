import { useState, useEffect } from 'react';
import { Lock, Trash2, CreditCard as Edit, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  text: string;
  date: string;
  images: string[] | null;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [adminCollapsed, setAdminCollapsed] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({ title: '', text: '', date: '' });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });
    if (!error && data) setPosts(data);
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

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({ title: '', text: '', date: '' });
    setImageUrls([]);
    setShowAddForm(false);
    setEditingPost(null);
  };

  const handlePublishPost = async () => {
    if (!formData.title || !formData.text || !formData.date) {
      alert('Please fill in all required fields'); return;
    }
    setSaving(true);
    const { error } = await supabase.from('blog_posts').insert({
      title: formData.title,
      text: formData.text,
      date: formData.date,
      images: imageUrls.length > 0 ? imageUrls : null,
    });
    setSaving(false);
    if (error) { alert('Error saving post: ' + error.message); return; }
    resetForm(); fetchPosts();
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) { alert('Error deleting: ' + error.message); return; }
    fetchPosts();
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ title: post.title, text: post.text, date: post.date });
    setImageUrls(post.images || []);
    setShowAddForm(true);
    setAdminCollapsed(false);
  };

  const handleSaveEdit = async () => {
    if (!formData.title || !formData.text || !formData.date) {
      alert('Please fill in all required fields'); return;
    }
    setSaving(true);
    const { error } = await supabase.from('blog_posts').update({
      title: formData.title,
      text: formData.text,
      date: formData.date,
      images: imageUrls.length > 0 ? imageUrls : null,
    }).eq('id', editingPost!.id);
    setSaving(false);
    if (error) { alert('Error updating: ' + error.message); return; }
    resetForm(); fetchPosts();
  };

  const inputCls = "border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full";

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-12">Blog</h1>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-[#00529b]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center mb-12">
            <div className="bg-white rounded-lg p-12 shadow-md max-w-md mx-auto">
              <p className="text-slate-600 text-lg">No posts yet. Check back soon.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 mb-12">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{post.title}</h2>
                    <p className="text-sm text-slate-500">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  {adminUnlocked && (
                    <div className="flex flex-col space-y-2 ml-4">
                      <button onClick={() => handleEditPost(post)}
                        className="bg-[#00529b] text-white font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-[#003d75] transition-colors flex items-center space-x-1">
                        <Edit className="w-4 h-4" /><span>Edit</span>
                      </button>
                      <button onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center space-x-1">
                        <Trash2 className="w-4 h-4" /><span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">{post.text}</p>
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`Post image ${idx + 1}`}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="rounded-xl object-cover w-full h-64" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg p-8 shadow-md">
          <button onClick={() => setAdminCollapsed(!adminCollapsed)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4">
            <Lock className="w-4 h-4" /><span className="font-medium text-sm">Admin</span>
          </button>

          {!adminCollapsed && !adminUnlocked && (
            <div className="max-w-md mb-4">
              <p className="text-slate-600 mb-3 text-sm">Enter password to manage posts:</p>
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
                <button onClick={() => setShowAddForm(true)}
                  className="bg-[#00529b] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#003d75] transition-colors text-sm">
                  Add New Post
                </button>
              ) : (
                <div className="space-y-4 mt-4">
                  <input type="text" placeholder="Post Title *" value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputCls} />
                  <textarea placeholder="Post Text *" value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={12} className={`${inputCls} resize-y`} />
                  <input type="date" value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputCls} />
                  <div>
                    <div className="flex space-x-2 mb-3">
                      <input type="text" placeholder="Add Image URL" value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white" />
                      <button onClick={handleAddImage}
                        className="bg-gray-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                        Add Image
                      </button>
                    </div>
                    {imageUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {imageUrls.map((url, idx) => (
                          <div key={idx} className="relative">
                            <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                            <button onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={editingPost ? handleSaveEdit : handlePublishPost} disabled={saving}
                      className="flex-1 bg-[#00529b] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#003d75] transition-colors text-sm disabled:opacity-60 flex items-center justify-center space-x-2">
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>{saving ? 'Saving...' : editingPost ? 'Save Changes' : 'Publish Post'}</span>
                    </button>
                    <button onClick={resetForm}
                      className="flex-1 border border-slate-300 text-slate-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm">
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
