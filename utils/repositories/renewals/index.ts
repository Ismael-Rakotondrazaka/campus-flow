import { findFullOne } from "./findFullOne";
import { createFullOne } from "./createFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";
import { updateFullOne } from "./updateFullOne";
import { findFullMany } from "./findFullMany";
import { count } from "./count";

export const renewalRepository = Object.freeze({
  findFullOne,
  createFullOne,
  findFullOneOrFail,
  updateFullOne,
  findFullMany,
  count,
});

export * from "./fullRaw";
