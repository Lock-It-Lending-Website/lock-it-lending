import React, { useEffect } from 'react';

type VideoModalProps = {
  video: {
    title: string;
    videoSrc: string;
  };
  onClose: () => void;
};

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl max-w-4xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 text-white text-2xl font-bold z-10"
        >
          ×
        </button>

        <div className="aspect-video bg-black">
          <video src={video.videoSrc} controls autoPlay className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
