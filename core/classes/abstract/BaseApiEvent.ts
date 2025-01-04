
import {User} from "../base/main/User";

export abstract class BaseApiEvent {

    public abstract user : User;
    public abstract apiEvent : any;

}