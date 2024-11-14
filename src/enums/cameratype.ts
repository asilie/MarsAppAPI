import {z} from 'zod';

export enum Camera {
    fhaz = "fhaz",
    rhaz = "rhaz",
    mast = "mast",
    chemcam = "chemcam",
    mahli = "mahli",
    mardi = "mardi",
    navcam = "navcam",
    pancam = "pancam",
    minites = "minites"
}

export const cameraParse = z.nativeEnum(Camera);