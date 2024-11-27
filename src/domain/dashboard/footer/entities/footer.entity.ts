import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeaderDocument = HydratedDocument<Footer>;

@Schema({
  timestamps: true,
  strict: false,
})
export class Footer {}

export const FooterSchema = SchemaFactory.createForClass(Footer);
