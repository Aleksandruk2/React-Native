import {ActivityIndicator, StyleSheet, View, Image, Text, Pressable} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Redirect } from 'expo-router';
import { useAppSelector } from "@/store";
import {useProfileQuery} from "@/services/authService";
import {SafeAreaView} from "react-native-safe-area-context";
import APP_ENV from "@/env";
import {useLogout} from "@/store/hooks/useLogout";

export default function HomeScreen() {
    const user = useAppSelector(x => x.auth.user);
    const { data: profile, isLoading, isError } = useProfileQuery(undefined, {skip: !user});
    const logout = useLogout();

    console.log("auth user info:", user);

    if (!user) {
        return <Redirect href='/login' />;
    }

    return (
        <>
            <SafeAreaView className="flex-1 bg-white">
                <ParallaxScrollView
                    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                    headerImage={
                        <Image
                            source={{ uri: `${APP_ENV.API_BASE_URL}/images/1200_${profile?.image}` }}
                            style={styles.profileImage}
                        />
                    }>

                    {isLoading && (
                        <ThemedView className="flex-1 items-center justify-center py-10">
                            <ActivityIndicator size="large" />
                        </ThemedView>
                    )}

                    {isError && (
                        <ThemedView className="mx-4 mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
                            <ThemedText className="text-red-600 text-sm text-center">
                                Не вдалося завантажити профіль
                            </ThemedText>
                        </ThemedView>
                    )}

                    {profile && (
                        <>
                            {/* Header: Avatar + Name */}
                            <ThemedView className="items-center pt-2 pb-4">
                                <View className="w-20 h-20 items-center justify-center rounded-full overflow-hidden border-2 border-white shadow mb-3">
                                    <Image
                                        source={{ uri: `${APP_ENV.API_BASE_URL}/images/200_${profile.image}` }}
                                        style={{ width: 80, height: 80 }}
                                    />
                                </View>
                                <ThemedText className="text-2xl font-semibold text-center">
                                    {profile.fullName}
                                </ThemedText>
                                <ThemedText className="text-sm text-gray-500 mt-1">
                                    #{profile.id}
                                </ThemedText>
                            </ThemedView>

                            {/* Info card */}
                            <ThemedView className="mx-4 rounded-2xl border border-gray-200 overflow-hidden">

                                <ThemedView className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-100">
                                    <ThemedText className="text-gray-400 text-xs w-28">
                                        Повне ім´я
                                    </ThemedText>
                                    <ThemedText className="flex-1 text-sm font-medium">
                                        {profile.fullName}
                                    </ThemedText>
                                </ThemedView>

                                <ThemedView className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-100">
                                    <ThemedText className="text-gray-400 text-xs w-28">
                                        Електронна пошта
                                    </ThemedText>
                                    <ThemedText className="flex-1 text-sm font-medium text-blue-600">
                                        {profile.email}
                                    </ThemedText>
                                </ThemedView>

                                <ThemedView className="flex-row items-center gap-3 px-4 py-3 border-b border-gray-100">
                                    <ThemedText className="text-gray-400 text-xs w-28">
                                        ID
                                    </ThemedText>
                                    <ThemedText className="flex-1 text-sm font-medium">
                                        {profile.id}
                                    </ThemedText>
                                </ThemedView>

                                <ThemedView className="flex-row items-center gap-3 px-4 py-3">
                                    <ThemedText className="text-gray-400 text-xs w-28">
                                        Дата реєстрації
                                    </ThemedText>
                                    <ThemedText className="flex-1 text-sm font-medium">
                                        {profile.dateCreated}
                                    </ThemedText>
                                </ThemedView>

                            </ThemedView>

                        </>
                    )}

                    <Pressable onPress={logout}
                               className="border-gray-300 border rounded-lg py-3 mx-4 items-center"
                    >
                        <Text className="text-red-500 font-semibold">Вийти</Text>
                    </Pressable>

                </ParallaxScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
});