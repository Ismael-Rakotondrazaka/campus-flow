import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { z } from 'zod';

export const ExtraErrorCode = z.util.arrayToEnum(['required']);

export type ErrorCode = ExtraErrorCode | z.ZodIssueCode;

export type ErrorMapConfig = {
  [Code in ErrorCode]?: ErrorMapMessage | ErrorMapMessageBuilder<Code>;
};

export type ErrorMapMessage = string;

export type ErrorMapMessageBuilder<Code extends ErrorCode> = (
  context: ErrorMapMessageBuilderContext<Code>
) => ErrorMapMessage;

export type ErrorMapMessageBuilderContext<Code extends ErrorCode> =
  Issue<Code> & z.ErrorMapCtx;

type ExtraErrorCode = keyof typeof ExtraErrorCode;

type Issue<Code extends ErrorCode> = Code extends RequiredIssue['code']
  ? RequiredIssue
  : Code extends z.ZodIssueCode
    ? { code: Code } & z.ZodIssueOptionalMessage
    : never;

type RequiredIssue = {
  code: typeof ExtraErrorCode.required;
  expected: z.ZodParsedType;
  received: 'undefined';
} & z.ZodIssueBase;
// type ErrorMapConfigRecord = Record<ErrorCode, ErrorMapMessage | ErrorMapMessageBuilder>
// export type ErrorMapConfig = Partial<ErrorMapConfigRecord>

/**
 * Simplifies the process of making a `ZodErrorMap`
 *
 * ### Usage:
 * ```
 * import { zu } from 'zod_utilz'
 * const errorMap = zu.makeErrorMap( {
 *     required: 'Obligatoire',
 *     invalid_type: ( { data } ) => `Type invalide : ${ data }`,
 *     too_big: ( { maximum } ) => `Maximum ${ maximum } caractères`,
 *     invalid_enum_value: ( { data, options } ) =>
 *         `Valeur invalide. Autorisé : ${ options?.join( ' | ' ) }`,
 * } )
 *
 * const stringSchema = z.string( { errorMap } ).max( 32 )
 *
 * zu.SPR( stringSchema.safeParse( undefined ) ).error?.issues[ 0 ].message
 * // Obligatoire
 *
 * zu.SPR( stringSchema.safeParse( 42 ) ).error?.issues[ 0 ].message
 * // Type invalide : 42
 *
 * zu.SPR( stringSchema.safeParse(
 *     'this string is too long'
 * ) ).error?.issues[ 0 ].message
 * // Maximum 32 caractères
 *
 * const enumSchema = z.enum( [ 'foo', 'bar' ], { errorMap } )
 *
 * zu.SPR( enumSchema.safeParse( 'baz' ) ).error?.issues[ 0 ].message
 * // Valeur invalide. Autorisé : foo | bar
 * ```
 */
function makeErrorMap(config: ErrorMapConfig): z.ZodErrorMap {
  return (issue, ctx) => {
    const errorCode: ErrorCode =
      issue.code === 'invalid_type' && ctx.data === undefined
        ? 'required'
        : issue.code;

    const messageOrBuilder = config[errorCode];
    const context = { ...ctx, ...issue, code: errorCode };

    const message =
      typeof messageOrBuilder === 'function'
        ? // TODO figure out how to deal with:
          // Expression produces a union type that is too complex to represent.
          // @ts-expect-error - Expression produces a union type that is too complex to represent.
          messageOrBuilder(context)
        : messageOrBuilder;

    return message ? { message } : { message: ctx.defaultError };
  };
}

