import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('smash')
export class SmashDao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: false })
  smashedAt: Date;

  constructor(builder: Partial<SmashDao>) {
    Object.assign(this, builder);
  }
}
