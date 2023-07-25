import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from 'src/user/user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { InquireDto } from './dto/inquire-home.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiOperation({ summary: 'Create a home' })
  @ApiResponse({ status: 201, description: 'Added a new home' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          example: '24 suit home',
          description: 'The home address',
        },
        number_of_bedrooms: {
          type: 'integer',
          example: 4,
          description: 'Number of bedrooms',
        },
        number_of_bathrooms: {
          type: 'integer',
          example: 2,
          description: 'Number of bathrooms',
        },
        city: {
          type: 'string',
          example: 'Lagos',
          description: 'State the home is located',
        },
        price: {
          type: 'integer',
          example: 500000,
          description: 'Cost of home',
        },
        land_size: {
          type: 'integer',
          example: 19950,
          description: 'Size of the Land',
        },
        property_type: {
          type: 'string',
          example: 'residential',
          description: 'Type of property',
        },
        images: {
          type: 'array',
          example: [{ url: 'link_to_image' }],
          description: 'Images of the property',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Roles(UserType.REALTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createHomeDto: CreateHomeDto, @Request() req: any) {
    console.log(req.user);

    return this.homeService.create({ ...createHomeDto, realtor: req.user.id });
  }

  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '64b483b5a968c00aa4a6e0a3',
            description: 'unique ID',
          },
          address: {
            type: 'string',
            example: '24 suit home',
            description: 'The home address',
          },
          number_of_bedrooms: {
            type: 'integer',
            example: 4,
            description: 'Number of bedrooms',
          },
          number_of_bathrooms: {
            type: 'integer',
            example: 2,
            description: 'Number of bathrooms',
          },
          city: {
            type: 'string',
            example: 'Lagos',
            description: 'State the home is located',
          },
          price: {
            type: 'integer',
            example: 500000,
            description: 'Cost of home',
          },
          land_size: {
            type: 'integer',
            example: 19950,
            description: 'Size of the Land',
          },
          property_type: {
            type: 'string',
            example: 'residential',
            description: 'Type of property',
          },
          images: {
            type: 'array',
            example: [{ url: 'link_to_image' }],
            description: 'Images of the property',
          },
          realtor: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '64b4328354ca418aec8f0595',
                description: 'unique ID',
              },
              name: {
                type: 'string',
                example: 'Okpunor Emmanuel',
                description: 'Name of realtor',
              },
              phone: {
                type: 'string',
                example: '+2348134271449',
                description: 'Phone Number of realtor',
              },
              email: {
                type: 'string',
                example: 'admin@dev.com',
                description: 'Email of realtor',
              },
              id: {
                type: 'string',
                example: '64b4328354ca418aec8f0595',
                description: 'ID of realtor',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '64b483b5a968c00aa4a6e0a3',
          description: 'unique ID',
        },
        address: {
          type: 'string',
          example: '24 suit home',
          description: 'The home address',
        },
        number_of_bedrooms: {
          type: 'integer',
          example: 4,
          description: 'Number of bedrooms',
        },
        number_of_bathrooms: {
          type: 'integer',
          example: 2,
          description: 'Number of bathrooms',
        },
        city: {
          type: 'string',
          example: 'Lagos',
          description: 'State the home is located',
        },
        price: {
          type: 'integer',
          example: 500000,
          description: 'Cost of home',
        },
        land_size: {
          type: 'integer',
          example: 19950,
          description: 'Size of the Land',
        },
        property_type: {
          type: 'string',
          example: 'residential',
          description: 'Type of property',
        },
        images: {
          type: 'array',
          example: [{ url: 'link_to_image' }],
          description: 'Images of the property',
        },
        realtor: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '64b4328354ca418aec8f0595',
              description: 'unique ID',
            },
            name: {
              type: 'string',
              example: 'Okpunor Emmanuel',
              description: 'Name of realtor',
            },
            phone: {
              type: 'string',
              example: '+2348134271449',
              description: 'Phone Number of realtor',
            },
            email: {
              type: 'string',
              example: 'admin@dev.com',
              description: 'Email of realtor',
            },
            id: {
              type: 'string',
              example: '64b4328354ca418aec8f0595',
              description: 'ID of realtor',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(id);
  }

  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Roles(UserType.REALTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHomeDto: UpdateHomeDto,
    @Request() req: any,
  ) {
    return this.homeService.update(id, updateHomeDto, req.user);
  }

  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Roles(UserType.REALTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.homeService.remove(id, req.user);
  }

  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Roles(UserType.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/inquire')
  inquire(
    @Param('id') id: string,
    @Body() inquireDto: InquireDto,
    @Request() req: any,
  ) {
    return this.homeService.inquire(id, inquireDto, req.user);
  }

  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      type: 'object',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id/messages')
  home_messages(@Param('id') id: string) {
    return this.homeService.home_messages(id);
  }
}
