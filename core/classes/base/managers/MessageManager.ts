import {Manager} from "../../abstract/Manager";
import {User} from "../main/User";
import {Time} from "../utility/Time";

export class MessageManager extends Manager {

    public constructor(
        public user : User,
    ) {
        super();
    }

    public get getStatisticMessage() : string {
        const timeZone : string = this.user.age < 0
            ? `-${this.user.age}`
            : this.user.age == 0
            ? ``
            : `+${this.user.age}`

        return `👤 Ник -- ${this.user.nick}`
        + `\n🪪 Должность -- ${this.user.level.displayName}`
        + `\n🕑 Последнее повышение -- ${new Time(this.user.appointment).toString}`
        + `\n🕑 Назначен -- ${new Time(this.user.appointed).toString}`
        + '\n'
        + `\n0️⃣ Discord ID -- ${this.user.discord}`
        + `\n1️⃣ Telegram -- ${this.user.telergam}`
        + `\n2️⃣ Forum -- ${this.user.forum}`
        + '\n'
        + `\n✡️ Возраст -- ${this.user.age}`
        + `\n🌐 Часовой пояс -- МСК${timeZone}`
        + '\n'
        + `\n🔴 Выговоры -- ${this.user.warns}/3`
        + `\n🔺 Предупреждения -- ${this.user.preds}/2`
        + '\n'
        + `\nНазначен [id${this.user.inviter}|пользователем]`
    }

    public getInactiveMessage(reason: string, time: string) : string {
        const splitText : string[] = time.split('\n');
        const startDate : Time = (Time.toDate(splitText[0]) as Time)
        const endDate : Time = (Time.toDate(splitText[1]) as Time)
        return '🕐 | Заявление на неактив'
        + `🌐 Модератор -- ${this.user.level.displayName} | ${this.user.nick}`
        + `\n✳️ Причина -- "${reason}"`
        + `\n🔜 Дата начала -- ${startDate.toDateString}`
        + `\n🔚 Дата конца -- ${startDate.toDateString}`
    }

    public getChangeTelegram(newTelegram: string) : string {
        return `🩵 | Смена телеграма`
        + `\n👤 Пользователь -- ${this.user.level.displayName} | ${this.user.nick}`
        + `\n🔚 Старый телеграм -- ${this.user.telergam}`
        + `\n🔜 Новый телеграм -- ${newTelegram}`
    }

    public getChangeDiscord(newDiscord: string) : string {
        return `💙 | Смена discord ID`
            + `\n👤 Пользователь -- ${this.user.level.displayName} | ${this.user.nick}`
            + `\n🔚 Старый ID -- ${this.user.telergam}`
            + `\n🔜 Новый ID -- ${newDiscord}`
    }

}