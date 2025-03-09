import {create} from "zustand/index";

interface TabStore {
    tab:string,
    setTab:(selectedTab:string)=>void;
}

export const useTabStore = create<TabStore>((set) => ({
    tab:"Feed",
    setTab:(tab:string) => set({tab:tab}),
}));