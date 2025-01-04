import {NamedStage} from "../../core/decorators/NamedStage";
import {StageExecutor} from "../../core/classes/base/executors/StageExecutor";
import {MessageEventClass} from "../../core/classes/base/events/MessageEventClass";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {StringUtil} from "../../core/classes/base/utility/StringUtil";
import {Time} from "../../core/classes/base/utility/Time";
import {User} from "../../core/classes/base/main/User";
import {Stage} from "../../core/classes/base/enums/Stage";
import {ButtonBuilder} from "../../core/classes/base/builder/ButtonBuilder";
import {PayloadButtonBuilder} from "../../core/classes/base/builder/PayloadButtonBuilder";
import {Color} from "../../core/classes/base/enums/Color";
import {Logging} from "../../core/classes/base/utility/Logging";

@NamedStage('send_inactive_time')
export class SendInactiveTime extends StageExecutor {

    public override async execute(message: MessageEventClass) : Nothing {
        await super.execute(message);
        const text : string = new StringUtil(message.text).sliceIfLong(100).str;
        const splitText : string[] = text.split('\n');
        if (splitText.length < 2) return await message.reply({
            message: `🚫 | Укажите даты через строку!`
        })

        const startDate : string = splitText[0]
        const endDate : string = splitText[1]

        if (!Time.toDate(startDate) || !Time.toDate(endDate)) return await message.reply({
            message: `🚫 | Укажите даты в формате dd.mm.yyyy!`
        })

        const user : User = message.user;
        const reason : string = await user.stageManager.getInformation(Stage.SEND_INACTIVE_REASON);
        await user.stageManager.setInformation(Stage.SEND_INACTIVE_TIME, text);
        user.stageManager.setStage(Stage.NONE)

        await user.initAll();

        const keyboard : ButtonBuilder = new ButtonBuilder()
            .addButton(
                new PayloadButtonBuilder()
                    .setColor(Color.GREEN)
                    .setText('Принять')
                    .addPayload('command', 'inactive_accept')
                    .addPayload('user', user.userId)
            )
            .addButton(
                new PayloadButtonBuilder()
                    .setColor(Color.RED)
                    .setText('Отклонить')
                    .addPayload('command', 'inactive_reject')
                    .addPayload('user', user.userId)
            )

        await user.managementManager.sendMessage({
            message: user.messageManager.getInactiveMessage(reason, text),
            disable_mentions: true,
            keyboard: keyboard.build
        })

        await message.reply({
            message: `ℹ️ | Заявление на неактив успешно подано!`
        })

    }

}