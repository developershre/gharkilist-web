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
  X,
  TrendingUp,
  HardDrive,
  Search,
  UploadCloud
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor';
import { motion } from 'framer-motion';


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
  content_en?: string;
  content_hi?: string;
}

type ActiveTab = 'apk' | 'blog' | 'analytics';

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
    pathname: '',
    size: '',
    version: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [apkError, setApkError] = useState('');
  const [apkSuccess, setApkSuccess] = useState('');
  const [apkSearch, setApkSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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
    content_en: '',
    content_hi: '',
  });
  const [blogError, setBlogError] = useState('');
  const [blogSuccess, setBlogSuccess] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<'all' | 'release' | 'feature' | 'improvement'>('all');
  const [blogFormTab, setBlogFormTab] = useState<'edit' | 'preview'>('edit');
  const [previewLang, setPreviewLang] = useState<'en' | 'hi'>('en');

  // Analytics State
  const [analytics, setAnalytics] = useState<{
    visits: { page: string; count: number }[];
    downloads: { version: string; pathname: string; downloads: number; uploadedAt: string }[];
    totalVisits: number;
    totalDownloads: number;
  } | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Custom delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'apk' | 'blog';
    id: string; // version for APK, id for blog
    title: string;
  } | null>(null);
  const [deletingItem, setDeletingItem] = useState(false);

  useEffect(() => {
    const savedPassword = localStorage.getItem('gharkilist_admin_password');
    if (savedPassword) {
      setPassword(savedPassword);
      verifySavedPassword(savedPassword);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized && activeTab === 'analytics') {
      fetchAnalytics();
    }
  }, [activeTab, isAuthorized]);

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
        fetchAnalytics();
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
        fetchAnalytics();
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

  // Analytics Functions
  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch {
      console.error('Failed to fetch analytics');
    } finally {
      setLoadingAnalytics(false);
    }
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

  const handleFileDrop = (file: File) => {
    setSelectedFile(file);
    // Auto-extract version from file name (e.g. GharKiList-v0.0.6.apk)
    const versionMatch = file.name.match(/v?(\d+\.\d+(?:\.\d+)?(?:\+\d+)?)/i);
    const extractedVersion = versionMatch ? versionMatch[1] : '';
    
    setApkForm({
      pathname: file.name,
      size: file.size.toString(),
      version: extractedVersion,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      handleFileDrop(file);
    }
  };

  const handleAddApk = async () => {
    if (!selectedFile) {
      setApkError('Please select an APK file to upload.');
      return;
    }
    if (!apkForm.version) {
      setApkError('Version is required.');
      return;
    }
    setUploading(true);
    setApkError('');
    setApkSuccess('');
    try {
      const cleanVersion = apkForm.version.trim();
      const uploadFilename = `GharKiList-v${cleanVersion}.apk`;

      // 1. Upload to Vercel Blob via our API endpoint
      const uploadRes = await fetch(`/api/apks/upload?filename=${uploadFilename}`, {
        method: 'POST',
        body: selectedFile,
      });

      if (!uploadRes.ok) {
        const errData = await uploadRes.json();
        throw new Error(errData.error || 'Failed to upload APK to Vercel Blob.');
      }

      const blobData = await uploadRes.json();

      // 2. Call the API to save the new APK release record in SQLite
      const saveRes = await fetch('/api/apks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: blobData.url,
          pathname: uploadFilename,
          size: selectedFile.size,
          version: cleanVersion,
        }),
      });

      if (!saveRes.ok) {
        const errData = await saveRes.json();
        throw new Error(errData.error || 'Failed to register the APK release in database.');
      }

      setApkSuccess('APK uploaded and added successfully!');
      setSelectedFile(null);
      setApkForm({ pathname: '', size: '', version: '' });
      
      // Clear input value
      const fileInput = document.getElementById('apk-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchApks();
      setTimeout(() => setApkSuccess(''), 3000);
    } catch (err) {
      setApkError((err as Error).message || 'Failed to upload and add APK.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteApk = (version: string, pathname: string) => {
    setDeleteTarget({
      type: 'apk',
      id: version,
      title: pathname || `v${version}`,
    });
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
      content_en: '',
      content_hi: '',
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
      content_en: blog.content_en || '',
      content_hi: blog.content_hi || '',
    });
  };

  const handleSaveBlog = async () => {
    if (!blogForm.content_en) {
      setBlogError('Blog content (English) is required.');
      return;
    }
    setBlogError('');

    const blogData = {
      content_en: blogForm.content_en,
      content_hi: "", // Send empty so backend live-translates English to Hindi
    };

    try {
      if (editingBlog) {
        // Update existing
        const res = await fetch('/api/blog', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBlog.id, ...blogData }),
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
          body: JSON.stringify(blogData),
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

  const handleDeleteBlog = (id: string, title: string) => {
    setDeleteTarget({
      type: 'blog',
      id: id,
      title: title,
    });
  };

  const handleExecuteDelete = async () => {
    if (!deleteTarget) return;
    setDeletingItem(true);
    try {
      if (deleteTarget.type === 'apk') {
        const res = await fetch('/api/apks/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ version: deleteTarget.id }),
        });
        if (res.ok) {
          setApkSuccess(`Version v${deleteTarget.id} deleted successfully.`);
          fetchApks();
          setTimeout(() => setApkSuccess(''), 3000);
        } else {
          const data = await res.json();
          setApkError(data.error || 'Failed to delete APK.');
        }
      } else {
        const res = await fetch('/api/blog', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: deleteTarget.id }),
        });
        if (res.ok) {
          setBlogSuccess('Blog post deleted successfully.');
          fetchBlogs();
          setTimeout(() => setBlogSuccess(''), 3000);
        } else {
          setBlogError('Failed to delete blog post.');
        }
      }
      setDeleteTarget(null);
    } catch {
      if (deleteTarget.type === 'apk') {
        setApkError('Failed to delete APK.');
      } else {
        setBlogError('Failed to delete blog post.');
      }
    } finally {
      setDeletingItem(false);
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
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Glowing aura blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0,transparent_60%)] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0,transparent_60%)] rounded-full pointer-events-none" />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-45 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Accent decoration */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-tr from-emerald to-mint rounded-3xl blur-2xl opacity-20 animate-pulse-subtle" />
          
          <Card className="bg-white/80 border border-slate-200/50 text-slate-900 backdrop-blur-xl shadow-2xl rounded-3xl p-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald via-saffron to-mint" />
            
            <CardHeader className="text-center pt-10 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald/5 border border-emerald/10 flex items-center justify-center mx-auto mb-4 text-emerald shadow-inner">
                <ShieldAlert className="w-8 h-8 animate-pulse-subtle" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Gharkilist Admin</CardTitle>
              <CardDescription className="text-slate-500 text-xs mt-1">
                Authorized access only. Enter password to manage releases and blog updates.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 px-6">
                {authError && (
                  <div className="bg-red-50 border border-red-100 text-red-650 text-xs rounded-xl p-3.5 flex items-center gap-2 animate-fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                    <span className="font-medium">{authError}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 tracking-wide block">Admin Password</label>
                  <div className="relative">
                    <Input 
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/90 border border-slate-200 text-slate-900 rounded-xl pl-10 focus:border-emerald focus:ring-1 focus:ring-emerald py-6 shadow-xs placeholder-slate-300 font-mono"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-10 pt-4">
                <Button 
                  type="submit" 
                  variant="emerald" 
                  className="w-full font-bold py-6 rounded-xl shadow-lg shadow-emerald/10 bg-emerald hover:bg-emerald/90 transition-all duration-200"
                  disabled={verifying}
                >
                  {verifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {verifying ? 'Verifying...' : 'Access Dashboard'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // Stats calculations
  const totalReleases = apks.length;
  const latestVersion = apks[0]?.version || 'N/A';
  const totalBlogs = blogs.length;
  
  const totalStorageBytes = apks.reduce((sum, apk) => sum + (apk.size || 0), 0);
  const formattedStorage = formatSize(totalStorageBytes);

  // Filtered lists
  const filteredApks = apks.filter(apk => 
    apk.version.toLowerCase().includes(apkSearch.toLowerCase()) ||
    apk.pathname.toLowerCase().includes(apkSearch.toLowerCase())
  );

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title_en.toLowerCase().includes(blogSearch.toLowerCase()) ||
      blog.excerpt_en.toLowerCase().includes(blogSearch.toLowerCase()) ||
      (blog.title_hi && blog.title_hi.toLowerCase().includes(blogSearch.toLowerCase())) ||
      (blog.excerpt_hi && blog.excerpt_hi.toLowerCase().includes(blogSearch.toLowerCase()));
      
    const matchesCategory = 
      blogCategoryFilter === 'all' || 
      blog.category === blogCategoryFilter;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 border border-slate-100 shadow-xs">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block text-slate-900">Gharkilist Admin</span>
              <span className="text-[10px] text-emerald font-bold uppercase tracking-wider block">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => { fetchApks(); fetchBlogs(); }}
              className="text-slate-500 hover:text-slate-900 border border-slate-200 rounded-xl px-3 hover:bg-slate-50"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-xl gap-2 font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-slate-100 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 relative">
            <button
              onClick={() => setActiveTab('apk')}
              className={`relative flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'apk'
                  ? 'text-emerald font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeTab === 'apk' && (
                <motion.span
                  layoutId="adminActiveTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Package className="w-4 h-4" />
              APK Management
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`relative flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'blog'
                  ? 'text-emerald font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeTab === 'blog' && (
                <motion.span
                  layoutId="adminActiveTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <FileText className="w-4 h-4" />
              Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`relative flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'analytics'
                  ? 'text-emerald font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeTab === 'analytics' && (
                <motion.span
                  layoutId="adminActiveTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <TrendingUp className="w-4 h-4" />
              Analytics Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/90 border border-slate-100/80 p-5 rounded-2xl flex items-center gap-4 dashboard-glow-card">
            <div className="w-10 h-10 rounded-xl bg-emerald/5 flex items-center justify-center text-emerald">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Latest Release</span>
              <span className="text-sm lg:text-base font-bold text-slate-900 block flex items-center gap-1.5 truncate">
                v{latestVersion}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse shrink-0" />
              </span>
            </div>
          </Card>

          <Card className="bg-white/90 border border-slate-100/80 p-5 rounded-2xl flex items-center gap-4 dashboard-glow-card">
            <div className="w-10 h-10 rounded-xl bg-emerald/5 flex items-center justify-center text-emerald">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Total Releases</span>
              <span className="text-sm lg:text-base font-bold text-slate-900 block truncate">{totalReleases}</span>
            </div>
          </Card>

          <Card className="bg-white/90 border border-slate-100/80 p-5 rounded-2xl flex items-center gap-4 dashboard-glow-card">
            <div className="w-10 h-10 rounded-xl bg-saffron/5 flex items-center justify-center text-saffron">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Total Storage</span>
              <span className="text-sm lg:text-base font-bold text-slate-900 block truncate">{formattedStorage}</span>
            </div>
          </Card>

          <Card className="bg-white/90 border border-slate-100/80 p-5 rounded-2xl flex items-center gap-4 dashboard-glow-card">
            <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Blog Updates</span>
              <span className="text-sm lg:text-base font-bold text-slate-900 block truncate">{totalBlogs}</span>
            </div>
          </Card>
        </div>
        
        {/* APK Management Tab */}
        {activeTab === 'apk' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Add APK Form */}
            <div className="lg:col-span-5">
              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900">
                    <Plus className="w-5 h-5 text-emerald" />
                    Add New APK Release
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-xs">
                    Add a GitHub release URL or direct APK download link.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {apkError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{apkError}</span>
                    </div>
                  )}
                  {apkSuccess && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald" />
                      <span>{apkSuccess}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Upload APK File (Vercel Blob) *</label>
                    <div 
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDragging(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.name.endsWith('.apk')) {
                          handleFileDrop(file);
                        } else {
                          setApkError('Please upload only .apk files.');
                        }
                      }}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                        isDragging 
                          ? 'border-emerald bg-emerald/5 scale-[1.01]' 
                          : selectedFile 
                            ? 'border-emerald/50 bg-emerald-50/10' 
                            : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/50'
                      }`}
                      onClick={() => document.getElementById('apk-file-input')?.click()}
                    >
                      <input
                        id="apk-file-input"
                        type="file"
                        accept=".apk"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <UploadCloud className={`w-8 h-8 mx-auto mb-2 transition-transform duration-200 ${isDragging ? 'scale-110 text-emerald' : 'text-slate-400'}`} />
                      {selectedFile ? (
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-800 truncate">{selectedFile.name}</p>
                          <p className="text-[10px] text-slate-500 font-semibold">{formatSize(selectedFile.size)}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-bold text-slate-700">Drag & drop your APK here, or click to browse</p>
                          <p className="text-[10px] text-slate-400 mt-1">Supports only .apk files</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Version *</label>
                      <Input
                        placeholder="e.g. 1.0.0"
                        value={apkForm.version}
                        onChange={(e) => setApkForm(prev => ({ ...prev, version: e.target.value }))}
                        className="bg-white border-slate-200 text-slate-900 rounded-xl text-sm focus:border-emerald focus:ring-1 focus:ring-emerald shadow-xs"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5">
                  <Button
                    onClick={handleAddApk}
                    disabled={!selectedFile || !apkForm.version || uploading}
                    variant="emerald"
                    className="w-full font-bold py-5 rounded-xl shadow-md shadow-emerald/10"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {uploading ? 'Uploading to Vercel Blob...' : 'Add APK Release'}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* APK List */}
            <div className="lg:col-span-7">
              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-900">Releases</CardTitle>
                    <CardDescription className="text-slate-500 text-xs">
                      {apks.length} APK releases configured
                    </CardDescription>
                  </div>
                  <Badge variant="mint" className="px-2.5 py-1 text-[10px] font-bold">
                    {apks.length} Active
                  </Badge>
                </CardHeader>
                <CardContent>
                  {/* Search Bar */}
                  {apks.length > 0 && (
                    <div className="relative mb-4">
                      <Input
                        placeholder="Search releases by version or filename..."
                        value={apkSearch}
                        onChange={(e) => setApkSearch(e.target.value)}
                        className="bg-white border-slate-200 text-slate-900 rounded-xl text-xs pl-9 py-4.5 focus:border-emerald focus:ring-1 focus:ring-emerald shadow-xs"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      {apkSearch && (
                        <button 
                          onClick={() => setApkSearch('')}
                          className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {loadingApks ? (
                    <div className="py-16 flex justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald" />
                    </div>
                  ) : apks.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-slate-200 rounded-2xl">
                      <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-500">No APK releases yet.</p>
                    </div>
                  ) : filteredApks.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-slate-200 rounded-2xl">
                      <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm text-slate-500">No releases match your search.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredApks.map((apk, index) => {
                        const globalIndex = apks.findIndex(a => a.version === apk.version);
                        return (
                          <div key={`${apk.version}-${index}`} className="bg-white/60 backdrop-blur-xs border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-light/20 hover:bg-white transition-all duration-200 shadow-xs hover:shadow-sm">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={globalIndex === 0 ? "mint" : "outline"} className="px-2 py-0.5 text-[10px]">
                                  v{apk.version}
                                </Badge>
                                {globalIndex === 0 && (
                                  <Badge variant="saffron" className="px-1.5 py-0 text-[8px] font-bold uppercase">Latest</Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 font-mono truncate">{apk.pathname}</p>
                              <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                                <span>{formatSize(apk.size)}</span>
                                <span>{formatDate(apk.uploadedAt)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <a href={apk.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                                <Download className="w-4 h-4" />
                              </a>
                              {!apk.isFallback && (
                                <button onClick={() => handleDeleteApk(apk.version, apk.pathname)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Blog Management Tab */}
        {activeTab === 'blog' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Blog Form */}
            <div className="lg:col-span-5">
              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900">
                    {editingBlog ? <Edit className="w-5 h-5 text-emerald" /> : <Plus className="w-5 h-5 text-emerald" />}
                    {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-xs">
                    {editingBlog ? 'Update the blog post details.' : 'Create a new update or changelog entry.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{blogError}</span>
                    </div>
                  )}
                  {blogSuccess && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl p-3 flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald" />
                      <span>{blogSuccess}</span>
                    </div>
                  )}

                  <RichTextEditor
                    label="Blog Content *"
                    placeholder="Write your blog post in English. The first line (Heading/Bold) will be used as the Title."
                    value={blogForm.content_en}
                    onChange={(val) => setBlogForm(prev => ({ ...prev, content_en: val }))}
                  />
                </CardContent>
                <CardFooter className="px-5 pb-5 flex gap-2">
                  <Button
                    onClick={handleSaveBlog}
                    disabled={!blogForm.content_en}
                    variant="emerald"
                    className="flex-1 font-bold py-5 rounded-xl shadow-md shadow-emerald/10"
                  >
                    <Save className="w-4 h-4 mr-2" />
                      {editingBlog ? 'Update Post' : 'Create Post'}
                  </Button>
                  {editingBlog && (
                    <Button
                      onClick={resetBlogForm}
                      variant="outline"
                      className="font-bold py-5 rounded-xl border-slate-200"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>

            {/* Blog List */}
            <div className="lg:col-span-7">
              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-900">Blog Posts</CardTitle>
                    <CardDescription className="text-slate-500 text-xs">Manage current live blog updates.</CardDescription>
                  </div>
                  <div className="relative w-48">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Search posts..."
                      value={blogSearch}
                      onChange={(e) => setBlogSearch(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:border-emerald focus:ring-1 focus:ring-emerald shadow-xs"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(['all', 'release', 'feature', 'improvement'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setBlogCategoryFilter(filter)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                          blogCategoryFilter === filter
                            ? 'bg-emerald text-white border-emerald shadow-xs'
                            : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>

                  {loadingBlogs ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400 text-sm">
                      <Loader2 className="w-8 h-8 animate-spin text-emerald" />
                      <span>Loading updates...</span>
                    </div>
                  ) : filteredBlogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400 text-sm border border-dashed border-slate-200 rounded-2xl">
                      <FileText className="w-8 h-8 mb-2 opacity-50" />
                      <span>No blog posts found.</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredBlogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-light/20 hover:shadow-sm transition-all duration-200 shadow-xs group w-full"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-semibold">{blog.date_en}</span>
                                {blog.version && (
                                  <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                                    {blog.version}
                                  </Badge>
                                )}
                                <Badge
                                  variant={blog.category === 'release' ? 'mint' : blog.category === 'feature' ? 'saffron' : 'outline'}
                                  className="text-[9px] px-1.5 py-0"
                                >
                                  {blog.category}
                                </Badge>
                              </div>
                              <h4 className="font-bold text-slate-900 group-hover:text-emerald transition-colors text-sm">{blog.title_en}</h4>
                              <p className="text-slate-500 text-xs line-clamp-1">{blog.excerpt_en}</p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEditBlog(blog)}
                                className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-emerald transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog.id, blog.title_en)}
                                className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
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

        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            {/* Overview stats cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <div>
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Page Visits</CardTitle>
                    <CardDescription className="text-2xl font-black mt-1 text-slate-900">
                      {loadingAnalytics ? (
                        <Loader2 className="w-5 h-5 animate-spin text-emerald" />
                      ) : (
                        analytics?.totalVisits ?? 0
                      )}
                    </CardDescription>
                  </div>
                  <div className="p-3 bg-emerald/10 text-emerald rounded-2xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-400">Aggregated visitor count across Home and Blog pages.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <div>
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total APK Downloads</CardTitle>
                    <CardDescription className="text-2xl font-black mt-1 text-slate-900">
                      {loadingAnalytics ? (
                        <Loader2 className="w-5 h-5 animate-spin text-emerald" />
                      ) : (
                        analytics?.totalDownloads ?? 0
                      )}
                    </CardDescription>
                  </div>
                  <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
                    <Download className="w-6 h-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-400">Total clicks on APK download buttons across all versions.</p>
                </CardContent>
              </Card>
            </div>

            {/* Visits & Downloads details tables */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Visits Table */}
              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Page Views Breakdown</CardTitle>
                  <CardDescription className="text-xs text-slate-500">Tracked route hits</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingAnalytics ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald" />
                    </div>
                  ) : (
                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-left">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Page Route</th>
                            <th className="px-4 py-3 font-semibold text-right">Views</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {analytics?.visits && analytics.visits.length > 0 ? (
                            analytics.visits.map((v, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 font-mono text-xs">{v.page}</td>
                                <td className="px-4 py-3 text-right font-semibold">{v.count}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={2} className="px-4 py-6 text-center text-slate-400 text-xs">No visit logs recorded yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Downloads Table */}
              <Card className="bg-white/90 border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">APK Downloads Breakdown</CardTitle>
                  <CardDescription className="text-xs text-slate-500">Download attempts per released version</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingAnalytics ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald" />
                    </div>
                  ) : (
                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-left">
                          <tr>
                            <th className="px-4 py-3 font-semibold">APK Version</th>
                            <th className="px-4 py-3 font-semibold">Pathname</th>
                            <th className="px-4 py-3 font-semibold text-right">Downloads</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {analytics?.downloads && analytics.downloads.length > 0 ? (
                            analytics.downloads.map((d, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3">
                                  <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                                    {d.version}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-xs max-w-[150px] truncate text-slate-500" title={d.pathname}>{d.pathname}</td>
                                <td className="px-4 py-3 text-right font-semibold text-emerald-700">{d.downloads || 0}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="px-4 py-6 text-center text-slate-400 text-xs">No APK downloads recorded yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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
