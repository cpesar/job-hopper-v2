import bcrypt from "bcryptjs";


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

export async function comparePassword(password, hashPassword) {
    const isMatch = await bcrypt.compare(password, hashPassword)
    return isMatch
}