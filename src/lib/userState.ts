import { User } from "@/types/User";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const userState = atom<User>({
    key: "userState",
    default: {
        username: "",
        role: "",
    },
    effects_UNSTABLE: [persistAtom],
});
