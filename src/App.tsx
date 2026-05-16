import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronRight, 
  FileText
} from 'lucide-react';
import { RULES_CONTENT } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ingame' | 'discord' | 'links'>('ingame');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'ingame', label: 'In-game Regels', icon: Shield },
    { id: 'discord', label: 'Discord Regels', icon: Users },
    { id: 'links', label: 'Discord Links', icon: ExternalLink },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-dark)]">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-[var(--color-bg-dark)]/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 diamond-gradient rounded-lg flex items-center justify-center diamond-glow">
                <Shield className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-display font-bold text-white tracking-wider">
                DIAMOND <span className="text-[var(--color-diamond)]">ROLEPLAY</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-slate-800 text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-slate-400 hover:text-white cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-[var(--color-bg-dark)] pt-24 px-4"
          >
            <div className="flex flex-col gap-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-4 rounded-xl flex items-center gap-4 text-lg cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-slate-800 text-[var(--color-diamond)] border border-slate-700' 
                        : 'text-slate-400 border border-transparent'
                    }`}
                  >
                    <Icon size={24} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'ingame' && (
              <section className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl uppercase tracking-tighter">In-game Regelgeving</h2>
                  <p className="text-slate-400 max-w-2xl">
                    Deze regels zijn van kracht binnen de Diamond Roleplay FiveM server. Het overtreden van deze regels kan leiden tot sancties.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {RULES_CONTENT.ingame.map((rule, idx) => (
                    <div key={idx} className="glass-card flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl text-[var(--color-diamond)]">{rule.title}</h3>
                        <FileText size={20} className="text-slate-600" />
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed flex-1">
                        {rule.description}
                      </p>
                      {rule.sanctions && (
                        <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Mogelijke Sancties</span>
                          <ul className="space-y-1">
                            {rule.sanctions.map((s, si) => (
                              <li key={si} className="text-xs text-slate-400 flex items-center gap-2">
                                <ChevronRight size={12} className="text-[var(--color-diamond)]" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'discord' && (
              <section className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl uppercase tracking-tighter">Discord Regels</h2>
                  <p className="text-slate-400 max-w-2xl">
                    Regels die van toepassing zijn op al onze officiële Discord kanalen om een gezonde community te waarborgen.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {RULES_CONTENT.discord.map((rule, idx) => (
                    <div key={idx} className="glass-card flex items-start gap-4">
                      <div className="p-3 bg-slate-800 rounded-lg shrink-0">
                        <Users size={24} className="text-[var(--color-diamond)]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg">{rule.title}</h3>
                        <p className="text-slate-400 text-sm">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'links' && (
              <section className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl uppercase tracking-tighter">Onze Discords</h2>
                  <p className="text-slate-400 max-w-2xl">
                    Join onze verschillende Discord servers om up-to-date te blijven met alles binnen Diamond Roleplay.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {RULES_CONTENT.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card group flex flex-col items-center gap-4 text-center py-10 hover:-translate-y-1 transition-transform"
                    >
                      <div className={`w-16 h-16 ${link.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <ExternalLink className="text-white" size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl mb-1">{link.name}</h3>
                        <p className="text-[10px] text-slate-500 font-mono">{link.url.replace('https://', '')}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-xs font-mono">
          DIAMOND ROLEPLAY &bull; {new Date().getFullYear()} &bull; WWW.DIAMOND-RP.NL
        </p>
      </footer>
    </div>
  );
}
