import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';

export default function PromptCard({ prompt }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation(); // prevent card click / routing when clicking copy
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCardClick = () => {
    navigate(`/prompt/${prompt.id}`);
  };

  return (
    <motion.div 
      className="glass-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Zoom hover effect wrapper */}
      <div className="card-img-wrapper" onClick={handleCardClick}>
        <img 
          src={prompt.afterImage} 
          alt={prompt.title} 
          className="card-img" 
          loading="lazy"
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          opacity: 0,
          transform: 'translateY(5px) scale(0.9)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none'
        }}
        className="card-hover-indicator"
        >
          <ExternalLink size={16} />
        </div>
      </div>

      {/* Styled card hover effect via external CSS trigger */}
      <style>{`
        .card-img-wrapper:hover .card-hover-indicator {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      <div className="card-content">
        <h3 className="card-title" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          {prompt.title}
        </h3>
        <p className="card-desc">
          {prompt.shortPrompt}
        </p>
        
        <div className="card-footer">
          <motion.button
            onClick={handleCopy}
            className={`btn btn-copy ${copied ? 'copied' : ''}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              width: '100%',
              marginTop: '0.5rem'
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Check size={14} />
                  <span>Copied! ✓</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Copy size={14} />
                  <span>Copy Prompt</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
