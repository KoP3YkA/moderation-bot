export class Logging {

    public static log = (objects: any) => console.log(objects);

    public static info = (objects: any) => console.log(`[INFO] ${objects}`);

    public static warn = (objects: any) => console.log(`[WARN] ${objects}`);

}