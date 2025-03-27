import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume, VolumeOff, Fullscreen, Minimize } from "lucide-react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import './videoplayer.css'
type Props = {
  video: string;
};

const VideoPlayer = ({ video }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const runningRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [prevVolume, setPrevVolume] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const[isFullScreen,setIsFullScreen] =useState<boolean>(false)
  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    console.log(volume);
    if (!videoRef.current) return;
    videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!videoRef.current || !runningRef.current) return;
    const video = videoRef.current;
    const running = runningRef.current;

    function action(e: KeyboardEvent) {
      if (document.activeElement !== video) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === " ") {
        e.preventDefault();
      }

      if (e.key === "ArrowUp") {
        setVolume((prev) => Math.min(1, prev + 0.1));
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setVolume((prev) => Math.max(0, prev - 0.1));
      }
      if (e.key === "ArrowRight") {
        if (video.currentTime + 5 <= video.duration) {
          video.currentTime += 5;
        } else {
          video.currentTime = video.duration;
        }
      }
      if (e.key === "ArrowLeft") {
        if (video.currentTime - 5 >= 0) {
          video.currentTime -= 5;
        } else {
          video.currentTime = 0;
        }
      }
      if (e.key === " ") {
        setIsPlaying((prev) => !prev);
      }
    }

    function dbClickFunc(e: MouseEvent) {
      if (document.activeElement !== video) return;
      console.log("hihihihi");
      setIsPlaying((prev) => !prev);
    }

    function handleTimeUpdate() {
      setCurrentTime(Number(videoRef.current?.currentTime));
      running.value = String(video.currentTime);
    }

    const onMetadataLoaded = () => {
      setDuration(Number(video.duration));
      console.log(video.duration);
    };

    video.addEventListener("loadedmetadata", onMetadataLoaded);
    video.addEventListener("keydown", action);
    video.addEventListener("dblclick", dbClickFunc);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("keydown", action);
      video.removeEventListener("dblclick", dbClickFunc);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
    };
  }, [videoRef, runningRef]);

  function handleVideoToggle() {
    setIsPlaying((prev) => !prev);
  }

  function handleVideoValume(val: number) {
    if (val > 1 || val < 0) return;
    setVolume(val);
  }

  function handleVideoTime(val: number) {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Number(val);
    setCurrentTime(val);
  }
  function formatTime(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true)
    } else {
      document.exitFullscreen();
      setIsFullScreen(false)
    }
  };


  
  


  return (
    <div ref={containerRef} className="position-relative text-white ">
      <video
        ref={videoRef}
        src={video}
        tabIndex={0}
        className="w-100"
        
        style={{ outline: "none" }}
      />
      <div
        className="position-absolute d-flex flex-column justify-content-between  z-3  w-100 "
        style={{
          bottom: `${!isFullScreen ? '6px' :'0px'}`,
          boxShadow: 'inset 0 20px 100px rgba(0, 0, 0, 0.6), inset 0 -20px 100px rgba(0, 0, 0, 0.3)',
          overflow:'hidden'
        }}
      >
        <div className="d-flex w-100 px-2" style={{accentColor:''}}>
          <input
            className="flex-grow-1 "
            type="range"
            min={0}
            max={duration}
            ref={runningRef}
            value={currentTime}
            onChange={(e) => handleVideoTime(Number(e.target.value))}
          />
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center gap-4 mx-2 ">
            <div className="d-flex align-items-center  gap-2 shadow-lg">
              <div onClick={handleVideoToggle} className="p-2 ">
                {!isPlaying ? <Pause color="white" fill="white"/> : <Play color="white" fill="white" />}
              </div>
              <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="d-flex align-items-center"
              >
                <div
                  onClick={() => {
                    if (volume !== 0) {
                      setPrevVolume(volume);
                      handleVideoValume(0);
                    } else {
                      handleVideoValume(prevVolume);
                    }
                  }}
                >
                  {volume === 0 ? <VolumeOff color="white" fill="white"/> : <Volume color="white" fill="white" />}
                </div>
                {isHovering && (
                  <div className="ms-2 r ">

                  <input
                  className=""
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    ref={volumeRef}
                    onChange={(e) => handleVideoValume(Number(e.target.value))}
                  />
                  </div>
                )}
              </div>
              <div>
                {formatTime(currentTime)} /{formatTime(duration)}{" "}
              </div>
            </div>

            <div onClick={handleFullscreenToggle}>{isFullScreen ? <Minimize />:<Fullscreen/>}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
