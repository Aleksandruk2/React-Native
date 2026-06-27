import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { logout } from "@/store/reducers/authSlice";
import {useAppDispatch} from "@/store";

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    return async () => {
        dispatch(logout());

        await SecureStore.deleteItemAsync("accessToken");

        router.replace("/(auth)/login");
    };
};