import mongoose from "mongoose";

const VirtualEventSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    address: String,
    state: String,
    city: String,
    stravaProfileUrl: String,
});

export default mongoose.model("VirtualEvent_15032025", VirtualEventSchema);
