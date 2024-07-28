import React, { useState, useCallback, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from './canvasUtils';
import imageCompression from 'browser-image-compression';


interface ImageUploadModalProps {
  isOpen: boolean;
  profile: boolean;
  onClose: () => void;
  onSubmit: (croppedImage: string, isProfileImage: boolean) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, profile, onClose, onSubmit }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dropRef = useRef<HTMLDivElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
      };
  
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log('Cropped Image:', croppedImage);
  
      if (croppedImage) {
        const base64String = await convertToBase64(croppedImage);
        onSubmit(base64String, profile);
        setImageSrc(null)
        onClose()
      } else {
        console.error('Cropped image is undefined');
      }
    }
  }, [imageSrc, croppedAreaPixels, onSubmit]);
  
  const convertToBase64 = (blobUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };
  
  return isOpen ? (
    <div
      ref={dropRef}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isDragging ? 'border-4 border-blue-500' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="relative w-1/2 h-3/4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-white z-10" onClick={()=>setImageSrc(null)}>
          <CloseIcon />
        </button>

        {imageSrc ? (
          <div className="">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              cropShape={profile ? "round" : "rect"}
              aspect={profile ? 1 / 1 : 16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <button
              onClick={handleCrop}
              className="absolute bottom-4 left-1/2  bg-white text-black font-sans font-semibold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <img src="/src/assets/images_Logo.png" className="w-28 h-28 mb-5" />
            <p>Drag and drop an image here</p>
            <p className="font-semibold">Click to select one.</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setImageSrc(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="absolute top-4 right-4 text-gray-600 z-10" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default ImageUploadModal;
