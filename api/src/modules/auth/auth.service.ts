import User from "../../modules/users/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginAdmin = async (email: string, password: string) => {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    // 2. Check Role (must be admin)
    if (user.role !== 'admin') {
        throw new Error("Forbidden: Not an admin");
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // 4. Generate Tokens
    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        { expiresIn: '7d' }
    );

    return { 
        accessToken, 
        refreshToken, 
        user: { 
            _id: user._id, 
            email: user.email, 
            role: user.role 
        } 
    };
};

const refreshAccessToken = async (refreshToken: string) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret') as { userId: string };
        const user = await User.findById(decoded.userId).lean();

        if (!user || user.role !== 'admin') {
            throw new Error("Invalid refresh token or user not an admin");
        }

        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '15m' }
        );

        return newAccessToken;
    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
}

const setupAdmin = async (email: string, password: string) => {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
        throw new Error('An admin account already exists. Setup is disabled.');
    }

    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    const user = await User.create({ email, password, role: 'admin' });
    return { _id: user._id, email: user.email, role: user.role };
};

export default { loginAdmin, refreshAccessToken, setupAdmin };
