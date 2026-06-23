import {createApi} from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "@/utils/apiBaseQuery";
import {ILoginModel} from "@/models/ILoginModel";
import {IResponseModel} from "@/models/IResponseModel";
import {IRegisterModel} from "@/models/IRegisterModel";
import {serialize} from "object-to-formdata";
import IProfileModel from "@/models/IProfileModel";
import IEditProfileModel from "@/models/IEditProfileModel";



export const authService= createApi({
    reducerPath: 'accountApi',
    baseQuery: apiBaseQuery("Account"),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<IResponseModel, ILoginModel>({
            query: (credentials) => {
                return {
                    url: 'Login',
                    method: 'POST',
                    body: credentials,
                }
            },
            invalidatesTags: ["Auth"]
        }),
        register: builder.mutation<IResponseModel, IRegisterModel>({
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
                return {
                    url: "Me",
                    method: "GET",
                }
            }
        }),
        editProfile: builder.mutation<IResponseModel,IEditProfileModel>({
            query: (model)=> {
                console.log("Дані до серіалізації:", model)
                const formData = serialize(model)
                console.log("Серіалізовані дані користувача:", formData);
                return {
                    url: "EditProfile",
                    method: "PUT",
                    body: formData,
                }
            }
        })

    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useProfileQuery,
    useEditProfileMutation,
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