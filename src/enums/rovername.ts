import {z} from 'zod';

export enum Rover {
    curiosity = "curiosity",
    opportunity = "opportunity",
    spirit = "spirit",
    perseverance = "perseverance"
}

export const roverParse = z.nativeEnum(Rover);