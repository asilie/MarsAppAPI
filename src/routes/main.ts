import express from "express";
import { rover } from "../enums/rovername";
import { camera } from "../enums/cameratype";
import { getRovers, getPhotos } from "./handlers";

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

export default router;