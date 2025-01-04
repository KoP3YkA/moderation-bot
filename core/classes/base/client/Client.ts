import {API, MessageContext, MessageEventContext, Updates, Upload} from "vk-io";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {ClientApi} from "./ClientApi";
import {MessageEventExecutor} from "../../../../api/events/MessageEventExecutor";
import {MessageEventClass} from "../events/MessageEventClass";
import {Global} from "../../../namespaces/Global";
import {BaseEvent} from "../../abstract/BaseEvent";
import {ButtonEvent} from "../events/ButtonEvent";
import {User} from "../main/User";
import {Logging} from "../utility/Logging";

export class Client {

    private api? : API;
    private upload? : Upload;
    private client? : Updates;

    public async start(token: string) : Nothing {
        const api : API = new API({
            token: token
        })
        this.api = api;

        const upload : Upload = new Upload({api});
        this.upload = upload;

        const client : Updates = new Updates({api, upload});
        this.client = client;

        await this.client.start()

        client.on('message_new', async (message) => {
            if (!message.isChat) await this.onMessage(message);
        })

        client.on('message_event', async (event) => {
            if (event.userId !== event.peerId) return;
            await this.onButton(event);
        })

    }

    private async onMessage(message: MessageContext) : Nothing {
        await new MessageEventExecutor().execute(new MessageEventClass(message));
    }

    private async onButton(event: MessageEventContext) : Nothing {
        if (!event.eventPayload['command']) return;
        const command : string = event.eventPayload.command;
        if (!Global.REGISTERED_BUTTON_COMMANDS.has(command)) return;
        const executor = Global.REGISTERED_BUTTON_COMMANDS.get(command) as Function;
        const _class = new (executor as { new (): BaseEvent })()
        await _class.execute(new ButtonEvent(event));
    }

    public get clientApi() : ClientApi {return new ClientApi(this.api as API)};

}