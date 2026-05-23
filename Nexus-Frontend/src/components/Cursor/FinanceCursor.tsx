// import React, { useEffect, useState } from 'react';

// const FinanceCursor = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);
//   const [isClicking, setIsClicking] = useState(false);
//   const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

//   useEffect(() => {
//     let trailId = 0;

//     const updateMousePosition = (e: MouseEvent) => {
//       const newPosition = { x: e.clientX, y: e.clientY };
//       setMousePosition(newPosition);
      
//       // Add to trail
//       setTrail(prevTrail => {
//         const newTrail = [...prevTrail, { ...newPosition, id: trailId++ }];
//         return newTrail.slice(-12); // Keep only last 12 positions
//       });
//     };

//     const handleMouseDown = () => setIsClicking(true);
//     const handleMouseUp = () => setIsClicking(false);

//     const handleMouseEnter = () => setIsHovering(true);
//     const handleMouseLeave = () => setIsHovering(false);

//     // Add event listeners
//     window.addEventListener('mousemove', updateMousePosition);
//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
    
//     // Add hover effects for interactive elements
//     const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"], .cursor-pointer');
//     interactiveElements.forEach(element => {
//       element.addEventListener('mouseenter', handleMouseEnter);
//       element.addEventListener('mouseleave', handleMouseLeave);
//     });

//     return () => {
//       window.removeEventListener('mousemove', updateMousePosition);
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//       interactiveElements.forEach(element => {
//         element.removeEventListener('mouseenter', handleMouseEnter);
//         element.removeEventListener('mouseleave', handleMouseLeave);
//       });
//     };
//   }, []);

//   return (
//     <>
//       {/* Trail particles */}
//       {trail.map((point, index) => (
//         <div
//           key={point.id}
//           className="fixed top-0 left-0 pointer-events-none z-[9990] transition-opacity duration-700"
//           style={{
//             transform: `translate(${point.x - 3}px, ${point.y - 3}px)`,
//             opacity: (index + 1) / trail.length * 0.6,
//           }}
//         >
//           <div 
//             className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 animate-pulse"
//             style={{
//               transform: `scale(${(index + 1) / trail.length})`,
//             }}
//           />
//         </div>
//       ))}

//       {/* Main cursor - Enhanced Finance Robot */}
//       <div
//         className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-150 ease-out"
//         style={{
//           transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px)`,
//         }}
//       >
//         <div className={`relative transition-all duration-300 ${
//           isHovering ? 'scale-150' : 'scale-100'
//         } ${isClicking ? 'scale-75' : ''}`}>
//           {/* Robot Body */}
//           <div className={`w-12 h-12 rounded-3xl relative transition-all duration-300 ${
//             isHovering 
//               ? 'bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 shadow-2xl animate-pulse' 
//               : 'bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 shadow-xl'
//           }`}>
//             {/* Robot Face Container */}
//             <div className="absolute inset-1 bg-white/25 rounded-2xl backdrop-blur-sm border border-white/40">
//               {/* Eyes */}
//               <div className={`absolute top-2 left-2 w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${
//                 isHovering ? 'animate-pulse bg-yellow-300 shadow-lg' : ''
//               }`}></div>
//               <div className={`absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${
//                 isHovering ? 'animate-pulse bg-yellow-300 shadow-lg' : ''
//               }`}></div>
              
//               {/* Mouth */}
//               <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
//                 isHovering 
//                   ? 'w-3 h-1 bg-yellow-300 rounded-full animate-pulse shadow-lg' 
//                   : 'w-2 h-0.5 bg-white/90 rounded-full'
//               }`}></div>
              
//               {/* Dollar sign when hovering */}
//               {isHovering && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="text-yellow-300 text-sm font-bold animate-bounce drop-shadow-lg">$</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Robot Antenna */}
//             <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
//               <div className="w-0.5 h-2 bg-gradient-to-t from-blue-400 to-green-400"></div>
//               <div className={`w-1 h-1 bg-green-400 rounded-full transition-all duration-300 ${
//                 isHovering ? 'animate-ping bg-yellow-400 shadow-lg' : ''
//               }`}></div>
//             </div>
            
//             {/* Robot Arms */}
//             <div className="absolute -left-1 top-3 w-1.5 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
//             <div className="absolute -right-1 top-3 w-1.5 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            
//             {/* Robot Legs */}
//             <div className="absolute -bottom-1 left-2 w-0.5 h-1.5 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
//             <div className="absolute -bottom-1 right-2 w-0.5 h-1.5 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
//           </div>
          
//           {/* Hover Ring */}
//           {isHovering && (
//             <div className="absolute inset-0 border-2 border-blue-400 rounded-3xl animate-pulse opacity-70 scale-125 shadow-lg"></div>
//           )}
          
//           {/* Click Effect */}
//           {isClicking && (
//             <div className="absolute inset-0 border-3 border-green-400 rounded-3xl animate-ping shadow-xl"></div>
//           )}
//         </div>
//       </div>

