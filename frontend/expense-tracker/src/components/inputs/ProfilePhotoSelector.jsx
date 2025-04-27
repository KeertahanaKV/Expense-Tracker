import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null); 
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
          <LuUser size={40} />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full overflow-hidden relative border-2 border-blue-500 shadow-md">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onChooseFile}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          <LuUpload size={18} />
          {image ? "Change" : "Upload"}
        </button>

        {image && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            <LuTrash size={18} />
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
