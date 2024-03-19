import { findFullOne } from "./findFullOne";
import { createFullOne } from "./createFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";
import { updateFullOne } from "./updateFullOne";
import { findFullMany } from "./findFullMany";

export const maintenanceRepository = Object.freeze({
  findFullOne,
  createFullOne,
  findFullOneOrFail,
  updateFullOne,
  findFullMany,
});

export * from "./fullRaw";
