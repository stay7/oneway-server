import { EntityRepository, Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/add-device.dto';
import { User } from '../users/user.entity';

@EntityRepository(Device)
export class DevicesRepository extends Repository<Device> {
  async addDevice(createDeviceDto: CreateDeviceDto, user: User) {
    const device = this.create({ ...createDeviceDto, user });
    try {
      await this.save(device);
    } catch (error) {
      console.error(error);
    }
    return device;
  }
}
