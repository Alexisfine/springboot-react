import { AxiosResponse } from "axios"
export interface IStudent {
    studentId: string,
    firstName: string, 
    lastName: string, 
    email: string, 
    gender: "MALE" | "FEMALE"
}

export class ApiAxiosError  {
    message: string 
    httpStatus: string 
    timestamp: string 

    constructor(m:string, h:string, t:string) {
        this.message = m;
        this.httpStatus = h;
        this.timestamp = t;
    }
}