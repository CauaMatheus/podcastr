import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}

const Home: React.FC<AppProps> = ({ episodes }) => {
  return (
    <p>{JSON.stringify(episodes)}</p>
  );
};

export default Home;