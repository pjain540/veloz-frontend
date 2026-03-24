import { Request, Response } from "express";
import authService from "./auth.service";

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginAdmin(email, password);

        // Set cookies
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result.user
        });
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message || "Invalid credentials"
        });
    }
};

const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error("Refresh token missing");
        }

        const newAccessToken = await authService.refreshAccessToken(refreshToken);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully"
        });
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message || "Invalid refresh token"
        });
    }
};

const logout = async (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: "Logged out successfully" });
};

const me = async (req: Request, res: Response) => {
    // Relying on isAdmin middleware to attach the user
    return res.status(200).json({
        success: true,
        data: (req as any).user
    });
};

const setup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authService.setupAdmin(email, password);
        return res.status(201).json({ success: true, message: "Admin created", data: result });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export default { login, refresh, logout, me, setup };
