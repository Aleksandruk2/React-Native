import {createApi} from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "@/utils/apiBaseQuery";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
}

export const accountApi= createApi({
    reducerPath: 'accountApi',
    baseQuery: apiBaseQuery("Account/Login"),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => {
                return {
                    url: '',
                    method: 'POST',
                    body: credentials,
                }
            },
        }),

    })
});

export const {
    useLoginMutation,
} = accountApi;