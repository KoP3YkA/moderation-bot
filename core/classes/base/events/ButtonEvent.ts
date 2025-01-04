import {BaseApiEvent} from "../../abstract/BaseApiEvent";
import {User} from "../main/User";
import {MessageEventContext} from "vk-io";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {MessagesEditParams, MessagesSendParams} from "vk-io/lib/api/schemas/params";
import {ModerationBot} from "../../../../main";
import {ClientApi} from "../client/ClientApi";
import {ButtonBuilder} from "../builder/ButtonBuilder";

export class ButtonEvent extends BaseApiEvent {

    public user : User;
    public payload : Map<string, any>;
    public api : ClientApi = ModerationBot.getInstance.client.clientApi;

    public constructor(
        public apiEvent : MessageEventContext,
    ) {
        super();
        this.user = new User(apiEvent.userId);
        this.payload = new Map(Object.entries(apiEvent.eventPayload));
    }

    public async snackbar(message: string) : Nothing {
        await this.apiEvent.answer({
            type: "show_snackbar",
            text: message
        })
    }

    public async send(params: MessagesSendParams) : Nothing {
        await this.user.send(params);
    }

    public async edit(params: Partial<MessagesEditParams>) : Nothing {
        await this.api.editMessage({...params, keep_forward_messages: true, disable_mentions: true, cmid: this.apiEvent.conversationMessageId, peer_id: this.apiEvent.peerId, keyboard: undefined})
    }

    public async keepKeyboardEdit(params: Partial<MessagesEditParams>) : Nothing {
        await this.api.editMessage({...params, keep_forward_messages: true, disable_mentions: true, cmid: this.apiEvent.conversationMessageId, peer_id: this.apiEvent.peerId})
    }

    public async cancelButtonEdit(params: Partial<MessagesEditParams>) : Nothing {
        await this.api.editMessage({...params, keep_forward_messages: true, disable_mentions: true, cmid: this.apiEvent.conversationMessageId, peer_id: this.apiEvent.peerId, keyboard: ButtonBuilder.CANCEL_KEYBOARD_BUTTON.build})
    }

}