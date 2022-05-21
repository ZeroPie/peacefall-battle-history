import { useRouter } from 'next/router';
import useSwr from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Index({ fighter }) {
  console.log('fighter', fighter);
  const router = useRouter();
  const fighterId = router?.query?.id || '1';
  return (
    <div
      style={{
        display: 'grid',
        minHeight: '100vh',
        margin: 0,
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <div className="container">lalal</div>
    </div>
  );
}

export default Index;

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const response = await fetch('https://challengers.peacefall.xyz/1.json');
  const fighter = await response.json();

  // Props returned will be passed to the page component
  return { props: { fighter } };
}
