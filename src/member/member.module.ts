import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Member,
  MemberPlan,
  MemberSubscription,
  Address,
} from './model/entity';
import { MemberController, MemberPlanController } from './controller';
import { MemberService } from './service/member.service';
import { MemberPlanService } from './service/member-plan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, MemberPlan, MemberSubscription, Address]),
  ],
  controllers: [MemberController, MemberPlanController],
  providers: [MemberService, MemberPlanService],
  exports: [MemberService, MemberPlanService],
})
export class MemberModule {}
