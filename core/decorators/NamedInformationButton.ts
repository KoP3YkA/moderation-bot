import {Global} from "../namespaces/Global";

export function NamedInformationButton(className: string) {
    return function (target: Function) {
        Global.REGISTERED_INFORMATION_BUTTONS_EXECUTORS.set(className, target);
    };
}