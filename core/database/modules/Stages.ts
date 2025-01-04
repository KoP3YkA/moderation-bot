import {Module} from "../ModularORM/classes/abstract/Module";
import {Table} from "../ModularORM/decorators/Table";
import {Column} from "../ModularORM/decorators/Column";
import {ColumnType} from "../ModularORM/classes/base/ColumnType";
import {StageInterface} from "../../interfaces/StageInterface";

@Table
export class Stages extends Module implements StageInterface{

    @Column({
        type: ColumnType.INTEGER,
        autoIncrement: true,
        notNull: true
    })
    public id : number = 0;

    @Column({
        type: ColumnType.VARCHAR(32),
        notNull: true
    })
    public userId : string = "";

    @Column({
        type: ColumnType.VARCHAR(64),
        notNull: true
    })
    public stage : string = "";

    @Column({
        type: ColumnType.TEXT,
        notNull: true
    })
    public information : string = "";

    public static override get table() : string {return "stages";}

}