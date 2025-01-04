import {Result} from "../ModularORM/decorators/Result";
import {StageInterface} from "../../interfaces/StageInterface";
import {QueryResult} from "../ModularORM/classes/base/QueryResult";

export class StageUserQuery extends QueryResult implements StageInterface{

    @Result('userId')
    public userId: string = "";

    @Result('stage')
    public stage: string = "";

    @Result('information')
    public information: string = "";

}