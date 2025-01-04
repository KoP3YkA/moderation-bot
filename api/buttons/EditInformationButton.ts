import {NamedButton} from "../../core/decorators/NamedButton";
import {ButtonExecutor} from "../../core/classes/base/executors/ButtonExecutor";
import {ButtonEvent} from "../../core/classes/base/events/ButtonEvent";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {ButtonBuilder} from "../../core/classes/base/builder/ButtonBuilder";
import {PayloadButtonBuilder} from "../../core/classes/base/builder/PayloadButtonBuilder";
import {Color} from "../../core/classes/base/enums/Color";
import {Logging} from "../../core/classes/base/utility/Logging";

@NamedButton('edit_information')
export class EditInformationButton extends ButtonExecutor {

    public override async execute(event: ButtonEvent) : Nothing {
        await super.execute(event);

        const buttonBuilder : ButtonBuilder = new ButtonBuilder()
            .addButton(
                new PayloadButtonBuilder()
                    .setColor(Color.WHITE)
                    .setText('Telegram')
                    .addPayload('command', 'edit_default_information')
                    .addPayload('information', 'telegram')
            )
            .addButton(
                new PayloadButtonBuilder()
                    .setColor(Color.WHITE)
                    .setText('Discord ID')
                    .addPayload('command', 'edit_default_information')
                    .addPayload('information', 'discord')
            )
            .newLine
            .addButton(
                new PayloadButtonBuilder()
                    .setColor(Color.WHITE)
                    .setText('Forum')
                    .addPayload('command', 'edit_default_information')
                    .addPayload('information', 'forum')
            )
            .addButton(
                new PayloadButtonBuilder()
                    .setColor(Color.WHITE)
                    .setText('Часовой пояс')
                    .addPayload('command', 'edit_default_information')
                    .addPayload('information', 'timezone')
            )

        await event.keepKeyboardEdit({
            message: `📜 Изменение информации\nВыберите нужный пункт ниже`,
            keyboard: buttonBuilder.build
        })

    }

}