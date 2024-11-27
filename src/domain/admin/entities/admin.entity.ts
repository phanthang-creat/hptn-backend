import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({
  timestamps: true,
  strict: true,
})
export class Admin {
  @Prop()
  name!: string;

  @Prop()
  email!: string;

  @Prop()
  password!: string;

  @Prop()
  role!: number;

  @Prop()
  status!: number;

  @Prop(MongooseSchema.Types.Date)
  createdAt: Date = new Date();

  @Prop(MongooseSchema.Types.Date)
  updatedAt: Date = new Date();
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
