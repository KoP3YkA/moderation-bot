import {Manager} from "../../abstract/Manager";
import {User} from "../main/User";
import {QueryBuilder} from "../../../database/ModularORM/classes/base/QueryBuilder";
import {QueryType} from "../../../database/ModularORM/classes/base/QueryType";
import {Users} from "../../../database/modules/Users";
import {SelectBuilder} from "../../../database/ModularORM/classes/base/SelectBuilder";
import {WhereBuilder} from "../../../database/ModularORM/classes/base/WhereBuilder";
import {Rank} from "../enums/Rank";
import {UserAllQuery} from "../../../database/query/UserQuerys";
import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {MessagesSendParams} from "vk-io/lib/api/schemas/params";

export class ManagementManager extends Manager {

    public constructor(
        public user : User,
    ) {super();}

    public async getManagementUsers() : Promise<Set<User>> {
        const queryBuilder : QueryBuilder = new QueryBuilder()
            .setType(QueryType.SELECT)
            .setTable(Users)
            .setSelect(new SelectBuilder().addAll());

        const whereBuilder : WhereBuilder = new WhereBuilder();

        const weight : number = this.user.level.weight;

        if (weight < Rank.CURATOR.weight) {
            whereBuilder.equalOr('level', Rank.CURATOR.tag)
            whereBuilder.equalOr('level', Rank.DEPUTY_CHIEF_MODERATOR.tag)
            whereBuilder.equalOr('level', Rank.CHIEF_MODERATOR.tag)
        } else if (weight == Rank.CURATOR.weight) {
            whereBuilder.equalOr('level', Rank.DEPUTY_CHIEF_MODERATOR.tag)
            whereBuilder.equalOr('level', Rank.CHIEF_MODERATOR.tag)
        } else {
            whereBuilder.equalOr('level', Rank.CHIEF_MODERATOR.tag)
        }
        queryBuilder.setWhere(whereBuilder);

        const results : UserAllQuery[] = await queryBuilder.build().get<UserAllQuery>(UserAllQuery);
        return new Set(results.map(obj => new User(obj.id)))
    }

    public async sendMessage(params: MessagesSendParams) : Nothing {
        const management = await this.getManagementUsers();
        for (const i of management) {
            await i.send(params);
        }
    }

}