//import { useState } from 'react'
import './index.css';
import video from './assets/videoplayback.webm';
import { classes } from './styles/classes';
// import AboutPage from '../src/pages/AboutPage';
function App() {
  return (
    // Main container with overflow-x-hidden for stability
    <div className="relative w-full min-h-screen overflow-x-hidden"> 
      
      {/* SECTION 1: FIXED BACKGROUND VIDEO */}
      <div className="fixed inset-0 z-0 h-screen"> 
        <video
          autoPlay
          loop
          muted
          // Ensure video covers screen but is not intrusive on smaller/larger screens
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={video} type="video/webm" />
        </video>
      </div>

      {/* SECTION 2: SCROLLABLE CONTENT LAYER */}
      <div className="relative z-10 w-full"> 
        
        {/* PART A: THE VIDEO/HERO SECTION (Screen 1) */}
        <div className="h-screen flex items-center justify-center">
          <div
            // Use 'sm:max-w-lg' for small screens and 'lg:max-w-xl' for large screens
            className={`${classes.card} bg-base-200/40 backdrop-blur-md shadow-2xl max-w-sm sm:max-w-lg lg:max-w-xl w-full mx-4 border border-base-300/20 transition-all duration-300`}
          >
            <div className={`${classes.cardBody} items-center text-center p-8 sm:p-10 lg:p-12`}>
              {/* Icon/Logo size adjusted for small screens (sm:h-20 sm:w-20) */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 sm:h-12 sm:w-12 text-primary"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="none" />
                  <path
                    d="M12 8C12 8 10 10 10 12C10 14 12 16 12 16C12 16 14 14 14 12C14 10 12 8 12 8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {/* Heading size adjusted: 4xl on mobile, 5xl on medium, 6xl on large */}
              <h1 className={`${classes.heading1} text-4xl sm:text-5xl lg:text-6xl tracking-tight`}>
                Leafdex
              </h1>
              <p className="text-base-content/80 text-base sm:text-lg mb-8 font-light">
                Your personal plant companion
              </p>
              <div
                className={`${classes.gap4} card-actions justify-center w-full`}
              >
                {/* Buttons commented out */}
              </div>
            </div>
          </div>
        </div>

        {/* PART B: THE ABOUT SECTION (Screen 2 and beyond)
        <div className="bg-white/95 text-base-content py-10 sm:py-20 w-full max-w-full overflow-x-hidden left-0 flex">
            {/* The AboutPage component itself handles its internal responsiveness well */}
            {/* <AboutPage /> */}
        {/* </div> */} 
        
      </div>
    </div>
  );
}

export default App;