export type TournamentEntryT = {
  warrior: {
    syndicate: string;
    hp: number;
    id: number;
  };
  current_attack: string;
  previous_attack: string;
};

export type ContextChronicleT = {
  victor: number;
  context_id: string;
  state: number;
  entries: Array<TournamentEntryT>;
};

export type ContextChroniclesT = Record<string, ContextChronicleT[]>;

export type FighterRespT = {
  id: number;
  name: string;
  image: string;
  animation_url: string;
  attributes: ApiAttrT[];
  chronicle: ChronicleEntryT[];
  context_chronicles?: ContextChroniclesT;
};

export type ApiAttrT = {
  value: number | string;
  trait_type: string;
};

export type CombatEntryT = {
  attack: string;
  owner: string;
  warrior: {
    id: number;
    syndicate: string;
    name: string;
    hp: number;
    level: number;
  };
};

export type ChronicleEntryT = {
  id: number;
  recorded_at: string;
  round: number;
  fatal: null | boolean;
  victor: number;
  state: null | unknown;
  context_id: null | string;
  combat_entries: Array<CombatEntryT>;
};

export type FighterStatsT = {
  owner?: string;
  level?: number;
  attack?: string | null;
  syndicate?: string;
  name?: string;
  hp: number;
  id: number;
};

export type FightEntryT = {
  recorded_at?: string;
  round: number;
  victor: number;
  opponent?: FighterStatsT;
  self?: FighterStatsT;
  id: number;
  context_id?: string;
  fatal: boolean | null;
};
// syndicate type in attacks is in Caps
export type FighterT = {
  image: string;
  name: string;
  hp?: number;
  level?: number;
  peace?: string;
  character?:
    | 'The Don'
    | 'Brawler'
    | 'KickBoxer'
    | 'Ronin'
    | 'Spectre'
    | 'Ninja'
    | 'Tank'
    | 'Scholar'
    | 'Badboy';
  syndicate?:
    | 'Renegade'
    | 'Spirit'
    | 'Earth'
    | 'Water'
    | 'Fire'
    | 'Metal'
    | 'Timber';
  animation_url: string;
  fights: Array<FightEntryT>;
  id: number;
  value: number | string;
};
