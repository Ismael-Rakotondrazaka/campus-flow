export type AuditLog = {
  actorId: null | string;
  createdAt: Date;
  id: string;
} & AuditLogAction;

export type AuditLogAction =
  | {
      action: 'housing_application.accepted';
      metadata: FieldChange;
      targetTable: 'housing_applications';
    }
  | {
      action: 'housing_application.refused';
      metadata: FieldChange;
      targetTable: 'housing_applications';
    }
  | {
      action: 'housing_application.validated';
      metadata: FieldChange;
      targetTable: 'housing_applications';
    }
  | {
      action: 'maintenance.accepted';
      metadata: FieldChange;
      targetTable: 'maintenances';
    }
  | {
      action: 'maintenance.done';
      metadata: FieldChange;
      targetTable: 'maintenances';
    }
  | {
      action: 'maintenance.refused';
      metadata: FieldChange;
      targetTable: 'maintenances';
    }
  | {
      action: 'renewal.accepted';
      metadata: FieldChange;
      targetTable: 'renewals';
    }
  | {
      action: 'renewal.refused';
      metadata: FieldChange;
      targetTable: 'renewals';
    }
  | {
      action: 'renewal.validated';
      metadata: FieldChange;
      targetTable: 'renewals';
    };

type FieldChange = {
  newValue: Record<string, unknown>;
  oldValue: Record<string, unknown>;
};
