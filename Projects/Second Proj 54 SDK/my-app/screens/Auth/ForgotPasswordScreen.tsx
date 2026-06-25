import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";
import {useForm, Controller } from "react-hook-form";
import {useRouter} from "expo-router";
import {useState} from "react";
import {useForgotPasswordMutation} from "@/services/authService";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {IForgotPasswordModel} from "@/models/IForgotPasswordModel";
import * as SecureStore from 'expo-secure-store';



export default function LoginScreen() {
    const { control, handleSubmit } = useForm<IForgotPasswordModel>();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [serverError, setServerError] = useState<string | null>(null);
    const colorScheme = useColorScheme();
    const router = useRouter();

    const onSubmit = async (data: IForgotPasswordModel) => {
        // console.log("Form data:", data);
        try {
            await forgotPassword(data).unwrap();
            await SecureStore.setItemAsync("resetEmail", data.email);

            router.push("/reset-password");
        }
        catch (err: any) {
            console.error("Помилка відновлення:", err);

            // 1. Check if the backend returned a validation/error message payload
            if (err?.data?.message) {
                setServerError(err.data.message);
            }
            // 2. Check if it's a top-level RTK Query network fetch error
            else if (err?.status === 'FETCH_ERROR') {
                setServerError("Немає зв'язку з сервером. Перевірте інтернет.");
            }
            // 3. Fallback for any other unexpected status codes
            else {
                setServerError("Щось пішло не так. Спробуйте пізніше.");
            }
        }

    };


    return (
        <>
            <View className="flex-1">
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            flexGrow: 1
                        }}
                    >
                        <View className="flex-1 justify-center items-center px-6">
                            <Text className="text-3xl font-bold text-blue-600 mb-8">
                                Відновлення пароля
                            </Text>

                            {serverError && (
                                <View className="w-full max-w-md bg-red-100 border border-red-400 p-3 rounded-lg mb-4">
                                    <Text className="text-red-700 text-center text-sm font-medium">
                                        {serverError}
                                    </Text>
                                </View>
                            )}

                            <Controller control={control}
                                        name="email"
                                        rules={{ required: "Email обов’язковий" }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput placeholder="Email"
                                                       placeholderTextColor={
                                                           colorScheme === "dark"
                                                               ? "#A1A1AA" // zinc-400
                                                               : "#6B7280" // gray-500
                                                       }
                                                       keyboardType="email-address"
                                                       value={value}
                                                       onChangeText={onChange}
                                                       className="w-full max-w-md bg-white dark:bg-zinc-800
                                                                  text-black dark:text-gray-200
                                                                  rounded-lg px-4 py-3 mb-4
                                                                  border border-gray-300 dark:border-zinc-700"
                                            />
                                        )}
                            />

                            <View className="items-center w-full mt-4">
                                <Pressable
                                    disabled={isLoading}
                                    onPress={handleSubmit(onSubmit)}
                                    className={`${isLoading ? "bg-blue-400 dark:bg-blue-700" : "bg-blue-500 dark:bg-blue-900"} border dark:border-blue-700 border-blue-600 w-full rounded-lg py-3 items-center mb-3`}
                                >
                                    <Text className="text-white dark:text-gray-100 font-semibold">
                                        {isLoading ? "Надсилання..." : "Надіслати"}
                                    </Text>
                                </Pressable>

                                <TouchableOpacity
                                    className="mb-6 mt-2"
                                    onPress={() => router.replace('/login')}
                                >
                                    <Text className="font-spartan-semibold text-[13px] text-blue-500 underline dark:text-[#DFF7E2]">
                                        Повернутися до логіну
                                    </Text>
                                </TouchableOpacity>
                            </View>



                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
}