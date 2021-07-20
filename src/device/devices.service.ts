import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesRepository } from './devices.repository';
import { CreateDeviceDto } from './dto/add-device.dto';
import { User } from '../users/user.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private devicesRepository: DevicesRepository,
  ) {}

  async getDevice(user: User, deviceId: string) {
    return await this.devicesRepository.findOne(deviceId, { where: { user } });
  }

  async createDevice(user: User, createDeviceDto: CreateDeviceDto) {
    const { deviceId, deviceName } = createDeviceDto;
    const device = this.devicesRepository.create({
      id: deviceId,
      deviceName,
      user,
    });
    return await this.devicesRepository.save(device);
  }
}
