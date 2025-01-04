import {NamedButton} from "../../core/decorators/NamedButton";
import {ButtonExecutor} from "../../core/classes/base/executors/ButtonExecutor";
import {ButtonEvent} from "../../core/classes/base/events/ButtonEvent";
import {Nothing} from "../../core/database/ModularORM/types/Nothing";
import {Global} from "../../core/namespaces/Global";
import {BaseEvent} from "../../core/classes/abstract/BaseEvent";

@NamedButton('edit_default_information')
export class UserSelfEditInformationButton extends ButtonExecutor {

    public override async execute(event: ButtonEvent) : Nothing {
        if (!event.payload.has('information')) return;
        const command : string = event.payload.get('information') as string;
        if (!Global.REGISTERED_INFORMATION_BUTTONS_EXECUTORS.has(command)) return;
        const executor = Global.REGISTERED_INFORMATION_BUTTONS_EXECUTORS.get(command) as Function;
        const _class = new (executor as { new (): BaseEvent })()
        await _class.execute(event);
    }

}