import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 15);
}

export function verifyPassword(password: string, encryptedPassword: string) {
    return bcrypt.compare(password, encryptedPassword);
}
