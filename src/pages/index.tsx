import { AppProps } from "next/dist/next-server/lib/router/router";

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes') || await fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c4ea48b9-25ef-4267-aa02-f4815e2a3459/server.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210420T194815Z&X-Amz-Expires=86400&X-Amz-Signature=da6b9735ef9656ae6c0a26824539270df278acc3bdea57edd0330a0408d70acf&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22server.json%22')
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