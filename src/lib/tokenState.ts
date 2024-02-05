import { Token } from "@/types/Token";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const tokenState = atom<Token>({
    key: "tokenState",
    default: {
        access_token: "",
        token_type: "",
    },
    effects_UNSTABLE: [persistAtom],
});
