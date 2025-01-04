import {Manager} from "../../abstract/Manager";
import {Natural} from "../../../types/Natural";
import {Exception} from "../enums/Exception";

export class EnvironManager extends Manager {

    public getEnvironField<T extends Natural>(field: string) : T {
        if (process.env[field] === undefined) Exception.THIS_FIELD_DOES_NOT_EXIST.throw();
        return process.env[field] as T;
    }

}