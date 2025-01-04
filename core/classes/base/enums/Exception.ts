import {EnumClass} from "../../abstract/EnumClass";

export class Exception extends EnumClass {

    public static THIS_FIELD_DOES_NOT_EXIST : Exception = new Exception('This field does not exist!');
    public static INVALID_TYPE : Exception = new Exception('Invalid type!');

    // ----------------------------------------------

    protected constructor(
        public description: string,
    ) {super();}

    public throw() : void {throw new Error(this.description);}

}