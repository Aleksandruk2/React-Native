import {fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-named-as-default
import APP_ENV from "@/env";

export const apiBaseQuery = (endpoint: string) => {
    return fetchBaseQuery({
        baseUrl: `${APP_ENV.API_BASE_URL}/api/${endpoint}`,
    });
}