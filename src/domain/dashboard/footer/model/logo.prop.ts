import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class LogoProp {
  @Prop()
  imageUrl!: string;

  @Prop()
  text!: string;

  @Prop()
  link!: string;

  @Prop()
  enabled!: boolean;
}

export const LogoSchema = SchemaFactory.createForClass(LogoProp);
