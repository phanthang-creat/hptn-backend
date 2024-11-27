import { Module } from '@nestjs/common';
import { GreatestGamesService } from './greatest-games.service';
import { GreatestGamesController } from './greatest-games.controller';
import { GreatestGame, GreatestGameSchema } from './entities/greatest-game.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/service/jwt/atk.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GreatestGame.name, schema: GreatestGameSchema }]),
    AuthModule,
    JwtAccessTokenModule
  ],
  controllers: [GreatestGamesController],
  providers: [GreatestGamesService]
})
export class GreatestGamesModule {}
