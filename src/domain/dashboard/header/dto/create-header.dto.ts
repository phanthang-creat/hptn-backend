import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MenuProps } from '../model/menu.prop';
import { LogoProp } from '../model/logo.prop';

export class CreateHeaderDto {
  @ApiProperty({
    type: 'object',
    properties: {
      imageUrl: {
        type: 'string',
        format: 'string',
      },
      label: {
        type: 'string',
        format: 'string',
      },
      link: {
        type: 'string',
        format: 'string',
      },
      enable: {
        type: 'boolean',
        format: 'boolean',
      },
    },
    name: 'logo',
  })
  @IsNotEmpty()
  logo!: LogoProp;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
          format: 'string',
        },
        link: {
          type: 'string',
          format: 'string',
        },
        enable: {
          type: 'boolean',
          format: 'boolean',
        },
        children: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
                format: 'string',
              },
              link: {
                type: 'string',
                format: 'string',
              },
              enable: {
                type: 'boolean',
                format: 'boolean',
              },
            },
          },
        },
      },
    },
  })
  @IsNotEmpty()
  listMenu!: MenuProps[];

  @ApiProperty({
    type: 'object',
    properties: {
      text: {
        type: 'string',
        format: 'string',
      },
      link: {
        type: 'string',
        format: 'string',
      },
      enable: {
        type: 'boolean',
        format: 'boolean',
      },
    },
  })
  @IsNotEmpty()
  button!: {
    text: string;
    link: string;
    enable: boolean;
  };
}
