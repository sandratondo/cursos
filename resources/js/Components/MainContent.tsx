import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface MainContentProps {
  url: string;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  lessonId: number | null;
}

const MainContent: React.FC<MainContentProps> = ({ url, title, type, lessonId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      const player = videojs(videoRef.current);
      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [url, type]);

  const renderContent = () => {
    switch (type) {
      case 'video':
        const videoName = url.split('/').pop()?.split('.').shift();
        const videoUrl = `/storage/videos/output_${videoName}_hls/output_${videoName}.m3u8`;
        return (
          <>
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <div className="relative w-full flex items-center justify-center bg-black" style={{ height: '80vh' }}>
              <video
                id="my-video"
                className="video-js h-full object-cover"
                controls
                preload="auto"
                width="640"
                height="264"
                data-setup="{}"
                ref={videoRef}
              >
                <source src={videoUrl} type="application/x-mpegURL" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        );
      case 'article':
      case 'quiz':
      case 'assignment':
        return (
          <>
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <iframe src={url} className="w-full h-full border-none" />
          </>
        );
      default:
        return null;
    }
  };

  return <div id="main-content">{renderContent()}</div>;
};

export default MainContent;
