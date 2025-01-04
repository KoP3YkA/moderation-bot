import {QueryResult} from "../ModularORM/classes/base/QueryResult";
import {Result} from "../ModularORM/decorators/Result";
import {UserInterface} from "../../interfaces/UserInterface";

export class UserAllQuery extends QueryResult implements UserInterface{

    @Result('userId')
    public id : string = "";

    @Result('inviter')
    public inviter : string = "";

    @Result('nickname')
    public nick : string = "";

    @Result('level')
    public level : string = "";

    @Result('lastAppointment')
    public appointment : Date = new Date();

    @Result('appointedDate')
    public appointed : Date = new Date();

    @Result('points')
    public points : number = 0;

    @Result('telegram')
    public telergam : string = "";

    @Result('forum')
    public forum : string = "";

    @Result('discordId')
    public discord : string = "";

    @Result('warns')
    public warns : number = 0; // Выговоры

    @Result('preds')
    public preds : number = 0; // Предупреждения

    @Result('timeZone')
    public timeZone : number = 0;

    @Result('age')
    public age : number = 0;

}

export class UserExistsQuery extends QueryResult {

    @Result('id')
    public id : number = 0;

}