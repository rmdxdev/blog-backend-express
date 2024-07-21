import { BCRYPT_SALT } from '@/constants'
import bcrypt from 'bcrypt'

export const generateHashedPassword = async (password: string) => {
  if (BCRYPT_SALT) {
    const salt = await bcrypt.genSalt(+BCRYPT_SALT)
    return await bcrypt.hash(password, salt)
  } else {
    return password
  }
}
