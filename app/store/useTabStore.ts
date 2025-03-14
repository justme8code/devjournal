import {create} from "zustand/index";

interface TabStore {
    tab:string,
    setTab:(selectedTab:string)=>void;
}

export const useTabStore = create<TabStore>((set) => ({
    tab:"feed",
    setTab:(tab:string) => set({tab:tab}),
}));