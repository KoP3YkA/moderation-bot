import {EnumClass} from "../../abstract/EnumClass";
import {ButtonColor} from "vk-io";

export class Color extends EnumClass {

    public static RED : ButtonColor = ButtonColor.NEGATIVE;
    public static GREEN : ButtonColor = ButtonColor.POSITIVE;
    public static WHITE : ButtonColor = ButtonColor.PRIMARY;
    public static GRAY : ButtonColor = ButtonColor.SECONDARY;

}