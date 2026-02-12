import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

const fixUserRole = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const userId = '697a41eaceeeb38239a47402';
        const user = await User.findById(userId);

        if (!user) {
            console.log('❌ User not found with ID:', userId);
            // Let's search by email if ID fails (token might be old or from different env)
            const emailSearch = 'shreyanshnayak555@gmail.com'; // Common email from logs
            const userByEmail = await User.findOne({ email: emailSearch });
            if (userByEmail) {
                console.log('✅ Found user by email:', emailSearch);
                userByEmail.role = 'employer';
                await userByEmail.save();
                console.log('🚀 Role updated to employer for user:', userByEmail.email);
            } else {
                console.log('❌ Could not find user by ID or email');
            }
        } else {
            console.log('✅ Found user by ID:', userId);
            user.role = 'employer';
            await user.save();
            console.log('🚀 Role updated to employer for user:', user.email);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixUserRole();
