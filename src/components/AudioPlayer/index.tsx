import React, { useState, useRef, useEffect } from "react";
import {
  AudioPlayerButton,
  AudioPlayerContainer,
  ProgressBar,
  TimeInfo,
} from "./styles";
import Image from "next/image";

interface AudioPlayerProps {
  audioUrl?: string;
}

const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio(audioUrl));

  const audio = audioRef.current;

  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        audio.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audio.pause();
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
      });
    }
    return () => {
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("timeupdate", () => {});
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: any) => {
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <AudioPlayerContainer>
      <AudioPlayerButton onClick={togglePlay}>
        {isPlaying ? (
          <Image width={30} height={30} src="/icons/pause.svg" alt="pause" />
        ) : (
          <Image width={30} height={30} src="/icons/play.svg" alt="play" />
        )}
      </AudioPlayerButton>
      <ProgressBar
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleProgressChange}
      />
      <TimeInfo>
        <span>{formatTime(currentTime)}</span> /{" "}
        <span>{formatTime(duration)}</span>
      </TimeInfo>
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
