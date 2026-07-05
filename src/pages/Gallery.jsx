import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { promptsData } from '../data/promptsData';
import PromptCard from '../components/PromptCard';

const ITEMS_PER_PAGE = 6;

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter prompts based on search query
  const filteredPrompts = useMemo(() => {
    const filtered = promptsData.filter(prompt => 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.shortPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.fullPrompt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Sort by id descending so latest prompts appear first
    return [...filtered].sort((a, b) => b.id - a.id);
  }, [searchQuery]);

  // Handle page resets when query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPrompts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPrompts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPrompts, currentPage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <main className="container" style={{ flex: 1, paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '50px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            color: '#c084fc',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1rem',
            boxShadow: 'var(--glow-violet)'
          }}
        >
          <Sparkles size={14} />
          <span>Curated AI Generation Library</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Master the Art of <span className="text-gradient">Prompt Engineering</span>
        </motion.h1>
        
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover and copy highly optimized, production-ready prompts. Explore comparisons showing raw input concepts side-by-side with final high-fidelity AI render outputs.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            marginTop: '1.5rem'
          }}
        >
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder="Search prompts (e.g. Ghibli, 3D, Cyberpunk)..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'var(--transition-smooth)',
              fontFamily: 'var(--font-sans)',
              boxShadow: 'var(--shadow-sm)'
            }}
            className="search-input"
          />
          <style>{`
            .search-input:focus {
              border-color: var(--accent-indigo);
              background: rgba(255, 255, 255, 0.05);
              box-shadow: var(--glow-indigo);
            }
          `}</style>
        </motion.div>
      </section>

      {/* Grid of Prompt Cards */}
      <motion.div 
        className="gallery-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {paginatedPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPrompts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '4rem 0',
            color: 'var(--text-secondary)'
          }}
        >
          <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>No prompts matching your search query.</p>
          <button 
            className="btn btn-secondary"
            onClick={() => setSearchQuery('')}
            style={{ marginTop: '1rem' }}
          >
            Clear Search
          </button>
        </motion.div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            aria-label="Previous page"
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button 
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      )}
    </main>
  );
}
