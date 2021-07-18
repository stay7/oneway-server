import { EntityRepository, Repository } from 'typeorm';
import { Credential } from './credential.entity';
import { Device } from '../device/device.entity';
import { User } from '../users/user.entity';
import { CreateCredentialDto } from './dto/create-credentials.dto';

@EntityRepository(Credential)
export class CredentialsRepository extends Repository<Credential> {
  createTokensByDevice(createCredentialDto: CreateCredentialDto) {
    this.create(createCredentialDto);
  }
}
