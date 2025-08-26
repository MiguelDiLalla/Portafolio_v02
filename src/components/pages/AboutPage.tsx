'use client';

import { EndlessScrollContainer } from '../EndlessScrollContainer';

export function AboutPage() {
  const aboutSections = [
    {
      title: "Philosophy",
      content: "I believe in creating digital experiences that transcend traditional boundaries and challenge conventional web design patterns.",
      icon: "🎯"
    },
    {
      title: "Vision",
      content: "To craft immersive web experiences that feel more like art installations than traditional websites.",
      icon: "👁️"
    },
    {
      title: "Approach",
      content: "Every project is an opportunity to experiment with new interaction patterns and push the limits of web technology.",
      icon: "🚀"
    },
    {
      title: "Mission",
      content: "Creating memorable digital moments that leave lasting impressions through innovative design and development.",
      icon: "✨"
    },
    {
      title: "Values",
      content: "Innovation, creativity, and user experience are at the core of everything I create and contribute to.",
      icon: "💎"
    },
    {
      title: "Principles",
      content: "Design with purpose, develop with precision, and always prioritize the human experience behind the screen.",
      icon: "⚡"
    },
    {
      title: "Process",
      content: "From concept to creation, every step is guided by curiosity, collaboration, and commitment to excellence.",
      icon: "🔄"
    },
    {
      title: "Purpose",
      content: "To bridge the gap between imagination and reality through thoughtful, innovative digital craftsmanship.",
      icon: "🌟"
    },
    {
      title: "Passion",
      content: "Driven by the endless possibilities that emerge when technology meets creativity and human-centered design.",
      icon: "❤️"
    }
  ];

  return (
    <EndlessScrollContainer direction="diagonal" angle={30} speed={0.8}>
      {aboutSections.map((section, index) => (
        <div
          key={index}
          className={`
            w-screen h-screen flex items-center justify-center
            relative
          `}
          style={{
            background: `linear-gradient(${135 + (index * 25)}deg, 
              hsl(${220 + (index * 30)}, 70%, 95%) 0%, 
              hsl(${180 + (index * 40)}, 60%, 98%) 100%)`
          }}
        >
          <div className="max-w-xl text-center p-8">
            <div className="text-6xl mb-6">{section.icon}</div>
            <h2 className="font-title text-4xl mb-6">{section.title}</h2>
            <p className="font-text text-lg leading-relaxed text-foreground/70">
              {section.content}
            </p>
          </div>
          
          {/* Diagonal grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(30deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%),
                  linear-gradient(-30deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Floating philosophical symbols */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute text-2xl opacity-20 animate-float
                `}
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${25 + (i * 12)}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + (i * 0.5)}s`
                }}
              >
                {['∞', '◊', '△', '○', '◈'][i]}
              </div>
            ))}
          </div>

          {/* Section progress indicator */}
          <div className="absolute top-8 left-8 flex items-center gap-2">
            {aboutSections.map((_, i) => (
              <div
                key={i}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${i === index ? 'bg-foreground/60 scale-125' : 'bg-foreground/20'}
                `}
              />
            ))}
          </div>
        </div>
      ))}
    </EndlessScrollContainer>
  );
}