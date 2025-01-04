import {Rank} from "../classes/base/enums/Rank";
import {BaseEvent} from "../classes/abstract/BaseEvent";
import {BaseApiEvent} from "../classes/abstract/BaseApiEvent";
import {DefaultMessages} from "../classes/base/enums/DefaultMessages";

export function Access(requiredLevel: Rank) {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (event: BaseApiEvent) {
            const user = event.user;
            await user.initAll();
            const userRank : Rank = user.level ? user.level : Rank.DEFAULT;

            if (userRank.weight < requiredLevel.weight || userRank.tag === 'default') {
                return await DefaultMessages.DONT_HAVE_PERMISSIONS.send(user);
            }

            return originalMethod.apply(this, [event]);
        };

        return descriptor;
    };
}