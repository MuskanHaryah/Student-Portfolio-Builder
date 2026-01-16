import React, { useState } from 'react';

const ImageUpload = ({ onImagesChange, initialImages = [] }) => {
  const [previews, setPreviews] = useState(initialImages.slice(0, 1)); // Only keep first image
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
    const file = files[0]; // Only take the first file
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreview = {
          id: Date.now() + Math.random(),
          src: e.target.result, // Base64 for preview
          file: file, // File object for upload
          isNew: true,
        };
        // Replace all previews with just this one image
        setPreviews([newPreview]);
        onImagesChange([file]);
      };
      reader.readAsDataURL(file);
    }
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
      <label className="block text-sm font-medium text-warm-700 mb-3">
        Project Image
      </label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-primary-500 bg-primary-50 scale-[1.02]'
            : 'border-cream-300 bg-cream-50 hover:bg-blush-50 hover:border-primary-300'
        }`}
      >
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <label htmlFor="imageInput" className="cursor-pointer">
          <div className="text-4xl text-primary-400 mb-3">📷</div>
          <p className="text-warm-700 font-medium mb-1">Drag image here or click to select</p>
          <p className="text-warm-500 text-sm">PNG, JPG, GIF up to 5MB</p>
        </label>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-warm-700 mb-3 flex items-center gap-2">
            <span></span> Selected Images ({previews.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview) => (
              <div key={preview.id} className="relative group">
                <img
                  src={preview.src}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-xl border-2 border-cream-200 group-hover:border-primary-300 transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(preview.id)}
                  className="absolute -top-2 -right-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  ×
                </button>
                {preview.isNew && (
                  <div className="absolute bottom-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
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
