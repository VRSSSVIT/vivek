import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import Webcam from 'react-webcam';

interface ImageUploaderProps {
  onImageSelected: (image: HTMLImageElement) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImage(dataUrl);
        loadImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        loadImage(imageSrc);
        setShowCamera(false);
      }
    }
  };

  const loadImage = (src: string) => {
    const img = new Image();
    img.onload = () => {
      onImageSelected(img);
    };
    img.src = src;
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!image && !showCamera ? (
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <p className="text-gray-600 mb-2">
              Upload a clear image of your face or take a photo
            </p>
            <p className="text-sm text-gray-500">
              For best results, use good lighting and a neutral background
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={18} className="mr-2" />
              Upload Image
            </button>
            
            <button
              onClick={() => setShowCamera(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Camera size={18} className="mr-2" />
              Take Photo
            </button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : showCamera ? (
        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="w-full rounded-lg"
          />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleCameraCapture}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Capture
            </button>
            <button
              onClick={() => setShowCamera(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={image || ''}
            alt="Uploaded face"
            className="w-full rounded-lg"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;