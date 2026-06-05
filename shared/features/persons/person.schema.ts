import { z } from 'zod';

import { Gender, Origin } from './person.model';

export const GenderSchema = z.nativeEnum(Gender);

export const OriginSchema = z.nativeEnum(Origin);
