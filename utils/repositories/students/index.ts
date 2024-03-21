import { findFullOne } from "./findFullOne";
import { createFullOne } from "./createFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";
import { updateFullOne } from "./updateFullOne";
import { findFullMany } from "./findFullMany";
import { deleteFullOne } from "./deleteFullOne";
import { findOne } from "./findOne";
import { count } from "./count";
import { exist } from "./exist";

export const studentRepository = Object.freeze({
  findFullOne,
  createFullOne,
  findFullOneOrFail,
  updateFullOne,
  findFullMany,
  deleteFullOne,
  findOne,
  count,
  exist,
});

export * from "./fullRaw";
