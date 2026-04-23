import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberPlan } from '../model/entity';
import { MemberPlanCreatePayload, MemberPlanUpdatePayload } from '../model/payload';
import { Builder } from 'builder-pattern';
import { isNil } from 'lodash';
import {
  MemberPlanCreateException,
  MemberPlanDeleteException,
  MemberPlanNotFoundException,
  MemberPlanListException,
  MemberPlanUpdateException
} from '../member.exception';

@Injectable()
export class MemberPlanService {
  constructor(
    @InjectRepository(MemberPlan) private readonly repository: Repository<MemberPlan>
  ) {}

  async create(payload: MemberPlanCreatePayload): Promise<MemberPlan> {
    try {
      return await this.repository.save(
        Builder<MemberPlan>()
          .type(payload.type)
          .title(payload.title)
          .description(payload.description)
          .picture(payload.picture)
          .price(payload.price)
          .nb_month(payload.nb_month)
          .payment(payload.payment)
          .cumulative(payload.cumulative)
          .nb_training(payload.nb_training)
          .freq_training(payload.freq_training)
          .build()
      );
    } catch (e) {
      throw new MemberPlanCreateException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new MemberPlanDeleteException();
    }
  }

  async detail(id: string): Promise<MemberPlan> {
    const result = await this.repository.findOneBy({ member_plan_id: id });
    if (!isNil(result)) {
      return result;
    }
    throw new MemberPlanNotFoundException();
  }

  async getAll(): Promise<MemberPlan[]> {
    try {
      return await this.repository.find();
    } catch (e) {
      throw new MemberPlanListException();
    }
  }

  async update(payload: MemberPlanUpdatePayload): Promise<MemberPlan> {
    try {
      let detail = await this.detail(payload.member_plan_id);
      if (payload.type !== undefined) detail.type = payload.type;
      if (payload.title !== undefined) detail.title = payload.title;
      if (payload.description !== undefined) detail.description = payload.description;
      if (payload.picture !== undefined) detail.picture = payload.picture;
      if (payload.price !== undefined) detail.price = payload.price;
      if (payload.nb_month !== undefined) detail.nb_month = payload.nb_month;
      if (payload.payment !== undefined) detail.payment = payload.payment;
      if (payload.cumulative !== undefined) detail.cumulative = payload.cumulative;
      if (payload.freq_training !== undefined) detail.freq_training = payload.freq_training;
      if (payload.nb_training !== undefined) detail.nb_training = payload.nb_training;
      return await this.repository.save(detail);
    } catch (e) {
      throw new MemberPlanUpdateException();
    }
  }
}