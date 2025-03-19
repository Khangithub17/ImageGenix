
import React from 'react';
import ImageSlider from '@/components/ImageSlider';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="p-6 bg-white bg-opacity-70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Image Magic Slider
          </h1>
          <p className="text-gray-600 mt-2">
            Transform your images with AI-powered enhancement
          </p>
        </div>
      </header>
      
      <main className="py-12">
        <ImageSlider />
      </main>
      
      <footer className="p-6 bg-white bg-opacity-70 backdrop-blur-sm border-t border-gray-200 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Image Magic Slider. All rights reserved.
          </p>
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
