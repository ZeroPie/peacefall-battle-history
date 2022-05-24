import { Input } from '@peacefall-ui';
import { useRouter } from 'next/router';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Index({ fighter }) {
  const [fighterId, setFighterId] = useState(0);
  const router = useRouter();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          router.push(`/fighter/${fighterId}`);
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label htmlFor="figtherId">Fighter Id</label>

          <Input
            id="figtherId"
            type="number"
            min={0}
            maxLength={4}
            max={8191}
            value={fighterId}
            onChange={(e) => {
              if (e.target.value.length <= 4) {
                const fighterId = Number.parseInt(e.target.value);
                setFighterId(fighterId);
              }
            }}
          />
        </div>
      </form>
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
