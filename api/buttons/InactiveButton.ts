import {ButtonExecutor} from "../../core/classes/base/executors/ButtonExecutor";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {ButtonEvent} from "../../core/classes/base/events/ButtonEvent";
import {NamedButton} from "../../core/decorators/NamedButton";
import {User} from "../../core/classes/base/main/User";
import {OnlyWithoutStage} from "../../core/decorators/OnlyWithoutStage";
import {Stage} from "../../core/classes/base/enums/Stage";
import {OnlyDefaultModerators} from "../../core/decorators/OnlyDefaultModerators";

@NamedButton('inactive')
export class InactiveButton extends ButtonExecutor {

    @OnlyWithoutStage()
    @OnlyDefaultModerators()
    public override async execute(event: ButtonEvent) : Nothing {
        await super.execute(event);
        const user : User = event.user;
        if (await user.inactiveManager.getInactive()) return await event.snackbar('🚫 | У вас уже есть действующий неактив!')
        user.stageManager.setStage(Stage.SEND_INACTIVE_REASON)
        await event.cancelButtonEdit({
            message: `♻️ | Хорошо, теперь напишите причину неактива.`
        })
    }

}