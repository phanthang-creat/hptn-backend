import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class NavButtonProps {
  @Prop()
  text!: string;

  @Prop()
  link!: string;

  @Prop()
  status!: boolean;
}

export const NavButtonSchema = SchemaFactory.createForClass(NavButtonProps);
