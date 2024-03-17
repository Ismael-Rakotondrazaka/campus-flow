import { createOne } from "./createOne";
import { findFullOne } from "./findFullOne";
import { deleteMany } from "./deleteMany";

export const refreshTokenRepository = Object.freeze({
  createOne,
  findFullOne,
  deleteMany,
});
