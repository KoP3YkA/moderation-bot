import {NamedButton} from "../../core/decorators/NamedButton";
import {ButtonExecutor} from "../../core/classes/base/executors/ButtonExecutor";
import {ButtonEvent} from "../../core/classes/base/events/ButtonEvent";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {User} from "../../core/classes/base/main/User";
import {Stage} from "../../core/classes/base/enums/Stage";
import {DefaultMessages} from "../../core/classes/base/enums/DefaultMessages";
import {Logging} from "../../core/classes/base/utility/Logging";

@NamedButton('cancel')
export class CancelButtonExecutor extends ButtonExecutor {

    public override async execute(event: ButtonEvent) : Nothing {
        await super.execute(event);
        const user : User = event.user;
        if (user.stageManager.stage === Stage.NONE) return await event.snackbar('🚫 | У вас нет действующего процесса заполнения!')
        await user.stageManager.setStage(Stage.NONE)
        await user.stageManager.deleteAllInformation();
        await event.edit({
            message: DefaultMessages.SUCCESS_CANCELED.message
        })
    }

}