import {NamedInformationButton} from "../../../../core/decorators/NamedInformationButton";
import {ButtonExecutor} from "../../../../core/classes/base/executors/ButtonExecutor";
import {ButtonEvent} from "../../../../core/classes/base/events/ButtonEvent";
import {Nothing} from "../../../../core/database/ModularORM/types/Nothing";
import {DefaultUserSelfInformationEditButton} from "./DefaultUserSelfInformationEditButton";
import {Stage} from "../../../../core/classes/base/enums/Stage";

@NamedInformationButton('discord')
export class UserSelfEditDiscordButton extends ButtonExecutor {

    public override async execute(event : ButtonEvent) : Nothing {
        await new DefaultUserSelfInformationEditButton(event, Stage.EDIT_SELF_DISCORD, '✒️ | Теперь напишите ссылку на свой дискорд!').execute();
    }

}