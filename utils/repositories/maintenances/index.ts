import { findFullOne } from "./findFullOne";
import { createFullOne } from "./createFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";
import { updateFullOne } from "./updateFullOne";
import { findFullMany } from "./findFullMany";
import { count } from "./count";
import { deleteOne } from "./deleteOne";

export const maintenanceRepository = Object.freeze({
  findFullOne,
  createFullOne,
  findFullOneOrFail,
  updateFullOne,
  findFullMany,
  count,
  deleteOne,
});

export * from "./fullRaw";
