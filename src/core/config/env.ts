import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),
    SMTP_HOST: get('SMTP_HOST').default('smtp.gmail.com').asString(),
    SMTP_PORT: get('SMTP_PORT').default('465').asPortNumber(),
    SMTP_USER: get('SMTP_USER').default('').asString(),
    SMTP_PASS: get('SMTP_PASS').default('').asString(),
}