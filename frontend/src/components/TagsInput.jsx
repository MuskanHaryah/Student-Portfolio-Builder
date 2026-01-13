import React, { useState } from 'react';

const TagsInput = ({ 
  label, 
  placeholder = 'Add item and press Enter', 
  tags = [], 
  onTagsChange,
  errorMessage = null,
  isRequired = false,
  helpText = null
}) => {
  const [input, setInput] = useState('');

  const handleAddTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onTagsChange([...tags, input.trim()]);
      setInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    onTagsChange(tags.filter(t => t !== tag));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Area */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errorMessage
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Help Text */}
      {helpText && !errorMessage && (
        <p className="text-gray-500 text-xs mb-3">{helpText}</p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
      )}

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-600 hover:text-blue-900 font-bold text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
