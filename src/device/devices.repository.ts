import { EntityRepository, Repository } from 'typeorm';
import { Device } from './device.entity';

@EntityRepository(Device)
export class DevicesRepository extends Repository<Device> {}
