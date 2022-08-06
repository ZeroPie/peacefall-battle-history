import * as fighterMock from './fighter.json';
import { FighterRespT } from './types';
import {
  contextChroniclesToArray,
  contextChroniclesToFights,
  contextChronicleToFight,
} from './tournament-utils';

const fighter = fighterMock as unknown as FighterRespT;

describe('tournament-utils', () => {
  it('should extract the object', () => {
    const contextChronicles = contextChroniclesToArray(fighter);
    expect(contextChronicles).toStrictEqual([
      {
        context_id: 'champions-2022-07',
        entries: [
          {
            current_attack: 'WATER',
            previous_attack: null,
            warrior: { hp: 239, id: 7040, syndicate: 'RENEGADE' },
          },
          {
            current_attack: 'FIRE',
            previous_attack: null,
            warrior: { hp: 99, id: 3244, syndicate: 'WATER' },
          },
        ],
        state: 0,
        victor: 7040,
      },
      {
        context_id: 'champions-2022-07',
        entries: [
          {
            current_attack: 'EARTH',
            previous_attack: 'WATER',
            warrior: {
              hp: 239,
              id: 7040,
              syndicate: 'RENEGADE',
            },
          },
          {
            current_attack: 'EARTH',
            previous_attack: null,
            warrior: {
              hp: 113,
              id: 3309,
              syndicate: 'WATER',
            },
          },
        ],
        state: 1,
        victor: 7040,
      },
    ]);
  });

  it('contextChronicle should be turned into a fight', () => {
    expect(
      contextChronicleToFight({
        fighterId: 7040,
        contextChronicle: contextChroniclesToArray(fighter)[0],
      })
    ).toStrictEqual({
      fatal: null,
      id: 0,
      round: 0,
      opponent: {
        attack: 'FIRE',
        hp: 99,
        id: 3244,
        syndicate: 'WATER',
      },
      self: {
        attack: 'WATER',
        hp: 239,
        id: 7040,
        syndicate: 'RENEGADE',
      },
      victor: 7040,
    });
  });

  it('should create a valid fights array from the context_chronicles Object', () => {
    const fights = contextChroniclesToFights(fighter);

    expect(fights).toStrictEqual([
      {
        fatal: null,
        id: 0,
        opponent: {
          attack: 'FIRE',
          hp: 99,
          id: 3244,
          syndicate: 'WATER',
        },
        round: 0,
        self: {
          attack: 'WATER',
          hp: 239,
          id: 7040,
          syndicate: 'RENEGADE',
        },
        victor: 7040,
      },
      {
        fatal: null,
        id: 0,
        opponent: {
          attack: 'EARTH',
          hp: 113,
          id: 3309,
          syndicate: 'WATER',
        },
        round: 1,
        self: {
          attack: 'EARTH',
          hp: 239,
          id: 7040,
          syndicate: 'RENEGADE',
        },
        victor: 7040,
      },
    ]);
  });
});
