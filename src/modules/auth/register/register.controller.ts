import { Request, Response } from "express";
import { completeRegistration, requestEmailVerification, verifyEmailCode } from "./register.service";
import { RegisterDetailsDTO, RegisterEmailDTO, VerifyEmailDTO } from "./dto";

export const emailRequestHandler = async (req: Request, res: Response) => {
    try {
        const data: RegisterEmailDTO = req.body;
        await requestEmailVerification(data.email);
        res.status(200).json({ message: "Kode verifikasi dikirim ke email" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const verifyEmailHandler = async (req: Request, res: Response) => {
    try {
        const data: VerifyEmailDTO = req.body;
        await verifyEmailCode(data.email, data.verificationCode);
        res.status(200).json({ message: "Email berhasil diverifikasi" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const registerDetailsHandler = async (req: Request, res: Response) => {
    try {
        const data: RegisterDetailsDTO = req.body;
        const user = await completeRegistration(data);
        res.status(201).json({ message: "Registrasi berhasil", user });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}