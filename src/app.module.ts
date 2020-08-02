import { Module } from '@nestjs/common';
import { ProfilerModule } from '@profiler/profiler';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@ui/auth/http/security/constants';
import { LoginHandler } from '@application/auth/command/login/login.handler';
import { JwtStrategy } from '@ui/auth/http/security/jwt.strategy';
import { AuthResolver } from '@ui/auth/http/graphql/resolver/auth.resolver';
import { LocalStrategy } from '@ui/auth/http/security/local.strategy';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLabelHandler } from '@application/label/command/create-label/create-label.handler';
import { UpdateLabelHandler } from '@application/label/command/update-label/update-label.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelsHandler } from '@application/label/query/labels/labels.handler';
import { LabelHandler } from '@application/label/query/label/label.handler';
import { LabelResolver } from '@ui/label/http/graphql/resolver/label.resolver';
import { CreateUserHandler } from '@application/user/command/create-user/create-user.handler';
import { UserResolver } from '@ui/user/http/graphql/resolver/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { Label } from '@domain/label/entity/label';
import { Snippet } from '@domain/snippet/entity/snippet';
import { User } from '@domain/user/entity/user';
import { LabelRepository } from '@infrastructure/label/typeorm/repository/label.repository';
import { UserRepository } from '@infrastructure/user/typeorm/repository/user.repository';
import { SnippetRepository } from '@infrastructure/snippet/typeorm/repository/snippet.repository';
import { LabelFactory } from '@domain/label/factory/label.factory';
import { UserFactory } from '@domain/user/factory/user.factory';
import { JwtAuthGuard } from '@ui/auth/http/security/jwt-auth.guard';
import { SnippetResolver } from '@ui/snippet/graphql/resolver/snippet.resolver';
import { SnippetsHandler } from '@application/snippet/query/snippets/snippets.handler';
import { SnippetHandler } from '@application/snippet/query/snippet/snippet.handler';
import { SnippetFactory } from '@domain/snippet/factory/snippet.factory';
import { CreateSnippetHandler } from '@application/snippet/command/create-snippet/create-snippet.handler';

const authCommandHandlers = [LoginHandler];
const labelCommandHandlers = [CreateLabelHandler, UpdateLabelHandler, LabelsHandler, LabelHandler];
const snippetCommandHandlers = [CreateSnippetHandler, SnippetsHandler, SnippetHandler];
const userCommandHandlers = [CreateUserHandler];

@Module({
  imports: [
    ProfilerModule,
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'snippsy',
      password: 'snippsy',
      database: 'snippsy',
      entities: [
        Label,
        Snippet,
        User,
      ],
      migrationsTableName: 'db_migrations',
      migrations: [`${process.env.appDir}/infrastructure/common/typeorm/migration/*{.ts,.js}`],
      cli: {
        migrationsDir: "src/infrastructure/common/typeorm/migration"
      },
      synchronize: true,
      autoLoadEntities: true
    }),
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    })
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    ...authCommandHandlers,
    ...labelCommandHandlers,
    ...snippetCommandHandlers,
    ...userCommandHandlers,
    AuthResolver,
    Label,
    LabelFactory,
    LabelResolver,
    LabelRepository,
    User,
    UserFactory,
    UserResolver,
    UserRepository,
    Snippet,
    SnippetFactory,
    SnippetRepository,
    SnippetResolver,
  ]
})
export class AppModule {
}
