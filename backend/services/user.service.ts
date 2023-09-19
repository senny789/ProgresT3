import customConfig from "@/config/default";
import { signJwt, verifyJwt } from "@/utils/jwt";
import { Prisma } from "@prisma/client";

export const signTokens = async (user: Prisma.UserCreateInput) => {
 
    const access_token = signJwt({ sub: user.email }, {
      expiresIn: `${customConfig.accessTokenExpiresIn}m`,
    });
  
    const refresh_token = signJwt({ sub: user.email },  {
      expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
    });
  
    return { access_token, refresh_token };
  };
  
export const decodeToken=(opts:any)=>{
  const { ctx } = opts;
  const token=ctx.req.headers.authorization?.split(' ')[1]??'';
  const decoded=verifyJwt<{sub:string}>(token)
  if(decoded)
  return decoded;
else
return null
}