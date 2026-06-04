import type { RefusalReason } from '#shared/features/refusals';

import { RefusalReasonLabel } from '#shared/features/refusals';

export const EmailTemplate = {
  HOUSING_APPLICATION_ACCEPTED: 'HOUSING_APPLICATION_ACCEPTED',
  HOUSING_APPLICATION_REFUSED: 'HOUSING_APPLICATION_REFUSED',
  HOUSING_APPLICATION_VALIDATED: 'HOUSING_APPLICATION_VALIDATED',
  RENEWAL_ACCEPTED: 'RENEWAL_ACCEPTED',
  RENEWAL_REFUSED: 'RENEWAL_REFUSED',
  RENEWAL_VALIDATED: 'RENEWAL_VALIDATED',
  WELCOME: 'WELCOME',
} as const;

export type EmailTemplate = keyof typeof EmailTemplate;

export const EmailTemplateBrevoId: Record<EmailTemplate, number> = {
  // TODO: create or update these templates on Brevo and replace the IDs
  HOUSING_APPLICATION_ACCEPTED: 4,
  HOUSING_APPLICATION_REFUSED: 5,
  HOUSING_APPLICATION_VALIDATED: 6,
  RENEWAL_ACCEPTED: 7,
  RENEWAL_REFUSED: 8,
  RENEWAL_VALIDATED: 9,
  WELCOME: 3,
};

export interface EmailSendResult {
  error?: string;
  messageId?: string;
  sentAt: Date;
  success: boolean;
}

export type HousingApplicationAcceptedEmailData = {
  email: string;
  firstName: string;
  lastName: string;
};

export type HousingApplicationRefusedEmailData = {
  email: string;
  firstName: string;
  lastName: string;
  refusalReason: RefusalReason;
};

export type HousingApplicationValidatedEmailData = {
  buildingName: string;
  email: string;
  firstName: string;
  floor: number;
  lastName: string;
  loginUrl: string;
  roomNumber: number;
  temporaryPassword: string;
};

export type RenewalAcceptedEmailData = {
  email: string;
  firstName: string;
  lastName: string;
};

export type RenewalRefusedEmailData = {
  email: string;
  firstName: string;
  lastName: string;
  refusalReason: RefusalReason;
};

export type RenewalValidatedEmailData = {
  email: string;
  firstName: string;
  lastName: string;
};

export type SendBrevoTemplateOptions = {
  logMetadata?: null | Record<string, unknown>;
  params?: Record<string, boolean | number | string | undefined>;
  template: EmailTemplate;
  to: { email: string; name?: string };
};

export type WelcomeEmailData = {
  appUrl: string;
  email: string;
};

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function sendBrevoTemplateEmail(
  options: SendBrevoTemplateOptions
): Promise<EmailSendResult> {
  const { logMetadata, params, template, to } = options;
  const {
    brevo: { apiKey },
  } = useRuntimeConfig();
  const sentAt = new Date();

  const templateId = EmailTemplateBrevoId[template];

  const body: Record<string, unknown> = {
    templateId,
    to: [{ email: to.email, name: to.name ?? to.email }],
  };

  if (params && Object.keys(params).length > 0) {
    const filteredParams: Record<string, boolean | number | string> = {};
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null)
        filteredParams[k] = v as boolean | number | string;
    }
    if (Object.keys(filteredParams).length > 0) body.params = filteredParams;
  }

  try {
    const res = await fetch(BREVO_API_URL, {
      body: JSON.stringify(body),
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!res.ok) {
      const text = await res.text();
      const errorMsg = `Brevo API ${res.status}: ${text}`;

      return {
        error: errorMsg,
        sentAt,
        success: false,
      };
    }

    const data = (await res.json()) as { messageId?: string };
    const result: EmailSendResult = { sentAt, success: true };
    if (data.messageId) result.messageId = data.messageId;
    const metadata: Record<string, unknown> = { ...(logMetadata ?? {}) };
    if (data.messageId) metadata.messageId = data.messageId;

    return result;
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'Failed to send email';

    return {
      error: errorMsg,
      sentAt,
      success: false,
    };
  }
}

export function sendHousingApplicationAcceptedEmail(
  data: HousingApplicationAcceptedEmailData
): Promise<EmailSendResult> {
  return sendBrevoTemplateEmail({
    params: { firstName: data.firstName, lastName: data.lastName },
    template: EmailTemplate.HOUSING_APPLICATION_ACCEPTED,
    to: { email: data.email, name: `${data.firstName} ${data.lastName}` },
  });
}

export function sendHousingApplicationRefusedEmail(
  data: HousingApplicationRefusedEmailData
): Promise<EmailSendResult> {
  return sendBrevoTemplateEmail({
    params: {
      firstName: data.firstName,
      lastName: data.lastName,
      refusalReasonLabel: RefusalReasonLabel[data.refusalReason],
    },
    template: EmailTemplate.HOUSING_APPLICATION_REFUSED,
    to: { email: data.email, name: `${data.firstName} ${data.lastName}` },
  });
}

export function sendHousingApplicationValidatedEmail(
  data: HousingApplicationValidatedEmailData
): Promise<EmailSendResult> {
  return sendBrevoTemplateEmail({
    params: {
      buildingName: data.buildingName,
      email: data.email,
      firstName: data.firstName,
      floor: data.floor,
      lastName: data.lastName,
      loginUrl: data.loginUrl,
      roomNumber: data.roomNumber,
      temporaryPassword: data.temporaryPassword,
    },
    template: EmailTemplate.HOUSING_APPLICATION_VALIDATED,
    to: { email: data.email, name: `${data.firstName} ${data.lastName}` },
  });
}

export function sendRenewalAcceptedEmail(
  data: RenewalAcceptedEmailData
): Promise<EmailSendResult> {
  return sendBrevoTemplateEmail({
    params: { firstName: data.firstName, lastName: data.lastName },
    template: EmailTemplate.RENEWAL_ACCEPTED,
    to: { email: data.email, name: `${data.firstName} ${data.lastName}` },
  });
}

export function sendRenewalRefusedEmail(
  data: RenewalRefusedEmailData
): Promise<EmailSendResult> {
  return sendBrevoTemplateEmail({
    params: {
      firstName: data.firstName,
      lastName: data.lastName,
      refusalReasonLabel: RefusalReasonLabel[data.refusalReason],
    },
    template: EmailTemplate.RENEWAL_REFUSED,
    to: { email: data.email, name: `${data.firstName} ${data.lastName}` },
  });
}

export function sendRenewalValidatedEmail(
  data: RenewalValidatedEmailData
): Promise<EmailSendResult> {
  return sendBrevoTemplateEmail({
    params: { firstName: data.firstName, lastName: data.lastName },
    template: EmailTemplate.RENEWAL_VALIDATED,
    to: { email: data.email, name: `${data.firstName} ${data.lastName}` },
  });
}

export function sendWelcomeEmail(
  data: WelcomeEmailData
): Promise<EmailSendResult> {
  return sendBrevoTemplateEmail({
    params: { appUrl: data.appUrl },
    template: EmailTemplate.WELCOME,
    to: { email: data.email },
  });
}
