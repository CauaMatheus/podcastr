import { createContext } from 'react';

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
  togglePlay(): void
  play(episode): void
  setPlayingState(state: boolean): void
}

const PlayerContext = createContext({} as PlayerContextData);

export { PlayerContext };
