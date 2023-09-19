import jwt, { SignOptions } from 'jsonwebtoken';
import customConfig from '../config/default';

export const signJwt = (
  payload: Object,
  options: SignOptions = {}
  
) => {
  const privateKey = Buffer.from(customConfig.secret, 'base64').toString('ascii');

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'HS256',
  });
};
export const verifyJwt = <T>(
    token: string,
    
  ): T | null => {
    try {
      
      const publicKey = Buffer.from(customConfig.secret, 'base64').toString(
        'ascii'
      ) as jwt.Secret;
    
      const verify=jwt.verify(token, publicKey);
    
      return verify as T
    } catch (error) {
      console.log(error)
      return null;
    }
  };