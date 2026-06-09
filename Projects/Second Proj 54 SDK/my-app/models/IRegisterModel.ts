import {IImageFile} from "@/models/common/IImageFile";

export interface IRegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageFile?: IImageFile;
}