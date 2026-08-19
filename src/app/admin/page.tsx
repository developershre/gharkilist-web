'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Trash2, 
  Lock, 
  RefreshCw, 
  FileSpreadsheet, 
  Calendar, 
  Loader2, 
  LogOut, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  UploadCloud
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ApkRelease {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  version: string;
  isFallback: boolean;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);

  // APK list state
  const [apks, setApks] = useState<ApkRelease[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState('');

  // Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [proposedVersion, setProposedVersion] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Delete state
  const [apkToDelete, setApkToDelete] = useState<ApkRelease | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Check localStorage for saved password on mount
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
      } else {
        localStorage.removeItem('gharkilist_admin_password');
        setAuthError('Session expired. Please enter the password again.');
      }
    } catch (e) {
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
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Invalid admin password.');
      }
    } catch (e) {
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
  };

  const fetchApks = async () => {
    setLoadingList(true);
    setListError('');
    try {
      const res = await fetch('/api/apks');
      if (res.ok) {
        const data = await res.json();
        setApks(data);
      } else {
        setListError('Failed to fetch APK list.');
      }
    } catch (e) {
      setListError('Error fetching APK list.');
    } finally {
      setLoadingList(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.endsWith('.apk')) {
        setUploadError('Only .apk files are allowed.');
        setSelectedFile(null);
        setProposedVersion('');
        return;
      }
      setSelectedFile(file);
      setUploadError('');
      setUploadSuccess('');

      // Auto-extract version from filename, e.g. GharKiList-v1.0.2.apk
      const match = file.name.match(/v?(\d+\.\d+(?:\.\d+)?(?:-[a-zA-Z0-9.]+)?)/i);
      if (match) {
        setProposedVersion(match[1]);
      } else {
        setProposedVersion('1.0.0');
      }
    }
  };

  const handleUploadApk = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadError('Upload feature is currently disabled (Vercel Blob removed).');
    setUploading(false);
  };

  const handleDeleteApk = async () => {
    if (!apkToDelete) return;
    setDeleting(true);
    alert('Delete feature is currently disabled (Vercel Blob removed).');
    setDeleting(false);
    setApkToDelete(null);
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isFallbackMode = apks.some(apk => apk.isFallback);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

        <Card className="w-full max-w-md bg-slate-900/80 border-slate-800 text-white backdrop-blur-xl shadow-2xl rounded-3xl p-2">
          <CardHeader className="text-center pt-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald/10 border border-emerald/20 flex items-center justify-center mx-auto mb-4 text-emerald">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight">Gharkilist Admin Portal</CardTitle>
            <CardDescription className="text-slate-400">
              Access the secure dashboard to publish and manage APK files.
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
                    placeholder="Enter system password"
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
                className="w-full font-bold py-5 rounded-xl shadow-lg shadow-emerald/10 flex items-center justify-center gap-2"
                disabled={verifying}
              >
                {verifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Access Dashboard</span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 border border-slate-800">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block">Gharkilist (घर की लिस्ट)</span>
              <span className="text-[10px] text-emerald font-bold uppercase tracking-wider block">Admin Release Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchApks} 
              disabled={loadingList}
              className="text-slate-400 hover:text-white border border-slate-800 rounded-xl px-3 hover:bg-slate-900"
            >
              <RefreshCw className={`w-4 h-4 ${loadingList ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 border-red-500/20 hover:bg-red-500/10 rounded-xl gap-2 font-bold px-3.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Warn if running in fallback mode */}
        {isFallbackMode && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl p-4 mb-8 flex items-start gap-3 shadow-lg max-w-4xl">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm mb-0.5">Vercel Blob Storage - Disabled</h4>
              <p className="text-xs text-amber-400/80 leading-relaxed">
                Vercel Blob storage logic has been removed. The application is running in static fallback mode, serving the pre-packaged APK file. Uploading or deleting APKs is currently disabled.
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* UPLOAD PANEL */}
          <div className="lg:col-span-4">
            <Card className="bg-slate-900/60 border-slate-800 text-white rounded-3xl shadow-xl p-2 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight">Upload New APK</CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Upload an optimized APK build to Vercel Blob. Ensure the file name ends with `.apk`.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-5">
                {uploadError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{uploadError}</span>
                  </div>
                )}
                
                {uploadSuccess && (
                  <div className="bg-emerald/10 border border-emerald/20 text-emerald text-xs rounded-xl p-3 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{uploadSuccess}</span>
                  </div>
                )}

                {/* Drag and Drop File Input Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-200 flex flex-col items-center justify-center ${
                    selectedFile 
                      ? 'border-emerald/40 bg-emerald/5 hover:bg-emerald/10' 
                      : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/30'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept=".apk"
                    className="hidden"
                    disabled={uploading}
                  />
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    selectedFile ? 'bg-emerald/10 text-emerald' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  {selectedFile ? (
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-white block max-w-[200px] truncate mx-auto">{selectedFile.name}</span>
                      <span className="text-[10px] text-slate-400 block">{formatSize(selectedFile.size)}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-sm font-bold text-white block">Choose APK file</span>
                      <span className="text-xs text-slate-500 block mt-1">or drag & drop here</span>
                    </div>
                  )}
                </div>

                {selectedFile && (
                  <div className="space-y-2 pt-2 animate-fadeIn">
                    <label className="text-xs font-semibold text-slate-300">Semantic Version</label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="text" 
                        placeholder="e.g. 1.0.2"
                        value={proposedVersion}
                        onChange={(e) => setProposedVersion(e.target.value)}
                        className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
                        disabled={uploading}
                      />
                      <Badge variant="outline" className="text-[10px] text-emerald bg-emerald/5 border-emerald/20 px-2.5 py-1 whitespace-nowrap">
                        v{proposedVersion}
                      </Badge>
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      The file will be uploaded and stored as `GharKiList-v{proposedVersion || '1.0.0'}.apk`
                    </span>
                  </div>
                )}

                {/* Uploading progress bar */}
                {uploading && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald" />
                        Uploading to Blob Store
                      </span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
                      <div 
                        className="bg-emerald h-full rounded-full transition-all duration-100 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="px-5 pb-6">
                <Button 
                  onClick={handleUploadApk}
                  disabled={!selectedFile || uploading}
                  variant="emerald"
                  className="w-full font-bold py-5 rounded-xl shadow-lg shadow-emerald/10 flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading ({Math.round(uploadProgress)}%)...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload & Publish Release</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* LIST / MANAGER PANEL */}
          <div className="lg:col-span-8">
            <Card className="bg-slate-900/60 border-slate-800 text-white rounded-3xl shadow-xl p-2 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">Active Releases</CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    List of all APK binaries hosted on Vercel Blob. Sorted from newest to oldest.
                  </CardDescription>
                </div>
                <Badge variant="mint" className="px-2.5 py-1 text-[10px] font-bold">
                  {apks.length} {apks.length === 1 ? 'Release' : 'Releases'}
                </Badge>
              </CardHeader>
              <CardContent className="px-5 pb-6">
                {loadingList ? (
                  <div className="py-20 flex flex-col justify-center items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald" />
                    <span className="text-xs text-slate-400 font-medium">Fetching Vercel Blob records...</span>
                  </div>
                ) : listError ? (
                  <div className="py-16 text-center">
                    <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-red-400">{listError}</p>
                    <Button variant="outline" size="sm" onClick={fetchApks} className="mt-4 border-slate-800 text-slate-300 rounded-xl">
                      Try Again
                    </Button>
                  </div>
                ) : apks.length === 0 ? (
                  <div className="py-20 text-center border border-dashed border-slate-800 rounded-2xl">
                    <FileSpreadsheet className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-400">No APK files found in Blob storage.</p>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1">
                      Upload your first APK on the left panel to make it available for download.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-850 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          <th className="pb-3 pl-2">Version</th>
                          <th className="pb-3">Filename</th>
                          <th className="pb-3">Size</th>
                          <th className="pb-3">Uploaded At</th>
                          <th className="pb-3 pr-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850">
                        {apks.map((apk, index) => (
                          <tr key={index} className="text-xs text-slate-300 hover:bg-slate-900/20 group">
                            <td className="py-4 pl-2 font-bold text-white">
                              <div className="flex items-center gap-1.5">
                                <Badge variant={index === 0 && !apk.isFallback ? "mint" : "outline"} className="px-2 py-0.5 text-[10px]">
                                  v{apk.version}
                                </Badge>
                                {index === 0 && !apk.isFallback && (
                                  <Badge variant="saffron" className="px-1.5 py-0 text-[8px] font-bold uppercase">Latest</Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-4 font-mono text-slate-400 max-w-[200px] truncate" title={apk.pathname}>
                              {apk.pathname}
                            </td>
                            <td className="py-4 text-slate-300">{formatSize(apk.size)}</td>
                            <td className="py-4 text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formatDate(apk.uploadedAt)}</span>
                            </td>
                            <td className="py-4 pr-2 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  asChild 
                                  className="h-8 w-8 rounded-xl p-0 hover:bg-slate-800 text-slate-400 hover:text-white"
                                  title="Download File"
                                >
                                  <a href={apk.url} download target="_blank" rel="noreferrer">
                                    <Download className="w-3.5 h-3.5" />
                                  </a>
                                </Button>
                                {!apk.isFallback && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setApkToDelete(apk)}
                                    className="h-8 w-8 rounded-xl p-0 hover:bg-red-500/10 text-slate-400 hover:text-red-400"
                                    title="Delete Release"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={apkToDelete !== null} onOpenChange={(open) => { if (!open) setApkToDelete(null); }}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white rounded-3xl p-6 max-w-sm">
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-center text-lg font-bold">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-center text-xs text-slate-400">
              Are you sure you want to delete <span className="font-semibold text-white font-mono">{apkToDelete?.pathname}</span>? 
              This action is permanent and cannot be undone. Users will no longer be able to download this version.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0 mt-4">
            <Button 
              variant="ghost" 
              onClick={() => setApkToDelete(null)}
              className="flex-1 border border-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl"
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteApk}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete Release</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
