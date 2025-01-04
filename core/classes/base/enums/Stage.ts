import {EnumClass} from "../../abstract/EnumClass";

export class Stage extends EnumClass {

    public static NONE : Stage = new Stage('none');
    public static SEND_INACTIVE_REASON : Stage = new Stage('send_inactive_reason');
    public static SEND_INACTIVE_TIME : Stage = new Stage('send_inactive_time');
    public static EDIT_SELF_TELEGRAM : Stage = new Stage('edit_self_telegram');
    public static EDIT_SELF_DISCORD : Stage = new Stage('edit_self_discord');

    // ------------------------------------------------

    protected constructor(
        public tag : string,
    ) {super();}

    public static getByTag(tag: string) : Stage {
        return Object.values(this)
            .filter(obj => obj instanceof Stage)
            .find(obj => obj.tag == tag) ?? Stage.NONE;
    }

}