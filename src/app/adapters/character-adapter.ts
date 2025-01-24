import { Character } from "../models"

export const CharacterAdapter = (Characters: Character[]) => Characters.map((c) => ({...c, name: c.name.toUpperCase()}));
