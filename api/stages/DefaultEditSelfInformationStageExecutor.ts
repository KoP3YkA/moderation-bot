import {StageExecutor} from "../../core/classes/base/executors/StageExecutor";
import {MessageEventClass} from "../../core/classes/base/events/MessageEventClass";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {Stage} from "../../core/classes/base/enums/Stage";
import {StringUtil} from "../../core/classes/base/utility/StringUtil";
import {User} from "../../core/classes/base/main/User";
import {Logging} from "../../core/classes/base/utility/Logging";

export class DefaultEditSelfInformationStageExecutor extends StageExecutor {

    public constructor(
        public message : MessageEventClass,
        public text : string,
        public stage : Stage,
        public stats : string,
        public max : number,
        public staffMessage : Function
    ) {
        super();
    }

    public override async execute(): Nothing {
        await super.execute(this.message);
        const message : MessageEventClass = this.message;
        const text : string = new StringUtil(message.text).sliceIfLong(this.max).str
        const user : User = message.user;
        await user.initAll();
        await user.informationManager.edit(this.stats, text);
        await user.managementManager.sendMessage({
            message: this.staffMessage(text),
            disable_mentions: true
        })
        await message.reply({
            message: this.text
        })
        user.stageManager.setStage(Stage.NONE)
    }

}