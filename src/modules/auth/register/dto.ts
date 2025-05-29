export interface RegisterEmailDTO {
    email: string;
}

export interface VerifyEmailDTO {
    email: string;
    verificationCode: string;
}

export interface RegisterDetailsDTO {
    email: string;
    name: string;
    username: string;
    password: string;
    rePassword: string;
}