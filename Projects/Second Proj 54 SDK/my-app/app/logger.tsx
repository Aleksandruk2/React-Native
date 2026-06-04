import NetworkLogger from "react-native-network-logger";
import {SafeAreaView} from "react-native-safe-area-context";
import {Pressable, Text, View} from "react-native";
import {router} from "expo-router";

const LoggerScreen = () => {
    const onHandleToLogger = () => {
        router.back();
    }

    return (
        <>
            <SafeAreaView className="flex-1 bg-white px-6 ">
                <View className="rounded-xl flex-1 overflow-hidden">
                    <NetworkLogger/>

                    <Pressable onPress={onHandleToLogger}
                               className="w-full max-w-md bg-blue-500 rounded-lg py-3 items-center my-2"
                    >
                        <Text className="text-white font-semibold">Назад</Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        </>
    );
}
export default LoggerScreen;