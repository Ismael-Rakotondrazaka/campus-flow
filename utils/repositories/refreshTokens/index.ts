import { createOne } from "./createOne";
import { findFullOne } from "./findFullOne";
import { deleteMany } from "./deleteMany";
import { deleteOne } from "./deleteOne";
import { findOne } from "./findOne";

export const refreshTokenRepository = Object.freeze({
  createOne,
  findFullOne,
  deleteMany,
  deleteOne,
  findOne,
});
