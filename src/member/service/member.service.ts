import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../model/entity/member.entity';
import { MemberCreatePayload, MemberUpdatePayload } from '../model/payload';
import { isNil } from 'lodash';
import {
  MemberCreateException,
  MemberDeleteException,
  MemberNotFoundException,
  MemberListException,
  MemberUpdateException
} from '../member.exception';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly repository: Repository<Member>
  ) {
    console.log('✅✅✅ MemberService CHARGE ✅✅✅');
  }

  async create(payload: MemberCreatePayload): Promise<Member> {
    console.log('=== MEMBER CREATE DEBUG ===');
    console.log('Payload:', JSON.stringify(payload));
    
    try {
      const newMember = new Member();
      newMember.firstname = payload.firstname;
      newMember.lastname = payload.lastname;
      newMember.mail = payload.mail;
      
      console.log('New member object:', newMember);
      const saved = await this.repository.save(newMember);
      console.log('Member saved successfully:', saved);
      return saved;
    } catch (e) {
      console.log('=== FULL ERROR DETAILS ===');
      console.log('Error name:', e.name);
      console.log('Error message:', e.message);
      throw new MemberCreateException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new MemberDeleteException();
    }
  }

  async detail(id: string): Promise<Member> {
    const result = await this.repository.findOneBy({ member_id: id });
    if (!isNil(result)) {
      return result;
    }
    throw new MemberNotFoundException();
  }

  async getAll(): Promise<Member[]> {
    try {
      const members = await this.repository.find();
      return members;
    } catch (e) {
      throw new MemberListException();
    }
  }

  async update(payload: MemberUpdatePayload): Promise<Member> {
    try {
      let detail = await this.detail(payload.member_id);
      if (payload.firstname !== undefined) detail.firstname = payload.firstname;
      if (payload.lastname !== undefined) detail.lastname = payload.lastname;
      if (payload.birthdate !== undefined) detail.birthdate = payload.birthdate;
      if (payload.gender !== undefined) detail.gender = payload.gender;
      if (payload.mail !== undefined) detail.mail = payload.mail;
      if (payload.phone !== undefined) detail.phone = payload.phone;
      if (payload.iban !== undefined) detail.iban = payload.iban;
      if (payload.address !== undefined) detail.address = payload.address;
      if (payload.active !== undefined) detail.active = payload.active;
      if (payload.subscriptions !== undefined) detail.subscriptions = payload.subscriptions;
      if (payload.code_activation !== undefined) detail.code_activation = payload.code_activation;
      
      return await this.repository.save(detail);
    } catch (e) {
      throw new MemberUpdateException();
    }
  }
}