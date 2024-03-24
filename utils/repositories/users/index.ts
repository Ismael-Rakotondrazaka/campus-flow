import { findOne } from "./findOne";
import { findFullOne } from "./findFullOne";
import { findFullOneOrFail } from "./findFullOneOrFail";
import { count } from "./count";
import { exist } from "./exist";

export const userRepository = Object.freeze({
  findOne,
  findFullOne,
  findFullOneOrFail,
  count,
  exist,
});
