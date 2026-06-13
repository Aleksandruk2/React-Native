import {Text, TouchableOpacity} from "react-native";

export function AuthTab({
                            label,
                            emoji,
                            active,
                            onPress,
                        }: {
    label: string;
    emoji: string;
    active: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-1 py-3 items-center ${
                active
                    ? "bg-blue-100 dark:bg-blue-950 border-blue-500 border-b-2"
                    : "bg-zinc-200 dark:bg-zinc-800"
            }`}
        >
            <Text
                className={`text-base font-semibold ${
                    active
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-600 dark:text-zinc-300"
                }`}
            >
                {emoji} {label}
            </Text>
        </TouchableOpacity>
    );
}