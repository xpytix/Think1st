import React, { useState } from "react";

interface ImageUploaderProps {
  label?: string;
  onUpload?: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onUpload }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);

      if (onUpload) {
        onUpload(file);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);

      if (onUpload) {
        onUpload(file);
      }
    }
  };

  return (
    <div className="flex flex-col items-start w-full py-4">
      {/* Label */}
      {label && (
        <label className="block text-base font-normal text-text ">
          {label}
        </label>
      )}

      {/* Upload Box */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-24 border bg-white border-secondary rounded-lg cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm underline text-primary dark:text-gray-400">
                Upload File
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
