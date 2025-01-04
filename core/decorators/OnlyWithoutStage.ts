import {Rank} from "../classes/base/enums/Rank";
import {BaseApiEvent} from "../classes/abstract/BaseApiEvent";
import {DefaultMessages} from "../classes/base/enums/DefaultMessages";
import {Stage} from "../classes/base/enums/Stage";

export function OnlyWithoutStage() {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (event: BaseApiEvent) {
            const user = event.user;
            if (user.stageManager.stage !== Stage.NONE) {
                return await DefaultMessages.ALREADY_IN_STAGE.send(user);
            }

            return originalMethod.apply(this, [event]);
        };

        return descriptor;
    };
}