import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class MenuProps {
  @Prop()
  label!: string;

  @Prop()
  link!: string;

  @Prop()
  enabled!: boolean;

  @Prop({
    type: MongooseSchema.Types.Array,
  })
  children: MenuProps[] | null = null;
}

export const MenuSchema = SchemaFactory.createForClass(MenuProps);
