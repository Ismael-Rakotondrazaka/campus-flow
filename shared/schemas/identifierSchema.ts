import { z } from 'zod';

export const IdentifierSchema = z.coerce.number().positive().int();

export const StringIdentifierSchema = z.string().uuid();
