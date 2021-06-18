import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataLayerService } from './data-layer.service';
import { CreateDataLayerDto } from './dto/create-data-layer.dto';
import { UpdateDataLayerDto } from './dto/update-data-layer.dto';

@Controller('data-layer')
export class DataLayerController {
  constructor(private readonly dataLayerService: DataLayerService) {}

  @Post()
  create(@Body() createDataLayerDto: CreateDataLayerDto) {
    return this.dataLayerService.create(createDataLayerDto);
  }

  @Get()
  findAll() {
    return this.dataLayerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataLayerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataLayerDto: UpdateDataLayerDto) {
    return this.dataLayerService.update(+id, updateDataLayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLayerService.remove(+id);
  }
}
