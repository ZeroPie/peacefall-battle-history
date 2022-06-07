import Image from 'next/image';
import { useState } from 'react';

import { styled } from '../stitches.config';

const BattleLayout = styled('div', {
  display: 'grid',
  minHeight: '100vh',
  margin: 0,
  gridTemplateRows: '1fr auto',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: `
    "battlefield"
    "menu"
  `,
});

const OwnFighters = styled('div', {
  gridArea: 'battlefield',
  height: 200,
  width: 300,
  bottom: 0,
  zIndex: 1,
  backgroundColor: '#fff',
});

const ImageWrapper = styled('div', {
  position: 'absolute',
  bottom: 0,
});

const Menu = styled('div', {
  backgroundColor: 'black',
  display: 'grid',
});

const GridRow = styled('div', {
  gridArea: 'menu',
  display: 'grid',
  gridGap: '$16',
  gridAutoFlow: 'column',
  width: '100%',
  backgroundColor: 'black',
});

const AttackBox = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  border: '1px solid white',
  padding: '$12',
  width: 50,
  height: 50,
});

const CharPortrait = styled('div', {
  color: 'white',
});

const CharName = styled('div', {
  display: 'flex',
  color: 'white',
  fontSize: '$20',
});

export const BackgroundImageWrapper = styled('div', {
  position: 'fixed',
  zIndex: -1,
  width: '100vw',
  height: '100vh',
});

function AttackSelection({ onClose }) {
  return (
    <Menu>
      <div>
        <CharPortrait>
          <CharName>Ninja</CharName>
        </CharPortrait>
      </div>
      <GridRow>
        <AttackBox>
          <Image
            src={`/syndicate.fire.png`}
            width={30}
            objectFit="cover"
            objectPosition="center"
            layout="fixed"
            alt="fire"
            height={24}
          />
        </AttackBox>
        <AttackBox>Fire</AttackBox>
        <AttackBox>Water</AttackBox>
        <AttackBox> Metal</AttackBox>
        <AttackBox>Earth</AttackBox>
        <AttackBox>Timber</AttackBox>
      </GridRow>
    </Menu>
  );
}

const ownFighters = [
  {
    name: 'spectre 1',
    imgSrc: {
      base: '/spectre.jpg',
      attack_transition: '/spectre.png',
      attack: '/spectre.attack.gif',
    },
  },
  {
    name: 'ninja 2',
    imgSrc: {
      base: '/ninja.jpg',
      attack_transition: '/ninja.attack.transition.png',
      attack: '/spectre.attack.gif',
    },
  },
];

//
export function Index({ ownFighers, opponentFighters }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  return (
    <BattleLayout>
      <OwnFighters>
        <ImageWrapper>
          {!isHovered && (
            <Image
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              layout="fixed"
              src="/spectre.png"
              width={320}
              height={320}
              style={{ transform: 'scaleX(-1)' }}
              alt="spectre"
            />
          )}
        </ImageWrapper>

        <ImageWrapper onClick={() => setIsSelected(true)}>
          {isHovered && (
            <Image
              src="/spectre.attack.gif"
              layout="fixed"
              width={320}
              height={320}
              objectFit="cover"
              style={{ transform: 'scaleX(-1)' }}
              alt="spectre"
            />
          )}
        </ImageWrapper>
        <ImageWrapper onClick={() => setIsSelected(true)}>
          <Image
            src="/ninja.attack.transition.gif"
            layout="fixed"
            width={240}
            height={240}
            style={{ transform: 'scaleX(-1)' }}
            alt="spectre"
          />
        </ImageWrapper>
      </OwnFighters>
      <AttackSelection onClose={() => setIsSelected(false)} />
      <BackgroundImageWrapper>
        <Image
          src="/bg-battle.0.jpeg"
          layout="fill"
          alt="background"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: 'auto',
          }}
        />
      </BackgroundImageWrapper>
    </BattleLayout>
  );
}

export default Index;

export async function getStaticProps() {
  const response = await fetch('https://challengers.peacefall.xyz/1.json');
  const fighter = await response.json();
  return { props: { fighter } };
}
