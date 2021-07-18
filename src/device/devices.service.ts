import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesRepository } from './devices.repository';
import { CreateDeviceDto } from './dto/add-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private devicesRepository: DevicesRepository,
  ) {}

  async getDevice(deviceId: string) {
    return await this.devicesRepository.findOne(deviceId);
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {
    const { deviceId, deviceName } = createDeviceDto;
    const device = this.devicesRepository.create({ id: deviceId, deviceName });
    return await this.devicesRepository.save(device);
  }
}
