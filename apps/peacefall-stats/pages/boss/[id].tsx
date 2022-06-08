//peacefall.xyz/api/rankings/totalOwned?address=${owner}

import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = res.json();

  if (!res.ok) {
    const error = { message: res.statusText };
    throw error;
  }
  return data;
};

const Boss = () => {
  const { query } = useRouter();
  console.log('query', query);
  const { data: warriors = [], error } = useSWR(
    () => query.id && `/api/address/${query?.id}`,
    fetcher
  );
  if (!warriors) return <div>Loading...</div>;

  console.log('warriors', warriors);
  return (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr)',
      }}
    >
      {warriors.length === 0 && <div>No warriors found for {query?.id}</div>}
      {warriors?.map(({ id, name, image }) => (
        <div key={id}>
          <p>{id}</p>
          <p>{name}</p>
          <Image src={image} width={260} height={260} />
        </div>
      ))}
    </div>
  );
};

export default Boss;
