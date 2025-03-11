import ContactUs from "../models/contactus.js";
import VirtualEvent_15032025 from "../models/event.js";

export const virtualEventRegister = async (req, res) => {
    try {
        const { name, email, phone, address, state, city, stravaProfileUrl } = req.body;
        console.log(req.body); // Debugging log

        // Strava URL validation
        if (stravaProfileUrl) {
            const stravaPattern = /^https:\/\/www\.strava\.com\/athletes\/\d+$/;
            if (!stravaPattern.test(stravaProfileUrl)) {
                return res.status(400).json({
                    error: "Invalid Strava URL. Format must be: https://www.strava.com/athletes/12345"
                });
            }
        }

        // Check if email or phone already exists
        const existingUser = await VirtualEvent_15032025.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                error: existingUser.email === email
                    ? "Email already exists"
                    : "Phone already exists"
            });
        }

        // Create new user
        const user = new VirtualEvent_15032025({
            name,
            email,
            phone,
            address,
            state,
            city,
            stravaProfileUrl: stravaProfileUrl?.trim() || undefined
        });

        await user.save();
        res.status(201).json({ message: "Registration successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server error" });
    }
};

export const getVirtualEventRegistrations = async (req, res) => {
    try {
        const registrations = await VirtualEvent_15032025.find();
        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Server error" });
    }
};

export const contactUsSubmit = async (req, res) => {
    try {
        const { name, email, phone, organization } = req.body;
        console.log(req.body); // Debugging log

        // Check if email or phone already exists
        const existingUser = await ContactUs.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                error: existingUser.email === email
                    ? "Email already Submitted"
                    : "Phone already Submitted"
            });
        }

        // Create new user
        const user = new ContactUs({
            name,
            email,
            phone,
            organization
        });

        await user.save();
        res.status(201).json({ message: "Registration successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server error" });
    }
}
