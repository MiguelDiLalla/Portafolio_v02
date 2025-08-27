'use client';

import { EndlessScrollContainer } from '../EndlessScrollContainer';
import { useUI } from '../../contexts/UIContext';

export function WorkPage() {
  const { openAltFrame } = useUI();
  const projects = [
    {
      title: 'Infinite Gallery',
      description:
        'An endless scrolling art gallery that breaks the boundaries of traditional portfolios.',
      tech: ['React', 'Motion', 'WebGL'],
      gradient: 'from-rose-400 to-orange-300',
    },
    {
      title: 'Fluid Navigation',
      description:
        'Revolutionary navigation system that adapts to user behavior and content flow.',
      tech: ['TypeScript', 'CSS3', 'Intersection Observer'],
      gradient: 'from-blue-400 to-purple-300',
    },
    {
      title: 'Immersive Stories',
      description:
        'Interactive storytelling platform with gesture-based navigation and spatial audio.',
      tech: ['Three.js', 'Web Audio API', 'Canvas'],
      gradient: 'from-green-400 to-cyan-300',
    },
    {
      title: 'Dynamic Layouts',
      description:
        'Self-organizing content system that creates unique layouts based on user interaction patterns.',
      tech: ['Machine Learning', 'D3.js', 'React'],
      gradient: 'from-purple-400 to-pink-300',
    },
    {
      title: 'Spatial Interface',
      description:
        '3D web interface that responds to device orientation and creates immersive browsing experiences.',
      tech: ['WebXR', 'Motion Sensors', 'Spatial Audio'],
      gradient: 'from-yellow-400 to-red-300',
    },
  ];

  return (
    <EndlessScrollContainer direction="vertical" speed={1.2}>
      {projects.map((project, index) => (
        <div
          key={index}
          className={`
            w-screen h-screen flex items-center justify-center
            bg-gradient-to-br ${project.gradient}
            relative
          `}
        >
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center px-8">
            <div>
              <h2 className="text-5xl mb-6">{project.title}</h2>
              <p className="text-xl mb-8 leading-relaxed text-foreground/80">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Project preview mockup */}
              <div
                className="aspect-video bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 cursor-pointer"
                onClick={() =>
                  openAltFrame({
                    title: project.title,
                    node: (
                      <div>
                        <h2 className="text-2xl mb-4">{project.title}</h2>
                        <p>{project.description}</p>
                      </div>
                    ),
                  })
                }
              >
                <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/40 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 bg-current rounded-full animate-pulse" />
                    </div>
                    <div className="text-sm opacity-70">
                      Interactive Preview
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute w-4 h-4 bg-white/30 rounded-full
                    animate-bounce
                  `}
                  style={{
                    right: `${-10 + i * 20}px`,
                    top: `${20 + i * 30}px`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </EndlessScrollContainer>
  );
}
