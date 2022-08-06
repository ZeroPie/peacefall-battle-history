import {
  attributeExtractor,
  createFightObject,
  createFightsArray,
  formatFighterResponse,
  isSelf,
} from './peacefall-utils';
import * as fighterMock from './fighter.json';
import * as fighterFormattedMock from './fighter.formatted.json';
import {
  ChronicleEntryT,
  CombatEntryT,
  ContextChronicleEntryT,
  FighterRespT,
} from './types';

describe('peacefall-utils', () => {
  it('should format fighter Data appropriately', () => {
    const fighter = formatFighterResponse(
      fighterMock as unknown as FighterRespT
    );
    expect(fighter).toStrictEqual(fighterFormattedMock);
  });

  it('should create an object from the attribute', () => {
    const level = attributeExtractor({ value: 5, trait_type: 'Level' });
    const syndicate = attributeExtractor({
      value: 'renegade',
      trait_type: 'Syndicate',
    });
    expect(level).toEqual({ level: 5 });
    expect(syndicate).toEqual({ syndicate: 'renegade' });
  });

  it('should find out if an entry is about self', () => {
    const entry1 = fighterMock.chronicle[0].combat_entries[1] as CombatEntryT;
    expect(isSelf(7040)(entry1)).toBe(true);
    expect(isSelf(6069)(entry1)).toBe(false);
  });

  it('should extract own combat entry', () => {
    const combatEntries = fighterMock.chronicle[0]
      .combat_entries as CombatEntryT[];
    const ownEntry = combatEntries.find(isSelf(7040));

    expect(ownEntry).toStrictEqual({
      attack: 'EARTH',
      owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
      warrior: {
        hp: 72,
        id: 7040,
        level: 0,
        name: 'Peacefall #7040',
        syndicate: 'RENEGADE',
      },
    });
  });

  const createFightObjectFromChronicle =
    ({ fighterId }: { fighterId: FighterRespT['id'] }) =>
    ({ entries, victor }: ContextChronicleEntryT) => {
      const selfEntry = entries.find(isSelf(fighterId));
      const opponentEntry = entries.find(isSelf(fighterId));
      return {
        victor,
        self: selfEntry,
        opponent: opponentEntry,
      };
    };

  it('should generate a valid fight object from a chronicle object', () => {
    const fight = createFightObject({ fighterId: fighterMock.id })(
      fighterMock.chronicle[0] as unknown as ChronicleEntryT
    );
    expect(fight).toStrictEqual(fighterFormattedMock.fights[0]);
  });

  it('should generate an array of fights', () => {
    const fights = createFightsArray({ fighterId: fighterMock.id })(
      fighterMock as unknown as FighterRespT
    );
    expect(fights).toStrictEqual(fighterFormattedMock.fights);
  });

  it('should turn a tournament chronic into a valid chronic', () => {
    const { context_chronicles = {} } = fighterMock as unknown as FighterRespT;
    const { id } = fighterMock;
    const contextChronicle = Object.keys(context_chronicles).map(
      (key) => context_chronicles[key]
    );

    const fight = createFightObjectFromChronicle({ fighterId: id })({
      context_id: '',
      entries: [],
      victor: 1,
      state: 1,
    });

    const result = Object.keys(context_chronicles || {}).reduce(
      (prev, curr) => ({
        combat_entries: context_chronicles[curr],
        fatal: false,
        state: null,
        victor: context_chronicles && context_chronicles[curr][0],
      }),
      {} as any
    );

    expect(fight).toStrictEqual({
      tournament: 'champions',
      fatal: false,
      id: '7/4543,7040',
      context_id: 'champions-2022-07',
      opponent: {
        attack: null,
        hp: 89,
        id: 4543,
        level: 5,
        name: 'Peacefall #4543',
        owner: '0x49620D1f3cE8f607f9B8F5Bd7295ab75785f4BaB',
        syndicate: 'METAL',
      },
      recorded_at: '2022-06-23T14:12:21.966115',
      round: 7,
      self: {
        attack: 'METAL',
        hp: 213,
        id: 7040,
        level: 5,
        name: 'Peacefall #7040',
        owner: '0x4A1a0aeEA2A03eD451b577f51F1d7E5568f29736',
        syndicate: 'RENEGADE',
      },
      victor: 7040,
    });
  });
});
