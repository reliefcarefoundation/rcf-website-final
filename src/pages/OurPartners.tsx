import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Trash2, ExternalLink, CreditCard as EditIcon, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo_url?: string | null;
  website_url?: string | null;
}

export default function OurPartners() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [adminCollapsed, setAdminCollapsed] = useState(true);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', description: '', logoUrl: '', websiteUrl: '' });

  useEffect(() => { fetchPartners(); }, []);

  const fetchPartners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setPartners(data);
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
    setFormData({ name: '', description: '', logoUrl: '', websiteUrl: '' });
    setShowAddForm(false);
    setEditingPartner(null);
  };

  const handleAddPartner = async () => {
    if (!formData.name || !formData.description) { alert('Please fill in partner name and description'); return; }
    setSaving(true);
    const { error } = await supabase.from('partners').insert({
      name: formData.name,
      description: formData.description,
      logo_url: formData.logoUrl || null,
      website_url: formData.websiteUrl || null,
    });
    setSaving(false);
    if (error) { alert('Error saving partner: ' + error.message); return; }
    resetForm(); fetchPartners();
  };

  const handleDeletePartner = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this partner?')) return;
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) { alert('Error deleting: ' + error.message); return; }
    fetchPartners();
  };

  const handleEditPartner = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name, description: partner.description,
      logoUrl: partner.logo_url || '', websiteUrl: partner.website_url || ''
    });
    setShowAddForm(true);
    setTimeout(() => adminRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleSaveEdit = async () => {
    if (!formData.name || !formData.description) { alert('Please fill in partner name and description'); return; }
    setSaving(true);
    const { error } = await supabase.from('partners').update({
      name: formData.name,
      description: formData.description,
      logo_url: formData.logoUrl || null,
      website_url: formData.websiteUrl || null,
    }).eq('id', editingPartner!.id);
    setSaving(false);
    if (error) { alert('Error updating: ' + error.message); return; }
    resetForm(); fetchPartners();
  };

  const getInitials = (name: string) =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const inputCls = "border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b] bg-white w-full";

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-12">Our Partners</h1>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-[#00529b]" />
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center mb-12">
            <div className="bg-white rounded-lg p-12 shadow-md max-w-md mx-auto">
              <p className="text-slate-600 text-lg">Our partner network is growing. Check back soon.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-lg p-6 shadow-md">
                {partner.logo_url ? (
                  <img src={partner.logo_url} alt={partner.name} className="h-20 object-contain mb-4" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00529b] to-[#f58220] flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{getInitials(partner.name)}</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#00529b] mb-3">{partner.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{partner.description}</p>
                <div className="flex items-center justify-between">
                  {partner.website_url && (
                    <a href={partner.website_url} target="_blank" rel="noopener noreferrer"
                      className="text-[#00529b] hover:text-[#f58220] font-bold flex items-center space-x-1 transition-colors">
                      <span>Visit Website</span><ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {adminUnlocked && (
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleEditPartner(partner)}
                        className="text-[#00529b] hover:text-[#003d75] font-semibold text-sm flex items-center space-x-1">
                        <EditIcon className="w-4 h-4" /><span>Edit</span>
                      </button>
                      <button onClick={() => handleDeletePartner(partner.id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center space-x-1">
                        <Trash2 className="w-4 h-4" /><span>Remove</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-[#00529b] rounded-lg p-8 text-white text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Interested in Partnering?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We are always looking to expand our network of community hospital partners. If your organization is interested in partnering with us, please reach out.
          </p>
          <button onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
            className="inline-block bg-white text-[#00529b] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md" ref={adminRef}>
          <button onClick={() => setAdminCollapsed(!adminCollapsed)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4">
            <Lock className="w-4 h-4" /><span className="font-medium text-sm">Admin</span>
          </button>

          {!adminCollapsed && !adminUnlocked && (
            <div className="max-w-md mb-4">
              <p className="text-slate-600 mb-3 text-sm">Enter password to manage partners:</p>
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
                  Add New Partner
                </button>
              ) : (
                <div className="space-y-4 mt-4">
                  <input type="text" placeholder="Partner Name *" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                  <textarea placeholder="Description *" value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4} className={inputCls} />
                  <input type="text" placeholder="Logo Image URL (optional)" value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })} className={inputCls} />
                  <input type="text" placeholder="Website URL (optional)" value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} className={inputCls} />
                  <div className="flex space-x-4">
                    <button onClick={editingPartner ? handleSaveEdit : handleAddPartner} disabled={saving}
                      className="flex-1 bg-[#00529b] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#003d75] transition-colors text-sm disabled:opacity-60 flex items-center justify-center space-x-2">
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>{saving ? 'Saving...' : editingPartner ? 'Save Changes' : 'Add Partner'}</span>
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
