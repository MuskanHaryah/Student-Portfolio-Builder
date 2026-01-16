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
        <label className="block text-sm font-medium text-warm-700 mb-2">
          {label} {isRequired && <span className="text-primary-500">*</span>}
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
          className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition bg-cream-50/50 text-base ${
            errorMessage
              ? 'border-primary-400 focus:ring-primary-300'
              : 'border-cream-200 focus:ring-primary-200 focus:border-primary-400'
          }`}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl transition-all shadow-soft whitespace-nowrap"
        >
          Add
        </button>
      </div>

      {/* Help Text */}
      {helpText && !errorMessage && (
        <p className="text-warm-500 text-xs mb-3">{helpText}</p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="text-primary-600 text-sm mb-3">{errorMessage}</p>
      )}

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-blush-50 text-primary-700 px-4 py-2 rounded-full text-sm border border-primary-100"
            >
              <span className="font-medium">{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-primary-500 hover:text-primary-700 font-bold text-lg leading-none hover:scale-110 transition-transform"
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
