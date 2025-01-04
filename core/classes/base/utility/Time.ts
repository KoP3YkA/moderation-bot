import {UtilityClass} from "../../abstract/UtilityClass";

export class Time extends UtilityClass {

    public constructor(
        public time: Date
    ) {super();}

    public static get currency() : Time {
        return new Time(new Date());
    }

    private get values() : {day: string, month: string, year: number, hours: string, minutes: string, seconds: string} {
        const day = String(this.time.getDate()).padStart(2, '0');
        const month = String(this.time.getMonth() + 1).padStart(2, '0');
        const year = this.time.getFullYear();
        const hours = String(this.time.getHours()).padStart(2, '0');
        const minutes = String(this.time.getMinutes()).padStart(2, '0');
        const seconds = String(this.time.getSeconds()).padStart(2, '0');

        return {day, month, year, hours, minutes, seconds};
    }

    public get toString() : string {
        const { day, month, year, hours, minutes, seconds } = this.values;
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    public get toDateString() : string {
        const { day, month, year, hours, minutes, seconds } = this.values;
        return `${day}/${month}/${year}`;
    }

    public get getDaysDifference(): number {
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - this.time.getTime();
        return Math.floor(timeDifference / (1000 * 3600 * 24));
    }

    public static toDate(str: string) : Time | null {
        const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;

        if (!datePattern.test(str)) return null;

        const [day, month, year] = str.split('.').map(Number);

        const date = new Date(year, month - 1, day);
        if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) return null;

        return new Time(date);
    }

}