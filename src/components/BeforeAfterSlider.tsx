
import React, { useState, useRef, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: number;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = 16 / 9,
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);
  const afterImageRef = useRef<HTMLImageElement>(null);

  // Handle image loading
  useEffect(() => {
    const beforeImg = new Image();
    const afterImg = new Image();
    
    beforeImg.onload = () => setImagesLoaded(prev => ({ ...prev, before: true }));
    afterImg.onload = () => setImagesLoaded(prev => ({ ...prev, after: true }));
    
    beforeImg.src = beforeImage;
    afterImg.src = afterImage;
    
    return () => {
      beforeImg.onload = null;
      afterImg.onload = null;
    };
  }, [beforeImage, afterImage]);

  // Handle mouse and touch events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const newPosition = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
        setSliderPosition(newPosition);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && containerRef.current && e.touches[0]) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - containerRect.left;
        const newPosition = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
        setSliderPosition(newPosition);
      }
    };

    // Add event listeners
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Calculate height based on aspect ratio
  const containerStyle = {
    paddingBottom: `${(1 / aspectRatio) * 100}%`,
  };

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after;

  const renderSlider = () => (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className} ${isFullscreen ? 'w-full max-w-5xl h-auto' : ''}`}
      style={!isFullscreen ? containerStyle : {}}
    >
      {/* Loading state */}
      {!allImagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm z-50">
          <div className="animate-pulse bg-white/10 p-4 rounded-full">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Images */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Before image (full width) */}
        <img
          ref={beforeImageRef}
          src={beforeImage}
          alt="Before"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* After image (partial width based on slider) */}
        <div 
          className="absolute top-0 bottom-0 right-0 overflow-hidden"
          style={{ width: `${100 - sliderPosition}%` }}
        >
          <img
            ref={afterImageRef}
            src={afterImage}
            alt="After"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: `translateX(-${sliderPosition}%)` }}
          />
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-ew-resize shadow-lg z-20">
          <div className="flex space-x-1">
            <div className="w-0.5 h-4 bg-gray-500"></div>
            <div className="w-0.5 h-4 bg-gray-500"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6 z-10 pointer-events-none">
        <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm" style={{ opacity: sliderPosition > 15 ? 1 : 0 }}>
          {beforeLabel}
        </div>
        <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm" style={{ opacity: sliderPosition < 85 ? 1 : 0 }}>
          {afterLabel}
        </div>
      </div>

      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 z-30 focus:outline-none backdrop-blur-sm"
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );

  return isFullscreen ? (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="w-full max-w-7xl p-4">
        {renderSlider()}
      </div>
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 z-30 focus:outline-none backdrop-blur-sm"
      >
        <Minimize2 size={24} />
      </button>
    </div>
  ) : (
    renderSlider()
  );
};

export default BeforeAfterSlider;
