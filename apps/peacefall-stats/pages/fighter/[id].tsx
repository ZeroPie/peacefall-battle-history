import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import {
  formatFighterResponse,
  killingStreaks,
  winningStreaks,
} from '@peacefall-stats/peacefall/utils';

const fetcher = async (url = '') => {
  const res = await fetch(url);
  const data = await res.json();
  const fighter = formatFighterResponse(data);
  if (!res.ok) {
    throw { message: res.statusText };
  }
  return fighter;
};

export default function Fighter() {
  const { query } = useRouter();
  const { data: fighter, error } = useSWR(
    () => query.id && `/api/fighter/${query.id}`,
    fetcher
  );

  if (error) return <div>{error?.message}</div>;
  if (!fighter) return <div>Loading...</div>;

  //TODO: clean this mess up
  let maxConsecutiveWins = 0;
  let consecutiveWins = 0;

  for (let i = 0; i < fighter.fights.length; i++) {
    if (fighter.fights[i].victor === fighter.id) {
      consecutiveWins++;
      maxConsecutiveWins = consecutiveWins;
    }
    if (fighter.fights[i].victor !== fighter.id) {
      if (consecutiveWins > maxConsecutiveWins) {
        maxConsecutiveWins = consecutiveWins;
      }
      consecutiveWins = 0;
    }
  }

  const consecutiveKills = fighter.fights.reduce(
    (acc, curr, i) =>
      curr.victor === fighter.id && curr.fatal === true ? acc + 1 : acc,
    0
  );

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
          {fighter.character} #{fighter.id}
        </h1>
        <div>
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              background: 'black',
              opacity: 0.3,
              padding: 2,
              width: 64,
              height: 24,
            }}
          />
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              color: 'white',
              padding: 4,
            }}
          >
            HP: {fighter.hp}
          </div>
          <Image
            src={fighter?.image}
            width={280}
            height={280}
            layout="fixed"
            alt={`${fighter?.name} #${fighter?.id}`}
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
            Level {fighter?.level} {fighter?.peace === 'Yes' ? `☮️` : `⚔️`}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={`/syndicate.${fighter?.syndicate?.toLowerCase()}.png`}
              width={20}
              layout="fixed"
              alt={fighter?.syndicate}
              height={20}
            />
            <h2 style={{ marginLeft: 8 }}>{fighter?.syndicate}</h2>
          </div>
        </div>
        {!!fighter['potions used'] && (
          <h3>
            Potions used: {''}
            {new Array(parseInt(fighter?.['potions used'])).fill('🧪')}
          </h3>
        )}
        {!!fighter.kills && (
          <div
            style={{
              display: 'flex',
              marginTop: 8,
              marginBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            <h2 style={{ display: 'flex', alignItems: 'center' }}>
              Kills: {new Array(fighter?.kills).fill('☠️')}
            </h2>
            <h2 style={{ color: 'red' }}>
              {` ${killingStreaks[consecutiveKills]}`}
            </h2>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            marginTop: 8,
            marginBottom: 16,
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            Win Streak: {maxConsecutiveWins}
          </h2>
          <h2 style={{ color: 'red' }}>{winningStreaks[maxConsecutiveWins]}</h2>
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
        {fighter?.fights.map(({ victor, round, self, opponent, fatal, id }) => {
          const ownAttack = self?.attack || fighter?.syndicate;
          const oppAttack = opponent?.attack || opponent?.syndicate;
          const ownDefaulted = !self?.attack;
          const oppDefaulted = !opponent?.attack;

          return (
            <div
              key={uuidv4()}
              style={{
                display: 'flex',
                gap: '24px 12px',
                alignItems: 'center',
              }}
            >
              {round + 1}.
              {victor === fighter?.id ? (
                <div style={{ color: 'green' }}>W</div>
              ) : (
                <div style={{ color: 'red' }}>L</div>
              )}
              <div style={{ cursor: 'pointer' }}>
                {self?.owner ? (
                  <Link href={`/boss/${self?.owner}`}>{`${self?.owner?.slice(
                    0,
                    5
                  )}..`}</Link>
                ) : (
                  '-------'
                )}
              </div>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  width: 'max-content',
                }}
              >
                <Image
                  src={`/syndicate.${ownAttack?.toLowerCase()}.png`}
                  width={20}
                  layout="fixed"
                  alt={self?.attack}
                  height={20}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'black',
                    paddingLeft: 3,
                  }}
                >
                  {ownDefaulted && 'D'}
                </div>
              </div>
              <div
                style={{ width: 22, display: 'flex', justifyContent: 'center' }}
              >
                {self?.hp}
              </div>
              <div
                style={{ width: 22, display: 'flex', justifyContent: 'center' }}
              >
                {opponent?.hp}
              </div>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  width: 'max-content',
                }}
              >
                <Image
                  src={`/syndicate.${oppAttack.toLowerCase()}.png`}
                  width={20}
                  alt={opponent?.attack}
                  height={20}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'black',
                    paddingLeft: 3,
                  }}
                >
                  {oppDefaulted && 'D'}
                </div>
              </div>
              <div style={{ cursor: 'pointer' }}>
                {opponent?.owner ? (
                  <Link href={`/boss/${opponent.owner}`}>
                    {`${opponent?.owner?.slice(0, 5)}..`}
                  </Link>
                ) : (
                  '-------'
                )}
              </div>
              <Link href={`/fighter/${opponent.id}`}>
                <div style={{ display: 'flex', alignContent: 'center' }}>
                  <div
                    style={{
                      width: 42,
                      display: 'flex',
                      cursor: 'pointer',
                      marginRight: 4,
                    }}
                  >
                    #{opponent.id}
                  </div>
                  <Image
                    src={`/syndicate.${opponent.syndicate.toLowerCase()}.png`}
                    width={16}
                    layout="fixed"
                    alt={opponent?.syndicate}
                    height={16}
                  />
                </div>
              </Link>
              <Link
                href={`https://opensea.io/assets/ethereum/0x2dec96736e7d24e382e25d386457f490ae64889e/${opponent.id}`}
              >
                <Image
                  style={{ cursor: 'pointer' }}
                  src="/opensea-icon.png"
                  alt="opensea"
                  layout="fixed"
                  width={18}
                  height={18}
                />
              </Link>
              {fatal && <div style={{ lineHeight: 1 }}>☠️</div>}
              {id === -1 && (
                <div style={{ lineHeight: 1 }}>{id === -1 && '🤼️'}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
