import {EnumClass} from "../../abstract/EnumClass";

export class Rank extends EnumClass {

    public static DEFAULT : Rank = new Rank('default', 'Нет', 0);
    public static JUNIOR_MODERATOR : Rank = new Rank('junior', 'Младший модератор', 1);
    public static MODERATOR : Rank = new Rank('moderator', 'Модератор', 2);
    public static SENIOR_MODERATOR : Rank = new Rank('senior', 'Старший модератор', 3);
    public static CURATOR : Rank = new Rank('curator', 'Куратор модерации', 4);
    public static DEPUTY_CHIEF_MODERATOR : Rank = new Rank('deputy', 'Зам. главного модератора', 5);
    public static CHIEF_MODERATOR : Rank = new Rank('chief', 'Главный модератор', 6);

    // ------------------------------------------------------

    protected constructor(
        public tag : string,
        public displayName : string,
        public weight : number,
    ) {super();}

    // ------------------------------------------------------

    public static getByTag(tag: string) : Rank {
        return Object.values(this)
            .filter(obj => obj instanceof Rank)
            .find(obj => obj.tag == tag) ?? Rank.DEFAULT;
    }

}