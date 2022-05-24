import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = res.json();

  if (!res.ok) {
    const error = { message: res.statusText };
    throw error;
  }
  return data;
};

export default function Fighter() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/fighter/${query.id}`,
    fetcher
  );

  if (error) return <div>{error?.message}</div>;
  if (!data) return <div>Loading...</div>;

  const levelAttr = data.attributes.find(
    ({ trait_type }) => trait_type === 'Level'
  );

  const syndicateAttr = data.attributes.find(
    ({ trait_type }) => trait_type === 'Syndicate'
  );

  const characterAttr = data.attributes.find(
    ({ trait_type }) => trait_type === 'Character'
  );

  const combatEntries = data?.chronicle?.map(
    ({ combat_entries }) => combat_entries
  );

  const peaceAttr = data.attributes.find(
    ({ trait_type }) => trait_type === 'Peace'
  );

  const ownCombatEntries = combatEntries?.map((entry) => entry[1]);

  const opponentCombatEntries = combatEntries?.map((entry) => entry[0]);

  const ownSyndicate = syndicateAttr?.value;

  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <h1 style={{ margin: 0, marginBottom: 6 }}>
        {characterAttr?.value} #{data?.id}
      </h1>
      <Image
        src={data?.image}
        width={260}
        height={260}
        alt={`${characterAttr?.value} #${data?.id}`}
      />

      <div
        style={{
          display: 'flex',
          marginTop: 8,
          marginBottom: 16,
          justifyContent: 'space-between',
        }}
      >
        <h2>
          Level {levelAttr?.value} {peaceAttr ? `☮️` : `⚔️`}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={`/syndicate.${ownSyndicate.toLowerCase()}.png`}
            width={20}
            layout="fixed"
            alt={syndicateAttr}
            height={20}
          />
          <h2 style={{ marginLeft: 8 }}>{ownSyndicate}</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridGap: 12 }}>
        {ownCombatEntries.map(({ attack, owner }, index) => {
          const ownAttack = attack || ownSyndicate;
          const opponentSyndicate =
            opponentCombatEntries[index]?.warrior?.syndicate || '';
          const opponentAttack =
            opponentCombatEntries[index]?.attack || opponentSyndicate;

          return (
            <div key={uuidv4()} style={{ display: 'flex', gap: 12 }}>
              Round {index + 1}:
              <Image
                src={`/syndicate.${ownAttack?.toLowerCase()}.png`}
                width={20}
                layout="fixed"
                alt={attack}
                height={20}
              />
              <Image
                src={`/syndicate.${opponentAttack?.toLowerCase()}.png`}
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
          );
        })}
      </div>
    </div>
  );
}
