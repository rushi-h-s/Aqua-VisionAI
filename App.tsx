import React, { useState, useCallback } from 'react';
import { analyzeFishImage } from './services/geminiService';
import { FishAnalysis, AppView } from './types';
import { StatsOverview } from './components/StatsOverview';
import { AnalysisCard } from './components/AnalysisCard';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [history, setHistory] = useState<FishAnalysis[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const id = crypto.randomUUID();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      
      const newItem: FishAnalysis = {
        id,
        imageName: file.name,
        imageData,
        timestamp: Date.now(),
        status: 'analyzing'
      };

      setHistory(prev => [newItem, ...prev]);
      setCurrentView(AppView.ANALYZE);

      try {
        // Pass filename to service to check for fraud
        const result = await analyzeFishImage(imageData, file.name);
        setHistory(prev => prev.map(item => 
          item.id === id ? { ...item, status: 'complete', result } : item
        ));
      } catch (error) {
        setHistory(prev => prev.map(item => 
          item.id === id ? { ...item, status: 'error', error: (error as Error).message } : item
        ));
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const deleteItem = (id: string) => {
    setHistory(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🐟</span>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                  AquaVision AI
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Gemini Powered Quality Control</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView(AppView.DASHBOARD)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === AppView.DASHBOARD ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView(AppView.ANALYZE)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === AppView.ANALYZE ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Results ({history.length})
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Upload Area - Always Visible but Condensed on Dashboard */}
        <div 
          className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out mb-8 overflow-hidden group
            ${dragActive ? 'border-brand-500 bg-brand-50/50 ring-4 ring-brand-100' : 'border-slate-300 hover:border-brand-400 bg-white'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileInput}
          />
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center p-8 cursor-pointer w-full h-full relative z-10">
            <div className={`p-4 rounded-full bg-brand-50 mb-4 transition-transform duration-300 ${dragActive ? 'scale-110 rotate-12' : 'group-hover:scale-105'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-lg font-medium text-slate-700">
              Drag & Drop fish image or <span className="text-brand-600 underline decoration-brand-400 decoration-2 underline-offset-2">Browse</span>
            </p>
            <p className="text-sm text-slate-400 mt-2">Supports JPG, PNG (Max 5MB)</p>
          </label>
        </div>

        {/* Dynamic Views */}
        {currentView === AppView.DASHBOARD && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Fleet Quality Overview</h2>
             </div>
             <StatsOverview history={history} />
             
             {/* Recent Activity Mini-List */}
             {history.length > 0 && (
               <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Recent Scans
                  </h3>
                  <div className="grid gap-4">
                    {history.slice(0, 3).map(item => (
                      <AnalysisCard key={item.id} item={item} onDelete={deleteItem} />
                    ))}
                  </div>
                  {history.length > 3 && (
                    <button 
                      onClick={() => setCurrentView(AppView.ANALYZE)}
                      className="w-full mt-4 py-3 text-sm text-brand-600 font-medium bg-white border border-slate-200 hover:bg-brand-50 hover:border-brand-200 rounded-lg transition-all"
                    >
                      View All {history.length} Scans
                    </button>
                  )}
               </div>
             )}
          </div>
        )}

        {currentView === AppView.ANALYZE && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Detailed Reports</h2>
               <button 
                 onClick={() => setHistory([])}
                 className="text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
                 disabled={history.length === 0}
               >
                 Clear History
               </button>
            </div>
            
            {history.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-lg font-semibold text-slate-800">No images analyzed yet</h3>
                <p className="text-slate-400 max-w-sm mx-auto mt-2">Upload fish images to generate professional quality, safety, and sustainability reports.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {history.map(item => (
                  <AnalysisCard key={item.id} item={item} onDelete={deleteItem} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm">
              Powered by <span className="font-semibold text-brand-600">Gemini 3 Pro Vision</span> • AquaVision AI © {new Date().getFullYear()}
            </p>
        </div>
      </footer>
    </div>
  );
}

export default App;