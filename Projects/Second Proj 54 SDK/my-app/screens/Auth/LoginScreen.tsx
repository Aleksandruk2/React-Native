import {View, Text, TextInput, Pressable, ScrollView, Platform, KeyboardAvoidingView} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {usePathname, useRouter} from "expo-router";
import {useState} from "react";
import {ILoginModel} from "@/models/ILoginModel";
import {useLoginMutation} from "@/services/authService";
import {loginSuccess} from "@/store/reducers/authSlice";
import {useAppDispatch} from "@/hooks/redux";
import * as SecureStore from 'expo-secure-store';



export default function LoginScreen() {
    const { control, handleSubmit } = useForm<ILoginModel>();
    const [login, { isLoading }] = useLoginMutation();
    const [serverError, setServerError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();



    const onSubmit = async (data: ILoginModel) => {
        console.log("Form data:", data);
        try {
            const result = await login(data).unwrap();

            if (result.token) {
                console.log(result.token);
                // 2. Hydrate your global Redux state
                dispatch(loginSuccess(result.token));
                //Потробно зберегти глобально інформацію про користувача
                await SecureStore.setItemAsync('accessToken',  result.token);
                router.push("/");
            }
        }
        catch (err: any) {
            console.error("Помилка авторизації:", err);

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

    const onHandleToLogger = () => {
        router.push("/logger");
    }

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
                                Увійти в акаунт
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
                                            <TextInput
                                                placeholder="Email"
                                                keyboardType="email-address"
                                                value={value}
                                                onChangeText={onChange}
                                                placeholderClassName={"text-gray-600"}
                                                className="w-full max-w-md bg-white rounded-lg px-4 py-3 mb-4 border border-gray-300"
                                            />
                                        )}
                            />

                            <Controller control={control}
                                        name="password"
                                        rules={{ required: "Пароль обов’язковий" }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput placeholder="Пароль"
                                                       secureTextEntry
                                                       value={value}
                                                       onChangeText={onChange}
                                                       className="w-full max-w-md bg-white rounded-lg px-4 py-3 mb-6 border border-gray-300"
                                            />
                                        )}
                            />

                            <Pressable
                                disabled={isLoading}
                                onPress={handleSubmit(onSubmit)}
                                className={`${isLoading ? "bg-blue-400 dark:bg-blue-700" : "bg-blue-500 dark:bg-blue-900"} border dark:border-blue-700 border-blue-600 w-full rounded-lg py-3 items-center mb-3`}
                            >
                                <Text className="text-white dark:text-gray-100 font-semibold">
                                    {isLoading ? "Вхід..." : "Увійти"}
                                </Text>
                            </Pressable>

                            <Pressable onPress={onHandleToLogger}
                                       className="bg-blue-500 dark:bg-blue-900 border dark:border-blue-700 border-blue-600 w-full rounded-lg py-3 items-center mb-3"
                            >
                                <Text className="text-white dark:text-gray-100 font-semibold">Логер</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
}