
import React from 'react';
import ImageSlider from '@/components/ImageSlider';
import { Heart, Sparkles, Wand2, Image as ImageIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="p-6 bg-white bg-opacity-70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 font-montserrat bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 tracking-tight">
            ImageGenix
          </h1>
          <div className='max-w-2xl mx-auto'>
          <p className="text-lg md:text-xl mt-5 font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 font-medium italic flex items-center justify-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-500" /> 
            Revive, Enhance, Transform 
            <Sparkles className="h-5 w-5 text-amber-500" /> 
            AI Magic for Your Images! 
            <ImageIcon className="h-5 w-5 text-blue-500" />
          </p>
          </div>
        </div>
      </header>
      
      <main className="py-12">
        <ImageSlider />
      </main>
      
      <footer className="py-8 px-6 bg-white bg-opacity-80 backdrop-blur-sm border-t border-gray-200 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-montserrat font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">ImageGenix</h3>
              <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-1 text-gray-700">
              <span className="font-montserrat">Built with</span>
              <Heart className="h-5 w-5 mx-1 text-red-500 fill-red-500 animate-pulse" />
              <span className="font-montserrat">by <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-semibold">codewithkhan</a></span>
            </div>
            
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-montserrat">About</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-montserrat">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-montserrat">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
