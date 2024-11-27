import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Page {
  @Prop({
    type: String,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
  })
  code!: string;

  @Prop({
    type: String,
    required: false,
  })
  link!: string;

  @Prop({
    type: String,
    required: false,
  })
  config!: any;
}

export const PageSchema = SchemaFactory.createForClass(Page);
