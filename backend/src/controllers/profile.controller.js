import Profile from "../models/Profile.js";

/* GET USER PROFILE */
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        let profile = await Profile.findOne({ userId });

        if (!profile) {
            // Create empty profile if it doesn't exist
            profile = await Profile.create({ userId });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("❌ Error fetching profile:", error);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

/* UPDATE USER PROFILE */
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const profile = await Profile.findOneAndUpdate(
            { userId },
            { $set: updates },
            { new: true, upsert: true }
        );

        res.status(200).json(profile);
    } catch (error) {
        console.error("❌ Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};
