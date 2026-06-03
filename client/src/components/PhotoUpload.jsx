import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './PhotoUpload.css';

function PhotoUpload({ onPhotoUpload, currentPhoto }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onPhotoUpload(reader.result);
    };
    reader.readAsDataURL(file);
  }, [onPhotoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className="photo-upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {currentPhoto ? (
          <div className="photo-preview">
            <img src={currentPhoto} alt="Borrower" />
            <p>Click or drag to change photo</p>
          </div>
        ) : isDragActive ? (
          <p>Drop the photo here...</p>
        ) : (
          <p>Drag & drop borrower's photo here, or click to select</p>
        )}
      </div>
      {currentPhoto && (
        <div className="photo-required-badge">
          ✓ Photo uploaded (required)
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;