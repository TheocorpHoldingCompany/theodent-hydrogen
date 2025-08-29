import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';

export const FDAAnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check localStorage for dismissal timestamp and show popup if not dismissed or expired
  useEffect(() => {
    const dismissedTimestamp = localStorage.getItem('theodent-fda-announcement-dismissed');
    const resetPeriod = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const now = Date.now();

    if (!dismissedTimestamp || now - parseInt(dismissedTimestamp) > resetPeriod) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();
      }, 1500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    document.body.style.overflow = '';
    localStorage.setItem('theodent-fda-announcement-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-[#2A1B16] bg-opacity-80 z-[9999] flex justify-center items-center p-4 sm:p-6"
        onClick={handleDismiss}
        role="dialog"
        aria-modal="true"
      >
        {/* Popup content */}
        <div 
          className="bg-[#fefcf3] rounded-xl w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] relative shadow-[0_20px_40px_rgba(42,27,22,0.3)] border-2 border-[#CC8A52] max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 bg-transparent border-none cursor-pointer text-[#2A1B16] text-2xl z-[10000] hover:text-red-600 transition-colors duration-200 p-1"
            aria-label="Close announcement"
          >
            <BsX size={28} />
          </button>

          {/* Content */}
          <div className="p-6 sm:p-8 text-center md:flex md:flex-col md:justify-center">
            {/* Text content container */}
            <div className="md:px-12">
              {/* Main announcement */}
              <h1 className="theo-h1 text-[#2A1B16] mb-4 leading-tight text-2xl sm:text-3xl md:text-4xl">
                Historic FDA Clearance!
              </h1>

              {/* Announcement details */}
              <div className="space-y-4 max-w-[90%] mx-auto">
                <p className="theo-h3 text-[#2A1B16] leading-snug text-base sm:text-lg md:text-xl">
                  Theodent has officially received FDA clearance for the 
                  <strong> world's first fluoride-free varnish</strong>, marking real progress 
                  in professional dental care.
                </p>

                <p className="theo-h3 text-[#2A1B16] leading-snug text-base sm:text-lg md:text-xl">
                  This breakthrough advances our mission to provide a complete suite of 
                  both consumer and professional products that use <strong>Rennou™</strong> 
                  in place of fluoride — delivering effective AND safe solutions for patients.
                </p>
              </div>
            </div>
            
            {/* Key highlight - Image */}
            <div className="flex justify-center my-4 sm:my-5">
              <img 
                src="/imgs/fdaannouncement.png" 
                alt="FDA Clearance for Theodent Fluoride-Free Varnish"
                className="w-full h-auto max-w-[250px] sm:max-w-[300px] md:max-w-[450px]"
                loading="lazy"
              />
            </div>

            {/* Call to action */}
            <div className="flex justify-center mt-3 sm:mt-4">
              <a
                href="/pages/technology"
                className="theo-btn cursor-pointer no-underline transition-all duration-200 hover:bg-[#B8794A] px-5 py-2.5 min-w-[200px] text-center text-base sm:text-lg"
                onClick={handleDismiss}
              >
                Learn More About Rennou™
              </a>
            </div>

            {/* Small disclaimer text */}
            <div className="mt-4 text-xs sm:text-sm text-gray-600 italic sm:mt-4">
              Professional varnish available through dental professionals. More details to come. 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
