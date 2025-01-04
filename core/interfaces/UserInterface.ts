import {Rank} from "../classes/base/enums/Rank";

export interface UserInterface {

    inviter: string
    nick: string
    appointment: Date
    appointed: Date
    points: number
    telergam: string
    forum: string
    discord: string
    timeZone: number
    age: number

    warns: number;
    preds: number;

}