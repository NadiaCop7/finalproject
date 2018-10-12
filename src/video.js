import React from 'react';
//import React, { Component } from 'react';

const vidWindow = <iframe title='NorfolkVid' width="560" height="315" src="https://www.youtube.com/embed/SyX5e7_9tGs" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>

const Video = () => {
  return <p className="video">{vidWindow}</p>;
}

export default Video;
