import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const CardSchema = new Schema({
  title: String,
  ownerId: { type: Schema.Types.ObjectId, ref: "Deck" },
  ownerName: String,
});

export default mongoose.models.Card || mongoose.model("Card", CardSchema);
