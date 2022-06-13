//peacefall.xyz/api/rankings/totalOwned?address=${owner}

import {useRouter} from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import {FighterT, formatFighterResponse} from '@peacefall-stats/peacefall/utils'
import Link from 'next/link'

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  const fighters = data?.map(formatFighterResponse)

  if (!res.ok) {
    const error = {message: res.statusText};
    throw error;
  }
  return fighters as FighterT[];
};

const Boss = () => {
  const {query} = useRouter();

  const {data: warriors, error} = useSWR(
    () => query.id && `/api/address/${query?.id}`,
    fetcher
  );

  console.log('warriors', warriors)

  if (error) return <div>{error?.message}</div>;
  if (!warriors) return <div>Loading...</div>;
  if (warriors.length === 0)
    return <div>{`No warriors found for ${query?.id}`}</div>;

  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr)'
      }}
    >
      {warriors?.map(({id, name, image, hp, fights, level, peace, syndicate}) => (
        <div key={id}>
          <Link href={`/fighter/${id}`}>
            <h2 style={{cursor: 'pointer', marginBottom: 8}}>
              {name}
            </h2>
          </Link>

          <Link href={`/fighter/${id}`}>
            <Image src={image} width={260} height={260} style={{cursor: 'pointer'}}/>
          </Link>
          <h2>
            Level {level} {peace === 'Yes' ? `☮️` : `⚔️`}
          </h2>
          <p>id: {id}</p>
          <p>hp: {hp}</p>
          <p> fights: {fights?.length}</p>

          {fights.map(({self, victor}) => {
            const ownAttack = self.attack || syndicate;
            const ownDefaulted = !self.attack;
            return (
              <div style={{display: 'grid', alignItems: 'center', gridAutoFlow: 'column'}}>
              </div>
            )
          })}
        </div>

      ))}
    </div>
  );
};

export default Boss;
