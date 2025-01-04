import {Global} from "../namespaces/Global";

export function NamedStage(className: string) {
    return function (target: Function) {
        Global.REGISTERED_STAGES_EXECUTORS.set(className, target);
    };
}