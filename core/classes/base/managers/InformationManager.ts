import {Manager} from "../../abstract/Manager";
import {User} from "../main/User";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {QueryBuilder} from "../../../database/ModularORM/classes/base/QueryBuilder";
import {QueryType} from "../../../database/ModularORM/classes/base/QueryType";
import {Users} from "../../../database/modules/Users";
import {UpdateBuilder} from "../../../database/ModularORM/classes/base/UpdateBuilder";
import {WhereBuilder} from "../../../database/ModularORM/classes/base/WhereBuilder";

export class InformationManager extends Manager {

    public constructor(
        public user : User,
    ) {super();}

    private get builder() : QueryBuilder {
        return new QueryBuilder()
            .setType(QueryType.UPDATE)
            .setTable(Users)
            .setWhere(
                new WhereBuilder()
                    .equalAnd('userId', this.user.userId)
            )
    }

    public async edit(stats: string, newStats: string) : Nothing {
        const queryBuilder : QueryBuilder = this.builder
            .setUpdate(
                new UpdateBuilder()
                    .add(stats, newStats)
            )
        await queryBuilder.build().execute()
    }

    public async editTelegram(newTelegram: string) : Nothing {
        const queryBuilder : QueryBuilder = this.builder
            .setUpdate(
                new UpdateBuilder()
                    .add('telegram', newTelegram)
            )
        await queryBuilder.build().execute()
    }

    public async editDiscord(newDiscord: string) : Nothing {
        const queryBuilder : QueryBuilder = this.builder
            .setUpdate(
                new UpdateBuilder()
                    .add('discordId', newDiscord)
            )
        await queryBuilder.build().execute()
    }

    public async editForum(newForum: string) : Nothing {
        const queryBuilder : QueryBuilder = this.builder
            .setUpdate(
                new UpdateBuilder()
                    .add('forum', newForum)
            )
        await queryBuilder.build().execute()
    }

    public async editAge(newAge: number) : Nothing {
        const queryBuilder : QueryBuilder = this.builder
            .setUpdate(
                new UpdateBuilder()
                    .add('age', newAge)
            )
        await queryBuilder.build().execute()
    }

}