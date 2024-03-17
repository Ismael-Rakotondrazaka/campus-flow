import { findOne } from "./findOne";
import { findFullOne } from "./findFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";

export const userRepository = Object.freeze({
  findOne,
  findFullOne,
  findFullOneOrFail,
});
