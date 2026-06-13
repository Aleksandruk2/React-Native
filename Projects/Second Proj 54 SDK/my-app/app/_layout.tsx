import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack, usePathname} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';
import {useColorScheme} from '@/hooks/use-color-scheme';
import {Provider} from "react-redux";
import {store} from "@/store";
import * as SecureStore from 'expo-secure-store';
import {loginSuccess} from "@/store/reducers/authSlice";
import React, {useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ActivityIndicator, View, StyleSheet} from "react-native";


export default function RootLayout() {
    const [storageReady, setStorageReady] = useState(false);
    const colorScheme = useColorScheme();
    const pathname = usePathname();
    console.log('Назва поточного шляху:', pathname);

    useEffect(() => {
        initStore().then(() => {
            setStorageReady(true)
        });
    }, []);

    async function initStore(): Promise<void> {
        const accessToken  = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
            store.dispatch(loginSuccess(accessToken));
            // console.log("User info",accessToken);
        }
    }

    if (!storageReady) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066cc" />
            </View>
        );
    }

    return (
        <>
            <SafeAreaProvider>
                <Provider store={store}>
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <Stack>
                            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                            <Stack.Screen name="chat" options={{ headerShown: false }} />
                            <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                            <Stack.Screen name="logger" options={{headerShown: false}}/>
                        </Stack>
                        <StatusBar style="auto"/>
                    </ThemeProvider>
                </Provider>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