//       {/* Finance-themed floating elements when hovering */}
//       {isHovering && (
//         <>
//           <div
//             className="fixed top-0 left-0 pointer-events-none z-[9995] animate-bounce"
//             style={{
//               transform: `translate(${mousePosition.x + 30}px, ${mousePosition.y - 30}px)`,
//             }}
//           >
//             {/* <span className="text-green-500 text-lg font-bold opacity-80 animate-pulse drop-shadow-lg">💰</span> */}
//           </div>
//           <div
//             className="fixed top-0 left-0 pointer-events-none z-[9995] animate-bounce"
//             style={{
//               transform: `translate(${mousePosition.x - 35}px, ${mousePosition.y + 25}px)`,
//               animationDelay: '0.1s'
//             }}
//           >
//             {/* <span className="text-blue-500 text-lg font-bold opacity-80 animate-pulse drop-shadow-lg">📈</span> */}
//           </div>
//           <div
//             className="fixed top-0 left-0 pointer-events-none z-[9995] animate-bounce"
//             style={{
//               transform: `translate(${mousePosition.x + 20}px, ${mousePosition.y + 30}px)`,
//               animationDelay: '0.2s'
//             }}
//           >
//             {/* <span className="text-purple-500 text-lg font-bold opacity-80 animate-pulse drop-shadow-lg">🏠</span> */}
//           </div>
//           <div
//             className="fixed top-0 left-0 pointer-events-none z-[9995] animate-bounce"
//             style={{
//               transform: `translate(${mousePosition.x - 25}px, ${mousePosition.y - 20}px)`,
//               animationDelay: '0.3s'
//             }}
//           >
//             {/* <span className="text-orange-500 text-lg font-bold opacity-80 animate-pulse drop-shadow-lg">🚗</span> */}
//           </div>
//         </>
//       )}

//       {/* Ambient glow effect */}
//       <div
//         className="fixed top-0 left-0 pointer-events-none z-[9988] transition-all duration-300"
//         style={{
//           transform: `translate(${mousePosition.x - 60}px, ${mousePosition.y - 60}px)`,
//         }}
//       >
//         <div className={`w-32 h-32 rounded-full transition-all duration-300 ${
//           isHovering 
//             ? 'bg-gradient-to-r from-blue-400/30 to-green-400/30 blur-2xl animate-pulse' 
//             : 'bg-gradient-to-r from-blue-600/15 to-green-600/15 blur-xl'
//         }`}></div>
//       </div>

//       {/* Secondary glow ring */}
//       <div
//         className="fixed top-0 left-0 pointer-events-none z-[9987] transition-all duration-500"
//         style={{
//           transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`,
//         }}
//       >
//         <div className={`w-20 h-20 rounded-full transition-all duration-500 ${
//           isHovering 
//             ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-lg animate-pulse' 
//             : 'bg-gradient-to-r from-green-600/10 to-blue-600/10 blur-md'
//         }`}></div>
//       </div>
//     </>
//   );
// };

// export default FinanceCursor;

import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

// --- Custom Finance Cursor Component ---
const FinanceCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);

  // Persistent ID tracker for trail coins
  const trailIdRef = useRef(0);
  const timeoutRef = useRef(null); // Ref to store the timeout ID

  // React Spring for smooth animations
  const cursorSpring = useSpring({
    x: mousePosition.x - 12,
    y: mousePosition.y - 12,
    config: config.stiff,
  });

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Clear the previous timeout and set a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setTrail([]);
      }, 300); // Clear trail after 300ms of no movement

      // Add a coin every few pixels of movement
      setTrail(prevTrail => {
        if (
          prevTrail.length === 0 ||
          Math.abs(newPosition.x - prevTrail[prevTrail.length - 1].x) > 15 ||
          Math.abs(newPosition.y - prevTrail[prevTrail.length - 1].y) > 15
        ) {
          const newTrail = [
            ...prevTrail,
            { ...newPosition, id: trailIdRef.current++ }
          ];
          return newTrail.slice(-15); // Keep only last 15 coins
        }
        return prevTrail;
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], .cursor-pointer'
    );
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Coin trail */}
      {trail.map((point, index) => (
        <animated.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9990] transition-opacity duration-700"
          style={{
            transform: `translate(${point.x}px, ${point.y}px)`,
            opacity: (index + 1) / trail.length,
          }}
        >
          <div
            className="text-lg animate-fade-out"
            style={{
              animationDelay: `${index * 50}ms`,
              transform: `translate(-50%, -50%) scale(${(index + 1) / trail.length})`,
              opacity: `${(index + 1) / trail.length}`,
            }}
          >
            $
          </div>
        </animated.div>
      ))}

      {/* Main cursor */}
      <animated.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: cursorSpring.x.to(x => `translate(${x}px, ${cursorSpring.y.get()}px)`),
        }}
      >
        <div
          className={`relative transition-all duration-300 ${
            isHovering ? 'scale-150' : 'scale-100'
          } ${isClicking ? 'scale-75' : ''}`}
        >
          <span
            className={`text-2xl font-bold text-transparent bg-clip-text transition-all duration-300 ${
              isHovering
                ? 'bg-gradient-to-r from-green-400 to-lime-400'
                : 'bg-gradient-to-r from-blue-400 to-green-500'
            } ${isClicking ? 'animate-ping' : ''}`}
          >
            $
          </span>
        </div>
      </animated.div>

      {/* Glow effects */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9988] transition-all duration-300"
        style={{
          transform: `translate(${mousePosition.x - 60}px, ${mousePosition.y - 60}px)`,
        }}
      >
        <div
          className={`w-32 h-32 rounded-full transition-all duration-300 ${
            isHovering
              ? 'bg-gradient-to-r from-blue-400/30 to-green-400/30 blur-2xl animate-pulse'
              : 'bg-gradient-to-r from-blue-600/15 to-green-600/15 blur-xl'
          }`}
        />
      </div>

      <div
        className="fixed top-0 left-0 pointer-events-none z-[9987] transition-all duration-500"
        style={{
          transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`,
        }}
      >
        <div
          className={`w-20 h-20 rounded-full transition-all duration-500 ${
            isHovering
              ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-lg animate-pulse'
              : 'bg-gradient-to-r from-green-600/10 to-blue-600/10 blur-md'
          }`}
        />
      </div>
    </>
  );
};

export default FinanceCursor;
