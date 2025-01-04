import {Nothing} from "../../../database/ModularORM/types/Nothing";
import {QueryBuilder} from "../../../database/ModularORM/classes/base/QueryBuilder";
import {QueryType} from "../../../database/ModularORM/classes/base/QueryType";
import {Users} from "../../../database/modules/Users";
import {SelectBuilder} from "../../../database/ModularORM/classes/base/SelectBuilder";
import {UserAllQuery, UserExistsQuery} from "../../../database/query/UserQuerys";
import {WhereBuilder} from "../../../database/ModularORM/classes/base/WhereBuilder";
import {Rank} from "../enums/Rank";
import {UserInterface} from "../../../interfaces/UserInterface";
import {ModerationBot} from "../../../../main";
import {ClientApi} from "../client/ClientApi";
import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import {MessageManager} from "../managers/MessageManager";
import {StageManager} from "../managers/StageManager";
import {InactiveManager} from "../managers/InactiveManager";
import {ManagementManager} from "../managers/ManagementManager";
import {InformationManager} from "../managers/InformationManager";

export class User implements UserInterface {

    public exists : boolean = false;

    public inviter!: string;
    public nick!: string;
    public level!: Rank;
    public appointment!: Date;
    public appointed!: Date;
    public points!: number;
    public telergam!: string;
    public forum!: string;
    public discord!: string;
    public timeZone!: number;
    public age!: number

    public warns!: number;
    public preds!: number;

    public stringUserId : string;
    
    public constructor(
        public userId : string | number,
    ) {this.stringUserId = String(userId)}

    private get getUserQueryBuilder() : QueryBuilder {
        return new QueryBuilder()
            .setType(QueryType.SELECT)
            .setTable(Users)
            .setSelect(
                new SelectBuilder().addAll()
            )
            .setWhere(
                new WhereBuilder()
                    .equalAnd('userId', this.userId)
            )
            .setLimit(1)
    }
    
    public async initAll() : Nothing {
        const queryBuilder : QueryBuilder = this.getUserQueryBuilder;
        const results : UserAllQuery[] = await queryBuilder.build().get<UserAllQuery>(UserAllQuery);

        if (results.length < 1) return;
        this.exists = true;
        const result : UserAllQuery = results[0];

        Object.assign(this as User, result as UserAllQuery);
        this.level = Rank.getByTag(result.level);
    }

    public async initExists() : Nothing {
        const queryBuilder : QueryBuilder = this.getUserQueryBuilder;
        const results : UserExistsQuery[] = await queryBuilder.build().get<UserExistsQuery>(UserExistsQuery);
        this.exists = results.length > 0;
    }

    public async send(params: MessagesSendParams) : Nothing {
        const api : ClientApi = ModerationBot.getInstance.client.clientApi;
        await api.sendMessage({...params, user_id: this.userId, random_id: 0} as MessagesSendParams);
    }

    public get messageManager() : MessageManager {return new MessageManager(this);}
    public get stageManager() : StageManager {return new StageManager(this);}
    public get inactiveManager() : InactiveManager {return new InactiveManager(this);}
    public get managementManager() : ManagementManager {return new ManagementManager(this);}
    public get informationManager() : InformationManager {return new InformationManager(this);}

}