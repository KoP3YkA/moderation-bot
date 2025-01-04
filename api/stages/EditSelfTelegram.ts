import {NamedStage} from "../../core/decorators/NamedStage";
import {Stage} from "../../core/classes/base/enums/Stage";
import {StageExecutor} from "../../core/classes/base/executors/StageExecutor";
import {MessageEventClass} from "../../core/classes/base/events/MessageEventClass";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {StringUtil} from "../../core/classes/base/utility/StringUtil";
import {User} from "../../core/classes/base/main/User";
import {DefaultEditSelfInformationStageExecutor} from "./DefaultEditSelfInformationStageExecutor";

@NamedStage(Stage.EDIT_SELF_TELEGRAM.tag)
export class EditSelfTelegram extends StageExecutor {

    public override async execute(message: MessageEventClass) : Nothing {
        const user = message.user;
        await user.initAll()
        await new DefaultEditSelfInformationStageExecutor(
            message,
            "✅ | Вы успешно сменили телеграм!",
            Stage.EDIT_SELF_TELEGRAM,
            "telegram",
            50,
            user.messageManager.getChangeTelegram
        ).execute()
    }

}