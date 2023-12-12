import { model, Schema, Document } from "mongoose";

interface IPlayer extends Document {
  Key: string // database key
}

const playerSchema = new Schema({
  Key: {
    type: String,
    unique: true,
  },
});

const PlayerModel = model<IPlayer>("Player", playerSchema);

export { PlayerModel, IPlayer };
