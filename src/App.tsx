/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { catalogData } from './data';
import { Search, ExternalLink, Package, Filter, ChevronDown, ChevronUp, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactGA from "react-ga4";

// Initialize GA4 - REPLACE 'G-XXXXXXXXXX' WITH YOUR ACTUAL MEASUREMENT ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Initialize GA4 and track initial pageview
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  // Track search terms (debounced to avoid spamming events while typing)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        ReactGA.event({
          category: "Search",
          action: "Search Term",
          label: searchTerm,
        });
      }
    }, 2000); // Wait 2 seconds after typing stops

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(catalogData.map((item) => item.categoria));
    return ['Todos', ...Array.from(cats).sort()];
  }, []);

  // Filter logic
  const filteredData = useMemo(() => {
    return catalogData.filter((item) => {
      const matchesSearch =
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (searchTerm) {
        return matchesSearch;
      }

      const matchesCategory =
        selectedCategory === 'Todos' || item.categoria === selectedCategory;

      return matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setIsCategoryMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track category selection
    ReactGA.event({
      category: "Navigation",
      action: "Select Category",
      label: category,
    });
  };

  const handleProductClick = (productName: string, category: string) => {
    ReactGA.event({
      category: "Product",
      action: "Click Product",
      label: productName,
      // Custom dimension or metric can be added here if configured in GA4
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-[#1767ae]/20 selection:text-[#1767ae]">
      {/* Sticky Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Logo & Mobile Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.reload()}>
                <img 
                  src="https://images.tcdn.com.br/files/1357340/themes/65/img/settings/E-commerce.png?1c3e1d532ad395d0887b32bd8aab78c5" 
                  alt="Ionlab Logo" 
                  className="h-10 md:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className={`md:hidden p-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
                  isCategoryMenuOpen || selectedCategory !== 'Todos'
                    ? 'bg-[#1767ae] text-white shadow-md shadow-blue-500/20' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {/* Search Bar & Desktop Filter */}
            <div className="flex items-center gap-3 w-full md:max-w-2xl">
              <div className="relative flex-grow group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#1767ae] transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder="O que você procura hoje?"
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-[#1767ae]/20 focus:border-[#1767ae] transition-all duration-300 outline-none text-sm md:text-base shadow-sm group-hover:bg-white group-hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />

                {/* Autocomplete Dropdown */}
                <AnimatePresence>
                  {isSearchFocused && searchTerm.length > 0 && filteredData.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto custom-scrollbar"
                    >
                      {filteredData.slice(0, 6).map((item) => (
                        <a
                          key={item.nome}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleProductClick(item.nome, item.categoria)}
                          className="flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group/item"
                        >
                          <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100">
                            {item.imagem ? (
                              <img
                                src={item.imagem}
                                alt={item.nome}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-slate-300" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-slate-700 truncate group-hover/item:text-[#1767ae] transition-colors">{item.nome}</span>
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">{item.categoria}</span>
                          </div>
                        </a>
                      ))}
                      {filteredData.length > 6 && (
                         <div className="p-3 text-center bg-slate-50 text-xs font-medium text-slate-500">
                           E mais {filteredData.length - 6} resultados...
                         </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Filter Button */}
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className={`hidden md:flex items-center gap-2.5 px-6 py-3 rounded-2xl font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${
                  isCategoryMenuOpen || selectedCategory !== 'Todos'
                    ? 'bg-[#1767ae] text-white border border-transparent shadow-[#1767ae]/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1767ae] hover:text-[#1767ae]'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span className="max-w-[120px] truncate">{selectedCategory === 'Todos' ? 'Categorias' : selectedCategory}</span>
                {isCategoryMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Category Panel (Mega Menu) */}
        <AnimatePresence>
          {isCategoryMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl z-40"
            >
              <div className="container mx-auto px-4 py-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-[#1767ae]">
                      <Filter className="h-5 w-5" />
                    </div>
                    Navegar por Categorias
                  </h3>
                  <button 
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                        selectedCategory === cat
                          ? 'bg-[#1767ae] text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-50 text-slate-600 hover:bg-white hover:text-[#1767ae] hover:shadow-md hover:ring-1 hover:ring-[#1767ae]/20'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {selectedCategory === cat && <ArrowRight className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Results Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              {searchTerm ? 'Resultados da busca' : selectedCategory}
            </h1>
            <p className="text-slate-500 text-lg">
              {searchTerm 
                ? `Encontramos ${filteredData.length} resultados para "${searchTerm}"`
                : 'Explore nossa linha completa de equipamentos laboratoriais'
              }
            </p>
          </div>
          <div className="text-sm font-medium text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
            {filteredData.length} itens mostrados
          </div>
        </div>

        {/* Product Grid */}
        {filteredData.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item) => (
                <motion.a
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={item.nome}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleProductClick(item.nome, item.categoria)}
                  className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 border border-slate-100 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
                >
                  {/* Image Container - Vertical Catalog Style */}
                  <div className="aspect-square w-full bg-slate-50 relative overflow-hidden p-6 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1767ae_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {item.imagem ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Shadow for the document feel */}
                        <div className="absolute inset-4 bg-black/20 blur-xl rounded-lg transform translate-y-4 scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img 
                          src={item.imagem} 
                          alt={item.nome}
                          className="relative z-10 max-w-full max-h-full object-contain shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-500 rounded-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                         <Package className="h-10 w-10 text-slate-300 group-hover:text-[#1767ae] transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow bg-white relative z-20">
                    <div className="mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1767ae] border border-blue-100/50">
                        {item.categoria}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-[#1767ae] transition-colors mb-4 line-clamp-3">
                      {item.nome}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between group/btn">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
                        Ver Detalhes
                      </span>
                      <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1767ae] group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="bg-slate-50 p-6 rounded-full mb-6 animate-bounce">
              <Search className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-slate-500 max-w-md mb-8 text-lg">
              Não encontramos resultados para sua busca. Tente termos mais genéricos ou navegue pelas categorias.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
              }}
              className="px-8 py-3 bg-[#1767ae] text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Limpar todos os filtros
            </button>
          </motion.div>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              <img 
                src="https://images.tcdn.com.br/files/1357340/themes/65/img/settings/E-commerce.png?1c3e1d532ad395d0887b32bd8aab78c5" 
                alt="Ionlab Logo" 
                className="h-8 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              © {new Date().getFullYear()} Ionlab. Tecnologia para Laboratórios.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

