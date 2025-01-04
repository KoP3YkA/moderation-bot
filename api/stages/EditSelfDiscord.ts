import {StageExecutor} from "../../core/classes/base/executors/StageExecutor";
import {NamedStage} from "../../core/decorators/NamedStage";
import {Stage} from "../../core/classes/base/enums/Stage";
import {MessageEventClass} from "../../core/classes/base/events/MessageEventClass";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {DefaultEditSelfInformationStageExecutor} from "./DefaultEditSelfInformationStageExecutor";

@NamedStage(Stage.EDIT_SELF_DISCORD.tag)
export class EditSelfDiscord extends StageExecutor {

    public override async execute(message: MessageEventClass) : Nothing {
        const user = message.user;
        await user.initAll()
        await new DefaultEditSelfInformationStageExecutor(
            message,
            "✅ | Вы успешно сменили дискорд ID!",
            Stage.EDIT_SELF_DISCORD,
            "discordId",
            22,
            user.messageManager.getChangeDiscord
        ).execute()
    }

}