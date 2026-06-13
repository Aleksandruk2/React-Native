import {View, Text, TextInput, Pressable, Platform, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import {useForm, Controller} from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import ImagePickerButton from "@/components/form/ImagePickerButton";
import {IRegisterModel} from "@/models/IRegisterModel";
import {useDispatch} from "react-redux";
import {useRegisterMutation} from "@/services/authService";
import {loginSuccess} from "@/store/reducers/authSlice";
import {router} from "expo-router";
import {useColorScheme} from "@/hooks/use-color-scheme";

export default function RegisterScreen() {
    const {control, handleSubmit, setValue, watch} = useForm<IRegisterModel>();
    const imageFile = watch("imageFile");
    const dispatch = useDispatch();
    const [register, {isLoading}] = useRegisterMutation();
    const colorScheme = useColorScheme();

    const pickImage = async () => {
        console.log("Pick image");
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Доступ до галереї потрібен для вибору фото.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            console.log("asset", asset);
            setValue("imageFile", {
                uri: asset.uri,
                name: asset.fileName ?? "avatar.jpg",
                type: asset.mimeType ?? "image/jpeg",
            });
        }
    }

    const onSubmit = async  (data: IRegisterModel) => {
        try {
            const response = await register(data).unwrap();
            const token = response.token;
            dispatch(loginSuccess(token));
            await SecureStore.setItemAsync("accessToken", token);
            router.replace("/(tabs)/explore");

        } catch (e) {
            console.log("Register error:", e);
            alert("Помилка реєстрації");
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
                            paddingBottom: 80,
                            flexGrow: 1,
                        }}
                    >
                        <View className="flex-1 px-6">
                            <Text className="text-3xl font-bold text-center text-blue-600 mb-8">
                                Реєстрація користувача
                            </Text>

                            <View className={"items-center my-8"}>
                                <ImagePickerButton
                                    imageUri={imageFile?.uri ?? null}
                                    onPress={pickImage}
                                />
                                <Text className="text-gray-600 mt-2">
                                    Натисніть щоб обрати фото
                                </Text>
                            </View>

                            <Controller control={control}
                                        name="firstName"
                                        rules={{required: "Ім’я обов’язкове"}}
                                        render={({field: {onChange, value}}) => (
                                            <TextInput placeholder="Ім’я"
                                                       placeholderTextColor={
                                                           colorScheme === "dark"
                                                               ? "#A1A1AA" // zinc-400
                                                               : "#6B7280" // gray-500
                                                       }
                                                       value={value}
                                                       onChangeText={onChange}
                                                       className="w-full max-w-md bg-white dark:bg-zinc-800
                                                                  text-black dark:text-gray-200
                                                                  rounded-lg px-4 py-3 mb-4
                                                                  border border-gray-300 dark:border-zinc-700"
                                            />
                                        )}
                            />

                            <Controller control={control}
                                        name="lastName"
                                        rules={{required: "Прізвище обов’язкове"}}
                                        render={({field: {onChange, value}}) => (
                                            <TextInput placeholder="Прізвище"
                                                       placeholderTextColor={
                                                           colorScheme === "dark"
                                                               ? "#A1A1AA" // zinc-400
                                                               : "#6B7280" // gray-500
                                                       }
                                                       value={value}
                                                       onChangeText={onChange}
                                                       className="w-full max-w-md bg-white dark:bg-zinc-800
                                                                  text-black dark:text-gray-200
                                                                  rounded-lg px-4 py-3 mb-4
                                                                  border border-gray-300 dark:border-zinc-700"
                                            />
                                        )}
                            />

                            <Controller control={control}
                                        name="email"
                                        rules={{required: "Email обов’язковий"}}
                                        render={({field: {onChange, value}}) => (
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

                            <Controller control={control}
                                        name="password"
                                        rules={{required: "Пароль обов’язковий"}}
                                        render={({field: {onChange, value}}) => (
                                            <TextInput placeholder="Пароль"
                                                       placeholderTextColor={
                                                           colorScheme === "dark"
                                                               ? "#A1A1AA" // zinc-400
                                                               : "#6B7280" // gray-500
                                                       }
                                                       secureTextEntry
                                                       value={value}
                                                       onChangeText={onChange}
                                                       className="w-full max-w-md bg-white dark:bg-zinc-800
                                                                  text-black dark:text-gray-200
                                                                  rounded-lg px-4 py-3 mb-4
                                                                  border border-gray-300 dark:border-zinc-700"
                                            />
                                        )}
                            />

                            <Pressable
                                disabled={isLoading}
                                onPress={handleSubmit(onSubmit)}
                                className={`${isLoading ? "bg-blue-400 dark:bg-blue-700" : "bg-blue-500 dark:bg-blue-900"} border dark:border-blue-700 border-blue-600 w-full rounded-lg py-3 items-center mb-3`}
                            >
                                <Text className="text-white dark:text-gray-100 font-semibold">
                                    {isLoading ? "Завантаження..." : "Зареєструватися"}
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>

    );
}