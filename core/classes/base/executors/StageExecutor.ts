import {BaseEvent} from "../../abstract/BaseEvent";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {User} from "../main/User";
import {MessageEventClass} from "../events/MessageEventClass";
import {DefaultMessages} from "../enums/DefaultMessages";

export class StageExecutor extends BaseEvent {

    public async execute(message: MessageEventClass) : Nothing {
        const user : User = message.user;
        await user.initExists();
        if (!user.exists) return await message.reply(DefaultMessages.DONT_HAVE_PERMISSIONS.message);
    }

}