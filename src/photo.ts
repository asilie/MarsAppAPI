import { z } from "zod";

interface Photo {
    id: number;
    sol: number;
    camera: { 
        id: number;
        name: string;
        rover_id: number;
        full_name: string;
    };
    img_src: string;

    earth_date: string;
  }

  const zodPhoto = z.object({
    id: z.number(),
    sol: z.number(),
    camera: z.object({ 
        id: z.number(),
        name: z.string(),
        rover_id: z.number(),
        full_name: z.string(),
    }),
    img_src: z.string(),
    earth_date: z.string()
  })

  const zodPhotoArray = z.array(zodPhoto);

  export {Photo, zodPhotoArray};