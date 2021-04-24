import { createContext, useContext, useState } from 'react';

interface Episode {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

interface PlayerContextData {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isShuffling: boolean
  isRepeating: boolean
  hasNext: boolean
  hasPrevious: boolean
  play(episode: Episode): void
  playList(episodeList: Episode[], currentIndex: number): void
  playNext(): void
  playPrevious(): void
  togglePlay(): void
  setPlayingState(state: boolean): void
  toggleShuffling(): void
  toggleRepeating(): void
  resetEpisodeList(): void
}

const PlayerContext = createContext({} as PlayerContextData);

const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeList] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeList(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], currentIndex: number) {
    setEpisodeList(list);
    setCurrentEpisodeList(currentIndex);
    setIsPlaying(true);
  }

  const hasNext = currentEpisodeIndex + 1 < episodeList.length || isShuffling;
  function playNext() {
    if (isShuffling) {
      setCurrentEpisodeList(Math.floor(Math.random() * episodeList.length));
    } else if (hasNext) {
      setCurrentEpisodeList(currentEpisodeIndex + 1);
    }
  }

  const hasPrevious = currentEpisodeIndex - 1 >= 0;
  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeList(currentEpisodeIndex - 1);
    }
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function toggleShuffling() {
    setIsShuffling(!isShuffling);
  }

  function toggleRepeating() {
    setIsRepeating(!isRepeating);
  }

  function resetEpisodeList() {
    setEpisodeList([]);
    setCurrentEpisodeList(0);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      play,
      hasNext,
      playNext,
      hasPrevious,
      playPrevious,
      togglePlay,
      playList,
      currentEpisodeIndex,
      isPlaying,
      isShuffling,
      isRepeating,
      setPlayingState,
      toggleShuffling,
      toggleRepeating,
      resetEpisodeList,
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerContext = (): PlayerContextData => {
  return useContext(PlayerContext);
};

export { PlayerContext, PlayerContextProvider, usePlayerContext };
