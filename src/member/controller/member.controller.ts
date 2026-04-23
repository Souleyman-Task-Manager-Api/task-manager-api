import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MemberService } from '../service/member.service';
import { MemberCreatePayload, MemberUpdatePayload } from '../model/payload';
import { Member } from '../model/entity/member.entity';

@ApiBearerAuth('access-token')
@ApiTags('Membre')
@Controller('member')
export class MemberController {
  constructor(private readonly service: MemberService) {}

  @Post('create')
  create(@Body() payload: MemberCreatePayload): Promise<Member> {
    console.log('✅✅✅ CONTROLLER create APPELE ✅✅✅');
    console.log('Payload reçu:', payload);
    return this.service.create(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get('detail/:id')
  detail(@Param('id') id: string): Promise<Member> {
    return this.service.detail(id);
  }

  @Get('list')
  getAll(): Promise<Member[]> {
    return this.service.getAll();
  }

  @Put('update')
  update(@Body() payload: MemberUpdatePayload): Promise<Member> {
    return this.service.update(payload);
  }
}