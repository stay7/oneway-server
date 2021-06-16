import { EntityRepository, Repository } from 'typeorm';
import { Device } from './device.entity';
import { AddDeviceDto } from './dto/add-device.dto';
import { User } from '../users/user.entity';

@EntityRepository(Device)
export class DevicesRepository extends Repository<Device> {
  async addDevice(addDeviceDto: AddDeviceDto, user: User) {
    const device = this.create({ ...addDeviceDto, user });
    try {
      await this.save(device);
    } catch (error) {
      console.error(error);
    }
    return device;
  }
}
