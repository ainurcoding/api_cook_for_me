import { PrismaClient } from "@/generated/prisma";
import { RegisterDetailsDTO, RegisterEmailDTO, VerifyEmailDTO } from "./dto";
import nodemailer, { Transporter } from "nodemailer";
import { envs } from "@/core/config/env";
import { createHash } from "crypto";

const prisma = new PrismaClient();
const transporter: Transporter = nodemailer.createTransport({
    host: envs.SMTP_HOST,
    port: envs.SMTP_PORT,
    secure: true,
    auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASS
    },
});

export const requestEmailVerification = async (email: string) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const smtp_user = envs.SMTP_USER;
    const _5Minutes = 5 * 60 * 1000;
    await prisma.otp_requests.create({
        data: {
            email,
            otp: verificationCode,
            status: false,
            expired_at: new Date(Date.now() + _5Minutes)
        }
    });

    await transporter.sendMail({
        from: `"Registrasi Cook For Me App" <${smtp_user}>`,
        to: email,
        subject: `Kode Verifikasi Registrasi / Verification Registration Code`,
        html: `<p>Kode verifikasi Anda adalah <b>${verificationCode}</b></p>`,
    });
};

export const verifyEmailCode = async (email: string, code: string) => {
    const otp = await prisma.otp_requests.findFirst({
        where: { email, otp: code, status: false },
    });

    if (!otp) throw new Error("Kode verifikasi salah atau sudah kadaluarsa");
    const now = new Date();
    if (otp.expired_at && otp.expired_at < now) {
        await prisma.otp_requests.deleteMany({
            where: { id: otp.id },
        });
        throw new Error("Kode verifikasi salah atau sudah kadaluarsa");
    }

    await prisma.otp_requests.updateMany({
        where: { id: otp.id },
        data: { status: true },
    });
};

export const completeRegistration = async (data: RegisterDetailsDTO) => {
    if (data.password !== data.rePassword) throw new Error("Password tidak cocok");

    const isStrong = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data.password);
    if (!isStrong) {
        throw new Error("Password harus minimal 8 karakter dan mengandung huruf & angka");
    }

    const otp = await prisma.otp_requests.findFirst({
        where: { email: data.email, status: true },
    })

    if (!otp) throw new Error("Email belum diverifikasi");

    const hashedPassword = createHash("sha256").update(data.password).digest("hex");

    return prisma.users.create({
        data: {
            email: data.email,
            full_name: data.name,
            username: data.username,
            password_hash: hashedPassword,
            user_type: "member",
        }
    })
}