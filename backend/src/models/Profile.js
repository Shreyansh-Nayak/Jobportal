import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        basicInfo: {
            fullName: { type: String, default: "" },
            phone: { type: String, default: "" },
            location: { type: String, default: "" },
        },
        summary: {
            headline: { type: String, default: "" },
            about: { type: String, default: "" },
        },
        resume: { type: String, default: "" },
        skills: [
            {
                name: { type: String, required: true },
            },
        ],
        education: [
            {
                degree: { type: String },
                institution: { type: String },
                startDate: { type: Date },
                endDate: { type: Date },
            },
        ],
        experience: [
            {
                title: { type: String },
                company: { type: String },
                startDate: { type: Date },
                endDate: { type: Date },
                description: { type: String },
            },
        ],
        projects: [
            {
                title: { type: String },
                description: { type: String },
                link: { type: String },
            },
        ],
        preferences: {
            role: { type: String, default: "" },
        },
        links: {
            github: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            portfolio: { type: String, default: "" },
        },
        privacySettings: {
            visibility: { type: String, enum: ["Public", "Private"], default: "Public" },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Profile", profileSchema);
