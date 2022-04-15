//internal imports
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import testVideoSong from "./assets/video/yt1s.com - Fitoor OST 2021 Shani Arshad Aima Baig Faysal Qureshi Hiba Bukhari_v720P.mp4";
function App() {
  const [isMetaDataLoaded, setIsMetaDataLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const rangeRef = useRef<any>(null);
  const animationRef = useRef<any>();
  useEffect(() => {
    const seconds = videoRef.current?.duration;
    setDuration(seconds || 0);
    rangeRef.current.max = seconds;
  }, [isMetaDataLoaded]);

  const onLoadedMetadata = () => {
    setIsMetaDataLoaded(true);
  };

  const changePlayerCurrentTime = () => {
    rangeRef.current.style.setProperty(
      "--seek-before-width",
      `${(rangeRef.current.value / duration) * 100}%`
    );
  };

  const whilePlaying = () => {
    if (videoRef.current !== null && rangeRef.current !== null) {
      rangeRef.current.value = videoRef.current?.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
      // console.log("animationRef.current ", animationRef.current);
    }
  };

  const onPlaying = () => {
    setIsPlaying(true);
    whilePlaying();
  };

  const onPause = () => {
    setIsPlaying(false);
    cancelAnimationFrame(animationRef.current);
  };
  const rangeChange = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = rangeRef.current.value;
      changePlayerCurrentTime();
    }
  };

  return (
    <div className='App'>
      <h1>My custom Video Player</h1>
      <video
        src={testVideoSong}
        crossOrigin='anonymous'
        controls
        ref={videoRef}
        className='customVideoPlayer'
        onLoadedMetadata={onLoadedMetadata}
        onPlaying={onPlaying}
        onPause={onPause}
        preload='auto'></video>
      <input
        type='range'
        className='amount-progress'
        step='any'
        onChange={rangeChange}
        min={0}
        value={videoRef.current?.currentTime}
        ref={rangeRef}
      />
    </div>
  );
}

export default App;
