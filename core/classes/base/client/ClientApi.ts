import {API} from "vk-io";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {MessagesEditParams, MessagesSendParams} from "vk-io/lib/api/schemas/params";
import {Logging} from "../utility/Logging";

export class ClientApi {

    public constructor(
        public api: API
    ) {}

    public async sendMessage(params: MessagesSendParams) : Nothing {
        await this.api.messages.send(params).catch(err => {return err});
    }

    public async editMessage(params: MessagesEditParams) : Nothing {
        await this.api.messages.edit(params).catch(err => {
            Logging.warn(err)
            return err
        });
    }

}