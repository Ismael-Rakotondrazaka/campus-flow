export const FacultyNameSchema = z
  .string()
  .trim()
  .min(facultyConfig.NAME_MIN_LENGTH)
  .max(facultyConfig.NAME_MAX_LENGTH);
