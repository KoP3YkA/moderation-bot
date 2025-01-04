import {BaseEvent} from "../../core/classes/abstract/BaseEvent";
import {MessageEventClass} from "../../core/classes/base/events/MessageEventClass";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {User} from "../../core/classes/base/main/User";
import {DefaultMessages} from "../../core/classes/base/enums/DefaultMessages";
import {ButtonBuilder} from "../../core/classes/base/builder/ButtonBuilder";
import {PayloadButtonBuilder} from "../../core/classes/base/builder/PayloadButtonBuilder";
import {Color} from "../../core/classes/base/enums/Color";
import {Rank} from "../../core/classes/base/enums/Rank";
import {KeyboardBuilder} from "vk-io";
import {StageManager} from "../../core/classes/base/managers/StageManager";
import {Stage} from "../../core/classes/base/enums/Stage";
import {Global} from "../../core/namespaces/Global";
import {ButtonEvent} from "../../core/classes/base/events/ButtonEvent";

export class MessageEventExecutor extends BaseEvent {

    public async execute(message: MessageEventClass) : Nothing {
        const user : User = message.user;
        await user.initExists();

        if (!user.exists) return await message.reply({
            message: DefaultMessages.DONT_HAVE_PERMISSIONS.message,
        })

        const stagesManager : StageManager = user.stageManager
        const stage : Stage = stagesManager.stage

        if (stage !== Stage.NONE) {
            if (!Global.REGISTERED_STAGES_EXECUTORS.has(stage.tag)) return;
            const executor = Global.REGISTERED_STAGES_EXECUTORS.get(stage.tag) as Function;
            const _class = new (executor as { new (): BaseEvent })()
            await _class.execute(message);
            return;
        }

        await user.initAll();
        const builder : ButtonBuilder = new ButtonBuilder()
            .addButton(
                new PayloadButtonBuilder()
                    .setText('Заявление на неактив')
                    .setColor(Color.WHITE)
                    .addPayload('command', 'inactive')
            )
            .addButton(
                new PayloadButtonBuilder()
                    .setText('Изменение информации')
                    .setColor(Color.GREEN)
                    .addPayload('command', 'edit_information')
            )

        if (user.level.weight >= Rank.DEPUTY_CHIEF_MODERATOR.weight) {
            builder.newLine
                .addButton(
                    new PayloadButtonBuilder()
                        .setColor(Color.GRAY)
                        .setText('Модераторы')
                        .addPayload('command', 'moders_list')
                )
                .addButton(
                    new PayloadButtonBuilder()
                        .setColor(Color.WHITE)
                        .setText('Добавить модератора')
                        .addPayload('command', 'new_moderator')
                )
        }

        await message.reply({
            message: `Ваша статистика\n\n${user.messageManager.getStatisticMessage}`,
            keyboard: builder.build
        })

    }

}