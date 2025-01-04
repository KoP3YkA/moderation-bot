import {EnvironManager} from "../classes/base/managers/EnvironManager";
import {DatabaseParams} from "../database/ModularORM/interfaces/DatabaseParams";
import {User} from "../classes/base/main/User";
import {Stage} from "../classes/base/enums/Stage";
import {UserAndStage} from "../interfaces/UserAndStage";

export namespace Global {

    const environManager = new EnvironManager();

    export const TOKEN : string = environManager.getEnvironField<string>('VK_TOKEN')

    export const DATABASE_CONNECTION_DATA : DatabaseParams = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'public_moders',
        port: 3306
    }

    export const REGISTERED_BUTTON_COMMANDS : Map<string, Function> = new Map();

    export const STAGES : Map<string, Stage> = new Map();

    export const REGISTERED_STAGES_EXECUTORS : Map<string, Function> = new Map();

    export const REGISTERED_INFORMATION_BUTTONS_EXECUTORS : Map<string, Function> = new Map();

}