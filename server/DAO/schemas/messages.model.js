import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const collectionName = 'messages'

const messageSchema = new mongoose.Schema({
   user: String,
   message: String,
});

messageSchema.plugin(paginate)

const messageModel = mongoose.model(collectionName, messageSchema)

export default messageModel;