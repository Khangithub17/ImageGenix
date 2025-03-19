
import React, { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);
  
  const processFile = useCallback((file: File) => {
    // Check if the file is an image
    if (!file.type.match(/image.*/)) {
      console.error("File is not an image");
      return;
    }
    
    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onImageSelected(objectUrl);
    
    // Clean up the object URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [onImageSelected]);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);
  
  const clearImage = useCallback(() => {
    setPreview(null);
  }, []);
  
  return (
    <div className={`${className}`}>
      {!preview ? (
        <div 
          className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out flex flex-col items-center justify-center min-h-[200px]
            ${isDragging 
              ? "border-blue-500 bg-blue-50/10" 
              : "border-gray-300 bg-gray-50/5 hover:border-gray-400"}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="mb-4 p-3 rounded-full bg-gray-100/20 backdrop-blur-sm">
            <Upload className="w-6 h-6 text-gray-500" />
          </div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Drag and drop an image, or{" "}
            <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
              browse
              <input
                type="file"
                className="hidden"
                onChange={handleChange}
                accept="image/*"
              />
            </label>
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden group">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-auto object-cover rounded-lg" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={clearImage}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white transition-all duration-200"
              aria-label="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
