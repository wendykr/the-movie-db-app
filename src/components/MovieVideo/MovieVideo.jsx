import React from 'react';
import './MovieVideo.scss';

export const MovieVideo = ({ video }) => {
  return (
    <div className="movieVideo">
      <iframe
        className="movieVideo__iframe"
        key={video.key}
        src={`https://www.youtube.com/embed/${video.key}`}
        title={video.name}
        allowFullScreen
      ></iframe>
    </div>
  );
};
