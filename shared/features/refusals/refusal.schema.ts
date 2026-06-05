import { z } from 'zod';

import { RefusalReason } from './refusal.model';

export const RefusalReasonSchema = z.nativeEnum(RefusalReason);
