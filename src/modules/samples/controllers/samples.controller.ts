import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Put, UseInterceptors, UseGuards } from "@nestjs/common";
import { SampleService } from "../services/sample.service";
import { SampleDto } from "../dtos/sample.dto";
import { BaseController } from "../../../common/controllers/base.controller";
import { ResponseInterceptor } from "../../../common/interceptors/response.interceptor";
import { printLogger } from "../../../shared/utils/logs.util";
import { AuthGuard } from "../../auth/guards/auth.guard";

@Controller("samples")
// @UseGuards(AuthGuard) // Protege esta ruta con el guard de JWT
@UseInterceptors(ResponseInterceptor)
export class SamplesController extends BaseController {
  constructor(private readonly sampleService: SampleService) {
    super();
  }

  @Get()
  async getAllSamples() {
    printLogger(`[${this.constructor.name}.getAllSamples]`);

    return this.sampleService.getSamples();
  }

  @Get(":id")
  async getSampleById(@Param("id") id: number) {
    printLogger(`[${this.constructor.name}.getSampleById]`, { id });

    const sample = await this.sampleService.getSampleById(id);
    if (!sample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }
    return sample;
  }

  @Post()
  async createSample(@Body() createSampleDto: SampleDto) {
    printLogger(`[${this.constructor.name}.createSample]`, { createSampleDto });

    return await this.sampleService.createSample(createSampleDto);
  }

  @Put(":id")
  async updateSample(@Param("id") id: number, @Body() createSampleDto: SampleDto) {
    printLogger(`[${this.constructor.name}.updateSample]`, { id, createSampleDto });

    return await this.sampleService.updateSample(id, createSampleDto);
  }

  @Delete(":id")
  async deleteSample(@Param("id") id: number) {
    printLogger(`[${this.constructor.name}.deleteSample]`, { id });

    return await this.sampleService.deleteSample(id);
  }
}
