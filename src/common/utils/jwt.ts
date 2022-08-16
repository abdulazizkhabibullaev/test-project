import jsonWebToken from 'jsonwebtoken'
import { TOKEN_KEY } from '../config/config'

export const jwt = {
    sign: (payload: any) => jsonWebToken.sign(payload, TOKEN_KEY),
    verify: (token: string) => jsonWebToken.verify(token, TOKEN_KEY)
}