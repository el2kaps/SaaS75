import { Injectable } from '@nestjs/common';
import { CreateDataLayerDto } from './dto/create-data-layer.dto';
import { UpdateDataLayerDto } from './dto/update-data-layer.dto';

@Injectable()
export class DataLayerService {
  create(createDataLayerDto: CreateDataLayerDto) {
    return 'This action adds a new dataLayer';
  }

  findAll() {
    return `This action returns all dataLayer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataLayer`;
  }

  update(id: number, updateDataLayerDto: UpdateDataLayerDto) {
    return `This action updates a #${id} dataLayer`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataLayer`;
  }
}
