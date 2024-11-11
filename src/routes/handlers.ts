import axios from "axios";
import photo from "../photo";
import { rover } from "../enums/rovername";
import { camera } from "../enums/cameratype";


async function getRovers(res: any) {
    let data = await axios
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

  export {getRovers, getPhotos};