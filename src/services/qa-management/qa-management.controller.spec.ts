import { Test, TestingModule } from '@nestjs/testing';
import { QaManagementController } from './qa-management.controller';
import { QaManagementService } from './qa-management.service';

describe('QaManagementController', () => {
  let controller: QaManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QaManagementController],
      providers: [QaManagementService],
    }).compile();

    controller = module.get<QaManagementController>(QaManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
