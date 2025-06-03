import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';

export const FDAAnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('theodent-fda-announcement-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('theodent-fda-announcement-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-[#2A1B16] bg-opacity-80 z-[9999] flex justify-center items-center p-5 fadeIn"
        onClick={handleDismiss}
      >
        {/* Popup content */}
        <div 
          className="bg-[#fefcf3] rounded-xl max-w-[600px] w-full relative shadow-[0_20px_40px_rgba(42,27,22,0.3)] border-2 border-[#CC8A52] md:max-w-[500px] sm:max-w-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-[#2A1B16] text-2xl z-[10000] hover:text-red-600 transition-colors duration-200"
            aria-label="Close announcement"
          >
            <BsX />
          </button>

          {/* Content */}
          <div className="p-10 pb-8 text-center sm:p-6 sm:pb-6">
            {/* FDA Badge/Icon */}
            <div 
              className="w-20 h-20 bg-[#CC8A52] rounded-full flex items-center justify-center mx-auto mb-6 text-[#fefcf3] text-4xl font-bold sm:w-16 sm:h-16 sm:text-3xl sm:mb-4"
            >
              ✓
            </div>

            {/* Main announcement */}
            <div className="theo-h1 text-[#2A1B16] mb-5 leading-tight">
              Historic FDA Approval!
            </div>

            <div className="theo-h3 text-[#2A1B16] mb-6 leading-snug">
              Theodent has officially received FDA approval for the 
              <strong> world's first fluoride-free varnish</strong>, marking real progress 
              in professional dental care.
            </div>

            {/* Key highlight */}
            <div className="bg-[#2A1B16] text-[#fefcf3] p-5 rounded-lg mb-6 sm:p-4">
              <div className="theo-h3 text-base leading-snug m-0">
                This breakthrough advances our mission to provide a complete suite of 
                both consumer and professional products that use <strong>Rennou™</strong> 
                in place of fluoride — delivering effective AND safe solutions for patients.
              </div>
            </div>

            {/* Call to action */}
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/pages/technology"
                className="theo-btn bg-[#CC8A52] text-[#fefcf3] border-none rounded-md cursor-pointer font-semibold no-underline inline-block transition-all duration-200 hover:bg-[#B8794A] sm:min-w-[200px]"
                onClick={handleDismiss}
              >
                Learn More About Rennou™
              </a>
            </div>

            {/* Small disclaimer text */}
            <div className="mt-5 text-sm text-gray-600 italic sm:mt-4 sm:text-xs">
              Professional varnish available through dental professionals. More details to come. 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};