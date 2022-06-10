export type FighterRespT = {
  id: number,
  name: string,
  image: string,
  animation_url: string,
  attributes: ApiAttrT[],
  chronicle: ChronicleEntryT[]
}

type ApiAttrT = {
  value: number | string,
  trait_type: string
}

export type CombatEntryT = {
  warrior: {
    id: number,
    syndicate: string,
    name: string,
    hp: number,
    level: number,
  },
  attack: string,
  owner: string,
}

export type ChronicleEntryT = {
  recorded_at: string,
  round: number,
  fatal: null | boolean,
  victor: number,
  id: number,
  combat_entries: Array<CombatEntryT>
}

export const attributeExtractor = ({value = '', trait_type = ''}: ApiAttrT) =>
  ({[trait_type?.toLowerCase()]: value})

export const attributesReducer = (prev: ApiAttrT, curr: ApiAttrT) =>
  ({...prev, ...attributeExtractor(curr)})

export const isSelf = (id: number) => ({warrior}: CombatEntryT) => warrior.id === id

export const isNotSelf = (id: number) => ({warrior}: CombatEntryT) => warrior.id !== id

export const createParticipantObj = ({warrior}: CombatEntryT) => ({
  ...warrior
})

export const flattenCombatEntry = ({warrior, ...combatEntry}: CombatEntryT) => ({...combatEntry, ...warrior})

export const createFightObject = ({fighterId}: { fighterId: FighterRespT['id'] }) =>
  ({
     combat_entries,
     id,
     victor,
     fatal,
     round,
     recorded_at
   }: ChronicleEntryT) => {
    const selfEntry = combat_entries.find(isSelf(fighterId))
    const opponentEntry = combat_entries.find(isNotSelf(fighterId))
    return {
      id,
      victor,
      fatal,
      round,
      recorded_at,
      self: selfEntry && flattenCombatEntry(selfEntry),
      opponent: opponentEntry && flattenCombatEntry(opponentEntry)
    }
  }

export const createFightsArray = ({fighterId = 0}) => ({chronicle}: { chronicle: ChronicleEntryT[] }) => {
  return chronicle.map(createFightObject({fighterId}))
}


export const formatFighterResponse = ({id = 0, attributes = [], chronicle = [], ...rest}: FighterRespT) : FighterT =>
  ({
    id,
    ...attributes.reduce(attributesReducer, {} as any),
    ...rest,
    fights: createFightsArray({fighterId: id})({chronicle})
  })


// syndicate type in attacks is in Caps
export type FighterT = {
  image: string,
  hp: number,
  level: number,
  peace: string,
  character: 'The Don' | 'Brawler' | 'KickBoxer' | 'Ronin' | 'Spectre' | 'Ninja' | 'Tank' | 'Scholar' | 'Badboy',
  syndicate: 'Renegade' | 'Spirit' | 'Earth' | 'Water' | 'Fire' | 'Metal' | 'Timber'
  animation_url: string,
  fights: Array<{
    recorded_at: string,
    round: number,
    victor: number,
    opponent: {owner: string, level: number, attack: string, syndicate: string, name: string, hp: number, id: number},
    self: {owner: string, level: number, attack: string, syndicate: string, name: string, hp: number, id: number},
    id: number,
    fatal: boolean | null}>,
  name: string,
  id: number,
  value: number | string,
}

export {formatFighterResponse as default}
