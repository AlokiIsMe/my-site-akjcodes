import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const saveUserInStorage = (user:User)=>{
    localStorage.setItem("user",JSON.stringify(user));
}

export const getUserFromStorage = ()=>{
    const user = JSON.parse(localStorage.getItem("user")as string);
    return user;
}
