import {Nothing} from "./core/database/ModularORM/types/Nothing";
import {Client} from "./core/classes/base/client/Client";
import {Global} from "./core/namespaces/Global";
import {Users} from "./core/database/modules/Users";
import {ModularORM} from "./core/database/ModularORM/modularorm";
import {InactiveButton} from "./api/buttons/InactiveButton";
import {SendInactiveReason} from "./api/stages/SendInactiveReason";
import {Stages} from "./core/database/modules/Stages";
import {Inactive} from "./core/database/modules/Inactive";
import {CancelButtonExecutor} from "./api/buttons/CancelButtonExecutor";
import {SendInactiveTime} from "./api/stages/SendInactiveTime";
import {EditInformationButton} from "./api/buttons/EditInformationButton";
import {UserSelfEditTelegramButton} from "./api/buttons/information/default/UserSelfEditTelegramButton";
import {EditSelfTelegram} from "./api/stages/EditSelfTelegram";
import {UserSelfEditInformationButton} from "./api/buttons/UserSelfEditInformationButton";
import {UserSelfEditDiscordButton} from "./api/buttons/information/default/UserSelfEditDiscordButton";
import {EditSelfDiscord} from "./api/stages/EditSelfDiscord";
import {DefaultEditSelfInformationStageExecutor} from "./api/stages/DefaultEditSelfInformationStageExecutor";

export class ModerationBot {

    private static instance : ModerationBot;
    public client!: Client

    protected constructor() {}

    public async start() : Nothing {
        this.client = new Client();
        await this.client.start(Global.TOKEN);
        this.databaseInit()
        this.classesInit()
        const database : ModularORM = ModularORM.getInstance;
        await database.start(Global.DATABASE_CONNECTION_DATA);
    }

    private databaseInit() : void {
        new Users();
        new Stages();
        new Inactive();
    }

    private classesInit() : void {
        new InactiveButton();
        new SendInactiveReason();
        new CancelButtonExecutor();
        new SendInactiveTime();
        new EditInformationButton();
        new UserSelfEditTelegramButton();
        new EditSelfTelegram();
        new UserSelfEditInformationButton();
        new UserSelfEditDiscordButton();
        new EditSelfDiscord();

    }

    public static get getInstance() : ModerationBot {
        if (!this.instance) this.instance = new ModerationBot();
        return this.instance;
    }

}

new Promise(async (resolve, reject) => {
    const main : ModerationBot = ModerationBot.getInstance;
    await main.start()
})