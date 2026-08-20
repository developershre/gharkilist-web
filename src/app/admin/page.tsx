'use client';

import { useState, useEffect } from 'react';
import { 
  Download, 
  Trash2, 
  Lock, 
  RefreshCw, 
  Calendar, 
  Loader2, 
  LogOut, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Plus,
  Edit,
  FileText,
  Package,
  Save,
  X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface ApkRelease {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  version: string;
  isFallback: boolean;
}

interface BlogUpdate {
  id: string;
  version?: string;
  date_en: string;
  date_hi: string;
  title_en: string;
  title_hi: string;
  category: 'release' | 'feature' | 'improvement';
  excerpt_en: string;
  excerpt_hi: string;
  bullets_en: string[];
  bullets_hi: string[];
  apkLink?: string;
  apkSize?: string;
}

type ActiveTab = 'apk' | 'blog';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('apk');

  // APK state
  const [apks, setApks] = useState<ApkRelease[]>([]);
  const [loadingApks, setLoadingApks] = useState(false);
  const [apkForm, setApkForm] = useState({
    url: '',
    pathname: '',
    size: '',
    version: '',
  });
  const [apkError, setApkError] = useState('');
  const [apkSuccess, setApkSuccess] = useState('');

  // Blog state
  const [blogs, setBlogs] = useState<BlogUpdate[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogUpdate | null>(null);
  const [blogForm, setBlogForm] = useState({
    title_en: '',
    title_hi: '',
    version: '',
    category: 'release' as 'release' | 'feature' | 'improvement',
    excerpt_en: '',
    excerpt_hi: '',
    bullets_en: '',
    bullets_hi: '',
    apkLink: '',
    apkSize: '',
  });
  const [blogError, setBlogError] = useState('');
  const [blogSuccess, setBlogSuccess] = useState('');

  useEffect(() => {
    const savedPassword = localStorage.getItem('gharkilist_admin_password');
    if (savedPassword) {
      setPassword(savedPassword);
      verifySavedPassword(savedPassword);
    }
  }, []);

  const verifySavedPassword = async (pwd: string) => {
    setVerifying(true);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      if (res.ok) {
        setIsAuthorized(true);
        fetchApks();
        fetchBlogs();
      } else {
        localStorage.removeItem('gharkilist_admin_password');
        setAuthError('Session expired. Please enter the password again.');
      }
    } catch {
      setAuthError('Connection error. Failed to verify password.');
    } finally {
      setVerifying(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        localStorage.setItem('gharkilist_admin_password', password);
        setIsAuthorized(true);
        fetchApks();
        fetchBlogs();
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Invalid admin password.');
      }
    } catch {
      setAuthError('Network error. Failed to verify password.');
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gharkilist_admin_password');
    setPassword('');
    setIsAuthorized(false);
    setApks([]);
    setBlogs([]);
  };

  // APK Functions
  const fetchApks = async () => {
    setLoadingApks(true);
    try {
      const res = await fetch('/api/apks');
      if (res.ok) {
        const data = await res.json();
        setApks(data);
      }
    } catch {
      console.error('Failed to fetch APKs');
    } finally {
      setLoadingApks(false);
    }
  };

  const handleAddApk = async () => {
    if (!apkForm.url || !apkForm.version) {
      setApkError('URL and version are required.');
      return;
    }
    setApkError('');
    try {
      const filename = apkForm.url.split('/').pop() || `GharKiList-v${apkForm.version}.apk`;
      const newApk: ApkRelease = {
        url: apkForm.url,
        pathname: apkForm.pathname || filename,
        size: parseInt(apkForm.size) || 0,
        uploadedAt: new Date().toISOString(),
        version: apkForm.version,
        isFallback: false,
      };
      // Update the apks state
      setApks(prev => [newApk, ...prev]);
      setApkSuccess('APK added successfully!');
      setApkForm({ url: '', pathname: '', size: '', version: '' });
      setTimeout(() => setApkSuccess(''), 3000);
    } catch {
      setApkError('Failed to add APK.');
    }
  };

  const handleDeleteApk = (index: number) => {
    setApks(prev => prev.filter((_, i) => i !== index));
  };

  const handleExtractFromUrl = () => {
    if (!apkForm.url) return;
    try {
      const url = new URL(apkForm.url);
      const pathParts = url.pathname.split('/');
      const filename = pathParts[pathParts.length - 1];
      if (filename) {
        setApkForm(prev => ({ ...prev, pathname: filename }));
        // Try to extract version
        const versionMatch = filename.match(/v?(\d+\.\d+(?:\.\d+)?(?:\+\d+)?)/i);
        if (versionMatch) {
          setApkForm(prev => ({ ...prev, version: versionMatch[1] }));
        }
      }
    } catch {
      // Invalid URL, ignore
    }
  };

  // Blog Functions
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch('/api/blog');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch {
      console.error('Failed to fetch blogs');
    } finally {
      setLoadingBlogs(false);
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title_en: '',
      title_hi: '',
      version: '',
      category: 'release',
      excerpt_en: '',
      excerpt_hi: '',
      bullets_en: '',
      bullets_hi: '',
      apkLink: '',
      apkSize: '',
    });
    setEditingBlog(null);
  };

  const handleEditBlog = (blog: BlogUpdate) => {
    setEditingBlog(blog);
    setBlogForm({
      title_en: blog.title_en,
      title_hi: blog.title_hi,
      version: blog.version || '',
      category: blog.category,
      excerpt_en: blog.excerpt_en,
      excerpt_hi: blog.excerpt_hi,
      bullets_en: blog.bullets_en.join('\n'),
      bullets_hi: blog.bullets_hi.join('\n'),
      apkLink: blog.apkLink || '',
      apkSize: blog.apkSize || '',
    });
  };

  const handleSaveBlog = async () => {
    if (!blogForm.title_en || !blogForm.excerpt_en) {
      setBlogError('Title and excerpt (English) are required.');
      return;
    }
    setBlogError('');

    const now = new Date();
    const dateEn = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const dateHi = now.toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    const blogData: Partial<BlogUpdate> = {
      title_en: blogForm.title_en,
      title_hi: blogForm.title_hi || blogForm.title_en,
      version: blogForm.version || undefined,
      category: blogForm.category,
      excerpt_en: blogForm.excerpt_en,
      excerpt_hi: blogForm.excerpt_hi || blogForm.excerpt_en,
      bullets_en: blogForm.bullets_en.split('\n').filter(b => b.trim()),
      bullets_hi: blogForm.bullets_hi.split('\n').filter(b => b.trim()),
      apkLink: blogForm.apkLink || undefined,
      apkSize: blogForm.apkSize || undefined,
    };

    try {
      if (editingBlog) {
        // Update existing
        const res = await fetch('/api/blog', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBlog.id, ...blogData, date_en: editingBlog.date_en, date_hi: editingBlog.date_hi }),
        });
        if (res.ok) {
          setBlogSuccess('Blog post updated!');
          fetchBlogs();
        }
      } else {
        // Create new
        const res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...blogData,
            date_en: dateEn,
            date_hi: dateHi,
          }),
        });
        if (res.ok) {
          setBlogSuccess('Blog post created!');
          fetchBlogs();
        }
      }
      resetBlogForm();
      setTimeout(() => setBlogSuccess(''), 3000);
    } catch {
      setBlogError('Failed to save blog post.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await fetch('/api/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchBlogs();
    } catch {
      console.error('Failed to delete blog');
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

        <Card className="w-full max-w-md bg-slate-900/80 border-slate-800 text-white backdrop-blur-xl shadow-2xl rounded-3xl p-2">
          <CardHeader className="text-center pt-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald/10 border border-emerald/20 flex items-center justify-center mx-auto mb-4 text-emerald">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight">Gharkilist Admin</CardTitle>
            <CardDescription className="text-slate-400">
              Manage APK releases and blog posts.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 px-6">
              {authError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Admin Password</label>
                <div className="relative">
                  <Input 
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-950 border-slate-800 text-white rounded-xl pl-10 focus:border-emerald focus:ring-1 focus:ring-emerald py-5"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-6 pb-8 pt-4">
              <Button 
                type="submit" 
                variant="emerald" 
                className="w-full font-bold py-5 rounded-xl shadow-lg shadow-emerald/10"
                disabled={verifying}
              >
                {verifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {verifying ? 'Verifying...' : 'Access Dashboard'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 border border-slate-800">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block">Gharkilist Admin</span>
              <span className="text-[10px] text-emerald font-bold uppercase tracking-wider block">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => { fetchApks(); fetchBlogs(); }}
              className="text-slate-400 hover:text-white border border-slate-800 rounded-xl px-3 hover:bg-slate-900"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 border-red-500/20 hover:bg-red-500/10 rounded-xl gap-2 font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('apk')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'apk'
                  ? 'border-emerald text-emerald'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              APK Management
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'blog'
                  ? 'border-emerald text-emerald'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Blog Posts
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* APK Management Tab */}
        {activeTab === 'apk' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Add APK Form */}
            <div className="lg:col-span-5">
              <Card className="bg-slate-900/60 border-slate-800 text-white rounded-3xl shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald" />
                    Add New APK Release
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    Add a GitHub release URL or direct APK download link.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {apkError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{apkError}</span>
                    </div>
                  )}
                  {apkSuccess && (
                    <div className="bg-emerald/10 border border-emerald/20 text-emerald text-xs rounded-xl p-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{apkSuccess}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">APK Download URL *</label>
                    <Input
                      placeholder="https://github.com/.../releases/download/.../app.apk"
                      value={apkForm.url}
                      onChange={(e) => setApkForm(prev => ({ ...prev, url: e.target.value }))}
                      onBlur={handleExtractFromUrl}
                      className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                    />
                    <span className="text-[10px] text-slate-500">Paste URL and click outside to auto-fill fields</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Version *</label>
                      <Input
                        placeholder="e.g. 1.0.0"
                        value={apkForm.version}
                        onChange={(e) => setApkForm(prev => ({ ...prev, version: e.target.value }))}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Size (bytes)</label>
                      <Input
                        placeholder="e.g. 28323994"
                        value={apkForm.size}
                        onChange={(e) => setApkForm(prev => ({ ...prev, size: e.target.value }))}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Filename</label>
                    <Input
                      placeholder="Auto-extracted from URL"
                      value={apkForm.pathname}
                      onChange={(e) => setApkForm(prev => ({ ...prev, pathname: e.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                    />
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5">
                  <Button
                    onClick={handleAddApk}
                    disabled={!apkForm.url || !apkForm.version}
                    variant="emerald"
                    className="w-full font-bold py-5 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add APK Release
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* APK List */}
            <div className="lg:col-span-7">
              <Card className="bg-slate-900/60 border-slate-800 text-white rounded-3xl shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight">Releases</CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      {apks.length} APK releases configured
                    </CardDescription>
                  </div>
                  <Badge variant="mint" className="px-2.5 py-1 text-[10px] font-bold">
                    {apks.length} Active
                  </Badge>
                </CardHeader>
                <CardContent>
                  {loadingApks ? (
                    <div className="py-16 flex justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald" />
                    </div>
                  ) : apks.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl">
                      <Package className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-400">No APK releases yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {apks.map((apk, index) => (
                        <div key={index} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-700 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={index === 0 ? "mint" : "outline"} className="px-2 py-0.5 text-[10px]">
                                v{apk.version}
                              </Badge>
                              {index === 0 && (
                                <Badge variant="saffron" className="px-1.5 py-0 text-[8px] font-bold uppercase">Latest</Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 font-mono truncate">{apk.pathname}</p>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                              <span>{formatSize(apk.size)}</span>
                              <span>{formatDate(apk.uploadedAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={apk.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                              <Download className="w-4 h-4" />
                            </a>
                            {!apk.isFallback && (
                              <button onClick={() => handleDeleteApk(index)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Blog Management Tab */}
        {activeTab === 'blog' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Blog Form */}
            <div className="lg:col-span-5">
              <Card className="bg-slate-900/60 border-slate-800 text-white rounded-3xl shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
                    {editingBlog ? <Edit className="w-5 h-5 text-emerald" /> : <Plus className="w-5 h-5 text-emerald" />}
                    {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    {editingBlog ? 'Update the blog post details.' : 'Create a new update or changelog entry.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{blogError}</span>
                    </div>
                  )}
                  {blogSuccess && (
                    <div className="bg-emerald/10 border border-emerald/20 text-emerald text-xs rounded-xl p-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{blogSuccess}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Title (English) *</label>
                      <Input
                        placeholder="v1.0 — New Feature"
                        value={blogForm.title_en}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, title_en: e.target.value }))}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Title (Hindi)</label>
                      <Input
                        placeholder="v1.0 — नया फीचर"
                        value={blogForm.title_hi}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, title_hi: e.target.value }))}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Version</label>
                      <Input
                        placeholder="e.g. v1.0.0"
                        value={blogForm.version}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, version: e.target.value }))}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Category</label>
                      <select
                        value={blogForm.category}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value as BlogUpdate['category'] }))}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl text-sm px-3 py-2"
                      >
                        <option value="release">Release</option>
                        <option value="feature">Feature</option>
                        <option value="improvement">Improvement</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Excerpt (English) *</label>
                    <Textarea
                      placeholder="Brief description of the update..."
                      value={blogForm.excerpt_en}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt_en: e.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Excerpt (Hindi)</label>
                    <Textarea
                      placeholder="अपडेट का संक्षिप्त विवरण..."
                      value={blogForm.excerpt_hi}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt_hi: e.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Bullet Points (English, one per line)</label>
                    <Textarea
                      placeholder="Feature one added&#10;Bug fix for XYZ&#10;Performance improvement"
                      value={blogForm.bullets_en}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, bullets_en: e.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm min-h-[100px] font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Bullet Points (Hindi, one per line)</label>
                    <Textarea
                      placeholder="फीचर वन जोड़ा गया&#10;XYZ के लिए बग फिक्स&#10;प्रदर्शन सुधार"
                      value={blogForm.bullets_hi}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, bullets_hi: e.target.value }))}
                      className="bg-slate-950 border border-slate-800 text-white rounded-xl text-sm min-h-[100px] font-mono text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">APK Download Link</label>
                      <Input
                        placeholder="https://..."
                        value={blogForm.apkLink}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, apkLink: e.target.value }))}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">APK Size</label>
                      <Input
                        placeholder="e.g. ~27 MB"
                        value={blogForm.apkSize}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, apkSize: e.target.value }))}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5 flex gap-2">
                  <Button
                    onClick={handleSaveBlog}
                    disabled={!blogForm.title_en || !blogForm.excerpt_en}
                    variant="emerald"
                    className="flex-1 font-bold py-5 rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingBlog ? 'Update Post' : 'Create Post'}
                  </Button>
                  {editingBlog && (
                    <Button
                      onClick={resetBlogForm}
                      variant="ghost"
                      className="px-4 py-5 rounded-xl border border-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>

            {/* Blog List */}
            <div className="lg:col-span-7">
              <Card className="bg-slate-900/60 border-slate-800 text-white rounded-3xl shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight">Blog Posts</CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      {blogs.length} posts published
                    </CardDescription>
                  </div>
                  <Badge variant="mint" className="px-2.5 py-1 text-[10px] font-bold">
                    {blogs.length} Posts
                  </Badge>
                </CardHeader>
                <CardContent>
                  {loadingBlogs ? (
                    <div className="py-16 flex justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald" />
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl">
                      <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-400">No blog posts yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {blogs.map((blog) => (
                        <div key={blog.id} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {blog.version && (
                                  <Badge variant="outline" className="px-2 py-0.5 text-[10px]">
                                    {blog.version}
                                  </Badge>
                                )}
                                <Badge 
                                  variant={blog.category === 'release' ? 'mint' : blog.category === 'feature' ? 'saffron' : 'outline'} 
                                  className="px-2 py-0.5 text-[10px]"
                                >
                                  {blog.category}
                                </Badge>
                              </div>
                              <h3 className="text-sm font-bold text-white truncate">{blog.title_en}</h3>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{blog.excerpt_en}</p>
                              <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                                <Calendar className="w-3 h-3" />
                                <span>{blog.date_en}</span>
                                {blog.apkSize && <span>• {blog.apkSize}</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditBlog(blog)}
                                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog.id)}
                                className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
