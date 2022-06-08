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

  const hpAttr = data.attributes.find(({ trait_type }) => trait_type === 'HP');

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
      <div style={{ display: 'grid', justifyContent: 'center' }}>
        <h1 style={{ margin: 0, marginBottom: 6 }}>
          {characterAttr?.value} #{data?.id}
        </h1>
        <div>
          <div style={{ position: 'absolute', zIndex: 2, color: 'black' }}>
            HP: {hpAttr?.value}
          </div>
          <Image
            src={data?.image}
            width={260}
            height={260}
            layout="fixed"
            alt={`${characterAttr?.value} #${data?.id}`}
          />
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 8,
            marginBottom: 16,
            justifyContent: 'space-between',
          }}
        >
          <h2>
            Level {levelAttr?.value} {peaceAttr?.value === 'Yes' ? `☮️` : `⚔️`}
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
      </div>

      <div key={uuidv4()} style={{ display: 'flex', gap: 12 }}>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>&nbsp;</div>
      </div>
      <div style={{ display: 'grid', gridGap: 12 }}>
        {ownCombatEntries.map(({ attack, owner, warrior }, index) => {
          const victor = data?.chronicle[index]?.victor;
          const isVictor = victor === data?.id;
          const round = data?.chronicle[index]?.round;
          const ownAttack = attack || ownSyndicate;
          const opponentOwner = opponentCombatEntries[index]?.owner;
          const opponentSyndicate =
            opponentCombatEntries[index]?.warrior?.syndicate || '';
          const opponentWarriorId = opponentCombatEntries[index]?.warrior?.id;
          const opponentAttack =
            opponentCombatEntries[index]?.attack || opponentSyndicate;

          return (
            <div key={uuidv4()} style={{ display: 'flex', gap: 12 }}>
              {round + 1}
              {isVictor ? <div>W</div> : <div>L</div>}
              <Link href={`/boss/${owner}`}>{`${owner.slice(0, 5)}...`}</Link>
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
              <div>#{opponentWarriorId}</div>
              <Link href={`/boss/${opponentOwner}`}>{`${opponentOwner.slice(
                0,
                5
              )}...`}</Link>
              <Link
                href={`https://opensea.io/assets/ethereum/0x2dec96736e7d24e382e25d386457f490ae64889e/${opponentWarriorId}`}
              >
                <Image
                  src="/opensea-icon.png"
                  alt="opensea"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
