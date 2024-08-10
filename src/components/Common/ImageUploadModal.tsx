// import React, { useState, useRef } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import ImageCropper from './ImageCropper';
// import imageCompression from 'browser-image-compression';

// interface ImageUploadModalProps {
//   isOpen: boolean;
//   profile: boolean;
//   onClose: () => void;
//   onSubmit: (croppedImage: string, isProfileImage: boolean) => void;
// }

// const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, profile, onClose, onSubmit }) => {
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState<boolean>(false);

//   const dropRef = useRef<HTMLDivElement>(null);

//   const handleDragEnter = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const file = e.dataTransfer.files[0];
//       handleFile(file);
//     }
//   };

//   const handleFile = async (file: File) => {
//     try {
//       const options = {
//         maxSizeMB: 1, // Adjust based on your requirement
//         maxWidthOrHeight: 1920, // Adjust based on your requirement
//         useWebWorker: true,
//       };

//       const compressedFile = await imageCompression(file, options);
//       const reader = new FileReader();
//       reader.onload = () => setImageSrc(reader.result as string);
//       reader.readAsDataURL(compressedFile);
//     } catch (error) {
//       console.error('Error compressing image:', error);
//     }
//   };

//   const handleCropComplete = async (croppedImage: string) => {
//     onSubmit(croppedImage, profile);
//     setImageSrc(null);
//     onClose();
//   };

//   return isOpen ? (
//     <div
//       ref={dropRef}
//       className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isDragging ? 'border-4 border-blue-500' : ''}`}
//       onDragEnter={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="relative w-1/2 h-3/4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
//         <button className="absolute top-4 right-4 text-black z-10" onClick={() => setImageSrc(null)}>
//           <CloseIcon />
//         </button>

//         {imageSrc ? (
//           <ImageCropper
//             imageSrc={imageSrc}
//             profile={profile}
//             onCropComplete={handleCropComplete}
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center w-full h-full relative">
//             <img src="/src/assets/images_Logo.png" className="w-28 h-28 mb-5" alt="Upload logo" />
//             <p>Drag and drop an image here</p>
//             <p className="font-semibold">Click to select one.</p>
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png,.gif"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   handleFile(file);
//                 }
//               }}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             <button className="absolute top-4 right-4 text-gray-600 z-10" onClick={onClose}>
//               <CloseIcon />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   ) : null;
// };

// export default ImageUploadModal;












// import React, { useState, useRef } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import ImageCropper from './ImageCropper';
// import imageCompression from 'browser-image-compression';

// interface ImageUploadModalProps {
//   isOpen: boolean;
//   profile: boolean;
//   onClose: () => void;
//   onSubmit: (croppedImage: string, isProfileImage: boolean, description:string) => void;
//   isPost: boolean;
// }

// const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, profile, onClose, onSubmit, isPost }) => {
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [aspectRatio, setAspectRatio] = useState<number>(profile ? 1 / 1 : 16 / 9); 

//   const dropRef = useRef<HTMLDivElement>(null);

//   const handleDragEnter = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const file = e.dataTransfer.files[0];
//       handleFile(file);
//     }
//   };

//   const handleFile = async (file: File) => {
//     try {
//       const options = {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 1920,
//         useWebWorker: true,
//       };

//       const compressedFile = await imageCompression(file, options);
//       const reader = new FileReader();
//       reader.onload = () => setImageSrc(reader.result as string);
//       reader.readAsDataURL(compressedFile);
//     } catch (error) {
//       console.error('Error compressing image:', error);
//     }
//   };

//   const handleCropComplete = async (croppedImage: string) => {
//     onSubmit(croppedImage);
//     setImageSrc(null);
//     onClose();
//   };

//   const handleDescriptionSubmit = (description: string, croppedImage: string | null) => {
//     console.log('Description:', description);
//     console.log('Cropped Image:', croppedImage);
//     if (croppedImage) {
//       onSubmit(croppedImage, description);
//     }
//     onClose();
//   };


//   const handleClose =()=>{
//     setImageSrc(null)
//     setIsDragging(false)
//     setAspectRatio(profile ? 1 : 16 / 9)
//     onClose()
//   }
//   return isOpen ? (
//     <div
//       ref={dropRef}
//       className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isDragging ? 'border-4 border-blue-500' : ''}`}
//       onDragEnter={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="relative w-1/2 h-3/4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
//         <button className="absolute top-4 right-4 text-black z-10" onClick={() => setImageSrc(null)}>
//           <CloseIcon />
//         </button>

//         {imageSrc ? (
//           <>
//             <ImageCropper
//               imageSrc={imageSrc}
//               profile={profile}
//               aspectRatio={aspectRatio}
//               setAspectRatio={setAspectRatio} // Pass setAspectRatio as a prop
//               onCropComplete={handleCropComplete}
//               isPost={isPost}
//               onDescriptionSubmit={handleDescriptionSubmit} // Pass the handleDescriptionSubmit callback
//             />
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center w-full h-full relative">
//             <img src="/src/assets/images_Logo.png" className="w-28 h-28 mb-5" alt="Upload logo" />
//             <p>Drag and drop an image here</p>
//             <p className="font-semibold">Click to select one.</p>
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png,.gif"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   handleFile(file);
//                 }
//               }}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             <button className="absolute top-4 right-4 text-gray-600 z-10" onClick={()=>{handleClose()}}>
//               <CloseIcon />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   ) : null;
// };

// export default ImageUploadModal;





// ImageUploadModal.tsx

import React, { useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ImageCropper from './ImageCropper';
import imageCompression from 'browser-image-compression';

interface ImageUploadModalProps {
  isOpen: boolean;
  profile: boolean;
  onClose: () => void;
  onSubmit: (croppedImage: string, isProfileImage?: boolean, description?: string) => void;
  isPost: boolean;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, profile, onClose, onSubmit, isPost }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(profile ? 1 / 1 : 16 / 9);

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

  const handleCropComplete = async (croppedImage: string) => {
    onSubmit(croppedImage, profile);
    setImageSrc(null);
    onClose();
  };

  const handleDescriptionSubmit = (description: string | '', croppedImage: string | null) => {
    if (croppedImage) {
      onSubmit(croppedImage, undefined, description); 
    }
    onClose();
  };

  const handleClose = () => {
    setImageSrc(null);
    setIsDragging(false);
    setAspectRatio(profile ? 1 : 16 / 9);
    onClose();
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
        <button className="absolute top-4 right-4 text-black z-10" onClick={() => setImageSrc(null)}>
          <CloseIcon />
        </button>

        {imageSrc ? (
          <>
            <ImageCropper
              imageSrc={imageSrc}
              profile={profile}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio} 
              onCropComplete={isPost ? () => {} : handleCropComplete} 
              isPost={isPost}
              onDescriptionSubmit={isPost ? handleDescriptionSubmit : () => {}} 
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <img src="/src/assets/images_Logo.png" className="w-28 h-28 mb-5" alt="Upload logo" />
            <p>Drag and drop an image here</p>
            <p className="font-semibold">Click to select one.</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFile(file);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="absolute top-4 right-4 text-gray-600 z-10" onClick={() => { handleClose() }}>
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default ImageUploadModal;
