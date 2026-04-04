import type { SortOrder } from '#imports';

export const ReactionTypes = ['like', 'love', 'celebrate'] as const;

export const ReactionType = createEnumConstants(ReactionTypes);

export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];

export const ReactionTypeLabel: Record<ReactionType, string> = {
  [ReactionType.celebrate]: 'Célébrer',
  [ReactionType.like]: "J'aime",
  [ReactionType.love]: 'Aimer',
};

export type Reaction = {
  type: ReactionType;
} & Omit<Tables<'reactions'>, 'type'>;

export interface ReactionFilters {
  comment_id?: string;
  limit?: number;
  orderBy?: ReactionOrderBy;
  page?: number;
  post_id?: string;
  sortOrder?: SortOrder;
  type?: ReactionType;
  user_id?: string;
}

export type ReactionInsert = TablesInsert<'reactions'>;
export type ReactionOrderBy = 'created_at' | 'type';

export type ReactionUpdate = TablesUpdate<'reactions'>;
export interface ReactionUserPreview {
  first_name: null | string;
  id: string;
  last_name: null | string;
  username: null | string;
}

export type ReactionWithUser = {
  user: Tables<'users'>;
} & Reaction;

export const ReactionStatusIcon: {
  active: Record<ReactionType, string>;
  inactive: Record<ReactionType, string>;
} = {
  active: {
    [ReactionType.celebrate]: 'mdi:party-popper',
    [ReactionType.like]: 'mdi:thumb-up',
    [ReactionType.love]: 'mdi:heart',
  },
  inactive: {
    [ReactionType.celebrate]: 'lucide:party-popper',
    [ReactionType.like]: 'mdi:thumb-up-outline',
    [ReactionType.love]: 'mdi:heart-outline',
  },
};
