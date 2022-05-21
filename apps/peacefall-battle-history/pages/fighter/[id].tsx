import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import { uuid } from 'uuidv4';
import Link from 'next/link';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data?.message);
  }
  return data;
};

export default function Fighter() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/fighter/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  console.log('data', data);
  const levelAttr = data.attributes.find(
    ({ trait_type }) => trait_type === 'Level'
  );

  const characterAttr = data.attributes.find(
    ({ trait_type }) => trait_type === 'Character'
  );

  const combatEntries = data?.chronicle?.map(
    ({ combat_entries }) => combat_entries
  );

  const ownCombatEntries = combatEntries?.map((entry) => entry[1]);
  console.log('ownCombatEntries', ownCombatEntries);

  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <img src={data?.image} width={260} height={260} />
      <div>
        <div style={{ display: 'flex' }}>
          <h1 style={{ margin: 0, marginBottom: 6 }}>
            {characterAttr?.value} #{data?.id}
          </h1>
        </div>
        <h2 style={{ margin: 0, marginBottom: 20 }}>
          Level: {levelAttr?.value}
        </h2>
      </div>

      <div style={{ display: 'grid', gridGap: 12 }}>
        {ownCombatEntries.map(({ attack, owner }, index) => (
          <div key={uuid()} style={{ display: 'flex', gap: 12 }}>
            Round {index + 1}:
            <Image
              src={`/syndicate.${attack?.toLowerCase()}.png`}
              width={20}
              alt={attack}
              height={20}
            />
            {`${owner.slice(0, 6)}...`}
            <Link href={`https://opensea.io/${owner}`}>OS</Link>
            <Link
              href={`https://peacefall.xyz/api/rankings/totalOwned?address=${owner}`}
            >
              Fighters
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <img
        src={`https://challengers.peacefall.xyz/${data?.id}/${
          levelAttr?.value - 1
        }.gif`}
        width={300}
        height={300}
      />
 */
}
