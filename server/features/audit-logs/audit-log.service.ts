import type { JsonValue } from '../../../prisma/generated/client/internal/prismaNamespace';

type AuditLogEntry = {
  action: string;
  actorId: null | string;
  metadata: Record<string, unknown>;
  targetId: string;
  targetTable: string;
};

export const computeAuditDiff = (
  existing: Record<string, unknown>,
  updates: Record<string, unknown>
): { newValue: Record<string, unknown>; oldValue: Record<string, unknown> } => {
  const newValue: Record<string, unknown> = {};
  const oldValue: Record<string, unknown> = {};

  for (const key of Object.keys(updates)) {
    if (updates[key] !== undefined) {
      newValue[key] = updates[key];
      oldValue[key] = existing[key];
    }
  }

  return { newValue, oldValue };
};

export const createAuditLog = (entry: AuditLogEntry) => {
  return prisma.auditLog.create({
    data: {
      action: entry.action,
      actorId: entry.actorId,
      metadata: entry.metadata as Exclude<JsonValue, null | undefined>,
      targetId: entry.targetId,
      targetTable: entry.targetTable,
    },
  });
};
