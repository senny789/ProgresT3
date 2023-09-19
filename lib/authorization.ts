import { loginUser } from "@/store/AuthReducer";
import { Dispatch } from "react";

export function getAccessToken(){
    return localStorage.getItem('access_token')
}
export function handleLogin(dispatch:Dispatch<any>,loginData:any){
    localStorage.setItem("access_token", loginData!.access_token);

    dispatch(
        loginUser({
            access_token: loginData!.access_token,
            user: loginData!.user,
        })
    );
}