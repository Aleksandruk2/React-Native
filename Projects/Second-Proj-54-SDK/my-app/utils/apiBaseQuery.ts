import {fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-named-as-default
import APP_ENV from "@/env";
import * as SecureStore from 'expo-secure-store';

export const apiBaseQuery = (endpoint: string) => {
    return fetchBaseQuery({
        baseUrl: `${APP_ENV.API_BASE_URL}/api/${endpoint}`,
        prepareHeaders: async (headers) => {
            const token = await SecureStore.getItemAsync("accessToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });
}