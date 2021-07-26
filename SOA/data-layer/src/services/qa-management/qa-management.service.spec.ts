import { Test, TestingModule } from '@nestjs/testing';
import { QaManagementService } from './qa-management.service';

describe('QaManagementService', () => {
  let service: QaManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QaManagementService],
    }).compile();

    service = module.get<QaManagementService>(QaManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
