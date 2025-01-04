import {StageExecutor} from "../../core/classes/base/executors/StageExecutor";
import {MessageEventClass} from "../../core/classes/base/events/MessageEventClass";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {NamedStage} from "../../core/decorators/NamedStage";
import {User} from "../../core/classes/base/main/User";
import {Stage} from "../../core/classes/base/enums/Stage";
import {StringUtil} from "../../core/classes/base/utility/StringUtil";

@NamedStage('send_inactive_reason')
export class SendInactiveReason extends StageExecutor {

    public override async execute(message: MessageEventClass) : Nothing {
        await super.execute(message);
        let text: string = message.text;
        if (text.trim() === "") return await message.reply({
            message: `💢 | Укажите причину строкой!`
        })

        text = new StringUtil(text).sliceIfLong(100).str;

        const user : User = message.user;
        await user.stageManager.setStage(Stage.SEND_INACTIVE_TIME)
        await user.stageManager.setInformation(Stage.SEND_INACTIVE_REASON, text)

        await message.reply({
            message: `🎞️ | Причина неактива: "${text}"`
            + `\n🕤 | Теперь укажите начало и конец неактива датами через новую строку.`
            + '\n🎙️ | Пример:'
            + '\n03.01.2025'
            + '\n04.01.2025'
        })

    }

}