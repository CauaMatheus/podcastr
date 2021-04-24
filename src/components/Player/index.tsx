import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import { usePlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

const Player: React.FC = () => {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    hasNext,
    playNext,
    hasPrevious,
    playPrevious,
    toggleRepeating,
    isRepeating,
    toggleShuffling,
    isShuffling,
    resetEpisodeList,
  } = usePlayerContext();

  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function changeCurrentTime(value: number) {
    audioRef.current.currentTime = value;
    setProgress(value);
  }

  function handleEnded() {
    if (hasNext || isRepeating) {
      playNext();
    } else {
      resetEpisodeList();
      setProgress(0);
    }
  }

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image src={episode.thumbnail} width={759} height={759} objectFit="cover" />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      {episode && (
        <audio
          src={episode.url}
          autoPlay
          ref={audioRef}
          loop={isRepeating}
          onEnded={() => { return handleEnded(); }}
          onLoadedMetadata={() => { return setupProgressListener(); }}
          onPlay={() => { return setPlayingState(true); }}
          onPause={() => { return setPlayingState(false); }}
        />
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {!episode ? (
              <div className={styles.emptySlider} />
            ) : (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={(value) => { return changeCurrentTime(value); }}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            className={isShuffling ? styles.isActive : ''}
            disabled={!episode || episodeList.length <= 1}
            onClick={() => { return toggleShuffling(); }}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode || !hasPrevious} onClick={() => { return playPrevious(); }}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={() => { togglePlay(); }}
          >
            {
              isPlaying ? (
                <img src="/pause.svg" alt="Pausar" />
              ) : (
                <img src="/play.svg" alt="Tocar" />
              )
            }
          </button>
          <button type="button" disabled={!episode || !hasNext} onClick={() => { playNext(); }}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button
            type="button"
            className={isRepeating ? styles.isActive : ''}
            disabled={!episode}
            onClick={() => { return toggleRepeating(); }}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export { Player };
