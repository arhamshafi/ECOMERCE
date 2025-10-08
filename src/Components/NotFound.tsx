import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <>
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.2s backwards;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.4s backwards;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 1s ease-out 0.6s backwards;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 1s ease-out 0.8s backwards;
        }
      `}</style>

      <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating particles effect with CSS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              {/* UnAthorized  */}
              404
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6"></div>
          </div>
          
          <h2 className="text-2xl md:text-3xl mb-3 text-cyan-300 font-semibold animate-fade-in">
            Oops! Page Not Found
          </h2>
          <p className="text-base md:text-lg mb-8 text-gray-300 max-w-md mx-auto animate-fade-in-delay">
            The page you're looking for seems to have vanished into the digital void.
          </p>
          
          
            <button onClick={()=>navigate(-1)} className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
              <span className="relative z-10">Back to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          
          <div className="mt-12 flex justify-center gap-8 text-gray-400 text-sm">
            <div className="flex flex-col items-center animate-fade-in-delay-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                <span className="text-2xl">🏠</span>
              </div>
              <span>Home</span>
            </div>
            <div className="flex flex-col items-center animate-fade-in-delay-3">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-2">
                <span className="text-2xl">📧</span>
              </div>
              <span>Contact</span>
            </div>
            <div className="flex flex-col items-center animate-fade-in-delay-4" >
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-2">
                <span className="text-2xl">ℹ️</span>
              </div>
              <span>Help</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}