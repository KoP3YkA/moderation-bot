import {EnumClass} from "../../abstract/EnumClass";
import {User} from "../main/User";
import {Nothing} from "../../../database/ModularORM/types/Nothing";

export class DefaultMessages extends EnumClass {

    public static DONT_HAVE_PERMISSIONS : DefaultMessages = new DefaultMessages('⛔ | У вас нет доступа к использованию этого бота! Если Вы являетесь модератором, то обратитесь к своему руководству.');
    public static ALREADY_IN_STAGE : DefaultMessages = new DefaultMessages('⛔ | Вы уже начали заполнять какое-либо заявление, или еще не дождались ответа по нему!')
    public static SUCCESS_CANCELED : DefaultMessages = new DefaultMessages('✅ | Успешно отменено!')
    public static CHIEF_MODERATOR_CANT_USE_IT : DefaultMessages = new DefaultMessages('⛔ | Главный модератор не может использовать это!');

    // ----------------------------------------------

    protected constructor(
        public message : string,
    ) {super();}

    public async send(user: User) : Nothing {
        await user.send({message: this.message})
    }

}