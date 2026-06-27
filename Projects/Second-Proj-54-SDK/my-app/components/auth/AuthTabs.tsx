import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Keyboard, Platform } from "react-native";
import { router, usePathname } from "expo-router";
import { AuthTab } from "@/components/auth/AuthTab";

export function AuthTabs() {
    const pathname = usePathname();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showSubscription = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    if (isKeyboardVisible) return null;

    return (
        <View className="p-1 bg-zinc-100 rounded-b-2xl dark:bg-zinc-900">
            <View className="flex-row rounded-2xl">
                <AuthTab
                    label="Вхід"
                    emoji="🔐"
                    active={pathname === "/login"}
                    onPress={() => router.replace("/login")}
                />
                <AuthTab
                    label="Реєстрація"
                    emoji="🔑"
                    active={pathname === "/register"}
                    onPress={() => router.replace("/register")}
                />
            </View>

            <TouchableOpacity
                onPress={() => router.replace("/")}
                className="items-center"
            >
                <Text className="text-emerald-700 dark:text-emerald-400 bg-emerald-200 dark:bg-emerald-800 rounded-b-2xl w-full py-3 text-center font-semibold">
                    🏠 На головну
                </Text>
            </TouchableOpacity>
        </View>
    );
}