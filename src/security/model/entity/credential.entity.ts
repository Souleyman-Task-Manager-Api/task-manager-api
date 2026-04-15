import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity()
export class Credential {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  credential_id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: false, unique: true })
  mail: string;

  @Column({ nullable: true })
  facebookHash: string;

  @Column({ nullable: true })
  googleHash: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;
}