import { Injectable } from '@nestjs/common';
import { CreateGreatestGameDto } from './dto/create-greatest-game.dto';
import { UpdateGreatestGameDto } from './dto/update-greatest-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GreatestGame, GreatestGameDocument } from './entities/greatest-game.entity';
import { Model } from 'mongoose';
import { DeleteResult } from 'typeorm';

@Injectable()
export class GreatestGamesService {

  constructor(
    @InjectModel(GreatestGame.name) 
    private greatestGameModel: Model<GreatestGameDocument>,
  ) {}

  create(createGreatestGameDto: CreateGreatestGameDto) {
    return this.greatestGameModel.create(createGreatestGameDto);
  }

  findAll() {
    return this.greatestGameModel.find()
    .select('_id whiteName whiteRating result blackName blackRating playedDate embedLink createdAt updatedAt order')
    .sort({ order: 1 })
    .exec();
  }

  findOne(id: string) {
    return this.greatestGameModel.findById(id).exec();
  }

  update(id: string, updateGreatestGameDto: UpdateGreatestGameDto) {
    return this.greatestGameModel.updateOne({ _id: id }, updateGreatestGameDto).exec();
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.greatestGameModel.deleteOne({ _id: id }).exec();

    return {
      affected: result.deletedCount,
      raw: result,
    };
  }
}
