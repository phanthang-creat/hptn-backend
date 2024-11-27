import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type GreatestGameDocument = HydratedDocument<GreatestGame>;


@Schema({
    timestamps: true,
    versionKey: false,
})
export class GreatestGame {
    @Prop({
        type: String,
        required: false,
        default: 'N/A'
    })
    whiteName!: string;

    // rating
    @Prop({
        type: Number,
        required: false,
        default: 0
    })
    whiteRating!: Number;

    @Prop({
        type: String,
        required: false,
        default: 'N/A'
    })
    result!: string;

    @Prop({
        type: String,
        required: false,
        default: 'N/A'
    })
    blackName!: string;

    @Prop({
        type: Number,
        required: false,
        default: 0
    })
    blackRating!: Number;

    @Prop({
        type: Date,
        required: false,
        default: new Date()
    })
    playedDate!: Date;

    @Prop({
        type: String,
        required: true
    })
    embedLink!: string;

    @Prop({
        type: Number,
        required: false,
        default: 1
    })
    order!: number;

}

export const GreatestGameSchema = SchemaFactory.createForClass(GreatestGame);

