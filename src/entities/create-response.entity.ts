import { InternalServerErrorException } from "@nestjs/common";
import { GeneralResponseEntity } from "./general.entity";


type ResponseReturn<T> = GeneralResponseEntity | GeneralResponseEntity<T> | GeneralResponseEntity<T[]>;

export function CreateResponse<T>(status: boolean, message: string, data: T[], total: number): GeneralResponseEntity<T[]>;

export function CreateResponse<T>(status: boolean, message: string, data: T): GeneralResponseEntity<T>;

export function CreateResponse(status: boolean, message: string): GeneralResponseEntity;

export function CreateResponse(status: boolean, message: string): GeneralResponseEntity;



export function CreateResponse<T>(status: boolean, message: string, data?: T | T[], total?: number): ResponseReturn<T> {
    const isArray = Array.isArray(data)


    if (isArray)
        return {
            status,
            message,
            total: total ?? data.length,
            data
        };


    if (data !== undefined && data !== null) {
        return {
            status,
            message,
            data,
            };
    }


    return {
        status,
        message,
        data: {} as T,
    };
}