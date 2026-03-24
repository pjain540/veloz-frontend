import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../modules/users/user.model";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };

        const user = await User.findById(decoded.userId).lean();

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access only" });
        }

        // Attach user to request
        (req as any).user = user;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
