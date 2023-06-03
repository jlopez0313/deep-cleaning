import { roles } from "@/constants/roles"
import { getUser } from "./onboarding";


export const isUserManager = () =>  {
    const {user} = getUser();
    console.log( user );
    return user?.rol.slug === roles.ADMIN
}

export const isUserCleaner = () =>  {
    const {user} = getUser();
    console.log( user );
    return user?.rol.slug === roles.CLEANER
}