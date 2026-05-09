import { useState, useEffect } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./games.json')
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading games:', err);
        setLoading(false);
      });
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="app-root" className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-brand selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="h-20 sticky top-0 z-40 glass-nav flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-brand/20">
            T3
          </div>
          <span className="text-xl font-black tracking-tight uppercase hidden sm:block">
            T3ds<span className="text-brand">Unblocked</span>Games
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search 500+ games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand transition-all placeholder:text-zinc-600"
            />
            <div className="absolute right-3 top-3 text-zinc-600 text-[10px] bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 font-mono">
              /
            </div>
          </div>
          <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <button className="hover:text-brand transition-colors">Arcade</button>
            <button className="hover:text-brand transition-colors">Action</button>
            <button className="hover:text-brand transition-colors hidden lg:block">Sports</button>
          </div>
        </div>
      </nav>

      {/* Main Content: Bento Grid */}
      <main className="container mx-auto px-4 py-8">
        {/* Mobile Search */}
        <div className="relative md:hidden mb-10">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-brand"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-4 gap-4 animate-pulse">
             <div className="col-span-2 row-span-2 aspect-square bg-zinc-900 rounded-3xl" />
             <div className="aspect-square bg-zinc-900 rounded-3xl" />
             <div className="aspect-square bg-zinc-900 rounded-3xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {/* Featured Item (2x2) */}
              {filteredGames.length > 0 && (
                <motion.div
                  layout
                  key={filteredGames[0].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="md:col-span-2 md:row-span-2 bento-card featured-card interactive-card group h-[400px] md:h-auto"
                  onClick={() => setSelectedGame(filteredGames[0])}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={filteredGames[0].thumbnail}
                      alt="Featured"
                      className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-8 left-8 z-10 pr-8">
                    <span className="px-3 py-1 bg-brand text-[10px] font-black rounded-full mb-3 inline-block uppercase tracking-widest">
                      Featured Title
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter">
                      {filteredGames[0].title}
                    </h2>
                    <p className="text-zinc-400 text-sm max-w-sm mb-6 line-clamp-2">
                      {filteredGames[0].description}
                    </p>
                    <button className="px-8 py-3 bg-white text-black font-black rounded-2xl hover:bg-brand hover:text-white transition-all uppercase tracking-widest text-xs shadow-xl">
                      Play Now
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Standard Items */}
              {filteredGames.slice(1).map((game) => (
                <motion.div
                  layout
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bento-card interactive-card group p-5 flex flex-col justify-between"
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-zinc-950/80 backdrop-blur-sm rounded-lg text-[9px] font-bold uppercase tracking-widest text-brand-light border border-zinc-800">
                      {game.category}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight group-hover:text-brand transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                      {game.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Stat Panel (2x1) */}
              {filteredGames.length > 3 && (
                <motion.div 
                  layout
                  key="stats-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="md:col-span-2 bento-card stat-card p-8 flex items-center justify-around"
                >
                  <div className="text-center">
                    <div className="text-3xl font-black">14,281</div>
                    <div className="text-[10px] uppercase font-black text-brand-light tracking-widest">Players Online</div>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black">{games.length}</div>
                    <div className="text-[10px] uppercase font-black text-brand-light tracking-widest">Games Live</div>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black">99.9%</div>
                    <div className="text-[10px] uppercase font-black text-brand-light tracking-widest">Uptime</div>
                  </div>
                </motion.div>
              )}

              {/* Feature Items (1x1) */}
              {filteredGames.length > 0 && (
                <motion.div 
                  layout
                  key="request-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bento-card p-6 flex flex-col items-center justify-center text-center gap-3 bg-zinc-900 group cursor-default"
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500 group-hover:bg-brand group-hover:text-white transition-all">
                    ?
                  </div>
                  <h4 className="font-bold text-sm">Request Game</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest px-2">Can't find a title? Let us know!</p>
                </motion.div>
              )}

              {filteredGames.length > 0 && (
                <motion.div 
                  layout
                  key="fullscreen-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bento-card p-6 flex flex-col items-center justify-center text-center gap-3 bg-brand/5 border-brand/20 group cursor-pointer hover:bg-brand/10"
                >
                  <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center text-brand">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm">Fullscreen Mode</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Optimized for browsers</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {filteredGames.length === 0 && !loading && (
          <div className="py-32 bento-card border-dashed border-zinc-800 flex flex-col items-center justify-center">
            <Search className="w-12 h-12 text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold">No titles found</h3>
            <p className="text-zinc-500 text-sm">Try broadening your search criteria.</p>
          </div>
        )}
      </main>

      {/* Footer Info Bar */}
      <footer className="h-16 md:h-20 border-t border-zinc-900 bg-zinc-950 flex flex-col md:flex-row items-center justify-between px-8 text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-12 gap-4 py-8 md:py-0">
        <div className="flex gap-6">
          <span>v3.4.0 (Stable)</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
            All Nodes Operational
          </span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand transition-colors">Terms</a>
          <a href="#" className="hover:text-brand transition-colors">DMCA</a>
          <span>&copy; 2024 T3DS UNBLOCKED</span>
        </div>
      </footer>

      {/* Game Modal / Viewer */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-zinc-950 p-4 md:p-8"
            id="game-modal"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-xl hover:bg-brand transition-all group border border-zinc-800"
                >
                  <X className="w-5 h-5 group-hover:text-white" />
                </button>
                <div>
                  <h2 className="text-xl md:text-3xl font-black tracking-tighter flex items-center gap-3">
                    {selectedGame.title}
                    <span className="text-[10px] font-black bg-brand px-3 py-1 rounded-full text-white uppercase tracking-widest shadow-lg shadow-brand/20">
                      {selectedGame.category}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-black uppercase rounded-xl transition-all shadow-lg">
                  <ExternalLink className="w-4 h-4 text-brand" />
                  <span className="hidden sm:inline">Launch Full</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-[10px] font-black uppercase rounded-xl hover:bg-brand/90 transition-all shadow-xl shadow-brand/20">
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Game Canvas / Iframe */}
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-[2rem] shadow-2xl relative overflow-hidden ring-4 ring-zinc-900/50">
               <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
                referrerPolicy="no-referrer"
               />
            </div>

            {/* Modal Controls / Description */}
            <div className="mt-8 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-zinc-500 text-sm max-w-2xl font-medium leading-relaxed">
                {selectedGame.description}
              </p>
              <div className="flex gap-8">
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Controller</span>
                   <span className="font-black text-brand uppercase tracking-tight">Standard KB</span>
                </div>
                <div className="w-px h-10 bg-zinc-800" />
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Status</span>
                   <span className="font-black text-emerald-500 uppercase tracking-tight flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                     Stable
                   </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
