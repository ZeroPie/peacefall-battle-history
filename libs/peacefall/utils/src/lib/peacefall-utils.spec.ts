import {
  attributeExtractor,
  ChronicleEntryT,
  CombatEntryT,
  FighterRespT,
  createFightObject, createFightsArray,
  formatFighterResponse,
  isSelf
} from './peacefall-utils';
import * as fighterMock from './fighter.json'

describe('peacefall-utils', () => {

  it('should format fighter Data appropiately', () => {
    const fighter = formatFighterResponse(fighterMock as any);
    expect(fighter).toStrictEqual({
      id: 7040,
      image: "https://challengers.peacefall.xyz/7040/4.gif",
      animation_url: 'https://embedded-nft-smmall.wunderbucket.dev/index-dynamic.html?id=7040',
      name: 'Peacefall #7040',
      character: 'The Don',
      type: 'Alien',
      hair: 'Night',
      'garment (top)': 'Blonde Satin',
      'garment (bottom)': 'Sky Slacks',
      syndicate: 'Renegade',
      weapon: 'Paranza Corta',
      hp: 207,
      level: '5',
      peace: 'No',
      dead: 'No',
      fights: fightsExpected
    });
  });


  it('should create an object from the attribute', () => {
    const level = attributeExtractor({value: 5, trait_type: 'Level'})
    const syndicate = attributeExtractor({value: 'renegade', trait_type: 'Syndicate'})
    expect(level).toEqual({level: 5})
    expect(syndicate).toEqual({syndicate: 'renegade'})
  })


  it('should find out if an entry is about self', () => {
    const entry1 = fighterMock.chronicle[0].combat_entries[1] as CombatEntryT
    expect(isSelf(7040)(entry1)).toBe(true)
    expect(isSelf(6069)(entry1)).toBe(false)
  })


  it('should extract own combat entry', () => {
    const combatEntries = fighterMock.chronicle[0].combat_entries as CombatEntryT[]
    const ownEntry = combatEntries.find(isSelf(7040))
    console.log(ownEntry)

    expect(ownEntry).toStrictEqual({
      attack: 'EARTH',
      owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
      warrior: {
        hp: 72,
        id: 7040,
        level: 0,
        name: 'Peacefall #7040',
        syndicate: 'RENEGADE'
      }
    })
  })

  it('should generate a valid fight object from a chronicle object', () => {
    const fight = createFightObject({fighterId: fighterMock.id})(
      fighterMock.chronicle[0] as unknown as ChronicleEntryT
    )
    expect(fight).toStrictEqual(fightsExpected[0])
  })

  it('should generate an array of fights', () => {
    const fights = createFightsArray({fighterId: fighterMock.id})(
      fighterMock as unknown as FighterRespT
    )
    expect(fights).toStrictEqual(fightsExpected)
  })
})


const fightsExpected = [{
  fatal: null,
  id: '0/7040,7467',
  opponent: {
    attack: 'WATER',
    hp: 41,
    id: 7467,
    level: 0,
    name: 'Peacefall #7467',
    owner: '0x7Ce9A3b6c2D34966C27CA66A6b0FDE5e27e55633',
    syndicate: 'EARTH'
  },
  recorded_at: '2022-04-21T14:12:59.556124',
  round: 0,
  self: {
    attack: 'EARTH',
    hp: 72,
    id: 7040,
    level: 0,
    name: 'Peacefall #7040',
    owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
    syndicate: 'RENEGADE'
  },
  victor: 7040
},
  {
    fatal: null,
    id: '1/2966,7040',
    opponent: {
      attack: 'FIRE',
      hp: 51,
      id: 2966,
      level: 0,
      name: 'Peacefall #2966',
      owner: '0xC458e1a4eC03C5039fBF38221C54Be4e63731E2A',
      syndicate: 'FIRE'
    },
    recorded_at: '2022-04-28T14:28:33.577393',
    round: 1,
    self: {
      attack: 'WATER',
      hp: 82,
      id: 7040,
      level: 1,
      name: 'Peacefall #7040',
      owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
      syndicate: 'RENEGADE'
    },
    victor: 7040
  },
  {
    fatal: null,
    id: '2/4085,7040',
    opponent: {
      attack: null,
      hp: 53,
      id: 4085,
      level: 1,
      name: 'Peacefall #4085',
      owner: '0x7f02D5A5561096B231F567002C81ebedCa1A619d',
      syndicate: 'WATER'
    },
    recorded_at: '2022-05-05T14:28:05.082721',
    round: 2,
    self: {
      attack: 'TIMBER',
      hp: 103,
      id: 7040,
      level: 3,
      name: 'Peacefall #7040',
      owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
      syndicate: 'RENEGADE'
    },
    victor: 7040
  },
  {
    fatal: true,
    id: '3/2430,7040',
    opponent:
      {
        attack: null,
        hp: 24,
        id: 2430,
        level: 1,
        name: 'Peacefall #2430',
        owner: '0xE5F0Fc858aE0010aA3A9f7038cdD0C50BF0dC827',
        syndicate: 'EARTH'
      },
    recorded_at: '2022-05-20T14:21:20.546571',
    round: 3,
    self: {
      attack: 'EARTH',
      hp: 129,
      id: 7040,
      level: 4,
      name: 'Peacefall #7040',
      owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
      syndicate: 'RENEGADE'
    },
    victor: 7040
  },
  {
    fatal: true,
    id: '4/1831,7040',
    opponent: {
      attack: 'METAL',
      hp: 72,
      id: 1831,
      level: 4,
      name: 'Peacefall #1831',
      owner: '0x457dFcA8C3039b48B09515964bd5875a15B15D17',
      syndicate: 'METAL'
    },
    recorded_at: '2022-06-03T14:06:42.791340',
    round: 4,
    self: {
      attack: 'METAL',
      hp: 155,
      id: 7040,
      level: 5,
      name: 'Peacefall #7040',
      owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
      syndicate: 'RENEGADE'
    },
    victor: 7040
  },
  {
    fatal: true,
    id: '5/3671,7040',
    opponent: {
      attack: 'WATER',
      hp: 108,
      id: 3671,
      level: 5,
      name: 'Peacefall #3671',
      owner: '0xa061982D4B087D911Db8399a641187dF945D48D0',
      syndicate: 'WATER'
    },
    recorded_at: '2022-06-09T14:45:52.219322',
    round: 5,
    self: {
      attack: 'WATER',
      hp: 181,
      id: 7040,
      level: 5,
      name: 'Peacefall #7040',
      owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
      syndicate: 'RENEGADE'
    },
    victor: 7040
  }
]
