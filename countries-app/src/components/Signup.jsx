// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/signup", formData, {
//         withCredentials: true,
//       });
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.error || "Signup failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="email"
//           type="email"
//           onChange={handleChange}
//           value={formData.email}
//           required
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//         />
//         <input
//           name="password"
//           type="password"
//           onChange={handleChange}
//           value={formData.password}
//           required
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup;


import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      await axios.post("http://localhost:5000/api/signup", {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Animated background effect
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

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12 text-white">
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
        style={{ background: 'linear-gradient(135deg, #0369a1 0%, #0c4a6e 50%, #082f49 100%)' }}
      ></canvas>
      
      {/* Globe Animation */}
      <div className="absolute inset-0 z-10 opacity-10 flex items-center justify-center pointer-events-none">
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

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-30">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-white hover:text-blue-300 transition duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Signup Form */}
      <div className="relative z-20 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-white/20 animate-fadeIn">
          <div className="flex items-center justify-center mb-6">
            <span className="text-blue-400 text-4xl mr-2">🌍</span>
            <h2 className="text-3xl font-bold">Create Account</h2>
          </div>
          
          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm text-white p-4 rounded-lg mb-6 flex items-center border border-red-500/30 animate-fadeIn">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-100">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 transition duration-300"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-100">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 transition duration-300"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-100">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 transition duration-300"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-200">
                I agree to the <a href="/terms" className="text-blue-300 hover:text-white transition duration-300">Terms of Service</a> and <a href="/privacy" className="text-blue-300 hover:text-white transition duration-300">Privacy Policy</a>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-full text-white font-medium ${
                isLoading 
                  ? "bg-blue-500/70 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transform transition duration-300 hover:scale-105"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-white/10">
            <p className="text-gray-200">Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-300 hover:text-white transition duration-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Signup;