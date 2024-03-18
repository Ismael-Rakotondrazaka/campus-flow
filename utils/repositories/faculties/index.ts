import { createOne } from "./createOne";
import { findOneOrFail } from "./findOneOrFail";
import { updateOne } from "./updateOne";
import { findMany } from "./findMany";
import { findOne } from "./findOne";

export const facultyRepository = Object.freeze({
  createOne,
  findOneOrFail,
  updateOne,
  findMany,
  findOne,
});
