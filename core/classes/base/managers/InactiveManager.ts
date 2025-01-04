import {Manager} from "../../abstract/Manager";
import {User} from "../main/User";
import {InactiveInterface} from "../../../interfaces/InactiveInterface";
import {QueryBuilder} from "../../../database/ModularORM/classes/base/QueryBuilder";
import {QueryType} from "../../../database/ModularORM/classes/base/QueryType";
import {Inactive} from "../../../database/modules/Inactive";
import {SelectBuilder} from "../../../database/ModularORM/classes/base/SelectBuilder";
import {WhereBuilder} from "../../../database/ModularORM/classes/base/WhereBuilder";
import {InactiveQuery} from "../../../database/query/InactiveQuerys";
import {Time} from "../utility/Time";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {InsertBuilder} from "../../../database/ModularORM/classes/base/InsertBuilder";

export class InactiveManager extends Manager {

    public constructor(
        public user: User,
    ) {super();}

    private async deleteInactive() : Nothing {
        const queryBuilder : QueryBuilder = new QueryBuilder()
            .setType(QueryType.DELETE)
            .setTable(Inactive)
            .setWhere(
                new WhereBuilder()
                    .equalAnd('userId', this.user.stringUserId)
            )
        await queryBuilder.build().execute();
    }

    public async getInactive() : Promise<InactiveInterface | null> {
        const queryBuilder : QueryBuilder = new QueryBuilder()
            .setType(QueryType.SELECT)
            .setTable(Inactive)
            .setSelect(new SelectBuilder().addAll())
            .setWhere(
                new WhereBuilder()
                    .equalAnd('userId', this.user.stringUserId)
            )
            .setLimit(1)
            .setDesc('id')
        const results : InactiveQuery[] = await queryBuilder.build().get<InactiveQuery>(InactiveQuery);
        if (results.length < 1) return null;
        const inactive : InactiveQuery = results[0];
        const endTime : Time = new Time(inactive.inactiveEnd);
        if (endTime.getDaysDifference < 0) {
            await this.deleteInactive();
            return null;
        }
        return {...inactive}
    }

    public async giveInactive(params: Omit<InactiveInterface, 'userId'>) : Nothing {
        const queryBuilder : QueryBuilder = new QueryBuilder()
            .setType(QueryType.INSERT)
            .setTable(Inactive)
            .setInsert(
                new InsertBuilder(true)
                    .add('userId', this.user.stringUserId)
                    .add('inactiveApproved', params.inactiveApproved)
                    .add('inactiveStart', params.inactiveStart)
                    .add('inactiveEnd', params.inactiveEnd)
            )
        await queryBuilder.build().execute();
    }

}