import {
  ApiAttrT,
  ChronicleEntryT,
  CombatEntryT,
  FightEntryT,
  FighterRespT,
  FighterT,
  TournamentEntryT,
} from './types';
import { contextChroniclesToFights } from './tournament-utils';

export const attributeExtractor = ({
  value = '',
  trait_type = '',
}: ApiAttrT) => ({ [trait_type?.toLowerCase()]: value });

export const attributesReducer = (prev: ApiAttrT, curr: ApiAttrT) => ({
  ...prev,
  ...attributeExtractor(curr),
});

export const isSelf =
  (id: number) =>
  ({ warrior }: CombatEntryT | TournamentEntryT) =>
    warrior.id === id;

export const isNotSelf =
  (id: number) =>
  ({ warrior }: CombatEntryT | TournamentEntryT) =>
    warrior.id !== id;

export const createParticipantObj = ({ warrior }: CombatEntryT) => ({
  ...warrior,
});

export const flattenCombatEntry = ({
  warrior,
  ...combatEntry
}: CombatEntryT) => ({ ...combatEntry, ...warrior });

export const createFightObject =
  ({ fighterId }: { fighterId: FighterRespT['id'] }) =>
  ({
    combat_entries,
    id,
    victor,
    fatal,
    round,
    recorded_at,
  }: ChronicleEntryT) => {
    const selfEntry = combat_entries.find(isSelf(fighterId));
    const opponentEntry = combat_entries.find(isNotSelf(fighterId));
    return {
      id,
      victor,
      fatal,
      round,
      recorded_at,
      self: selfEntry && flattenCombatEntry(selfEntry),
      opponent: opponentEntry && flattenCombatEntry(opponentEntry),
    };
  };

export const createFightsArray =
  ({ fighterId = 0 }) =>
  ({ chronicle }: { chronicle: ChronicleEntryT[] }) =>
    chronicle?.map(createFightObject({ fighterId }));

const sortByRoundDescending = (a: FightEntryT, b: FightEntryT) =>
  a?.round < b?.round ? -1 : 1;

const sortByTournamentLast = (a: FightEntryT) => (a.id === -1 ? 1 : -1);

export const formatFighterResponse = ({
  id = 0,
  attributes = [],
  chronicle = [],
  context_chronicles = {},
  ...rest
}: FighterRespT): FighterT => ({
  id,
  ...attributes.reduce(attributesReducer, {} as ApiAttrT),
  ...rest,
  fights: [
    ...createFightsArray({ fighterId: id })({
      chronicle,
    }).reverse(),
    ...contextChroniclesToFights({ context_chronicles, id }).sort(
      sortByRoundDescending
    ),
  ].sort(sortByTournamentLast),
  kills: createFightsArray({ fighterId: id })({ chronicle }).filter(
    ({ fatal }) => fatal === true
  ).length,
});

export const killingStreaks = {
  0: '',
  1: '',
  '': '',
  2: 'Double Kill',
  3: 'Multi Kill',
  4: 'Mega Kill',
  5: 'Ultra Kill',
  6: 'Monster Kill',
};

export const winningStreaks = {
  0: '',
  '': '',
  5: 'Killing Spree',
  6: 'Rampage',
  7: 'Dominating',
  8: 'Unstoppable',
  9: 'Godlike',
  10: 'Wicked Sick',
  11: 'Wicked Sick',
  12: 'Wicked Sick',
  13: 'Wicked Sick',
  14: 'Wicked Sick',
};
export { formatFighterResponse as default };
