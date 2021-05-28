import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
