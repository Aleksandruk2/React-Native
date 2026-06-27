export default interface IUserModel {
    email:string,
    name:string,
    roles: string[],
    image: string,
    exp: number,
    token: string,
}