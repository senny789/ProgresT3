import {createSlice, nanoid} from '@reduxjs/toolkit'

export type LoginAction={payload:{access_token:string,user:any}}
export type UserState={
  id:string,
  username:string
}
export const AuthSlice=createSlice({
    name:'auth',
    initialState:{
       authorized:false,
       user:undefined
    },
    reducers:{
       loginUser:(state,action:LoginAction)=>{
        state.authorized=true,
        state.user=action.payload.user
        location.href='/dashboard'
       },
       updateUser:(state,action:{payload:{user:any}})=>{
        state.user=action.payload.user
       }
       ,
       authorizeUser:(state)=>{
         state.authorized=true
       },
       logoutUser:(state)=>{
         state.authorized=false
         state.user=undefined

         window.localStorage.removeItem('access_token');
         window.location.href='/'

       }
      
    }
})
export const {loginUser,logoutUser,authorizeUser,updateUser}=AuthSlice.actions
export const selectUser=(state:any)=>state.auth.user
export const selectUserId=(state:any)=>state.auth.user?.id

export default AuthSlice.reducer