import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Header } from '../components/Header';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../contexts/PlayerContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
};

export default MyApp;
