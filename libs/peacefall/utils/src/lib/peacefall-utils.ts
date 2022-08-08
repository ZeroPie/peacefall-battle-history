import {
  ApiAttrT,
  ChronicleEntryT,
  CombatEntryT,
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
    }),
    ...contextChroniclesToFights({ context_chronicles, id }).reverse(),
  ],
});

export { formatFighterResponse as default };
