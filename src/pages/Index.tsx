
import React from 'react';
import ImageSlider from '@/components/ImageSlider';
import { Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="p-6 bg-white bg-opacity-70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
            ImageGenix
          </h1>
          <p className="text-lg md:text-xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 font-medium italic">
            Revive, Enhance, Transform – AI Magic for Your Images! ✨🖼️
          </p>
        </div>
      </header>
      
      <main className="py-12">
        <ImageSlider />
      </main>
      
      <footer className="p-6 bg-white bg-opacity-70 backdrop-blur-sm border-t border-gray-200 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} ImageGenix. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 mb-4 sm:mb-0 text-gray-700">
            <span>Built with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500 animate-pulse" />
            <span>by <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">codewithkhan</a></span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
