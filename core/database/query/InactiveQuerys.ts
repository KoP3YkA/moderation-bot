import {QueryResult} from "../ModularORM/classes/base/QueryResult";
import {InactiveInterface} from "../../interfaces/InactiveInterface";
import {Result} from "../ModularORM/decorators/Result";

export class InactiveQuery extends QueryResult implements InactiveInterface {

    @Result('userId')
    public userId: string = "";

    @Result('inactiveApproved')
    public inactiveApproved: string = "";

    @Result('inactiveStart')
    public inactiveStart: Date = new Date();

    @Result('inactiveEnd')
    public inactiveEnd: Date = new Date();

}