import React, { createContext, useContext, useState, useEffect } from "react";
import { Audio } from "expo-av";

interface MusicPlayerContextProps {
  currentTrack: any;
  playTrack: (track: any) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  stopTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setPlaylist: (playlist: any[]) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(
  undefined
);

export const MusicPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const playTrack = async (track: any) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.songUrl,
    });
    setSound(newSound);
    await newSound.playAsync();
    setCurrentTrack({ ...track, sound: newSound });
  };

  const pauseTrack = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const resumeTrack = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const stopTrack = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setCurrentTrack(null);
    }
  };

  const nextTrack = async () => {
    if (currentTrackIndex < playlist.length - 1) {
      const nextTrack = playlist[currentTrackIndex + 1];
      setCurrentTrackIndex(currentTrackIndex + 1);
      await playTrack(nextTrack);
    }
  };

  const previousTrack = async () => {
    if (currentTrackIndex > 0) {
      const previousTrack = playlist[currentTrackIndex - 1];
      setCurrentTrackIndex(currentTrackIndex - 1);
      await playTrack(previousTrack);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        playTrack,
        pauseTrack,
        resumeTrack,
        stopTrack,
        nextTrack,
        previousTrack,
        setPlaylist,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
