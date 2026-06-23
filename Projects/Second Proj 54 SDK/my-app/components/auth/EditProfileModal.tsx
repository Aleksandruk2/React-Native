import { FC} from "react";
import {
    View,
    Text,
    ScrollView,
    Modal,
    Platform,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {useEditProfileMutation} from "@/services/authService";
import ImagePickerButton from "@/components/form/ImagePickerButton";
import {useColorScheme} from "@/hooks/use-color-scheme";
import IEditProfileModel from "@/models/IEditProfileModel";
import * as ImagePicker from "expo-image-picker";
import {useAppSelector} from "@/store";
import APP_ENV from "@/env";
import {loginSuccess} from "@/store/reducers/authSlice";
import * as SecureStore from "expo-secure-store";
import {useDispatch} from "react-redux";

interface Props {
    visible: boolean;
    onClose: () => void;
}

const EditChatModal: FC<Props> = ({  visible, onClose }) => {
    const user = useAppSelector(x => x.auth.user);

    const getProfileDefaultValues = () => {
        const [lastName, firstName] = (user?.name ?? '').split(' ');

        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: user?.email ?? "",
            image: {
                uri: user?.image ? `${APP_ENV.IMAGE_URL_400}${user.image}` : "",
                name: user?.image ?? "",
                type: "image/jpeg",
            }
        }
    }

    const { control, handleSubmit, watch, setValue, reset } = useForm<IEditProfileModel>({
        defaultValues: getProfileDefaultValues()
    });
    const image = watch("image");
    const [editProfile, {isLoading}] = useEditProfileMutation();
    const colorScheme = useColorScheme();
    const dispatch = useDispatch();


    const pickImage = async () => {
        // console.log("Pick image");
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
            setValue("image", {
                uri: asset.uri,
                name: asset.fileName ?? "avatar.jpg",
                type: asset.mimeType ?? "image/jpeg",
            });
        }
    }

    const onSubmit = async (data: IEditProfileModel) => {
        // console.log("Інформація користувача",data);
        try {
            const response = await editProfile(data).unwrap();
            const token = response.token;
            dispatch(loginSuccess(token));
            await SecureStore.setItemAsync("accessToken", token);

            reset(data);

            alert('Профіль успішно оновлено!');

            close();
        } catch (error) {
            console.error('Помилка оновлення:', error);
            alert('Не вдалося зберегти зміни');
        }
    }

    const close =  () => {
        reset();
        onClose();
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/50 items-center justify-center">
                <View className="w-[92%] max-h-[85%] bg-white dark:bg-zinc-900 rounded-xl">

                    <ScrollView className="p-4">
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                flexGrow: 1
                            }}
                        >
                            <View className="flex-1 justify-center items-center px-6">
                                <Text className="text-3xl font-bold text-emerald-500 mb-8">
                                    Редагувати профіль
                                </Text>

                                <View className={"items-center my-8"}>
                                    <ImagePickerButton
                                        imageUri={image?.uri ?? null}
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

                            </View>
                        </ScrollView>
                        <View className="h-6"/>
                    </ScrollView>

                    <View className="flex-row justify-end gap-4 p-3 border-t border-zinc-200 dark:border-zinc-800">
                        <Pressable
                            disabled={isLoading}
                            onPress={handleSubmit(close)}
                            className={"bg-gray-200 dark:bg-gray-900 border dark:border-gray-700 border-gray-300 rounded-lg p-3 items-center mb-3"}
                        >
                            <Text className="dark:text-gray-100 font-semibold">
                                Скасувати
                            </Text>
                        </Pressable>

                        <Pressable
                            disabled={isLoading}
                            onPress={handleSubmit(onSubmit)}
                            className={`${isLoading ? "bg-emerald-400 dark:bg-emerald-700" : "bg-emerald-500 dark:bg-emerald-900"} border dark:border-emerald-700 border-emerald-600 rounded-lg p-3 items-center mb-3`}
                        >
                            <Text className="text-white dark:text-gray-100 font-semibold">
                                {isLoading ? "Підтвердження..." : "Підтвердити"}
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default EditChatModal;
