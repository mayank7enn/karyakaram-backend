import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    organization: { type: String, unique: true, required: true },
});

export default mongoose.model("ContactUs", ContactUsSchema);