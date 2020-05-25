import { Connection } from 'typeorm';
import { Label } from '../../domain/label.entity';

export const labelProviders = [
  {
    provide: 'LABEL_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Label),
    inject: ['DATABASE_CONNECTION'],
  },
];
