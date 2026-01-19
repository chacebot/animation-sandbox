import { useState, useEffect } from "react";

// Animation Component 1: Word-by-word fade
const WordFadeAnimation = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    const words = text.split(' ');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText(words.slice(0, currentIndex + 1).join(' '));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}{!isComplete && <span style={{ opacity: 1, animation: 'blink 1s infinite' }}>|</span>}</span>;
};

// Animation Component 2a: Letter-by-letter reveal (standard)
const LetterRevealAnimation = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    const letters = text.split('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < letters.length) {
        setDisplayedText(letters.slice(0, currentIndex + 1).join(''));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

// Animation Component 2b: Letter-by-letter with block reveal (wipe effect)
const BlockRevealAnimation = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [revealWidth, setRevealWidth] = useState(0);

  useEffect(() => {
    setRevealWidth(0);
    const totalLength = text.length;
    const interval = setInterval(() => {
      setRevealWidth((prev) => {
        const next = prev + (100 / totalLength);
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{text}</span>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${revealWidth}%`,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          color: '#ffffff',
        }}
      >
        {text}
      </span>
    </span>
  );
};

// Animation Component 2c: Letter-by-letter fade in
const LetterFadeAnimation = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const letters = text.split('');
  
  return (
    <span>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            opacity: 0,
            animation: `letterFade 0.4s ease-out ${index * (speed / 1000)}s forwards`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
      <style>{`
        @keyframes letterFade {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 2d: Letter-by-letter slide up
const LetterSlideAnimation = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const letters = text.split('');
  
  return (
    <span>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateY(10px)',
            animation: `letterSlide 0.5s ease-out ${index * (speed / 1000)}s forwards`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
      <style>{`
        @keyframes letterSlide {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 2e: Gradient block reveal (mask moves across)
const GradientBlockRevealAnimation = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const totalLength = text.length;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / totalLength);
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span
      style={{
        background: 'linear-gradient(90deg, #000000 0%, #000000 0%, transparent 0%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <span style={{ opacity: 0 }}>{text}</span>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: `linear-gradient(90deg, #ffffff 0%, #ffffff ${progress}%, transparent ${progress}%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          width: '100%',
          height: '100%',
        }}
      >
        {text}
      </span>
    </span>
  );
};

// Animation Component 2f: Block reveal with color background (mask moves left to right)
const ColoredBlockRevealAnimation = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [maskWidth, setMaskWidth] = useState(100);

  useEffect(() => {
    setMaskWidth(100);
    const totalLength = text.length;
    const interval = setInterval(() => {
      setMaskWidth((prev) => {
        const next = prev - (100 / totalLength);
        if (next <= 0) {
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span style={{ 
      position: 'relative', 
      display: 'inline-block',
      backgroundColor: '#000000',
    }}>
      <span style={{ 
        color: '#ffffff',
        position: 'relative',
        zIndex: 1,
      }}>{text}</span>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${maskWidth}%`,
          height: '100%',
          backgroundColor: '#000000',
          zIndex: 2,
          transition: 'width 0.01s linear',
        }}
      />
    </span>
  );
};

// Animation Component 2g: Letter-by-letter with typing cursor
const LetterTypewriterAnimation = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setShowCursor(true);
    const letters = text.split('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < letters.length) {
        setDisplayedText(letters.slice(0, currentIndex + 1).join(''));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      {showCursor && <span style={{ opacity: 1, animation: 'blink 1s infinite' }}>|</span>}
    </span>
  );
};

// Animation Component 3: Gradient sweep reveal
const GradientRevealAnimation = ({ text }: { text: string }) => {
  return (
    <span
      style={{
        background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 0%, rgba(255,255,255,0) 0%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradientReveal 2s ease-out forwards',
      }}
    >
      {text}
      <style>{`
        @keyframes gradientReveal {
          0% {
            background: linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          100% {
            background: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 4: Word-by-word slide up
const WordSlideAnimation = ({ text, speed = 60 }: { text: string; speed?: number }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateY(20px)',
            animation: `wordSlide 0.6s ease-out ${index * (speed / 1000)}s forwards`,
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
      <style>{`
        @keyframes wordSlide {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 5: Blur to clear
const BlurRevealAnimation = ({ text }: { text: string }) => {
  return (
    <span
      style={{
        filter: 'blur(10px)',
        opacity: 0,
        animation: 'blurReveal 1.5s ease-out forwards',
      }}
    >
      {text}
      <style>{`
        @keyframes blurReveal {
          to {
            filter: blur(0);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 6: Scale in words
const ScaleWordsAnimation = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            transform: 'scale(0)',
            animation: `scaleWord 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * (speed / 1000)}s forwards`,
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
      <style>{`
        @keyframes scaleWord {
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 7: Typewriter with cursor
const TypewriterAnimation = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setShowCursor(true);
    const chars = text.split('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayedText(chars.slice(0, currentIndex + 1).join(''));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      {showCursor && <span style={{ opacity: 1, animation: 'blink 1s infinite' }}>|</span>}
    </span>
  );
};

// Animation Component 8: Line-by-line reveal
const LineRevealAnimation = ({ text }: { text: string }) => {
  const lines = text.split('. ').filter(line => line.length > 0);
  return (
    <span>
      {lines.map((line, index) => (
        <span key={index}>
          <span
            style={{
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(10px)',
              animation: `lineReveal 0.8s ease-out ${index * 0.3}s forwards`,
            }}
          >
            {line}{index < lines.length - 1 ? '. ' : '.'}
          </span>
          {index < lines.length - 1 && <br />}
        </span>
      ))}
      <style>{`
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 9: Fade in words with stagger
const StaggerFadeAnimation = ({ text, speed = 40 }: { text: string; speed?: number }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            opacity: 0,
            animation: `fadeInWord 0.5s ease-out ${index * (speed / 1000)}s forwards`,
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
      <style>{`
        @keyframes fadeInWord {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 10: Split reveal (characters from sides)
const SplitRevealAnimation = ({ text }: { text: string }) => {
  const chars = text.split('');
  return (
    <span>
      {chars.map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            transform: `translateX(${index % 2 === 0 ? '-20px' : '20px'})`,
            opacity: 0,
            animation: `splitReveal 0.6s ease-out ${index * 0.05}s forwards`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <style>{`
        @keyframes splitReveal {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
};

// Animation Component 11: Steam Portfolio Style - Smooth letter reveal (inspired by steam-portfolio-demo.vercel.app)
const SteamPortfolioAnimation = ({ text, speed = 20 }: { text: string; speed?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const chars = text.split('');
  
  // Auto-trigger on mount for demo purposes (in real use, this would be scroll-triggered)
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span>
      {chars.map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.3s ease-out ${index * (speed / 1000)}s, transform 0.3s ease-out ${index * (speed / 1000)}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export const AnimationSandbox = () => {
  const sampleText = "With extreme practicality, I make crazy ideas real.";
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null);

  const animations = [
    // Letter-by-letter variations
    { id: 'letter-reveal', name: 'Letter-by-Letter (Standard)', component: LetterRevealAnimation, category: 'letter' },
    { id: 'block-reveal', name: 'Block Reveal (Wipe)', component: BlockRevealAnimation, category: 'letter' },
    { id: 'gradient-block-reveal', name: 'Gradient Block Reveal', component: GradientBlockRevealAnimation, category: 'letter' },
    { id: 'colored-block-reveal', name: 'Colored Block Wipe', component: ColoredBlockRevealAnimation, category: 'letter' },
    { id: 'letter-fade', name: 'Letter-by-Letter Fade', component: LetterFadeAnimation, category: 'letter' },
    { id: 'letter-slide', name: 'Letter-by-Letter Slide', component: LetterSlideAnimation, category: 'letter' },
    { id: 'letter-typewriter', name: 'Letter-by-Letter Typewriter', component: LetterTypewriterAnimation, category: 'letter' },
    { id: 'steam-portfolio', name: 'Steam Portfolio Style', component: SteamPortfolioAnimation, category: 'letter' },
    // Other animations
    { id: 'word-fade', name: 'Word-by-Word Fade', component: WordFadeAnimation, category: 'other' },
    { id: 'gradient', name: 'Gradient Sweep', component: GradientRevealAnimation, category: 'other' },
    { id: 'word-slide', name: 'Word Slide Up', component: WordSlideAnimation, category: 'other' },
    { id: 'blur', name: 'Blur to Clear', component: BlurRevealAnimation, category: 'other' },
    { id: 'scale', name: 'Scale Words', component: ScaleWordsAnimation, category: 'other' },
    { id: 'typewriter', name: 'Typewriter', component: TypewriterAnimation, category: 'other' },
    { id: 'line-reveal', name: 'Line-by-Line', component: LineRevealAnimation, category: 'other' },
    { id: 'stagger-fade', name: 'Staggered Fade', component: StaggerFadeAnimation, category: 'other' },
    { id: 'split', name: 'Split Reveal', component: SplitRevealAnimation, category: 'other' },
  ];

  return (
    <div style={{ padding: 0, backgroundColor: '#000000', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif' }}>
      <div style={{ 
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }}>
        <h1 style={{
          color: "#ffffff",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          marginBottom: "1rem",
          fontWeight: 400,
        }}>
          Letter-by-Letter Animation Variations
        </h1>
        <p style={{
          color: "#cccccc",
          fontSize: "1rem",
          marginBottom: "3rem",
          opacity: 0.7,
        }}>
          Explore different letter-by-letter reveal styles, including block/wipe effects
        </p>

        <h2 style={{
          color: "#ffffff",
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          marginTop: "3rem",
          fontWeight: 400,
          opacity: 0.9,
        }}>
          Letter-by-Letter Variations
        </h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem",
          marginBottom: "4rem",
        }}>
          {animations.filter(a => a.category === 'letter').map((anim) => {
            const Component = anim.component;
            return (
              <div
                key={anim.id}
                onClick={() => setSelectedAnimation(selectedAnimation === anim.id ? null : anim.id)}
                style={{
                  padding: "2rem",
                  border: selectedAnimation === anim.id ? "2px solid #ffffff" : "1px solid #1a1a1a",
                  backgroundColor: "#0a0a0a",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ffffff";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  if (selectedAnimation !== anim.id) {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                  }
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3 style={{
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                }}>
                  {anim.name}
                </h3>
                <p style={{
                  color: "#ffffff",
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                  minHeight: "60px",
                }}>
                  <Component text={sampleText} />
                </p>
                {selectedAnimation === anim.id && (
                  <div style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                  }}>
                    Selected: Use this animation
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h2 style={{
          color: "#ffffff",
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          marginTop: "3rem",
          fontWeight: 400,
          opacity: 0.9,
        }}>
          Other Animations
        </h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2rem",
          marginBottom: "4rem",
        }}>
          {animations.filter(a => a.category === 'other').map((anim) => {
            const Component = anim.component;
            return (
              <div
                key={anim.id}
                onClick={() => setSelectedAnimation(selectedAnimation === anim.id ? null : anim.id)}
                style={{
                  padding: "2rem",
                  border: selectedAnimation === anim.id ? "2px solid #ffffff" : "1px solid #1a1a1a",
                  backgroundColor: "#0a0a0a",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ffffff";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  if (selectedAnimation !== anim.id) {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                  }
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3 style={{
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  opacity: 0.7,
                }}>
                  {anim.name}
                </h3>
                <p style={{
                  color: "#ffffff",
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                  minHeight: "60px",
                }}>
                  <Component text={sampleText} />
                </p>
                {selectedAnimation === anim.id && (
                  <div style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                  }}>
                    Selected: Use this animation
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedAnimation && (
          <div style={{
            padding: "2rem",
            border: "1px solid #1a1a1a",
            backgroundColor: "#0a0a0a",
            marginTop: "2rem",
          }}>
            <h2 style={{
              color: "#ffffff",
              fontSize: "1.5rem",
              marginBottom: "1rem",
              fontWeight: 400,
            }}>
              Selected Animation: {animations.find(a => a.id === selectedAnimation)?.name}
            </h2>
            <p style={{
              color: "#cccccc",
              fontSize: "1rem",
              lineHeight: "1.8",
            }}>
              The animation ID is: <code style={{
                padding: "0.25rem 0.5rem",
                backgroundColor: "#1a1a1a",
                borderRadius: "4px",
                color: "#ffffff",
              }}>{selectedAnimation}</code>
            </p>
            <p style={{
              color: "#cccccc",
              fontSize: "1rem",
              marginTop: "1rem",
            }}>
              Copy the component code from the source files to use this animation in your project!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
