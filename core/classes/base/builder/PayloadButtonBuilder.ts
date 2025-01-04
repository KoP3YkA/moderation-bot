import {BuilderClass} from "../../abstract/BuilderClass";
import {ButtonColor, KeyboardBuilder} from "vk-io";

export class PayloadButtonBuilder extends BuilderClass {

    public color!: ButtonColor;
    public label!: string;
    public payload: Map<string, any> = new Map();

    public constructor() {super();}

    public setColor(color: ButtonColor) : this {
        this.color = color;
        return this;
    }

    public setText(text: string) : this {
        this.label = text;
        return this;
    }

    public addPayload(key: string, value: any) : this {
        this.payload.set(key, value)
        return this;
    }

    public get build(): string {return "";}

}