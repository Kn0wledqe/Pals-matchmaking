import { Router } from "express";
import { IPlayer, PlayerModel } from "../models/players";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const players: IPlayer[] = await PlayerModel.aggregate([{$sample: {size: 2}}]); // return 2 random player keys
    return res.json(players);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.post("/", async (req, res) => {
  try {
    const player: IPlayer = req.body;

    console.log(req.body)

    const playerExists = await PlayerModel.findOne({
      name: player.Key,
    }).exec();

    if (playerExists) {
      return res
        .status(409)
        .json({ error: "There is already another player with this key" });
    }

    const newPlayer = await PlayerModel.create(player);
    return res.status(201).json(newPlayer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
