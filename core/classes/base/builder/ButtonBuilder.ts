import {BuilderClass} from "../../abstract/BuilderClass";
import {KeyboardBuilder} from "vk-io";
import {PayloadButtonBuilder} from "./PayloadButtonBuilder";
import {Color} from "../enums/Color";

export class ButtonBuilder extends BuilderClass {

    public static CANCEL_KEYBOARD_BUTTON : ButtonBuilder = new ButtonBuilder()
        .addButton(
            new PayloadButtonBuilder()
                .setColor(Color.RED)
                .setText('Отмена')
                .addPayload('command', 'cancel')
        )

    // ----------------------------------------------------------------------

    private builder : KeyboardBuilder = new KeyboardBuilder();

    public addButton(button: PayloadButtonBuilder) : ButtonBuilder {
        this.builder.callbackButton({
            label: button.label,
            payload: Object.fromEntries(button.payload),
            color: button.color
        })
        return this;
    }

    public get newLine() : ButtonBuilder {
        this.builder.row()
        return this;
    }

    public get build() : KeyboardBuilder {return this.builder.inline(true);}

}