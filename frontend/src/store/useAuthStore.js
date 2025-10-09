import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser:{name:"John Doe",email:"john@example.com"},
    isLoggedIn:false,
    login:()=>{
        alert("logged in");
        console.log("we just logged in");
        set({isLoggedIn:true})
    },
    
}))
