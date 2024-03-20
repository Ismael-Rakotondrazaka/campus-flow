import { findFullOne } from "./findFullOne";
import { createFullOne } from "./createFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";
import { updateFullOne } from "./updateFullOne";
import { findFullMany } from "./findFullMany";
import { deleteFullOne } from "./deleteFullOne";
import { findOne } from "./findOne";
import { count } from "./count";

export const studentRepository = Object.freeze({
  findFullOne,
  createFullOne,
  findFullOneOrFail,
  updateFullOne,
  findFullMany,
  deleteFullOne,
  findOne,
  count,
});

export * from "./fullRaw";
