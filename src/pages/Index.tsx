import React, { useState } from 'react';
import ImageSlider from '@/components/ImageSlider';
import { Heart, Sparkles, Wand2, Image as ImageIcon, Download } from 'lucide-react';

const Index = () => {
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);

  const handleDownload = () => {
    if (enhancedImage) {
      const link = document.createElement('a');
      link.href = enhancedImage;
      link.download = 'enhanced-image.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="p-4 md:p-6 bg-white bg-opacity-70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 font-montserrat bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 tracking-tight">
            ImageGenix
          </h1>
          <div className='max-w-2xl mx-auto'>
          <p className="text-base md:text-xl mt-3 md:mt-5 font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 font-medium italic flex flex-wrap items-center justify-center gap-2">
           
            Revive, Enhance, Transform ,  AI Magic for Your Images! 
          
          </p>
          </div>
        </div>
      </header>
      
      <main className="py-8 md:py-12">
        <ImageSlider setEnhancedImage={setEnhancedImage} />
        <div className="flex justify-center mt-6 md:mt-8">
          {enhancedImage && (
        <button 
          onClick={handleDownload} 
          className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:translate-y-[-2px] transition-all duration-300 flex items-center gap-2"
        >
          <Download className="h-4 w-4 md:h-5 md:w-5" />
          Download Image
        </button>
          )}
        </div>
      </main>
      <footer className="py-6 md:py-8 px-4 md:px-6 bg-white bg-opacity-80 backdrop-blur-sm border-t border-gray-200 mt-8 md:mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-montserrat font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1 md:mb-2">ImageGenix</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-1 text-gray-700">
              <span className="font-montserrat text-xs md:text-base">Built with</span>
              <Heart className="h-4 w-4 md:h-5 md:w-5 mx-1 text-red-500 fill-red-500 animate-pulse" />
              <span className="font-montserrat text-xs md:text-base">by <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-semibold">codewithkhan</a></span>
            </div>
            
            <div className="flex justify-center md:justify-end space-x-4 md:space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-xs md:text-sm font-montserrat">About</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-xs md:text-sm font-montserrat">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-xs md:text-sm font-montserrat">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
