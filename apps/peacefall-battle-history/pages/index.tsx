import { useRouter } from 'next/router';
import { useState } from 'react';
import useSwr from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Index({ fighter }) {
  const [fighterId, setFighterId] = useState(0);
  const router = useRouter();

  return (
    <div
      style={{
        display: 'grid',
        minHeight: '100vh',
        margin: 0,
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <div className="container">
        Fighter Id
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            router.push(`/fighter/${fighterId}`);
          }}
        >
          <input
            type="tel"
            maxLength={4}
            max="8192"
            onChange={(e) => {
              const fighterId = Number.parseInt(e.target.value);
              if (fighterId <= 8192) {
                setFighterId(fighterId);
              }
            }}
          />
        </form>
      </div>
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
