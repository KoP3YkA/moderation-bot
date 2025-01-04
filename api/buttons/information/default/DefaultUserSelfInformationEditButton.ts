import {ButtonExecutor} from "../../../../core/classes/base/executors/ButtonExecutor";
import {ButtonEvent} from "../../../../core/classes/base/events/ButtonEvent";
import {Nothing} from "../../../../core/database/ModularORM/types/Nothing";
import {Stage} from "../../../../core/classes/base/enums/Stage";
import {User} from "../../../../core/classes/base/main/User";

export class DefaultUserSelfInformationEditButton extends ButtonExecutor {

    public constructor(
        public event: ButtonEvent,
        public stage: Stage,
        public message: string,
    ) {super();}

    public override async execute(): Nothing {
        const event = this.event;
        await super.execute(event);
        const user : User = event.user;
        user.stageManager.setStage(this.stage);
        await event.cancelButtonEdit({
            message: this.message
        })
    }

}