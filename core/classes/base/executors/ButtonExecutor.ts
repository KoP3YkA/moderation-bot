import {BaseEvent} from "../../abstract/BaseEvent";
import {ButtonEvent} from "../events/ButtonEvent";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {User} from "../main/User";
import {DefaultMessages} from "../enums/DefaultMessages";

export class ButtonExecutor extends BaseEvent {

    public async execute(button: ButtonEvent) : Nothing {
        const user : User = button.user;
        await user.initExists();
        if (!user.exists) return await button.snackbar(DefaultMessages.DONT_HAVE_PERMISSIONS.message);
    }

}