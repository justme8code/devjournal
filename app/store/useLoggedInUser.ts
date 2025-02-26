import { create } from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// Define the store type
interface LoggedInUserState {
    loggedIn: boolean;
    setLoggedIn: (status: boolean) => void;
}

export const useLoggedInUser = create<LoggedInUserState>()(
    persist(
        (set) => ({
            loggedIn: false,
            setLoggedIn: (status) => set({ loggedIn: status }),
        }),
        {
            name: 'logged-in-user-storage',
            storage: createJSONStorage(() => localStorage) // Use localStorage instead of sessionStorage
        }
    )
);


