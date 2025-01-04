import {BaseApiEvent} from "../classes/abstract/BaseApiEvent";
import {Stage} from "../classes/base/enums/Stage";
import {DefaultMessages} from "../classes/base/enums/DefaultMessages";
import {Rank} from "../classes/base/enums/Rank";

export function OnlyDefaultModerators() {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (event: BaseApiEvent) {
            const user = event.user;
            await user.initAll()
            if (user.level === Rank.CHIEF_MODERATOR) {
                return await DefaultMessages.CHIEF_MODERATOR_CANT_USE_IT.send(user);
            }

            return originalMethod.apply(this, [event]);
        };

        return descriptor;
    };
}