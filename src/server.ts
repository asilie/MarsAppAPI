import express, { Request, Response } from "express";
import axios from "axios";
import {Photo, zodPhotoArray} from "./photo";
import { Rover } from "./enums/rovername";
import { Camera } from "./enums/cameratype";
import { error } from "console";


function getRovers(res: Response) {
    let data = axios
      .get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers?sol=1000&page=2&api_key=6R1WgjArW8R3yvTqvtv1iljThtiB9ANQVIn01PJm"
      )
      .then((e) => res.send(e.data));
  }

  function getPhotos(roverName: Rover, cameraType: Camera, res: Response) {
    let data = axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&camera=${cameraType}&api_key=6R1WgjArW8R3yvTqvtv1iljThtiB9ANQVIn01PJm`
      )
      .then((e) => {
        const photoArrayParsed = zodPhotoArray.parse(e.data.photos);
        const photoURLs = photoArrayParsed.map((pic: Photo) => {
          return pic.img_src;
        });
        res.send(photoURLs.length === 0 ? 'Rover does not have this camera type' : photoURLs); 
      });
  }


const app = express();
const port = 3000;

app.use(express.json());
const router = express.Router();

router.get("/rovers", (res: Response) => getRovers(res));

router.get("/rovers/:rovername/photos/:cameratype", (req: Request, res: any) => {
  let rovername: Rover = Rover[req.params["rovername"] as keyof typeof Rover] // makes sure rover name is in list of rovers
  let cameratype: Camera = Camera[req.params["cameratype"] as keyof typeof Camera] // makes sure camera type is in list of camera types

  if (rovername === undefined || cameratype === undefined) {
    return res.status(500).send("Oops, wrong rover or camera name");
  }

getPhotos(rovername, cameratype, res);
    
  });

app.use('/', router);

app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});