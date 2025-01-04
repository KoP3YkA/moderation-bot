import {Module} from "../ModularORM/classes/abstract/Module";
import {Table} from "../ModularORM/decorators/Table";
import {Column} from "../ModularORM/decorators/Column";
import {ColumnType} from "../ModularORM/classes/base/ColumnType";
import {InactiveInterface} from "../../interfaces/InactiveInterface";

@Table
export class Inactive extends Module implements InactiveInterface{

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
    public userId: string = "";

    @Column({
        type: ColumnType.VARCHAR(32),
        notNull: true
    })
    public inactiveApproved: string = "";

    @Column({
        type: ColumnType.DATETIME,
        notNull: true
    })
    public inactiveStart: Date = new Date();

    @Column({
        type: ColumnType.DATETIME,
        notNull: true
    })
    public inactiveEnd: Date = new Date();

    public static override get table() : string {return "inactive";}

}