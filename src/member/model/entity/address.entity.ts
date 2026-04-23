import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity()
export class Address {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  address_id: string;

  @Column({ length: 50, nullable: true })
  road: string;

  @Column({ length: 8, nullable: true })
  nb: string;

  @Column({ length: 10, nullable: true })
  cp: string;

  @Column({ length: 50, nullable: true })
  town: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ nullable: true })
  complement: string;
}