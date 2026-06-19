import {IImageFile} from "@/models/common/IImageFile";

export default interface IEditProfileModel {
    firstName: string;
    lastName: string;
    email: string;
    image?: IImageFile;
}