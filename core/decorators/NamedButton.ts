import {Global} from "../namespaces/Global";

export function NamedButton(className: string) {
    return function (target: Function) {
        Global.REGISTERED_BUTTON_COMMANDS.set(className, target);
    };
}