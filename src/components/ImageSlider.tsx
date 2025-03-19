
import React, { useState, useEffect } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ImageUpload from "./ImageUpload";
import LoadingSpinner from "./LoadingSpinner";
import { enhanceImage, EnhanceImageOptions } from "../services/replicate";
import { Sliders, Image, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Default sample image
const DEFAULT_IMAGE = "/lovable-uploads/b98ccf1d-f877-4d9c-88da-7d1aa740e30d.png";

const ImageSlider = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<EnhanceImageOptions>({
    scale: 2,
    face: false,
  });

  // Set default image on component mount
  useEffect(() => {
    setSourceImage(DEFAULT_IMAGE);
  }, []);

  // Process the image
  const processImage = async () => {
    if (!sourceImage) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setIsProcessing(true);
      const result = await enhanceImage(sourceImage, options);
      setEnhancedImage(result);
      toast.success("Image enhanced successfully!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to enhance image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle image selection
  const handleImageSelected = (imageUrl: string) => {
    setSourceImage(imageUrl);
    setEnhancedImage(null); // Reset enhanced image when source changes
  };

  // Handle option changes
  const handleOptionChange = (name: keyof EnhanceImageOptions, value: any) => {
    setOptions(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="glass-panel mb-10 animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Image Enhancement with AI
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="space-y-6 animate-slideUp" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-3">
              <Image className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-800">Upload Your Image</h3>
            </div>
            
            <ImageUpload 
              onImageSelected={handleImageSelected} 
              className="min-h-[300px]"
            />
            
            {/* Processing Button */}
            <button
              onClick={processImage}
              disabled={!sourceImage || isProcessing}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 btn-hover-effect
                ${isProcessing || !sourceImage 
                  ? "bg-gray-400 cursor-not-allowed opacity-70" 
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:translate-y-[-2px]"}`}
            >
              {isProcessing ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Enhancing Image...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Enhance Image</span>
                </>
              )}
            </button>
          </div>
          
          {/* Options Section */}
          <div className="space-y-6 animate-slideUp" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-800">Enhancement Options</h3>
            </div>
            
            <div className="space-y-6 p-4 bg-gray-50 rounded-lg border border-gray-100 smooth-shadow">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700">Upscale Factor</label>
                  <span className="text-sm text-gray-500">{options.scale}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={options.scale}
                  onChange={(e) => handleOptionChange("scale", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1x</span>
                  <span>2x</span>
                  <span>3x</span>
                  <span>4x</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Face Enhancement</label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="face-toggle"
                    checked={options.face}
                    onChange={(e) => handleOptionChange("face", e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="face-toggle"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                <p className="text-xs text-amber-700">
                  For demonstration purposes, this app simulates the enhancement process. 
                  In a production environment, the actual Replicate API would be connected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      {sourceImage && (
        <div className="glass-panel animate-slideUp" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-800">Results</h3>
          </div>
          
          {enhancedImage ? (
            <BeforeAfterSlider
              beforeImage={sourceImage}
              afterImage={enhancedImage}
              beforeLabel="Original"
              afterLabel="Enhanced"
              aspectRatio={1.5}
              className="smooth-shadow"
            />
          ) : (
            <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 min-h-[300px]">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <p className="text-gray-600 text-center max-w-md">
                {isProcessing ? (
                  <span className="flex flex-col items-center gap-3">
                    <LoadingSpinner size="md" color="border-gray-400" />
                    <span>Enhancing your image with AI...</span>
                  </span>
                ) : (
                  "Click 'Enhance Image' to see the before/after comparison"
                )}
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* CSS for toggle switch - Fix for the JSX issue */}
      <style>
        {`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3b82f6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .toggle-checkbox {
          right: 0;
          z-index: 0;
          border-color: #fff;
          right: 4px;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
        `}
      </style>
    </div>
  );
};

export default ImageSlider;
