// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function CoverPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     if (user) {
//       navigate("/countries");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center text-white flex flex-col justify-between"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1502920917128-1aa500764ce2?auto=format&fit=crop&w=1950&q=80')",
//       }}
//     >
//       {/* Navbar */}
//       <div className="flex justify-between items-center px-8 py-6 bg-black bg-opacity-50">
//         <h1 className="text-3xl font-bold">🌍 Country Explorer</h1>
//         <div className="space-x-4">
//           <Link to="/login" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Sign In</Link>
//           <Link to="/signup" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Sign Up</Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="text-center px-4 mb-20">
//         <h2 className="text-5xl font-bold mb-6">Explore Countries Around the World</h2>
//         <p className="text-xl mb-8">Search, filter, and discover details about every nation.</p>
//         <button
//           onClick={handleGetStarted}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded text-lg shadow"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CoverPage;



// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function CoverPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);
  
//   const handleGetStarted = () => {
//     if (user) {
//       navigate("/countries");
//     } else {
//       navigate("/login");
//     }
//   };

//   // Animated background effect
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Create particles
//     const particlesArray = [];
//     const numberOfParticles = 100;
    
//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 5 + 1;
//         this.speedX = Math.random() * 3 - 1.5;
//         this.speedY = Math.random() * 3 - 1.5;
//         this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
//       }
      
//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
        
//         if (this.x > canvas.width || this.x < 0) {
//           this.speedX = -this.speedX;
//         }
        
//         if (this.y > canvas.height || this.y < 0) {
//           this.speedY = -this.speedY;
//         }
//       }
      
//       draw() {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }
    
//     function init() {
//       for (let i = 0; i < numberOfParticles; i++) {
//         particlesArray.push(new Particle());
//       }
//     }
    
//     function connectParticles() {
//       for (let a = 0; a < particlesArray.length; a++) {
//         for (let b = a; b < particlesArray.length; b++) {
//           const dx = particlesArray[a].x - particlesArray[b].x;
//           const dy = particlesArray[a].y - particlesArray[b].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);
          
//           if (distance < 100) {
//             const opacity = 1 - distance / 100;
//             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//             ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//             ctx.stroke();
//           }
//         }
//       }
//     }
    
//     function animate() {
//       requestAnimationFrame(animate);
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       particlesArray.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });
      
//       connectParticles();
//     }
    
//     init();
//     animate();
    
//     // Handle window resize
//     function handleResize() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     }
    
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen relative overflow-hidden flex flex-col justify-between text-white">
//       {/* Animated Canvas Background */}
//       <canvas 
//         ref={canvasRef} 
//         className="absolute inset-0 z-0" 
//         style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0369a1 100%)' }}
//       ></canvas>
      
//       {/* Earth Rotating Animation SVG */}
//       <div className="absolute inset-0 z-10 opacity-10 flex items-center justify-center pointer-events-none">
//         <div className="w-full h-full max-w-2xl max-h-2xl animate-spin" style={{ animationDuration: '60s' }}>
//           <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
//             <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
//             <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
//             <path d="M50,5 C29.5,5 12.6,18.4 7.3,36.7 C15.8,42.4 24.4,43.6 33.1,40.4 C41.7,37.2 48.5,38.7 53.6,44.9 C58.7,51.1 66.3,55.6 76.4,58.5 C81.9,39.8 68.9,18.3 50,5 Z" fill="rgba(255,255,255,0.2)" />
//             <path d="M50,95 C29.5,95 12.6,81.6 7.3,63.3 C15.8,57.6 24.4,56.4 33.1,59.6 C41.7,62.8 48.5,61.3 53.6,55.1 C58.7,48.9 66.3,44.4 76.4,41.5 C81.9,60.2 68.9,81.7 50,95 Z" fill="rgba(255,255,255,0.2)" />
//           </svg>
//         </div>
//       </div>
      
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/20 z-10"></div>

//       {/* Navbar */}
//       <div className="relative z-20 flex justify-between items-center px-8 py-6">
//         <h1 className="text-3xl font-bold flex items-center">
//           <span className="text-blue-400 text-4xl mr-2">🌍</span>
//           Country Explorer
//         </h1>
//         <div className="space-x-4">
//           <Link 
//             to="/login" 
//             className="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition duration-300"
//           >
//             Sign In
//           </Link>
//           <Link 
//             to="/signup" 
//             className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transform transition duration-300 hover:scale-105"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-20 text-center px-4 py-20 flex-grow flex flex-col justify-center items-center animate-fadeIn">
//         <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
//           Explore Countries Around the World
//         </h2>
//         <p className="text-xl md:text-2xl mb-10 max-w-2xl text-gray-400">
//           Search, filter, and discover details about every nation in our beautiful planet.
//         </p>
//         <button
//           onClick={handleGetStarted}
//           className="px-8 py-4 rounded-full text-lg font-medium bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transform transition duration-300 hover:scale-105"
//         >
//           Get Started
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="relative z-20 pb-8 pt-4 w-full text-center text-gray-300 text-sm">
//         <p>© {new Date().getFullYear()} Country Explorer. All rights reserved.</p>
//       </div>

//       {/* Global styles for animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
        
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         .animate-spin {
//           animation: spin 60s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default CoverPage;


import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

function CoverPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particlesArray = [];
    const numberOfParticles = 100;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
    }
    
    init();
    animate();
    
    // Handle window resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate("/countries");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white flex flex-col justify-between">
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0369a1 100%)' }}
      ></canvas>
      
      {/* Earth Rotating Animation SVG */}
      <div className="absolute inset-0 z-10 opacity-20 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-2xl max-h-2xl animate-spin" style={{ animationDuration: '60s' }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <path d="M50,5 C29.5,5 12.6,18.4 7.3,36.7 C15.8,42.4 24.4,43.6 33.1,40.4 C41.7,37.2 48.5,38.7 53.6,44.9 C58.7,51.1 66.3,55.6 76.4,58.5 C81.9,39.8 68.9,18.3 50,5 Z" fill="rgba(255,255,255,0.2)" />
            <path d="M50,95 C29.5,95 12.6,81.6 7.3,63.3 C15.8,57.6 24.4,56.4 33.1,59.6 C41.7,62.8 48.5,61.3 53.6,55.1 C58.7,48.9 66.3,44.4 76.4,41.5 C81.9,60.2 68.9,81.7 50,95 Z" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Navbar */}
      <div className="relative z-20">
        <div className="container mx-auto flex justify-between items-center px-6 py-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🌍</span>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Insight Nations</h1>
          </div>
          <div className="space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition duration-300"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition duration-300 shadow-lg shadow-blue-600/30"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeIn">
            Discover the World<br />
            <span className="text-blue-400">One Country at a Time</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto animate-fadeInDelay">
            Explore detailed information about every nation on Earth. Search, filter, and uncover fascinating details about countries around the globe.

          </p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-4 rounded-full text-lg shadow-lg shadow-blue-600/30 transform transition duration-300 hover:scale-105 flex items-center mx-auto animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 py-6 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Country Explorer. All rights reserved.</p>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDelay {
          0% { opacity: 0; transform: translateY(20px); }
          50% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
        
        .animate-fadeInDelay {
          animation: fadeInDelay 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default CoverPage;


