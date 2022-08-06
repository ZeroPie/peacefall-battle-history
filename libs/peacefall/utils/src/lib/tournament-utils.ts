import {
  ContextChroniclesT,
  ContextChronicleT,
  FightEntryT,
  FighterRespT,
  TournamentEntryT,
} from './types';

export const tournamentEntryToFight = ({
  warrior = { id: 0, hp: 0, syndicate: '' },
  current_attack = '',
}: TournamentEntryT) => ({
  ...warrior,
  attack: current_attack,
  owner: '',
});

export const contextChroniclesToArray = ({
  context_chronicles = {},
}: {
  context_chronicles?: ContextChroniclesT;
}) =>
  Object.keys(context_chronicles).reduce(
    (prev, curr) => context_chronicles[curr],
    [] as ContextChronicleT[]
  );

export const contextChronicleToFight = ({
  fighterId = 0,
  contextChronicle,
}: {
  fighterId?: number;
  contextChronicle: ContextChronicleT;
}): FightEntryT => {
  const selfEntry = contextChronicle?.entries?.find(
    ({ warrior }) => warrior?.id === fighterId
  );
  const opponentEntry = contextChronicle?.entries?.find(
    ({ warrior }) => warrior?.id !== fighterId
  );

  return {
    id: -1,
    context_id: contextChronicle?.context_id,
    fatal: null,
    self: selfEntry && tournamentEntryToFight(selfEntry),
    opponent: opponentEntry && tournamentEntryToFight(opponentEntry),
    round: contextChronicle?.state,
    victor: contextChronicle?.victor,
  };
};

export const contextChroniclesToFights = (fighter: Partial<FighterRespT>) =>
  contextChroniclesToArray(fighter).map((contextChronicle) =>
    contextChronicleToFight({
      fighterId: fighter?.id,
      contextChronicle: contextChronicle,
    })
  );
