import {Module} from "../ModularORM/classes/abstract/Module";
import {Table} from "../ModularORM/decorators/Table";
import {Column} from "../ModularORM/decorators/Column";
import {ColumnType} from "../ModularORM/classes/base/ColumnType";

@Table
export class Users extends Module {

    @Column({
        type: ColumnType.INTEGER,
        autoIncrement: true
    })
    public id : number = 0;

    @Column({
        type: ColumnType.VARCHAR(32),
        notNull: true
    })
    public userId : string = "";

    @Column({
        type: ColumnType.VARCHAR(32),
        notNull: true
    })
    public inviter : string = "";

    @Column({
        type: ColumnType.VARCHAR(48),
        notNull: true
    })
    public nickname : string = "";

    @Column({
        type: ColumnType.VARCHAR(16),
        notNull: true,
        defaultValue: 'junior'
    })
    public level : string = "";

    @Column({
        type: ColumnType.DATETIME,
        notNull: true
    })
    public lastAppointment : Date = new Date();

    @Column({
        type: ColumnType.DATETIME,
        notNull: true
    })
    public appointedDate : Date = new Date();

    @Column({
        type: ColumnType.INTEGER,
        notNull: true
    })
    public points : number = 0;

    @Column({
        type: ColumnType.VARCHAR(64),
        notNull: true
    })
    public telegram : string = "";

    @Column({
        type: ColumnType.VARCHAR(255),
        notNull: true
    })
    public forum : string = "";

    @Column({
        type: ColumnType.VARCHAR(32),
        notNull: true
    })
    public discordId : string = "";

    @Column({
        type: ColumnType.INTEGER,
        notNull: true,
        defaultValue: 0
    })
    public warns : number = 0;

    @Column({
        type: ColumnType.INTEGER,
        notNull: true,
        defaultValue: 0
    })
    public preds : number = 0;

    @Column({
        type: ColumnType.INTEGER,
        notNull: true,
        defaultValue: 0
    })
    public timeZone : number = 0;

    @Column({
        type: ColumnType.INTEGER,
        notNull: true
    })
    public age : number = 0;

    public static override get table() : string {return "users";}

}