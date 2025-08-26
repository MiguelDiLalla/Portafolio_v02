'use client';

import { EndlessScrollContainer } from '../EndlessScrollContainer';

export function HomePage() {
  const sections = [
    {
      title: "Welcome",
      subtitle: "To My Digital Space",
      content: "This is where creativity meets innovation in an endless journey of discovery.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Explore",
      subtitle: "Infinite Possibilities",
      content: "Navigate through my work, thoughts, and creative expressions in this unique digital experience.",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Connect",
      subtitle: "Beyond Boundaries",
      content: "Where traditional websites end, this experience begins. Scroll endlessly through curated content.",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Discover",
      subtitle: "New Dimensions",
      content: "Experience web design that breaks conventional patterns and creates immersive digital storytelling.",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Journey",
      subtitle: "Continues Here",
      content: "This circular experience ensures that every end is a new beginning in this infinite scroll.",
      color: "from-violet-500/20 to-purple-500/20"
    },
    {
      title: "Create",
      subtitle: "Without Limits",
      content: "Pushing the boundaries of what's possible in web design and user experience innovation.",
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "Inspire",
      subtitle: "Through Design",
      content: "Every pixel placed with intention, every interaction crafted to leave a lasting impression.",
      color: "from-teal-500/20 to-blue-500/20"
    },
    {
      title: "Innovate",
      subtitle: "Digital Experiences",
      content: "Combining cutting-edge technology with artistic vision to create memorable digital moments.",
      color: "from-rose-500/20 to-pink-500/20"
    }
  ];

  return (
    <EndlessScrollContainer direction="horizontal" speed={1}>
      {sections.map((section, index) => (
        <div
          key={index}
          className={`
            min-w-screen h-screen flex items-center justify-center
            bg-gradient-to-br ${section.color}
            relative
          `}
        >
          <div className="max-w-2xl mx-auto text-center px-8 md:px-16">
            <h1 className="font-title text-6xl md:text-8xl mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {section.title}
            </h1>
            <h2 className="font-title text-2xl md:text-3xl mb-8 text-muted-foreground">
              {section.subtitle}
            </h2>
            <p className="font-text text-lg md:text-xl leading-relaxed text-foreground/80">
              {section.content}
            </p>
          </div>
          
          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-2 h-2 bg-foreground/20 rounded-full
                  animate-pulse
                `}
                style={{
                  left: `${15 + (i * 10)}%`,
                  top: `${20 + ((i * 7) % 60)}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + (i * 0.2)}s`
                }}
              />
            ))}
          </div>

          {/* Section number indicator */}
          <div className="absolute bottom-8 right-8 text-6xl font-title text-foreground/10">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      ))}
    </EndlessScrollContainer>
  );
}