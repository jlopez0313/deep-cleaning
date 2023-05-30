import { roles } from "@/constants/roles"
import { getUser } from "./onboarding";

const {user} = getUser();

export const isUserManager = () =>  {
    return user.rol.slug === roles.ADMIN
}

export const isUserCleaner = () =>  {
    return user.rol.slug === roles.CLEANER
}