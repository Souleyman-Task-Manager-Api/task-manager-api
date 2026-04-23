import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { ulid } from 'ulid';
import { Gender } from '../enum';
import { MemberSubscription } from './member-subscription.entity';
import { Address } from './address.entity';
import { isNil } from 'lodash';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  member_id: string;

  @Column({ length: 50, nullable: true })
  firstname: string;

  @Column({ length: 50, nullable: true })
  lastname: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ length: 10, nullable: true, default: Gender.OTHER })
  gender: string;

  @Column({ length: 50, nullable: true })
  mail: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ length: 34, nullable: true })
  iban: string;

  @Column({ length: 10, nullable: true })
  code_activation: string;

  @OneToMany(() => MemberSubscription, (ms) => ms.member, { cascade: true, eager: true })
  subscriptions: MemberSubscription[];

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn({ referencedColumnName: 'address_id', name: 'address_id_fk' })
  address: Address;

  @Column({ default: false })
  active: boolean;

  @BeforeInsert()
  generateActivationCode() {
    this.code_activation = isNil(this.code_activation) ? ulid().substring(0, 10) : this.code_activation;
  }
}