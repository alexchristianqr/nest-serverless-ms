import { Test, TestingModule } from "@nestjs/testing";
import { SamplesController } from "./samples.controller";

describe("SamplesController", () => {
  let controller: SamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SamplesController]
    }).compile();

    controller = module.get<SamplesController>(SamplesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
