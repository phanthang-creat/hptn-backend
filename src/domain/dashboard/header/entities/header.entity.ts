// import { LogoProp, LogoSchema } from './../model/logo.prop';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { MenuProps, MenuSchema } from "../model/menu.prop";
// import { NavButtonProps, NavButtonSchema } from "../model/navButton.prop";

export type HeaderDocument = HydratedDocument<Header>;

@Schema({
  timestamps: true,
  strict: false,
})
export class Header {}

export const HeaderSchema = SchemaFactory.createForClass(Header);
