export class StringUtil {

    public constructor(
       public str: string,
    ) {}

    public sliceIfLong(max: number) : StringUtil {
        this.str.trim()
        if (this.str.length > max) {
            this.str = this.str.slice(0, max) + '...';
        }
        return this;
    }

}