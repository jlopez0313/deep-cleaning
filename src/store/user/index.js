import { getUser } from "@/helpers/onboarding";

const userStore = {
    namespaced: true,
    state: () => ({
        user: getUser()
    }),
    mutations: {
        setUser(_state, val) {
            _state.user = val;
        }
    }
}

export default userStore;