import {BaseApiEvent} from "../../abstract/BaseApiEvent";
import {User} from "../main/User";
import {MessageContext} from "vk-io";
import {IMessageContextSendOptions} from "vk-io/lib/structures/contexts/message";
import {Nothing} from "../../../database/ModularORM/types/Nothing";

export class MessageEventClass extends BaseApiEvent {

    public text : string;
    public words : string[];
    public user : User;

    public constructor(
        public apiEvent : MessageContext
    ) {
        super();
        this.user = new User(apiEvent.senderId)
        this.text = apiEvent.text ? apiEvent.text.trim() : "";
        this.words = this.text.split(' ');
    }

    public async reply(text: string | IMessageContextSendOptions, params?: IMessageContextSendOptions) : Nothing {
        await this.apiEvent.reply(text, {...params, disable_mentions: true}).catch(err => {return err});
    }

    public async send(text: string | IMessageContextSendOptions, params?: IMessageContextSendOptions) : Nothing {
        await this.apiEvent.send(text, params).catch(err => {return err});
    }

}