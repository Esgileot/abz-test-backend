import { Module } from '@nestjs/common'
import { TokenModule } from '../token/token.module'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [TokenModule],
  controllers: [],
  providers: [AuthGuard],
})
export class AuthModule {}