export default defineNuxtPlugin(() => {
  z.setErrorMap(
    makeErrorMap({
      required: () => 'Obligatoire',
      too_big: ctx => {
        const map: Record<
          z.ZodTooBigIssue['type'],
          Record<'exact' | 'inclusive' | 'not_inclusive', string>
        > = {
          array: {
            exact: `Doit contenir exactement {{maximum}} élément(s) — contient ${(ctx.data as unknown[]).length}`,
            inclusive: `Au plus {{maximum}} élément(s) — contient ${(ctx.data as unknown[]).length}`,
            not_inclusive: `Doit contenir strictement moins de {{maximum}} élément(s) — contient ${(ctx.data as unknown[]).length}`,
          },
          bigint: {
            exact: `Doit être égal à {{maximum}} — reçu : ${(ctx.data as bigint).toString()}`,
            inclusive: `Au plus {{maximum}} — reçu : ${(ctx.data as bigint).toString()}`,
            not_inclusive: `Doit être strictement inférieur à {{maximum}} — reçu : ${(ctx.data as bigint).toString()}`,
          },
          date: {
            exact: 'Doit être exactement le {{- maximum, datetime}}',
            inclusive: 'Doit être au plus le {{- maximum, datetime}}',
            not_inclusive:
              'Doit être strictement avant le {{- maximum, datetime}}',
          },
          number: {
            exact: `Doit être égal à {{maximum}} — reçu : ${ctx.data}`,
            inclusive: `Au plus {{maximum}} — reçu : ${ctx.data}`,
            not_inclusive: `Doit être strictement inférieur à {{maximum}} — reçu : ${ctx.data}`,
          },
          set: {
            exact: 'Invalide',
            inclusive: 'Invalide',
            not_inclusive: 'Invalide',
          },
          string: {
            exact: `Doit faire exactement {{maximum}} caractère(s) — ${(ctx.data as string).length} saisi(s)`,
            inclusive: `Au plus {{maximum}} caractère(s) — ${(ctx.data as string).length} saisi(s)`,
            not_inclusive: `Doit faire strictement moins de {{maximum}} caractère(s) — ${(ctx.data as string).length} saisi(s)`,
          },
        };

        let raw: string = '';
        if (ctx.exact == true) {
          raw = map[ctx.type].exact;
        } else if (ctx.inclusive) {
          raw = map[ctx.type].inclusive;
        } else {
          raw = map[ctx.type].not_inclusive;
        }

        if (ctx.type == 'date') {
          const formatted = format(
            new Date(ctx.maximum as number),
            'd MMMM yyyy',
            { locale: fr }
          );
          raw = raw.replaceAll('{{- maximum, datetime}}', formatted);
        } else {
          raw = raw.replaceAll('{{maximum}}', `${ctx.maximum}`);
        }

        return raw;
      },
      too_small: ctx => {
        if (ctx.message !== undefined) {
          return ctx.message;
        } else {
          const map: Record<
            z.ZodTooSmallIssue['type'],
            Record<'exact' | 'inclusive' | 'not_inclusive', string>
          > = {
            array: {
              exact: `Doit contenir exactement {{minimum}} élément(s) — contient ${ctx.data.length}`,
              inclusive: `Au moins {{minimum}} élément(s) — contient ${ctx.data.length}`,
              not_inclusive: `Doit contenir strictement plus de {{minimum}} élément(s) — contient ${ctx.data.length}`,
            },
            bigint: {
              exact: `Doit être égal à {{minimum}} — reçu : ${(ctx.data as bigint).toString()}`,
              inclusive: `Au moins {{minimum}} — reçu : ${(ctx.data as bigint).toString()}`,
              not_inclusive: `Doit être strictement supérieur à {{minimum}} — reçu : ${(ctx.data as bigint).toString()}`,
            },
            date: {
              exact: 'Doit être exactement le {{- minimum, datetime}}',
              inclusive: 'Doit être au moins le {{- minimum, datetime}}',
              not_inclusive:
                'Doit être strictement après le {{- minimum, datetime}}',
            },
            number: {
              exact: `Doit être égal à {{minimum}} — reçu : ${ctx.data}`,
              inclusive: `Au moins {{minimum}} — reçu : ${ctx.data}`,
              not_inclusive: `Doit être strictement supérieur à {{minimum}} — reçu : ${ctx.data}`,
            },
            set: {
              exact: 'Invalide',
              inclusive: 'Invalide',
              not_inclusive: 'Invalide',
            },
            string: {
              exact: `Doit faire exactement {{minimum}} caractère(s) — ${ctx.data.length} saisi(s)`,
              inclusive: `Au moins {{minimum}} caractère(s) — ${ctx.data.length} saisi(s)`,
              not_inclusive: `Doit faire strictement plus de {{minimum}} caractère(s) — ${ctx.data.length} saisi(s)`,
            },
          };

          let raw: string = '';
          if (ctx.exact == true) {
            raw = map[ctx.type].exact;
          } else if (ctx.inclusive) {
            raw = map[ctx.type].inclusive;
          } else {
            raw = map[ctx.type].not_inclusive;
          }

          if (ctx.type == 'date') {
            const formatted = format(
              new Date(ctx.minimum as number),
              'd MMMM yyyy',
              { locale: fr }
            );
            raw = raw.replaceAll('{{- minimum, datetime}}', formatted);
          } else {
            raw = raw.replaceAll('{{minimum}}', `${ctx.minimum}`);
          }

          return raw;
        }
      },
    })
  );
});
