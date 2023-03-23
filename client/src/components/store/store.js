import {create} from 'zustand'

//Creating Custom hook from zustand an alternative to redux
export const useAuthStore = create((set)=>({
    // Creating Initial value of hook
    auth:{
        username :"",
        active : false
    },
    setUsername : (name)=> set((state)=>({ auth:{...state.auth, username: name}})) //Setting new value to initial value
}))