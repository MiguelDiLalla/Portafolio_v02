'use client';

import { EndlessScrollContainer } from '../EndlessScrollContainer';

export function ContactPage() {
  const contactMethods = [
    {
      title: "Email",
      value: "hello@example.com",
      description: "For project inquiries and collaborations",
      icon: "📧",
      action: "Send Message"
    },
    {
      title: "Social",
      value: "@username",
      description: "Follow my creative process and updates",
      icon: "🌐",
      action: "Follow"
    },
    {
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Available for urgent project discussions",
      icon: "📱",
      action: "Call Now"
    },
    {
      title: "Location",
      value: "San Francisco, CA",
      description: "Available for local meetings and events",
      icon: "📍",
      action: "Get Directions"
    },
    {
      title: "Schedule",
      value: "Book a Call",
      description: "Let's discuss your next innovative project",
      icon: "📅",
      action: "Schedule"
    },
    {
      title: "Portfolio",
      value: "View My Work",
      description: "Explore my latest projects and case studies",
      icon: "💼",
      action: "Browse"
    },
    {
      title: "LinkedIn",
      value: "Professional Network",
      description: "Connect with me on LinkedIn for business opportunities",
      icon: "👔",
      action: "Connect"
    },
    {
      title: "GitHub",
      value: "Code Repository",
      description: "Check out my open source contributions and projects",
      icon: "💻",
      action: "Explore Code"
    },
    {
      title: "Newsletter",
      value: "Stay Updated",
      description: "Get insights on design trends and development tips",
      icon: "📮",
      action: "Subscribe"
    }
  ];

  return (
    <EndlessScrollContainer direction="diagonal" angle={15} speed={0.9}>
      {contactMethods.map((method, index) => (
        <div
          key={index}
          className={`
            min-w-screen h-screen flex items-center justify-center
            relative
          `}
          style={{
            background: `radial-gradient(circle at ${50 + (index * 8)}% ${30 + (index * 10)}%, 
              hsl(${280 + (index * 20)}, 60%, 95%) 0%, 
              hsl(${300 + (index * 25)}, 40%, 98%) 70%)`
          }}
        >
          <div className="text-center max-w-md mx-auto px-8">
            <div className="text-8xl mb-8">{method.icon}</div>
            <h2 className="font-title text-4xl mb-4">{method.title}</h2>
            <div className="text-2xl mb-4 bg-white/30 backdrop-blur-sm rounded-full py-3 px-6 border border-white/40 font-text">
              {method.value}
            </div>
            <p className="font-text text-lg text-foreground/70 mb-6">
              {method.description}
            </p>
            <button className="bg-foreground/10 hover:bg-foreground/20 backdrop-blur-sm border border-foreground/20 rounded-full px-6 py-3 font-title transition-all duration-300 hover:scale-105">
              {method.action}
            </button>
          </div>
          
          {/* Contact form elements floating in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute bg-white/20 backdrop-blur-sm rounded-lg
                  ${i % 3 === 0 ? 'w-32 h-8' : i % 3 === 1 ? 'w-24 h-24 rounded-full' : 'w-40 h-6'}
                  animate-float
                `}
                style={{
                  left: `${5 + (i * 15)}%`,
                  top: `${15 + (i * 12)}%`,
                  transform: `rotate(${i * 12}deg)`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + (i * 0.3)}s`
                }}
              />
            ))}
          </div>

          {/* Connection lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line 
                x1={`${10 + (index * 10)}%`} 
                y1={`${20 + (index * 8)}%`} 
                x2={`${80 - (index * 5)}%`} 
                y2={`${70 + (index * 5)}%`} 
                stroke="url(#lineGradient)" 
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Contact method indicator */}
          <div className="absolute bottom-8 left-8 font-title text-sm text-foreground/40">
            {String(index + 1).padStart(2, '0')} / {String(contactMethods.length).padStart(2, '0')}
          </div>
        </div>
      ))}
    </EndlessScrollContainer>
  );
}