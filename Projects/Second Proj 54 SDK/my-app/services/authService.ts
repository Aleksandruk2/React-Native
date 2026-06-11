import {createApi} from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "@/utils/apiBaseQuery";
import {ILoginModel} from "@/models/ILoginModel";
import {LoginResponseModel} from "@/models/ILoginResponseModel";
import {IRegisterResponseModel} from "@/models/IRegisterResponseModel";
import {IRegisterModel} from "@/models/IRegisterModel";
import {serialize} from "object-to-formdata";
import IProfileModel from "@/models/IProfileModel";



export const authService= createApi({
    reducerPath: 'accountApi',
    baseQuery: apiBaseQuery("Account/"),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponseModel, ILoginModel>({
            query: (credentials) => {
                return {
                    url: 'Login',
                    method: 'POST',
                    body: credentials,
                }
            },
            invalidatesTags: ["Auth"]
        }),
        register: builder.mutation<IRegisterResponseModel, IRegisterModel>({
            query: (model)=>{
                const formData = serialize(model)
                return {
                    url: "Register",
                    method: "POST",
                    body: formData,
                }
            },
        }),
        profile: builder.query<IProfileModel,void>({
            query: ()=> {
                console.log("-------- Запит на профіль.")
                return {
                    url: "Me",
                    method: "GET",
                }
            }
        })

    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useProfileQuery,
} = authService;

// import {createApi} from "@reduxjs/toolkit/query/react";
// import {fetchBaseQuery} from "@reduxjs/toolkit/query";
// import { BASE_URL } from "@/api";
// // import {serialize} from "object-to-formdata";
// import type IRegisterModel from "../models/IRegisterModel.ts";
// import type ILoginModel from "../models/ILoginModel.ts";
// import {serialize} from "object-to-formdata";
//
//
// export const authService = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${BASE_URL}/Account/`,
//         prepareHeaders: (headers) => {
//             headers.set('Content-Type', 'application/json');
//             return headers;
//         },
//     }),
//     tagTypes: ['Auth'],
//     endpoints: (build) => ({
//         register: build.mutation<{
//             email: string,
//             id: number,
//             username: string,
//         }, IRegisterModel>({
//             query: (model)=>{
//                 const formData = serialize(model)
//                 return {
//                     url: "register",
//                     method: "POST",
//                     body: formData,
//                 }
//             },
//             invalidatesTags: ["Auth"]
//         }),
//         login: build.mutation<{token : string}, ILoginModel>({
//             query: (model)=>{
//                 // const formData = serialize(model)
//                 return{
//                     url: "Login",
//                     method: "POST",
//                     body: model,
//                 }
//             }
//         })
//
//     })
// })
//
// export const { useRegisterMutation, useLoginMutation } = authService;