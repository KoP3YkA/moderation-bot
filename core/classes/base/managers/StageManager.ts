import {Manager} from "../../abstract/Manager";
import {User} from "../main/User";
import {Stage} from "../enums/Stage";
import {Global} from "../../../namespaces/Global";
import STAGES = Global.STAGES;
import {QueryBuilder} from "../../../database/ModularORM/classes/base/QueryBuilder";
import {QueryType} from "../../../database/ModularORM/classes/base/QueryType";
import {Stages} from "../../../database/modules/Stages";
import {WhereBuilder} from "../../../database/ModularORM/classes/base/WhereBuilder";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {SelectBuilder} from "../../../database/ModularORM/classes/base/SelectBuilder";
import {StageUserQuery} from "../../../database/query/StageQuerys";
import {InsertBuilder} from "../../../database/ModularORM/classes/base/InsertBuilder";

export class StageManager extends Manager {

    public constructor(
        public user : User,
    ) {super();}

    public get stage() : Stage {
        if (!Global.STAGES.has(this.user.stringUserId)) return Stage.NONE;
        else return Global.STAGES.get(this.user.stringUserId) as Stage;
    }

    public async getInformation(stage: Stage) : Promise<string> {
        const queryBuilder : QueryBuilder = new QueryBuilder()
            .setType(QueryType.SELECT)
            .setTable(Stages)
            .setSelect(new SelectBuilder().addAll())
            .setWhere(
                new WhereBuilder()
                    .equalAnd('userId', this.user.stringUserId)
                    .equalAnd('stage', stage.tag)
            )
            .setLimit(1)
            .setDesc('id')
        const results : StageUserQuery[] = await queryBuilder.build().get<StageUserQuery>(StageUserQuery);
        if (results.length < 1) return "";
        return results[0].information;
    }

    public setStage(stage: Stage) : void {
        if (stage === Stage.NONE) Global.STAGES.delete(this.user.stringUserId);
        Global.STAGES.set(this.user.stringUserId, stage);
    }

    public async setInformation(stage: Stage, information: string) : Nothing {
        const queryBuilder : QueryBuilder = new QueryBuilder()
            .setType(QueryType.INSERT)
            .setTable(Stages)
            .setInsert(
                new InsertBuilder(true)
                    .add('userId', this.user.stringUserId)
                    .add('stage', stage.tag)
                    .add('information', information)
            )
        await queryBuilder.build().execute();
    }

    public async deleteAllInformation() : Nothing {
        const queryBuilder : QueryBuilder = new QueryBuilder()
            .setType(QueryType.DELETE)
            .setTable(Stages)
            .setWhere(
                new WhereBuilder()
                    .equalAnd('userId', this.user.userId)
            )
        await queryBuilder.build().execute();
    }

}