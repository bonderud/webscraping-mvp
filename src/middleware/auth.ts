import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Example authentication check
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Here you would typically verify the token and extract user information
    // For demonstration, we'll assume the token is valid
    req.user = { id: 1, name: 'User' }; // Mock user data
    next();
};

export default authMiddleware;