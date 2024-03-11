import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { AccountDetail } from "./account-detail.entity";
import { Role } from "../../auth/enums";
import { Post } from "./post.entity";
import { FriendRequest } from "./friend-request.entity";
import { faker } from "@faker-js/faker";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: "text" })
    password: string;

    @Column({ type: "enum" ,enum: Role, default: Role.USER })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => AccountDetail, { cascade: true, nullable: true, orphanedRowAction: "delete" })
    @JoinColumn()
    detail: AccountDetail;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @OneToMany(() => FriendRequest, fr => fr.to)
    friendRequests: FriendRequest[];

    static fakeOne(encryptedPassword: string) {
        const detail = AccountDetail.fakeOne(faker.helpers.arrayElement(["female", "male"]));
        
        const account = new Account();
        account.username = faker.internet.userName();
        account.password = encryptedPassword;
        account.detail = detail;

        return account;
    }
}