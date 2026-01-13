import React, { useState } from 'react';

const ImageUpload = ({ onImagesChange, initialImages = [] }) => {
  const [previews, setPreviews] = useState(initialImages);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPreview = {
            id: Date.now() + Math.random(),
            src: e.target.result, // Base64 for preview
            file: file, // File object for upload
            isNew: true,
          };
          setPreviews((prev) => {
            const updated = [...prev, newPreview];
            // Pass only the file objects to parent, not the preview objects
            const fileObjects = updated
              .filter(p => p.file instanceof File)
              .map(p => p.file);
            onImagesChange(fileObjects);
            return updated;
          });
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (id) => {
    const updated = previews.filter((img) => img.id !== id);
    setPreviews(updated);
    // Pass only the file objects to parent
    const fileObjects = updated
      .filter(p => p.file instanceof File)
      .map(p => p.file);
    onImagesChange(fileObjects);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Project Images
      </label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          dragActive
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <input
          type="file"
          id="imageInput"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <label htmlFor="imageInput" className="cursor-pointer">
          <div className="text-4xl text-gray-400 mb-2">📷</div>
          <p className="text-gray-700 font-medium mb-1">Drag images here or click to select</p>
          <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 5MB each</p>
        </label>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Selected Images ({previews.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview) => (
              <div key={preview.id} className="relative group">
                <img
                  src={preview.src}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(preview.id)}
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition -top-2 -right-2"
                >
                  ×
                </button>
                {preview.isNew && (
                  <div className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    New
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
