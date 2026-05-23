import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Add to trail
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { ...newPosition, id: trailId++ }];
        return newTrail.slice(-8); // Keep only last 8 positions
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"], .cursor-pointer');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9990] transition-opacity duration-500"
          style={{
            transform: `translate(${point.x - 2}px, ${point.y - 2}px)`,
            opacity: (index + 1) / trail.length * 0.5,
          }}
        >
          <div 
            className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-green-400"
            style={{
              transform: `scale(${(index + 1) / trail.length})`,
            }}
          />
        </div>
      ))}

      {/* Main cursor - Enhanced Finance Robot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
        }}
      >
        <div className={`relative transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}>
          {/* Robot Body */}
          <div className={`w-10 h-10 rounded-2xl relative transition-all duration-300 ${
            isHovering 
              ? 'bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 shadow-2xl animate-pulse' 
              : 'bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 shadow-lg'
          }`}>
            {/* Robot Face Container */}
            <div className="absolute inset-1 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
              {/* Eyes */}
              <div className={`absolute top-1.5 left-1.5 w-1 h-1 bg-white rounded-full transition-all duration-300 ${
                isHovering ? 'animate-pulse bg-yellow-300' : ''
              }`}></div>
              <div className={`absolute top-1.5 right-1.5 w-1 h-1 bg-white rounded-full transition-all duration-300 ${
                isHovering ? 'animate-pulse bg-yellow-300' : ''
              }`}></div>
              
              {/* Mouth */}
              <div className={`absolute bottom-1.5 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                isHovering 
                  ? 'w-2 h-0.5 bg-yellow-300 rounded-full animate-pulse' 
                  : 'w-1.5 h-0.5 bg-white/80 rounded-full'
              }`}></div>
              
              {/* Dollar sign when hovering */}
              {isHovering && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-yellow-300 text-xs font-bold animate-bounce">$</span>
                </div>
              )}
            </div>
            
            {/* Robot Antenna */}
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-1.5 bg-gradient-to-t from-blue-400 to-green-400"></div>
              <div className={`w-0.5 h-0.5 bg-green-400 rounded-full transition-all duration-300 ${
                isHovering ? 'animate-ping bg-yellow-400' : ''
              }`}></div>
            </div>
            
            {/* Robot Arms */}
            <div className="absolute -left-0.5 top-2 w-1 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
            <div className="absolute -right-0.5 top-2 w-1 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            
            {/* Robot Legs */}
            <div className="absolute -bottom-0.5 left-1 w-0.5 h-1 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
            <div className="absolute -bottom-0.5 right-1 w-0.5 h-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
          </div>
          
          {/* Hover Ring */}
          {isHovering && (
            <div className="absolute inset-0 border border-blue-400 rounded-2xl animate-pulse opacity-60 scale-125"></div>
          )}
          
          {/* Click Effect */}
          {isClicking && (
            <div className="absolute inset-0 border-2 border-green-400 rounded-2xl animate-ping"></div>
          )}
        </div>
      </div>

      {/* Finance-themed floating elements when hovering */}
      {isHovering && (
        <>
          <div
            className="fixed top-0 left-0 pointer-events-none z-[9995] animate-bounce"
            style={{
              transform: `translate(${mousePosition.x + 25}px, ${mousePosition.y - 25}px)`,
            }}
          >
          </div>
          <div
            className="fixed top-0 left-0 pointer-events-none z-[9995] animate-bounce"
            style={{
              transform: `translate(${mousePosition.x - 30}px, ${mousePosition.y + 20}px)`,
              animationDelay: '0.1s'
            }}
          >
            {/* <span className="text-blue-500 text-sm font-bold opacity-70 animate-pulse">📈</span> */}
          </div>
          <div
            className="fixed top-0 left-0 pointer-events-none z-[9995] animate-bounce"
            style={{
              transform: `translate(${mousePosition.x + 15}px, ${mousePosition.y + 25}px)`,
              animationDelay: '0.2s'
            }}
          >
            {/* <span className="text-purple-500 text-sm font-bold opacity-70 animate-pulse">🏠</span> */}
          </div>
        </>
      )}

      {/* Ambient glow effect */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9988] transition-all duration-300"
        style={{
          transform: `translate(${mousePosition.x - 50}px, ${mousePosition.y - 50}px)`,
        }}
      >
        <div className={`w-24 h-24 rounded-full transition-all duration-300 ${
          isHovering 
            ? 'bg-gradient-to-r from-blue-400/20 to-green-400/20 blur-xl animate-pulse' 
            : 'bg-gradient-to-r from-blue-600/10 to-green-600/10 blur-lg'
        }`}></div>
      </div>
    </>
  );
};

export default CustomCursor;