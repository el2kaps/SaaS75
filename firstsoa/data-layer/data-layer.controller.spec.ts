import { Test, TestingModule } from '@nestjs/testing';
import { DataLayerController } from './data-layer.controller';
import { DataLayerService } from './data-layer.service';

describe('DataLayerController', () => {
  let controller: DataLayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataLayerController],
      providers: [DataLayerService],
    }).compile();

    controller = module.get<DataLayerController>(DataLayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
