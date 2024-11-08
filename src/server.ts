import express from "express";
import axios from "axios";
import photo from "./photo";


function getRovers(res: any) {
    let data = axios
      .get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers?sol=1000&page=2&api_key=6R1WgjArW8R3yvTqvtv1iljThtiB9ANQVIn01PJm"
      )
      .then((e) => res.send(e.data));
  }

  function getPhotos(res: any) {
    let data = axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?sol=1000&camera=FHAZ&api_key=6R1WgjArW8R3yvTqvtv1iljThtiB9ANQVIn01PJm`
      )
      .then((e) => {
        let photos = e.data.photos; // list of photo objects
        photos = photos.map((pic: photo) => {
          return pic.img_src; //.jpg url
        });
        res.send(photos); // list of photo urls
      });
  }


const app = express();
const port = 3000;

app.use(express.json());
const router = express.Router();

router.get('/test', (req: any, res: any) => res.send("Hello World!"));

router.get("/rovers", (req, res) => getRovers(res));

router.get("/rovers/photos", (req, res) => {
  
    getPhotos(res);
  });


app.use('/', router);


app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});