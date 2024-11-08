import express from "express";
import axios from "axios";


function getRovers(res: any) {
    let data = axios
      .get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers?sol=1000&page=2&api_key=6R1WgjArW8R3yvTqvtv1iljThtiB9ANQVIn01PJm"
      )
      .then((e) => res.send(e.data));
  }



const app = express();
const port = 3000;

app.use(express.json());
const router = express.Router();

router.get('/test', (req: any, res: any) => res.send("Hello World!"));

router.get("/rovers", (req, res) => getRovers(res));

app.use('/', router);


app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});