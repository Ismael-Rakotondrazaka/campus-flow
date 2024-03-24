import { findFullOne } from "./findFullOne";
import { createFullOne } from "./createFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";
import { updateFullOne } from "./updateFullOne";
import { findFullMany } from "./findFullMany";
import { deleteFullOne } from "./deleteFullOne";
import { count } from "./count";
import { exist } from "./exist";

export const lodgmentRepository = Object.freeze({
  findFullOne,
  createFullOne,
  findFullOneOrFail,
  updateFullOne,
  findFullMany,
  deleteFullOne,
  count,
  exist,
});

export * from "./fullRaw";
