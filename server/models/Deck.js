import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const DeckSchema = new Schema({
  title: String,
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

export default mongoose.models.Deck || mongoose.model("Deck", DeckSchema);
