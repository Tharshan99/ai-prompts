import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Copy, Check, Info, Cpu } from 'lucide-react';
import { promptsData } from '../data/promptsData';
import ImageCompare from '../components/ImageCompare';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    // Find the prompt by ID
    const foundPrompt = promptsData.find(item => item.id === parseInt(id, 10));
    setPrompt(foundPrompt);
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!prompt) {
    return (
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#f3f4f6' }}>Prompt Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The prompt resource you are looking for does not exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Back to Gallery</span>
        </Link>
      </div>
    );
  }

  return (
    <motion.main 
      className="container" 
      style={{ flex: 1, padding: '3rem 1.5rem' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Back button link */}
      <div style={{ marginBottom: '2rem' }}>
        <motion.button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.9rem',
            borderRadius: '8px'
          }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft size={16} />
          <span>Back to Gallery</span>
        </motion.button>
      </div>

      <div className="detail-grid">
        {/* Left side - Drag Comparison Slider */}
        <div>
          <ImageCompare 
            beforeImage={prompt.beforeImage} 
            afterImage={prompt.afterImage} 
            title={prompt.title}
          />
        </div>

        {/* Right side - Information & Prompt text */}
        <div className="detail-info">
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-cyan)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem'
            }}>
              <Cpu size={14} />
              <span>Engineered Prompt Details</span>
            </div>
            
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              {prompt.title}
            </h1>
            
            <p className="subtitle" style={{ fontSize: '1rem', borderLeft: '3px solid var(--accent-violet)', paddingLeft: '1rem' }}>
              {prompt.shortPrompt}
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Info size={16} style={{ color: 'var(--accent-indigo)' }} />
              <span>Full Output Prompt</span>
            </h3>
            
            {/* Scannable Code Block Container */}
            <div className="code-container">
              <code className="code-text">
                {prompt.fullPrompt}
              </code>
            </div>

            {/* Large Easy-to-Click Copy Button */}
            <motion.button
              onClick={handleCopy}
              className={`btn btn-primary ${copied ? 'copied' : ''}`}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                marginTop: '1.5rem',
                background: copied ? 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-indigo) 100%)' : undefined,
                boxShadow: copied ? 'var(--glow-cyan)' : undefined
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                  >
                    <Check size={18} />
                    <span>Full Prompt Copied! ✓</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                  >
                    <Copy size={18} />
                    <span>Copy Full Prompt to Clipboard</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
