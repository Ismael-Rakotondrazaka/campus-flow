import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  activeRenewalSessionEventHandlerFn,
  type ActiveRenewalSessionRequest,
} from '#server/features/academic-sessions/academic-session.active-renewal.handler';

export default defineEventHandler(
  new EventHandlerBuilder<ActiveRenewalSessionRequest>().handle(
    activeRenewalSessionEventHandlerFn
  )
);
