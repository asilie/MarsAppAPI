import express from "express";
import axios from "axios";
import photo from "./photo";
import { rover } from "./enums/rovername";
import { camera } from "./enums/cameratype";


function getRovers(res: any) {
    let data = axios
      .get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers?sol=1000&page=2&api_key=6R1WgjArW8R3yvTqvtv1iljThtiB9ANQVIn01PJm"
      )
      .then((e) => res.send(e.data));
  }

  function getPhotos(rovername: rover, cameratype: camera, res: any) {
    let data = axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rovername}/photos?sol=1000&camera=${cameratype}&api_key=6R1WgjArW8R3yvTqvtv1iljThtiB9ANQVIn01PJm`
      )
      .then((e) => {
        let photos = e.data.photos; // list of photo objects (list of strings technically)
        photos = photos.map((pic: photo) => {
          return pic.img_src; //.jpg url
        });
        console.log(Object.keys(photos).length)
        photos = Object.keys(photos).length === 0 ? 'Rover does not have this camera type' : photos
        res.send(photos); // sends list of photo urls
      });
  }


const app = express();
const port = 3000;

app.use(express.json());
const router = express.Router();

router.get('/test', (req: any, res: any) => res.send("Hello World!"));

router.get("/rovers", (req, res) => getRovers(res));

router.get("/rovers/:rovername/photos/:cameratype", (req, res: any) => {
    let rovername: rover = rover[req.params["rovername"] as keyof typeof rover] // makes sure rover name is in list of rovers
    let cameratype: camera = camera[req.params["cameratype"] as keyof typeof camera] // makes sure camera type is in list of camera types

    if (rovername === undefined || cameratype === undefined) {
        return res.status(500).send("Oops, wrong rover or camera name");
      }

    getPhotos(rovername, cameratype, res);
  });


app.use('/', router);


app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});