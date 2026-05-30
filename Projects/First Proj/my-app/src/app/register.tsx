import { Pressable, TextInput, View, Text, Image} from 'react-native';
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedView} from "@/components/themed-view";
import * as ImagePicker from "expo-image-picker";


export default function TabTwoScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

  return (
    <>
        <SafeAreaView className="flex-1 justify-center justify-items-center m-4">
            <ThemedView className=" rounded-lg">
                <View className="p-4">
                    <Text className="text-3xl font-bold text-center mb-8">
                        Реєстрація
                    </Text>

                    <TextInput
                        className="border border-gray-300 rounded-lg p-4 mb-4"
                        placeholder="Ім'я користувача"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        className="border border-gray-300 rounded-lg p-4 mb-4"
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        className="border border-gray-300 rounded-lg p-4 mb-6"
                        placeholder="Пароль"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput
                        className="border border-gray-300 rounded-lg p-4"
                        placeholder="Повторний пароль"
                        secureTextEntry
                        value={secondPassword}
                        onChangeText={setSecondPassword}
                    />

                    <SafeAreaView className="flex justify-center items-center">
                        <Pressable onPress={pickImage}>
                            {imageUri ? (
                                <Image
                                    source={{ uri: imageUri }}
                                    className="w-32 h-32 rounded-full"
                                />
                            ) : (
                                <View className="w-32 h-32 rounded-full bg-gray-200 items-center justify-center">
                                    <Text>Обрати фото</Text>
                                </View>
                            )}
                        </Pressable>
                    </SafeAreaView>


                    <Pressable
                        className="bg-blue-500 rounded-lg p-4"
                    >
                        <Text className="text-white text-center font-semibold">
                            Зареєструватися
                        </Text>
                    </Pressable>
                </View>
            </ThemedView>
        </SafeAreaView>
    </>
  );
}
