import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','firstName','phoneNumber','profileUrl','email','password','createdAt','updatedAt','deletedAt']);

export const AdminScalarFieldEnumSchema = z.enum(['userId','role']);

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id','token','userId','expiresAt','createdAt']);

export const FacultyScalarFieldEnumSchema = z.enum(['id','name']);

export const StudentScalarFieldEnumSchema = z.enum(['userId','facultyId','gender','nationality','emergencyNumber','NIC','lodgmentId']);

export const LodgmentScalarFieldEnumSchema = z.enum(['id','capacity','floor','roomNumber','buildingId','status']);

export const ReservationScalarFieldEnumSchema = z.enum(['id','name','firstName','phoneNumber','profileUrl','email','gender','nationality','emergencyNumber','NIC','NICUrl','schoolCertificateUrl','facultyId','status','academicSessionId','createdAt','updatedAt','adminId']);

export const RenewalScalarFieldEnumSchema = z.enum(['id','studentId','phoneNumber','emergencyNumber','profileUrl','schoolCertificateUrl','NICURL','academicSessionId','status','createdAt','updatedAt','facultyId','adminId']);

export const MaintenanceScalarFieldEnumSchema = z.enum(['id','type','description','status','adminId','createdAt','updatedAt']);

export const MaintainerScalarFieldEnumSchema = z.enum(['id','name','firstName','createdAt','updatedAt','deletedAt']);

export const AcademicSessionScalarFieldEnumSchema = z.enum(['id','name','startAt','endAt','deletedAt']);

export const BuildingScalarFieldEnumSchema = z.enum(['id','name','floors','illustrationUrl']);

export const AnnouncementScalarFieldEnumSchema = z.enum(['id','title','content','illustrationUrl','status','startAt','endAt','createdAt','updatedAt','deletedAt']);

export const PasswordResetTokenScalarFieldEnumSchema = z.enum(['token','expiresAt','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['ROOT','MAINTENANCE','RENEWAL','RESERVATION']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const GenderSchema = z.enum(['MALE','FEMALE']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const LodgmentStatusSchema = z.enum(['AVAILABLE','MAINTENANCE']);

export type LodgmentStatusType = `${z.infer<typeof LodgmentStatusSchema>}`

export const MaintenanceStatusSchema = z.enum(['PENDING','ONGOING','DONE','REFUSED']);

export type MaintenanceStatusType = `${z.infer<typeof MaintenanceStatusSchema>}`

export const MaintenanceTypeSchema = z.enum(['ELECTRICAL','PLUMBING','EQUIPMENT','HVAC','OTHER']);

export type MaintenanceTypeType = `${z.infer<typeof MaintenanceTypeSchema>}`

export const RenewalStatusSchema = z.enum(['PENDING','ACCEPTED','REFUSED','VALIDATED']);

export type RenewalStatusType = `${z.infer<typeof RenewalStatusSchema>}`

export const ReservationStatusSchema = z.enum(['PENDING','ACCEPTED','REFUSED','VALIDATED']);

export type ReservationStatusType = `${z.infer<typeof ReservationStatusSchema>}`

export const AnnouncementStatusSchema = z.enum(['DRAFT','PUBLISHED','ARCHIVED']);

export type AnnouncementStatusType = `${z.infer<typeof AnnouncementStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ADMIN SCHEMA
/////////////////////////////////////////

export const AdminSchema = z.object({
  role: RoleSchema,
  userId: z.number().int(),
})

export type Admin = z.infer<typeof AdminSchema>

/////////////////////////////////////////
// REFRESH TOKEN SCHEMA
/////////////////////////////////////////

export const RefreshTokenSchema = z.object({
  id: z.number().int(),
  token: z.string(),
  userId: z.number().int(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type RefreshToken = z.infer<typeof RefreshTokenSchema>

/////////////////////////////////////////
// FACULTY SCHEMA
/////////////////////////////////////////

export const FacultySchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Faculty = z.infer<typeof FacultySchema>

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  gender: GenderSchema,
  userId: z.number().int(),
  facultyId: z.number().int(),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int(),
})

export type Student = z.infer<typeof StudentSchema>

/////////////////////////////////////////
// LODGMENT SCHEMA
/////////////////////////////////////////

export const LodgmentSchema = z.object({
  status: LodgmentStatusSchema,
  id: z.number().int(),
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  buildingId: z.number().int(),
})

export type Lodgment = z.infer<typeof LodgmentSchema>

/////////////////////////////////////////
// RESERVATION SCHEMA
/////////////////////////////////////////

export const ReservationSchema = z.object({
  gender: GenderSchema,
  status: ReservationStatusSchema,
  id: z.number().int(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  adminId: z.number().int(),
})

export type Reservation = z.infer<typeof ReservationSchema>

/////////////////////////////////////////
// RENEWAL SCHEMA
/////////////////////////////////////////

export const RenewalSchema = z.object({
  status: RenewalStatusSchema,
  id: z.number().int(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  facultyId: z.number().int().nullable(),
  adminId: z.number().int(),
})

export type Renewal = z.infer<typeof RenewalSchema>

/////////////////////////////////////////
// MAINTENANCE SCHEMA
/////////////////////////////////////////

export const MaintenanceSchema = z.object({
  type: MaintenanceTypeSchema,
  status: MaintenanceStatusSchema,
  id: z.number().int(),
  description: z.string().nullable(),
  adminId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Maintenance = z.infer<typeof MaintenanceSchema>

/////////////////////////////////////////
// MAINTAINER SCHEMA
/////////////////////////////////////////

export const MaintainerSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  firstName: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type Maintainer = z.infer<typeof MaintainerSchema>

/////////////////////////////////////////
// ACADEMIC SESSION SCHEMA
/////////////////////////////////////////

export const AcademicSessionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type AcademicSession = z.infer<typeof AcademicSessionSchema>

/////////////////////////////////////////
// BUILDING SCHEMA
/////////////////////////////////////////

export const BuildingSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  floors: z.number().int(),
  illustrationUrl: z.string(),
})

export type Building = z.infer<typeof BuildingSchema>

/////////////////////////////////////////
// ANNOUNCEMENT SCHEMA
/////////////////////////////////////////

export const AnnouncementSchema = z.object({
  status: AnnouncementStatusSchema,
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  illustrationUrl: z.string().nullable(),
  startAt: z.coerce.date().nullable(),
  endAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type Announcement = z.infer<typeof AnnouncementSchema>

/////////////////////////////////////////
// PASSWORD RESET TOKEN SCHEMA
/////////////////////////////////////////

export const PasswordResetTokenSchema = z.object({
  token: z.string(),
  expiresAt: z.coerce.date(),
  userId: z.number().int(),
})

export type PasswordResetToken = z.infer<typeof PasswordResetTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  passwordResetToken: z.union([z.boolean(),z.lazy(() => PasswordResetTokenArgsSchema)]).optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  refreshTokens: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  firstName: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  profileUrl: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  passwordResetToken: z.union([z.boolean(),z.lazy(() => PasswordResetTokenArgsSchema)]).optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ADMIN
//------------------------------------------------------

export const AdminIncludeSchema: z.ZodType<Prisma.AdminInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  renewals: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  reservations: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  maintenances: z.union([z.boolean(),z.lazy(() => MaintenanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AdminCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AdminArgsSchema: z.ZodType<Prisma.AdminDefaultArgs> = z.object({
  select: z.lazy(() => AdminSelectSchema).optional(),
  include: z.lazy(() => AdminIncludeSchema).optional(),
}).strict();

export const AdminCountOutputTypeArgsSchema: z.ZodType<Prisma.AdminCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AdminCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AdminCountOutputTypeSelectSchema: z.ZodType<Prisma.AdminCountOutputTypeSelect> = z.object({
  renewals: z.boolean().optional(),
  reservations: z.boolean().optional(),
  maintenances: z.boolean().optional(),
}).strict();

export const AdminSelectSchema: z.ZodType<Prisma.AdminSelect> = z.object({
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  renewals: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  reservations: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  maintenances: z.union([z.boolean(),z.lazy(() => MaintenanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AdminCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REFRESH TOKEN
//------------------------------------------------------

export const RefreshTokenIncludeSchema: z.ZodType<Prisma.RefreshTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RefreshTokenArgsSchema: z.ZodType<Prisma.RefreshTokenDefaultArgs> = z.object({
  select: z.lazy(() => RefreshTokenSelectSchema).optional(),
  include: z.lazy(() => RefreshTokenIncludeSchema).optional(),
}).strict();

export const RefreshTokenSelectSchema: z.ZodType<Prisma.RefreshTokenSelect> = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// FACULTY
//------------------------------------------------------

export const FacultyIncludeSchema: z.ZodType<Prisma.FacultyInclude> = z.object({
  students: z.union([z.boolean(),z.lazy(() => StudentFindManyArgsSchema)]).optional(),
  reservations: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  renewals: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FacultyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FacultyArgsSchema: z.ZodType<Prisma.FacultyDefaultArgs> = z.object({
  select: z.lazy(() => FacultySelectSchema).optional(),
  include: z.lazy(() => FacultyIncludeSchema).optional(),
}).strict();

export const FacultyCountOutputTypeArgsSchema: z.ZodType<Prisma.FacultyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FacultyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FacultyCountOutputTypeSelectSchema: z.ZodType<Prisma.FacultyCountOutputTypeSelect> = z.object({
  students: z.boolean().optional(),
  reservations: z.boolean().optional(),
  renewals: z.boolean().optional(),
}).strict();

export const FacultySelectSchema: z.ZodType<Prisma.FacultySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  students: z.union([z.boolean(),z.lazy(() => StudentFindManyArgsSchema)]).optional(),
  reservations: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  renewals: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FacultyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STUDENT
//------------------------------------------------------

export const StudentIncludeSchema: z.ZodType<Prisma.StudentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  faculty: z.union([z.boolean(),z.lazy(() => FacultyArgsSchema)]).optional(),
  renewals: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  lodgment: z.union([z.boolean(),z.lazy(() => LodgmentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StudentArgsSchema: z.ZodType<Prisma.StudentDefaultArgs> = z.object({
  select: z.lazy(() => StudentSelectSchema).optional(),
  include: z.lazy(() => StudentIncludeSchema).optional(),
}).strict();

export const StudentCountOutputTypeArgsSchema: z.ZodType<Prisma.StudentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StudentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StudentCountOutputTypeSelectSchema: z.ZodType<Prisma.StudentCountOutputTypeSelect> = z.object({
  renewals: z.boolean().optional(),
}).strict();

export const StudentSelectSchema: z.ZodType<Prisma.StudentSelect> = z.object({
  userId: z.boolean().optional(),
  facultyId: z.boolean().optional(),
  gender: z.boolean().optional(),
  nationality: z.boolean().optional(),
  emergencyNumber: z.boolean().optional(),
  NIC: z.boolean().optional(),
  lodgmentId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  faculty: z.union([z.boolean(),z.lazy(() => FacultyArgsSchema)]).optional(),
  renewals: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  lodgment: z.union([z.boolean(),z.lazy(() => LodgmentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LODGMENT
//------------------------------------------------------

export const LodgmentIncludeSchema: z.ZodType<Prisma.LodgmentInclude> = z.object({
  building: z.union([z.boolean(),z.lazy(() => BuildingArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => StudentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LodgmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LodgmentArgsSchema: z.ZodType<Prisma.LodgmentDefaultArgs> = z.object({
  select: z.lazy(() => LodgmentSelectSchema).optional(),
  include: z.lazy(() => LodgmentIncludeSchema).optional(),
}).strict();

export const LodgmentCountOutputTypeArgsSchema: z.ZodType<Prisma.LodgmentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LodgmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LodgmentCountOutputTypeSelectSchema: z.ZodType<Prisma.LodgmentCountOutputTypeSelect> = z.object({
  students: z.boolean().optional(),
}).strict();

export const LodgmentSelectSchema: z.ZodType<Prisma.LodgmentSelect> = z.object({
  id: z.boolean().optional(),
  capacity: z.boolean().optional(),
  floor: z.boolean().optional(),
  roomNumber: z.boolean().optional(),
  buildingId: z.boolean().optional(),
  status: z.boolean().optional(),
  building: z.union([z.boolean(),z.lazy(() => BuildingArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => StudentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LodgmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RESERVATION
//------------------------------------------------------

export const ReservationIncludeSchema: z.ZodType<Prisma.ReservationInclude> = z.object({
  faculty: z.union([z.boolean(),z.lazy(() => FacultyArgsSchema)]).optional(),
  academicSession: z.union([z.boolean(),z.lazy(() => AcademicSessionArgsSchema)]).optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

export const ReservationArgsSchema: z.ZodType<Prisma.ReservationDefaultArgs> = z.object({
  select: z.lazy(() => ReservationSelectSchema).optional(),
  include: z.lazy(() => ReservationIncludeSchema).optional(),
}).strict();

export const ReservationSelectSchema: z.ZodType<Prisma.ReservationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  firstName: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  profileUrl: z.boolean().optional(),
  email: z.boolean().optional(),
  gender: z.boolean().optional(),
  nationality: z.boolean().optional(),
  emergencyNumber: z.boolean().optional(),
  NIC: z.boolean().optional(),
  NICUrl: z.boolean().optional(),
  schoolCertificateUrl: z.boolean().optional(),
  facultyId: z.boolean().optional(),
  status: z.boolean().optional(),
  academicSessionId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  adminId: z.boolean().optional(),
  faculty: z.union([z.boolean(),z.lazy(() => FacultyArgsSchema)]).optional(),
  academicSession: z.union([z.boolean(),z.lazy(() => AcademicSessionArgsSchema)]).optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

// RENEWAL
//------------------------------------------------------

export const RenewalIncludeSchema: z.ZodType<Prisma.RenewalInclude> = z.object({
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  academicSession: z.union([z.boolean(),z.lazy(() => AcademicSessionArgsSchema)]).optional(),
  Faculty: z.union([z.boolean(),z.lazy(() => FacultyArgsSchema)]).optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

export const RenewalArgsSchema: z.ZodType<Prisma.RenewalDefaultArgs> = z.object({
  select: z.lazy(() => RenewalSelectSchema).optional(),
  include: z.lazy(() => RenewalIncludeSchema).optional(),
}).strict();

export const RenewalSelectSchema: z.ZodType<Prisma.RenewalSelect> = z.object({
  id: z.boolean().optional(),
  studentId: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  emergencyNumber: z.boolean().optional(),
  profileUrl: z.boolean().optional(),
  schoolCertificateUrl: z.boolean().optional(),
  NICURL: z.boolean().optional(),
  academicSessionId: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  facultyId: z.boolean().optional(),
  adminId: z.boolean().optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  academicSession: z.union([z.boolean(),z.lazy(() => AcademicSessionArgsSchema)]).optional(),
  Faculty: z.union([z.boolean(),z.lazy(() => FacultyArgsSchema)]).optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

// MAINTENANCE
//------------------------------------------------------

export const MaintenanceIncludeSchema: z.ZodType<Prisma.MaintenanceInclude> = z.object({
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  maintainers: z.union([z.boolean(),z.lazy(() => MaintainerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MaintenanceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MaintenanceArgsSchema: z.ZodType<Prisma.MaintenanceDefaultArgs> = z.object({
  select: z.lazy(() => MaintenanceSelectSchema).optional(),
  include: z.lazy(() => MaintenanceIncludeSchema).optional(),
}).strict();

export const MaintenanceCountOutputTypeArgsSchema: z.ZodType<Prisma.MaintenanceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MaintenanceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MaintenanceCountOutputTypeSelectSchema: z.ZodType<Prisma.MaintenanceCountOutputTypeSelect> = z.object({
  maintainers: z.boolean().optional(),
}).strict();

export const MaintenanceSelectSchema: z.ZodType<Prisma.MaintenanceSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  adminId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  maintainers: z.union([z.boolean(),z.lazy(() => MaintainerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MaintenanceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MAINTAINER
//------------------------------------------------------

export const MaintainerIncludeSchema: z.ZodType<Prisma.MaintainerInclude> = z.object({
  maintenances: z.union([z.boolean(),z.lazy(() => MaintenanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MaintainerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MaintainerArgsSchema: z.ZodType<Prisma.MaintainerDefaultArgs> = z.object({
  select: z.lazy(() => MaintainerSelectSchema).optional(),
  include: z.lazy(() => MaintainerIncludeSchema).optional(),
}).strict();

export const MaintainerCountOutputTypeArgsSchema: z.ZodType<Prisma.MaintainerCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MaintainerCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MaintainerCountOutputTypeSelectSchema: z.ZodType<Prisma.MaintainerCountOutputTypeSelect> = z.object({
  maintenances: z.boolean().optional(),
}).strict();

export const MaintainerSelectSchema: z.ZodType<Prisma.MaintainerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  firstName: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  maintenances: z.union([z.boolean(),z.lazy(() => MaintenanceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MaintainerCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACADEMIC SESSION
//------------------------------------------------------

export const AcademicSessionIncludeSchema: z.ZodType<Prisma.AcademicSessionInclude> = z.object({
  Reservation: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  Renewal: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AcademicSessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AcademicSessionArgsSchema: z.ZodType<Prisma.AcademicSessionDefaultArgs> = z.object({
  select: z.lazy(() => AcademicSessionSelectSchema).optional(),
  include: z.lazy(() => AcademicSessionIncludeSchema).optional(),
}).strict();

export const AcademicSessionCountOutputTypeArgsSchema: z.ZodType<Prisma.AcademicSessionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AcademicSessionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AcademicSessionCountOutputTypeSelectSchema: z.ZodType<Prisma.AcademicSessionCountOutputTypeSelect> = z.object({
  Reservation: z.boolean().optional(),
  Renewal: z.boolean().optional(),
}).strict();

export const AcademicSessionSelectSchema: z.ZodType<Prisma.AcademicSessionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  startAt: z.boolean().optional(),
  endAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  Reservation: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  Renewal: z.union([z.boolean(),z.lazy(() => RenewalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AcademicSessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BUILDING
//------------------------------------------------------

export const BuildingIncludeSchema: z.ZodType<Prisma.BuildingInclude> = z.object({
  lodgments: z.union([z.boolean(),z.lazy(() => LodgmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BuildingCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BuildingArgsSchema: z.ZodType<Prisma.BuildingDefaultArgs> = z.object({
  select: z.lazy(() => BuildingSelectSchema).optional(),
  include: z.lazy(() => BuildingIncludeSchema).optional(),
}).strict();

export const BuildingCountOutputTypeArgsSchema: z.ZodType<Prisma.BuildingCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BuildingCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BuildingCountOutputTypeSelectSchema: z.ZodType<Prisma.BuildingCountOutputTypeSelect> = z.object({
  lodgments: z.boolean().optional(),
}).strict();

export const BuildingSelectSchema: z.ZodType<Prisma.BuildingSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  floors: z.boolean().optional(),
  illustrationUrl: z.boolean().optional(),
  lodgments: z.union([z.boolean(),z.lazy(() => LodgmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BuildingCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ANNOUNCEMENT
//------------------------------------------------------

export const AnnouncementSelectSchema: z.ZodType<Prisma.AnnouncementSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  illustrationUrl: z.boolean().optional(),
  status: z.boolean().optional(),
  startAt: z.boolean().optional(),
  endAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
}).strict()

// PASSWORD RESET TOKEN
//------------------------------------------------------

export const PasswordResetTokenIncludeSchema: z.ZodType<Prisma.PasswordResetTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PasswordResetTokenArgsSchema: z.ZodType<Prisma.PasswordResetTokenDefaultArgs> = z.object({
  select: z.lazy(() => PasswordResetTokenSelectSchema).optional(),
  include: z.lazy(() => PasswordResetTokenIncludeSchema).optional(),
}).strict();

export const PasswordResetTokenSelectSchema: z.ZodType<Prisma.PasswordResetTokenSelect> = z.object({
  token: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  passwordResetToken: z.union([ z.lazy(() => PasswordResetTokenNullableRelationFilterSchema),z.lazy(() => PasswordResetTokenWhereInputSchema) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => AdminNullableRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional().nullable(),
  student: z.union([ z.lazy(() => StudentNullableRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional().nullable(),
  refreshTokens: z.lazy(() => RefreshTokenListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  passwordResetToken: z.lazy(() => PasswordResetTokenOrderByWithRelationInputSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional(),
  student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  passwordResetToken: z.union([ z.lazy(() => PasswordResetTokenNullableRelationFilterSchema),z.lazy(() => PasswordResetTokenWhereInputSchema) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => AdminNullableRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional().nullable(),
  student: z.union([ z.lazy(() => StudentNullableRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional().nullable(),
  refreshTokens: z.lazy(() => RefreshTokenListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const AdminWhereInputSchema: z.ZodType<Prisma.AdminWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalListRelationFilterSchema).optional(),
  reservations: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  maintenances: z.lazy(() => MaintenanceListRelationFilterSchema).optional()
}).strict();

export const AdminOrderByWithRelationInputSchema: z.ZodType<Prisma.AdminOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  renewals: z.lazy(() => RenewalOrderByRelationAggregateInputSchema).optional(),
  reservations: z.lazy(() => ReservationOrderByRelationAggregateInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AdminWhereUniqueInputSchema: z.ZodType<Prisma.AdminWhereUniqueInput> = z.object({
  userId: z.number().int()
})
.and(z.object({
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalListRelationFilterSchema).optional(),
  reservations: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  maintenances: z.lazy(() => MaintenanceListRelationFilterSchema).optional()
}).strict());

export const AdminOrderByWithAggregationInputSchema: z.ZodType<Prisma.AdminOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AdminCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AdminAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AdminMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AdminMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AdminSumOrderByAggregateInputSchema).optional()
}).strict();

export const AdminScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AdminScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AdminScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
}).strict();

export const RefreshTokenWhereInputSchema: z.ZodType<Prisma.RefreshTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RefreshTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.RefreshTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RefreshTokenWhereUniqueInputSchema: z.ZodType<Prisma.RefreshTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    token: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RefreshTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RefreshTokenCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RefreshTokenAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RefreshTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RefreshTokenMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RefreshTokenSumOrderByAggregateInputSchema).optional()
}).strict();

export const RefreshTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RefreshTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FacultyWhereInputSchema: z.ZodType<Prisma.FacultyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FacultyWhereInputSchema),z.lazy(() => FacultyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FacultyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FacultyWhereInputSchema),z.lazy(() => FacultyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  students: z.lazy(() => StudentListRelationFilterSchema).optional(),
  reservations: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  renewals: z.lazy(() => RenewalListRelationFilterSchema).optional()
}).strict();

export const FacultyOrderByWithRelationInputSchema: z.ZodType<Prisma.FacultyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  students: z.lazy(() => StudentOrderByRelationAggregateInputSchema).optional(),
  reservations: z.lazy(() => ReservationOrderByRelationAggregateInputSchema).optional(),
  renewals: z.lazy(() => RenewalOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FacultyWhereUniqueInputSchema: z.ZodType<Prisma.FacultyWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FacultyWhereInputSchema),z.lazy(() => FacultyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FacultyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FacultyWhereInputSchema),z.lazy(() => FacultyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  students: z.lazy(() => StudentListRelationFilterSchema).optional(),
  reservations: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  renewals: z.lazy(() => RenewalListRelationFilterSchema).optional()
}).strict());

export const FacultyOrderByWithAggregationInputSchema: z.ZodType<Prisma.FacultyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FacultyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FacultyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FacultyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FacultyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FacultySumOrderByAggregateInputSchema).optional()
}).strict();

export const FacultyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FacultyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FacultyScalarWhereWithAggregatesInputSchema),z.lazy(() => FacultyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FacultyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FacultyScalarWhereWithAggregatesInputSchema),z.lazy(() => FacultyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const StudentWhereInputSchema: z.ZodType<Prisma.StudentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lodgmentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  faculty: z.union([ z.lazy(() => FacultyRelationFilterSchema),z.lazy(() => FacultyWhereInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalListRelationFilterSchema).optional(),
  lodgment: z.union([ z.lazy(() => LodgmentRelationFilterSchema),z.lazy(() => LodgmentWhereInputSchema) ]).optional(),
}).strict();

export const StudentOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  lodgmentId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  faculty: z.lazy(() => FacultyOrderByWithRelationInputSchema).optional(),
  renewals: z.lazy(() => RenewalOrderByRelationAggregateInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentOrderByWithRelationInputSchema).optional()
}).strict();

export const StudentWhereUniqueInputSchema: z.ZodType<Prisma.StudentWhereUniqueInput> = z.object({
  userId: z.number().int()
})
.and(z.object({
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lodgmentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  faculty: z.union([ z.lazy(() => FacultyRelationFilterSchema),z.lazy(() => FacultyWhereInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalListRelationFilterSchema).optional(),
  lodgment: z.union([ z.lazy(() => LodgmentRelationFilterSchema),z.lazy(() => LodgmentWhereInputSchema) ]).optional(),
}).strict());

export const StudentOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  lodgmentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StudentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StudentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StudentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StudentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StudentSumOrderByAggregateInputSchema).optional()
}).strict();

export const StudentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lodgmentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const LodgmentWhereInputSchema: z.ZodType<Prisma.LodgmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LodgmentWhereInputSchema),z.lazy(() => LodgmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LodgmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LodgmentWhereInputSchema),z.lazy(() => LodgmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  floor: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roomNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  buildingId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumLodgmentStatusFilterSchema),z.lazy(() => LodgmentStatusSchema) ]).optional(),
  building: z.union([ z.lazy(() => BuildingRelationFilterSchema),z.lazy(() => BuildingWhereInputSchema) ]).optional(),
  students: z.lazy(() => StudentListRelationFilterSchema).optional()
}).strict();

export const LodgmentOrderByWithRelationInputSchema: z.ZodType<Prisma.LodgmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  roomNumber: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  building: z.lazy(() => BuildingOrderByWithRelationInputSchema).optional(),
  students: z.lazy(() => StudentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LodgmentWhereUniqueInputSchema: z.ZodType<Prisma.LodgmentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => LodgmentWhereInputSchema),z.lazy(() => LodgmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LodgmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LodgmentWhereInputSchema),z.lazy(() => LodgmentWhereInputSchema).array() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  floor: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  roomNumber: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  buildingId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => EnumLodgmentStatusFilterSchema),z.lazy(() => LodgmentStatusSchema) ]).optional(),
  building: z.union([ z.lazy(() => BuildingRelationFilterSchema),z.lazy(() => BuildingWhereInputSchema) ]).optional(),
  students: z.lazy(() => StudentListRelationFilterSchema).optional()
}).strict());

export const LodgmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.LodgmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  roomNumber: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LodgmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LodgmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LodgmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LodgmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LodgmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const LodgmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LodgmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LodgmentScalarWhereWithAggregatesInputSchema),z.lazy(() => LodgmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LodgmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LodgmentScalarWhereWithAggregatesInputSchema),z.lazy(() => LodgmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  capacity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  floor: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  roomNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  buildingId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumLodgmentStatusWithAggregatesFilterSchema),z.lazy(() => LodgmentStatusSchema) ]).optional(),
}).strict();

export const ReservationWhereInputSchema: z.ZodType<Prisma.ReservationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NICUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  faculty: z.union([ z.lazy(() => FacultyRelationFilterSchema),z.lazy(() => FacultyWhereInputSchema) ]).optional(),
  academicSession: z.union([ z.lazy(() => AcademicSessionRelationFilterSchema),z.lazy(() => AcademicSessionWhereInputSchema) ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict();

export const ReservationOrderByWithRelationInputSchema: z.ZodType<Prisma.ReservationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  NICUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  faculty: z.lazy(() => FacultyOrderByWithRelationInputSchema).optional(),
  academicSession: z.lazy(() => AcademicSessionOrderByWithRelationInputSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional()
}).strict();

export const ReservationWhereUniqueInputSchema: z.ZodType<Prisma.ReservationWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NICUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  faculty: z.union([ z.lazy(() => FacultyRelationFilterSchema),z.lazy(() => FacultyWhereInputSchema) ]).optional(),
  academicSession: z.union([ z.lazy(() => AcademicSessionRelationFilterSchema),z.lazy(() => AcademicSessionWhereInputSchema) ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict());

export const ReservationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReservationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  NICUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReservationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReservationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReservationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReservationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReservationSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReservationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReservationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema),z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema),z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  NICUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusWithAggregatesFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  adminId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const RenewalWhereInputSchema: z.ZodType<Prisma.RenewalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RenewalWhereInputSchema),z.lazy(() => RenewalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RenewalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RenewalWhereInputSchema),z.lazy(() => RenewalWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NICURL: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumRenewalStatusFilterSchema),z.lazy(() => RenewalStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  student: z.union([ z.lazy(() => StudentRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  academicSession: z.union([ z.lazy(() => AcademicSessionRelationFilterSchema),z.lazy(() => AcademicSessionWhereInputSchema) ]).optional(),
  Faculty: z.union([ z.lazy(() => FacultyNullableRelationFilterSchema),z.lazy(() => FacultyWhereInputSchema) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict();

export const RenewalOrderByWithRelationInputSchema: z.ZodType<Prisma.RenewalOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  NICURL: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional(),
  academicSession: z.lazy(() => AcademicSessionOrderByWithRelationInputSchema).optional(),
  Faculty: z.lazy(() => FacultyOrderByWithRelationInputSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional()
}).strict();

export const RenewalWhereUniqueInputSchema: z.ZodType<Prisma.RenewalWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    studentId_academicSessionId: z.lazy(() => RenewalStudentIdAcademicSessionIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    studentId_academicSessionId: z.lazy(() => RenewalStudentIdAcademicSessionIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  studentId_academicSessionId: z.lazy(() => RenewalStudentIdAcademicSessionIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RenewalWhereInputSchema),z.lazy(() => RenewalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RenewalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RenewalWhereInputSchema),z.lazy(() => RenewalWhereInputSchema).array() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NICURL: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => EnumRenewalStatusFilterSchema),z.lazy(() => RenewalStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  student: z.union([ z.lazy(() => StudentRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  academicSession: z.union([ z.lazy(() => AcademicSessionRelationFilterSchema),z.lazy(() => AcademicSessionWhereInputSchema) ]).optional(),
  Faculty: z.union([ z.lazy(() => FacultyNullableRelationFilterSchema),z.lazy(() => FacultyWhereInputSchema) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict());

export const RenewalOrderByWithAggregationInputSchema: z.ZodType<Prisma.RenewalOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  NICURL: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RenewalCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RenewalAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RenewalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RenewalMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RenewalSumOrderByAggregateInputSchema).optional()
}).strict();

export const RenewalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RenewalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RenewalScalarWhereWithAggregatesInputSchema),z.lazy(() => RenewalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RenewalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RenewalScalarWhereWithAggregatesInputSchema),z.lazy(() => RenewalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  NICURL: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumRenewalStatusWithAggregatesFilterSchema),z.lazy(() => RenewalStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  adminId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const MaintenanceWhereInputSchema: z.ZodType<Prisma.MaintenanceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MaintenanceWhereInputSchema),z.lazy(() => MaintenanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintenanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintenanceWhereInputSchema),z.lazy(() => MaintenanceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumMaintenanceTypeFilterSchema),z.lazy(() => MaintenanceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMaintenanceStatusFilterSchema),z.lazy(() => MaintenanceStatusSchema) ]).optional(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  maintainers: z.lazy(() => MaintainerListRelationFilterSchema).optional()
}).strict();

export const MaintenanceOrderByWithRelationInputSchema: z.ZodType<Prisma.MaintenanceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional(),
  maintainers: z.lazy(() => MaintainerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MaintenanceWhereUniqueInputSchema: z.ZodType<Prisma.MaintenanceWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => MaintenanceWhereInputSchema),z.lazy(() => MaintenanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintenanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintenanceWhereInputSchema),z.lazy(() => MaintenanceWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumMaintenanceTypeFilterSchema),z.lazy(() => MaintenanceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMaintenanceStatusFilterSchema),z.lazy(() => MaintenanceStatusSchema) ]).optional(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  maintainers: z.lazy(() => MaintainerListRelationFilterSchema).optional()
}).strict());

export const MaintenanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.MaintenanceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MaintenanceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MaintenanceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MaintenanceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MaintenanceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MaintenanceSumOrderByAggregateInputSchema).optional()
}).strict();

export const MaintenanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MaintenanceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MaintenanceScalarWhereWithAggregatesInputSchema),z.lazy(() => MaintenanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintenanceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintenanceScalarWhereWithAggregatesInputSchema),z.lazy(() => MaintenanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumMaintenanceTypeWithAggregatesFilterSchema),z.lazy(() => MaintenanceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMaintenanceStatusWithAggregatesFilterSchema),z.lazy(() => MaintenanceStatusSchema) ]).optional(),
  adminId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MaintainerWhereInputSchema: z.ZodType<Prisma.MaintainerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MaintainerWhereInputSchema),z.lazy(() => MaintainerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintainerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintainerWhereInputSchema),z.lazy(() => MaintainerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  maintenances: z.lazy(() => MaintenanceListRelationFilterSchema).optional()
}).strict();

export const MaintainerOrderByWithRelationInputSchema: z.ZodType<Prisma.MaintainerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maintenances: z.lazy(() => MaintenanceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MaintainerWhereUniqueInputSchema: z.ZodType<Prisma.MaintainerWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => MaintainerWhereInputSchema),z.lazy(() => MaintainerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintainerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintainerWhereInputSchema),z.lazy(() => MaintainerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  maintenances: z.lazy(() => MaintenanceListRelationFilterSchema).optional()
}).strict());

export const MaintainerOrderByWithAggregationInputSchema: z.ZodType<Prisma.MaintainerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MaintainerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MaintainerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MaintainerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MaintainerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MaintainerSumOrderByAggregateInputSchema).optional()
}).strict();

export const MaintainerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MaintainerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MaintainerScalarWhereWithAggregatesInputSchema),z.lazy(() => MaintainerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintainerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintainerScalarWhereWithAggregatesInputSchema),z.lazy(() => MaintainerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const AcademicSessionWhereInputSchema: z.ZodType<Prisma.AcademicSessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AcademicSessionWhereInputSchema),z.lazy(() => AcademicSessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AcademicSessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AcademicSessionWhereInputSchema),z.lazy(() => AcademicSessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Reservation: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  Renewal: z.lazy(() => RenewalListRelationFilterSchema).optional()
}).strict();

export const AcademicSessionOrderByWithRelationInputSchema: z.ZodType<Prisma.AcademicSessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationOrderByRelationAggregateInputSchema).optional(),
  Renewal: z.lazy(() => RenewalOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AcademicSessionWhereUniqueInputSchema: z.ZodType<Prisma.AcademicSessionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AcademicSessionWhereInputSchema),z.lazy(() => AcademicSessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AcademicSessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AcademicSessionWhereInputSchema),z.lazy(() => AcademicSessionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Reservation: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  Renewal: z.lazy(() => RenewalListRelationFilterSchema).optional()
}).strict());

export const AcademicSessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.AcademicSessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AcademicSessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AcademicSessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AcademicSessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AcademicSessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AcademicSessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const AcademicSessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AcademicSessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AcademicSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => AcademicSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AcademicSessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AcademicSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => AcademicSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const BuildingWhereInputSchema: z.ZodType<Prisma.BuildingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  floors: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  illustrationUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lodgments: z.lazy(() => LodgmentListRelationFilterSchema).optional()
}).strict();

export const BuildingOrderByWithRelationInputSchema: z.ZodType<Prisma.BuildingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  floors: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional(),
  lodgments: z.lazy(() => LodgmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BuildingWhereUniqueInputSchema: z.ZodType<Prisma.BuildingWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildingWhereInputSchema),z.lazy(() => BuildingWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  floors: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  illustrationUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lodgments: z.lazy(() => LodgmentListRelationFilterSchema).optional()
}).strict());

export const BuildingOrderByWithAggregationInputSchema: z.ZodType<Prisma.BuildingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  floors: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BuildingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BuildingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BuildingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BuildingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BuildingSumOrderByAggregateInputSchema).optional()
}).strict();

export const BuildingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BuildingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema),z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema),z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  floors: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  illustrationUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AnnouncementWhereInputSchema: z.ZodType<Prisma.AnnouncementWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnnouncementWhereInputSchema),z.lazy(() => AnnouncementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnnouncementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnnouncementWhereInputSchema),z.lazy(() => AnnouncementWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  illustrationUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAnnouncementStatusFilterSchema),z.lazy(() => AnnouncementStatusSchema) ]).optional(),
  startAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const AnnouncementOrderByWithRelationInputSchema: z.ZodType<Prisma.AnnouncementOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const AnnouncementWhereUniqueInputSchema: z.ZodType<Prisma.AnnouncementWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AnnouncementWhereInputSchema),z.lazy(() => AnnouncementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnnouncementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnnouncementWhereInputSchema),z.lazy(() => AnnouncementWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  illustrationUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAnnouncementStatusFilterSchema),z.lazy(() => AnnouncementStatusSchema) ]).optional(),
  startAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const AnnouncementOrderByWithAggregationInputSchema: z.ZodType<Prisma.AnnouncementOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AnnouncementCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AnnouncementAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AnnouncementMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AnnouncementMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AnnouncementSumOrderByAggregateInputSchema).optional()
}).strict();

export const AnnouncementScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AnnouncementScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AnnouncementScalarWhereWithAggregatesInputSchema),z.lazy(() => AnnouncementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnnouncementScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnnouncementScalarWhereWithAggregatesInputSchema),z.lazy(() => AnnouncementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  illustrationUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumAnnouncementStatusWithAggregatesFilterSchema),z.lazy(() => AnnouncementStatusSchema) ]).optional(),
  startAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  endAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PasswordResetTokenWhereInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithRelationInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PasswordResetTokenWhereUniqueInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    userId: z.number().int()
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    userId: z.number().int(),
  }),
])
.and(z.object({
  token: z.string().optional(),
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PasswordResetTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithAggregationInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PasswordResetTokenCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PasswordResetTokenAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasswordResetTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasswordResetTokenMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PasswordResetTokenSumOrderByAggregateInputSchema).optional()
}).strict();

export const PasswordResetTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenCreateNestedOneWithoutUserInputSchema).optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUpdateOneWithoutUserNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AdminCreateInputSchema: z.ZodType<Prisma.AdminCreateInput> = z.object({
  role: z.lazy(() => RoleSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAdminInputSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutAdminInputSchema).optional(),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateInputSchema: z.ZodType<Prisma.AdminUncheckedCreateInput> = z.object({
  userId: z.number().int(),
  role: z.lazy(() => RoleSchema),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUpdateInputSchema: z.ZodType<Prisma.AdminUpdateInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAdminNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutAdminNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminCreateManyInputSchema: z.ZodType<Prisma.AdminCreateManyInput> = z.object({
  userId: z.number().int(),
  role: z.lazy(() => RoleSchema)
}).strict();

export const AdminUpdateManyMutationInputSchema: z.ZodType<Prisma.AdminUpdateManyMutationInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateInputSchema: z.ZodType<Prisma.RefreshTokenCreateInput> = z.object({
  token: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRefreshTokensInputSchema)
}).strict();

export const RefreshTokenUncheckedCreateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  token: z.string(),
  userId: z.number().int(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRefreshTokensNestedInputSchema).optional()
}).strict();

export const RefreshTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateManyInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyInput> = z.object({
  id: z.number().int().optional(),
  token: z.string(),
  userId: z.number().int(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyMutationInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FacultyCreateInputSchema: z.ZodType<Prisma.FacultyCreateInput> = z.object({
  name: z.string(),
  students: z.lazy(() => StudentCreateNestedManyWithoutFacultyInputSchema).optional(),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutFacultyInputSchema).optional(),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyUncheckedCreateInputSchema: z.ZodType<Prisma.FacultyUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  students: z.lazy(() => StudentUncheckedCreateNestedManyWithoutFacultyInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutFacultyInputSchema).optional(),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyUpdateInputSchema: z.ZodType<Prisma.FacultyUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUpdateManyWithoutFacultyNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutFacultyNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const FacultyUncheckedUpdateInputSchema: z.ZodType<Prisma.FacultyUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const FacultyCreateManyInputSchema: z.ZodType<Prisma.FacultyCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const FacultyUpdateManyMutationInputSchema: z.ZodType<Prisma.FacultyUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FacultyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FacultyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentCreateInputSchema: z.ZodType<Prisma.StudentCreateInput> = z.object({
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutStudentInputSchema),
  faculty: z.lazy(() => FacultyCreateNestedOneWithoutStudentsInputSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutStudentInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentCreateNestedOneWithoutStudentsInputSchema)
}).strict();

export const StudentUncheckedCreateInputSchema: z.ZodType<Prisma.StudentUncheckedCreateInput> = z.object({
  userId: z.number().int(),
  facultyId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int(),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUpdateInputSchema: z.ZodType<Prisma.StudentUpdateInput> = z.object({
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  faculty: z.lazy(() => FacultyUpdateOneRequiredWithoutStudentsNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutStudentNestedInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentUpdateOneRequiredWithoutStudentsNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentCreateManyInputSchema: z.ZodType<Prisma.StudentCreateManyInput> = z.object({
  userId: z.number().int(),
  facultyId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int()
}).strict();

export const StudentUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentUpdateManyMutationInput> = z.object({
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LodgmentCreateInputSchema: z.ZodType<Prisma.LodgmentCreateInput> = z.object({
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema),
  building: z.lazy(() => BuildingCreateNestedOneWithoutLodgmentsInputSchema),
  students: z.lazy(() => StudentCreateNestedManyWithoutLodgmentInputSchema).optional()
}).strict();

export const LodgmentUncheckedCreateInputSchema: z.ZodType<Prisma.LodgmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  buildingId: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema),
  students: z.lazy(() => StudentUncheckedCreateNestedManyWithoutLodgmentInputSchema).optional()
}).strict();

export const LodgmentUpdateInputSchema: z.ZodType<Prisma.LodgmentUpdateInput> = z.object({
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  building: z.lazy(() => BuildingUpdateOneRequiredWithoutLodgmentsNestedInputSchema).optional(),
  students: z.lazy(() => StudentUpdateManyWithoutLodgmentNestedInputSchema).optional()
}).strict();

export const LodgmentUncheckedUpdateInputSchema: z.ZodType<Prisma.LodgmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUncheckedUpdateManyWithoutLodgmentNestedInputSchema).optional()
}).strict();

export const LodgmentCreateManyInputSchema: z.ZodType<Prisma.LodgmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  buildingId: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema)
}).strict();

export const LodgmentUpdateManyMutationInputSchema: z.ZodType<Prisma.LodgmentUpdateManyMutationInput> = z.object({
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LodgmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LodgmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationCreateInputSchema: z.ZodType<Prisma.ReservationCreateInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  status: z.lazy(() => ReservationStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  faculty: z.lazy(() => FacultyCreateNestedOneWithoutReservationsInputSchema),
  academicSession: z.lazy(() => AcademicSessionCreateNestedOneWithoutReservationInputSchema),
  admin: z.lazy(() => AdminCreateNestedOneWithoutReservationsInputSchema)
}).strict();

export const ReservationUncheckedCreateInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  status: z.lazy(() => ReservationStatusSchema),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const ReservationUpdateInputSchema: z.ZodType<Prisma.ReservationUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  faculty: z.lazy(() => FacultyUpdateOneRequiredWithoutReservationsNestedInputSchema).optional(),
  academicSession: z.lazy(() => AcademicSessionUpdateOneRequiredWithoutReservationNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationUncheckedUpdateInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationCreateManyInputSchema: z.ZodType<Prisma.ReservationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  status: z.lazy(() => ReservationStatusSchema),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const ReservationUpdateManyMutationInputSchema: z.ZodType<Prisma.ReservationUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalCreateInputSchema: z.ZodType<Prisma.RenewalCreateInput> = z.object({
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutRenewalsInputSchema),
  academicSession: z.lazy(() => AcademicSessionCreateNestedOneWithoutRenewalInputSchema),
  Faculty: z.lazy(() => FacultyCreateNestedOneWithoutRenewalsInputSchema).optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutRenewalsInputSchema)
}).strict();

export const RenewalUncheckedCreateInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable(),
  adminId: z.number().int()
}).strict();

export const RenewalUpdateInputSchema: z.ZodType<Prisma.RenewalUpdateInput> = z.object({
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional(),
  academicSession: z.lazy(() => AcademicSessionUpdateOneRequiredWithoutRenewalNestedInputSchema).optional(),
  Faculty: z.lazy(() => FacultyUpdateOneWithoutRenewalsNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional()
}).strict();

export const RenewalUncheckedUpdateInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalCreateManyInputSchema: z.ZodType<Prisma.RenewalCreateManyInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable(),
  adminId: z.number().int()
}).strict();

export const RenewalUpdateManyMutationInputSchema: z.ZodType<Prisma.RenewalUpdateManyMutationInput> = z.object({
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MaintenanceCreateInputSchema: z.ZodType<Prisma.MaintenanceCreateInput> = z.object({
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutMaintenancesInputSchema),
  maintainers: z.lazy(() => MaintainerCreateNestedManyWithoutMaintenancesInputSchema).optional()
}).strict();

export const MaintenanceUncheckedCreateInputSchema: z.ZodType<Prisma.MaintenanceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  adminId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  maintainers: z.lazy(() => MaintainerUncheckedCreateNestedManyWithoutMaintenancesInputSchema).optional()
}).strict();

export const MaintenanceUpdateInputSchema: z.ZodType<Prisma.MaintenanceUpdateInput> = z.object({
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutMaintenancesNestedInputSchema).optional(),
  maintainers: z.lazy(() => MaintainerUpdateManyWithoutMaintenancesNestedInputSchema).optional()
}).strict();

export const MaintenanceUncheckedUpdateInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  maintainers: z.lazy(() => MaintainerUncheckedUpdateManyWithoutMaintenancesNestedInputSchema).optional()
}).strict();

export const MaintenanceCreateManyInputSchema: z.ZodType<Prisma.MaintenanceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  adminId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MaintenanceUpdateManyMutationInputSchema: z.ZodType<Prisma.MaintenanceUpdateManyMutationInput> = z.object({
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MaintenanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MaintainerCreateInputSchema: z.ZodType<Prisma.MaintainerCreateInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  maintenances: z.lazy(() => MaintenanceCreateNestedManyWithoutMaintainersInputSchema).optional()
}).strict();

export const MaintainerUncheckedCreateInputSchema: z.ZodType<Prisma.MaintainerUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  maintenances: z.lazy(() => MaintenanceUncheckedCreateNestedManyWithoutMaintainersInputSchema).optional()
}).strict();

export const MaintainerUpdateInputSchema: z.ZodType<Prisma.MaintainerUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maintenances: z.lazy(() => MaintenanceUpdateManyWithoutMaintainersNestedInputSchema).optional()
}).strict();

export const MaintainerUncheckedUpdateInputSchema: z.ZodType<Prisma.MaintainerUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maintenances: z.lazy(() => MaintenanceUncheckedUpdateManyWithoutMaintainersNestedInputSchema).optional()
}).strict();

export const MaintainerCreateManyInputSchema: z.ZodType<Prisma.MaintainerCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const MaintainerUpdateManyMutationInputSchema: z.ZodType<Prisma.MaintainerUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MaintainerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MaintainerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AcademicSessionCreateInputSchema: z.ZodType<Prisma.AcademicSessionCreateInput> = z.object({
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional().nullable(),
  Reservation: z.lazy(() => ReservationCreateNestedManyWithoutAcademicSessionInputSchema).optional(),
  Renewal: z.lazy(() => RenewalCreateNestedManyWithoutAcademicSessionInputSchema).optional()
}).strict();

export const AcademicSessionUncheckedCreateInputSchema: z.ZodType<Prisma.AcademicSessionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional().nullable(),
  Reservation: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAcademicSessionInputSchema).optional(),
  Renewal: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutAcademicSessionInputSchema).optional()
}).strict();

export const AcademicSessionUpdateInputSchema: z.ZodType<Prisma.AcademicSessionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation: z.lazy(() => ReservationUpdateManyWithoutAcademicSessionNestedInputSchema).optional(),
  Renewal: z.lazy(() => RenewalUpdateManyWithoutAcademicSessionNestedInputSchema).optional()
}).strict();

export const AcademicSessionUncheckedUpdateInputSchema: z.ZodType<Prisma.AcademicSessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation: z.lazy(() => ReservationUncheckedUpdateManyWithoutAcademicSessionNestedInputSchema).optional(),
  Renewal: z.lazy(() => RenewalUncheckedUpdateManyWithoutAcademicSessionNestedInputSchema).optional()
}).strict();

export const AcademicSessionCreateManyInputSchema: z.ZodType<Prisma.AcademicSessionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const AcademicSessionUpdateManyMutationInputSchema: z.ZodType<Prisma.AcademicSessionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AcademicSessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AcademicSessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BuildingCreateInputSchema: z.ZodType<Prisma.BuildingCreateInput> = z.object({
  name: z.string(),
  floors: z.number().int(),
  illustrationUrl: z.string(),
  lodgments: z.lazy(() => LodgmentCreateNestedManyWithoutBuildingInputSchema).optional()
}).strict();

export const BuildingUncheckedCreateInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  floors: z.number().int(),
  illustrationUrl: z.string(),
  lodgments: z.lazy(() => LodgmentUncheckedCreateNestedManyWithoutBuildingInputSchema).optional()
}).strict();

export const BuildingUpdateInputSchema: z.ZodType<Prisma.BuildingUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  floors: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgments: z.lazy(() => LodgmentUpdateManyWithoutBuildingNestedInputSchema).optional()
}).strict();

export const BuildingUncheckedUpdateInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  floors: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgments: z.lazy(() => LodgmentUncheckedUpdateManyWithoutBuildingNestedInputSchema).optional()
}).strict();

export const BuildingCreateManyInputSchema: z.ZodType<Prisma.BuildingCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  floors: z.number().int(),
  illustrationUrl: z.string()
}).strict();

export const BuildingUpdateManyMutationInputSchema: z.ZodType<Prisma.BuildingUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  floors: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  floors: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnnouncementCreateInputSchema: z.ZodType<Prisma.AnnouncementCreateInput> = z.object({
  title: z.string(),
  content: z.string(),
  illustrationUrl: z.string().optional().nullable(),
  status: z.lazy(() => AnnouncementStatusSchema),
  startAt: z.coerce.date().optional().nullable(),
  endAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const AnnouncementUncheckedCreateInputSchema: z.ZodType<Prisma.AnnouncementUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  illustrationUrl: z.string().optional().nullable(),
  status: z.lazy(() => AnnouncementStatusSchema),
  startAt: z.coerce.date().optional().nullable(),
  endAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const AnnouncementUpdateInputSchema: z.ZodType<Prisma.AnnouncementUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => EnumAnnouncementStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnnouncementUncheckedUpdateInputSchema: z.ZodType<Prisma.AnnouncementUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => EnumAnnouncementStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnnouncementCreateManyInputSchema: z.ZodType<Prisma.AnnouncementCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  illustrationUrl: z.string().optional().nullable(),
  status: z.lazy(() => AnnouncementStatusSchema),
  startAt: z.coerce.date().optional().nullable(),
  endAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const AnnouncementUpdateManyMutationInputSchema: z.ZodType<Prisma.AnnouncementUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => EnumAnnouncementStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnnouncementUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AnnouncementUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => EnumAnnouncementStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasswordResetTokenCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateInput> = z.object({
  token: z.string(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutPasswordResetTokenInputSchema)
}).strict();

export const PasswordResetTokenUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateInput> = z.object({
  token: z.string(),
  expiresAt: z.coerce.date(),
  userId: z.number().int()
}).strict();

export const PasswordResetTokenUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPasswordResetTokenNestedInputSchema).optional()
}).strict();

export const PasswordResetTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenCreateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyInput> = z.object({
  token: z.string(),
  expiresAt: z.coerce.date(),
  userId: z.number().int()
}).strict();

export const PasswordResetTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyMutationInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PasswordResetTokenNullableRelationFilterSchema: z.ZodType<Prisma.PasswordResetTokenNullableRelationFilter> = z.object({
  is: z.lazy(() => PasswordResetTokenWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PasswordResetTokenWhereInputSchema).optional().nullable()
}).strict();

export const AdminNullableRelationFilterSchema: z.ZodType<Prisma.AdminNullableRelationFilter> = z.object({
  is: z.lazy(() => AdminWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AdminWhereInputSchema).optional().nullable()
}).strict();

export const StudentNullableRelationFilterSchema: z.ZodType<Prisma.StudentNullableRelationFilter> = z.object({
  is: z.lazy(() => StudentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StudentWhereInputSchema).optional().nullable()
}).strict();

export const RefreshTokenListRelationFilterSchema: z.ZodType<Prisma.RefreshTokenListRelationFilter> = z.object({
  every: z.lazy(() => RefreshTokenWhereInputSchema).optional(),
  some: z.lazy(() => RefreshTokenWhereInputSchema).optional(),
  none: z.lazy(() => RefreshTokenWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const RefreshTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RefreshTokenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const RenewalListRelationFilterSchema: z.ZodType<Prisma.RenewalListRelationFilter> = z.object({
  every: z.lazy(() => RenewalWhereInputSchema).optional(),
  some: z.lazy(() => RenewalWhereInputSchema).optional(),
  none: z.lazy(() => RenewalWhereInputSchema).optional()
}).strict();

export const ReservationListRelationFilterSchema: z.ZodType<Prisma.ReservationListRelationFilter> = z.object({
  every: z.lazy(() => ReservationWhereInputSchema).optional(),
  some: z.lazy(() => ReservationWhereInputSchema).optional(),
  none: z.lazy(() => ReservationWhereInputSchema).optional()
}).strict();

export const MaintenanceListRelationFilterSchema: z.ZodType<Prisma.MaintenanceListRelationFilter> = z.object({
  every: z.lazy(() => MaintenanceWhereInputSchema).optional(),
  some: z.lazy(() => MaintenanceWhereInputSchema).optional(),
  none: z.lazy(() => MaintenanceWhereInputSchema).optional()
}).strict();

export const RenewalOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RenewalOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReservationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintenanceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MaintenanceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminCountOrderByAggregateInputSchema: z.ZodType<Prisma.AdminCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AdminAvgOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AdminMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminMinOrderByAggregateInputSchema: z.ZodType<Prisma.AdminMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminSumOrderByAggregateInputSchema: z.ZodType<Prisma.AdminSumOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const RefreshTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenSumOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentListRelationFilterSchema: z.ZodType<Prisma.StudentListRelationFilter> = z.object({
  every: z.lazy(() => StudentWhereInputSchema).optional(),
  some: z.lazy(() => StudentWhereInputSchema).optional(),
  none: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StudentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FacultyCountOrderByAggregateInputSchema: z.ZodType<Prisma.FacultyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FacultyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FacultyAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FacultyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FacultyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FacultyMinOrderByAggregateInputSchema: z.ZodType<Prisma.FacultyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FacultySumOrderByAggregateInputSchema: z.ZodType<Prisma.FacultySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumGenderFilterSchema: z.ZodType<Prisma.EnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const FacultyRelationFilterSchema: z.ZodType<Prisma.FacultyRelationFilter> = z.object({
  is: z.lazy(() => FacultyWhereInputSchema).optional(),
  isNot: z.lazy(() => FacultyWhereInputSchema).optional()
}).strict();

export const LodgmentRelationFilterSchema: z.ZodType<Prisma.LodgmentRelationFilter> = z.object({
  is: z.lazy(() => LodgmentWhereInputSchema).optional(),
  isNot: z.lazy(() => LodgmentWhereInputSchema).optional()
}).strict();

export const StudentCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  lodgmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAvgOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  lodgmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  lodgmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  lodgmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentSumOrderByAggregateInputSchema: z.ZodType<Prisma.StudentSumOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  lodgmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const EnumLodgmentStatusFilterSchema: z.ZodType<Prisma.EnumLodgmentStatusFilter> = z.object({
  equals: z.lazy(() => LodgmentStatusSchema).optional(),
  in: z.lazy(() => LodgmentStatusSchema).array().optional(),
  notIn: z.lazy(() => LodgmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => NestedEnumLodgmentStatusFilterSchema) ]).optional(),
}).strict();

export const BuildingRelationFilterSchema: z.ZodType<Prisma.BuildingRelationFilter> = z.object({
  is: z.lazy(() => BuildingWhereInputSchema).optional(),
  isNot: z.lazy(() => BuildingWhereInputSchema).optional()
}).strict();

export const LodgmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.LodgmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  roomNumber: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LodgmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LodgmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  roomNumber: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LodgmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LodgmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  roomNumber: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LodgmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.LodgmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  roomNumber: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LodgmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.LodgmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  capacity: z.lazy(() => SortOrderSchema).optional(),
  floor: z.lazy(() => SortOrderSchema).optional(),
  roomNumber: z.lazy(() => SortOrderSchema).optional(),
  buildingId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumLodgmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLodgmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LodgmentStatusSchema).optional(),
  in: z.lazy(() => LodgmentStatusSchema).array().optional(),
  notIn: z.lazy(() => LodgmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => NestedEnumLodgmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLodgmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLodgmentStatusFilterSchema).optional()
}).strict();

export const EnumReservationStatusFilterSchema: z.ZodType<Prisma.EnumReservationStatusFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusFilterSchema) ]).optional(),
}).strict();

export const AcademicSessionRelationFilterSchema: z.ZodType<Prisma.AcademicSessionRelationFilter> = z.object({
  is: z.lazy(() => AcademicSessionWhereInputSchema).optional(),
  isNot: z.lazy(() => AcademicSessionWhereInputSchema).optional()
}).strict();

export const AdminRelationFilterSchema: z.ZodType<Prisma.AdminRelationFilter> = z.object({
  is: z.lazy(() => AdminWhereInputSchema).optional(),
  isNot: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const ReservationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  NICUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  NICUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  NIC: z.lazy(() => SortOrderSchema).optional(),
  NICUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReservationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReservationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional()
}).strict();

export const EnumRenewalStatusFilterSchema: z.ZodType<Prisma.EnumRenewalStatusFilter> = z.object({
  equals: z.lazy(() => RenewalStatusSchema).optional(),
  in: z.lazy(() => RenewalStatusSchema).array().optional(),
  notIn: z.lazy(() => RenewalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => NestedEnumRenewalStatusFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StudentRelationFilterSchema: z.ZodType<Prisma.StudentRelationFilter> = z.object({
  is: z.lazy(() => StudentWhereInputSchema).optional(),
  isNot: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const FacultyNullableRelationFilterSchema: z.ZodType<Prisma.FacultyNullableRelationFilter> = z.object({
  is: z.lazy(() => FacultyWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FacultyWhereInputSchema).optional().nullable()
}).strict();

export const RenewalStudentIdAcademicSessionIdCompoundUniqueInputSchema: z.ZodType<Prisma.RenewalStudentIdAcademicSessionIdCompoundUniqueInput> = z.object({
  studentId: z.number(),
  academicSessionId: z.number()
}).strict();

export const RenewalCountOrderByAggregateInputSchema: z.ZodType<Prisma.RenewalCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  NICURL: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RenewalAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RenewalAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RenewalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RenewalMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  NICURL: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RenewalMinOrderByAggregateInputSchema: z.ZodType<Prisma.RenewalMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  emergencyNumber: z.lazy(() => SortOrderSchema).optional(),
  profileUrl: z.lazy(() => SortOrderSchema).optional(),
  schoolCertificateUrl: z.lazy(() => SortOrderSchema).optional(),
  NICURL: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RenewalSumOrderByAggregateInputSchema: z.ZodType<Prisma.RenewalSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  academicSessionId: z.lazy(() => SortOrderSchema).optional(),
  facultyId: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRenewalStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRenewalStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RenewalStatusSchema).optional(),
  in: z.lazy(() => RenewalStatusSchema).array().optional(),
  notIn: z.lazy(() => RenewalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => NestedEnumRenewalStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRenewalStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRenewalStatusFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumMaintenanceTypeFilterSchema: z.ZodType<Prisma.EnumMaintenanceTypeFilter> = z.object({
  equals: z.lazy(() => MaintenanceTypeSchema).optional(),
  in: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => NestedEnumMaintenanceTypeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumMaintenanceStatusFilterSchema: z.ZodType<Prisma.EnumMaintenanceStatusFilter> = z.object({
  equals: z.lazy(() => MaintenanceStatusSchema).optional(),
  in: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => NestedEnumMaintenanceStatusFilterSchema) ]).optional(),
}).strict();

export const MaintainerListRelationFilterSchema: z.ZodType<Prisma.MaintainerListRelationFilter> = z.object({
  every: z.lazy(() => MaintainerWhereInputSchema).optional(),
  some: z.lazy(() => MaintainerWhereInputSchema).optional(),
  none: z.lazy(() => MaintainerWhereInputSchema).optional()
}).strict();

export const MaintainerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MaintainerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintenanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.MaintenanceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintenanceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MaintenanceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintenanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MaintenanceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintenanceMinOrderByAggregateInputSchema: z.ZodType<Prisma.MaintenanceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintenanceSumOrderByAggregateInputSchema: z.ZodType<Prisma.MaintenanceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMaintenanceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMaintenanceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MaintenanceTypeSchema).optional(),
  in: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => NestedEnumMaintenanceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceTypeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumMaintenanceStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMaintenanceStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MaintenanceStatusSchema).optional(),
  in: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => NestedEnumMaintenanceStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceStatusFilterSchema).optional()
}).strict();

export const MaintainerCountOrderByAggregateInputSchema: z.ZodType<Prisma.MaintainerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintainerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MaintainerAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintainerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MaintainerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintainerMinOrderByAggregateInputSchema: z.ZodType<Prisma.MaintainerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MaintainerSumOrderByAggregateInputSchema: z.ZodType<Prisma.MaintainerSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AcademicSessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.AcademicSessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AcademicSessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AcademicSessionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AcademicSessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AcademicSessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AcademicSessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.AcademicSessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AcademicSessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.AcademicSessionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LodgmentListRelationFilterSchema: z.ZodType<Prisma.LodgmentListRelationFilter> = z.object({
  every: z.lazy(() => LodgmentWhereInputSchema).optional(),
  some: z.lazy(() => LodgmentWhereInputSchema).optional(),
  none: z.lazy(() => LodgmentWhereInputSchema).optional()
}).strict();

export const LodgmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LodgmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingCountOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  floors: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floors: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  floors: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingMinOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  floors: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BuildingSumOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  floors: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAnnouncementStatusFilterSchema: z.ZodType<Prisma.EnumAnnouncementStatusFilter> = z.object({
  equals: z.lazy(() => AnnouncementStatusSchema).optional(),
  in: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  notIn: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => NestedEnumAnnouncementStatusFilterSchema) ]).optional(),
}).strict();

export const AnnouncementCountOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnnouncementAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnnouncementMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnnouncementMinOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  illustrationUrl: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startAt: z.lazy(() => SortOrderSchema).optional(),
  endAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnnouncementSumOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAnnouncementStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAnnouncementStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AnnouncementStatusSchema).optional(),
  in: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  notIn: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => NestedEnumAnnouncementStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAnnouncementStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAnnouncementStatusFilterSchema).optional()
}).strict();

export const PasswordResetTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenCountOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenAvgOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMaxOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMinOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenSumOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenSumOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).optional()
}).strict();

export const AdminCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const StudentCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const RefreshTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetTokenUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).optional()
}).strict();

export const AdminUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AdminUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const StudentUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StudentUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const PasswordResetTokenUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PasswordResetTokenUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PasswordResetTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PasswordResetTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PasswordResetTokenUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const AdminUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const StudentUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PasswordResetTokenUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PasswordResetTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PasswordResetTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PasswordResetTokenUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const AdminUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const StudentUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RefreshTokenWhereUniqueInputSchema),z.lazy(() => RefreshTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAdminInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAdminInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RenewalCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.RenewalCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAdminInputSchema),z.lazy(() => RenewalCreateWithoutAdminInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ReservationCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateWithoutAdminInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MaintenanceCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RenewalUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAdminInputSchema),z.lazy(() => RenewalCreateWithoutAdminInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateWithoutAdminInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MaintenanceCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAdminNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAdminInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAdminInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAdminInputSchema),z.lazy(() => UserUpdateWithoutAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdminInputSchema) ]).optional(),
}).strict();

export const RenewalUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAdminInputSchema),z.lazy(() => RenewalCreateWithoutAdminInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.MaintenanceUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateWithoutAdminInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MaintenanceCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MaintenanceUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => MaintenanceUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MaintenanceScalarWhereInputSchema),z.lazy(() => MaintenanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAdminInputSchema),z.lazy(() => RenewalCreateWithoutAdminInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateWithoutAdminInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MaintenanceCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MaintenanceUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => MaintenanceUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MaintenanceScalarWhereInputSchema),z.lazy(() => MaintenanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRefreshTokensInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutRefreshTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRefreshTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRefreshTokensInputSchema),z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]).optional(),
}).strict();

export const StudentCreateNestedManyWithoutFacultyInputSchema: z.ZodType<Prisma.StudentCreateNestedManyWithoutFacultyInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutFacultyInputSchema),z.lazy(() => StudentCreateWithoutFacultyInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyFacultyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationCreateNestedManyWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationCreateNestedManyWithoutFacultyInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutFacultyInputSchema),z.lazy(() => ReservationCreateWithoutFacultyInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyFacultyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RenewalCreateNestedManyWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalCreateNestedManyWithoutFacultyInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutFacultyInputSchema),z.lazy(() => RenewalCreateWithoutFacultyInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyFacultyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentUncheckedCreateNestedManyWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUncheckedCreateNestedManyWithoutFacultyInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutFacultyInputSchema),z.lazy(() => StudentCreateWithoutFacultyInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyFacultyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedCreateNestedManyWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateNestedManyWithoutFacultyInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutFacultyInputSchema),z.lazy(() => ReservationCreateWithoutFacultyInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyFacultyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RenewalUncheckedCreateNestedManyWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateNestedManyWithoutFacultyInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutFacultyInputSchema),z.lazy(() => RenewalCreateWithoutFacultyInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyFacultyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentUpdateManyWithoutFacultyNestedInputSchema: z.ZodType<Prisma.StudentUpdateManyWithoutFacultyNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutFacultyInputSchema),z.lazy(() => StudentCreateWithoutFacultyInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentUpsertWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => StudentUpsertWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyFacultyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentUpdateWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => StudentUpdateWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentUpdateManyWithWhereWithoutFacultyInputSchema),z.lazy(() => StudentUpdateManyWithWhereWithoutFacultyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentScalarWhereInputSchema),z.lazy(() => StudentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationUpdateManyWithoutFacultyNestedInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithoutFacultyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutFacultyInputSchema),z.lazy(() => ReservationCreateWithoutFacultyInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyFacultyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutFacultyInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutFacultyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RenewalUpdateManyWithoutFacultyNestedInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithoutFacultyNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutFacultyInputSchema),z.lazy(() => RenewalCreateWithoutFacultyInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyFacultyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutFacultyInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutFacultyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentUncheckedUpdateManyWithoutFacultyNestedInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyWithoutFacultyNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutFacultyInputSchema),z.lazy(() => StudentCreateWithoutFacultyInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => StudentCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentUpsertWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => StudentUpsertWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyFacultyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentUpdateWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => StudentUpdateWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentUpdateManyWithWhereWithoutFacultyInputSchema),z.lazy(() => StudentUpdateManyWithWhereWithoutFacultyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentScalarWhereInputSchema),z.lazy(() => StudentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutFacultyNestedInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutFacultyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutFacultyInputSchema),z.lazy(() => ReservationCreateWithoutFacultyInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyFacultyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutFacultyInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutFacultyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutFacultyNestedInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutFacultyNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutFacultyInputSchema),z.lazy(() => RenewalCreateWithoutFacultyInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutFacultyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyFacultyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutFacultyInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutFacultyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutFacultyInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutFacultyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutStudentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FacultyCreateNestedOneWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyCreateNestedOneWithoutStudentsInput> = z.object({
  create: z.union([ z.lazy(() => FacultyCreateWithoutStudentsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FacultyCreateOrConnectWithoutStudentsInputSchema).optional(),
  connect: z.lazy(() => FacultyWhereUniqueInputSchema).optional()
}).strict();

export const RenewalCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.RenewalCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutStudentInputSchema),z.lazy(() => RenewalCreateWithoutStudentInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LodgmentCreateNestedOneWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentCreateNestedOneWithoutStudentsInput> = z.object({
  create: z.union([ z.lazy(() => LodgmentCreateWithoutStudentsInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LodgmentCreateOrConnectWithoutStudentsInputSchema).optional(),
  connect: z.lazy(() => LodgmentWhereUniqueInputSchema).optional()
}).strict();

export const RenewalUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutStudentInputSchema),z.lazy(() => RenewalCreateWithoutStudentInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenderSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutStudentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStudentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStudentInputSchema),z.lazy(() => UserUpdateWithoutStudentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStudentInputSchema) ]).optional(),
}).strict();

export const FacultyUpdateOneRequiredWithoutStudentsNestedInputSchema: z.ZodType<Prisma.FacultyUpdateOneRequiredWithoutStudentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FacultyCreateWithoutStudentsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FacultyCreateOrConnectWithoutStudentsInputSchema).optional(),
  upsert: z.lazy(() => FacultyUpsertWithoutStudentsInputSchema).optional(),
  connect: z.lazy(() => FacultyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FacultyUpdateToOneWithWhereWithoutStudentsInputSchema),z.lazy(() => FacultyUpdateWithoutStudentsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutStudentsInputSchema) ]).optional(),
}).strict();

export const RenewalUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutStudentInputSchema),z.lazy(() => RenewalCreateWithoutStudentInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LodgmentUpdateOneRequiredWithoutStudentsNestedInputSchema: z.ZodType<Prisma.LodgmentUpdateOneRequiredWithoutStudentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LodgmentCreateWithoutStudentsInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LodgmentCreateOrConnectWithoutStudentsInputSchema).optional(),
  upsert: z.lazy(() => LodgmentUpsertWithoutStudentsInputSchema).optional(),
  connect: z.lazy(() => LodgmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LodgmentUpdateToOneWithWhereWithoutStudentsInputSchema),z.lazy(() => LodgmentUpdateWithoutStudentsInputSchema),z.lazy(() => LodgmentUncheckedUpdateWithoutStudentsInputSchema) ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutStudentInputSchema),z.lazy(() => RenewalCreateWithoutStudentInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BuildingCreateNestedOneWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingCreateNestedOneWithoutLodgmentsInput> = z.object({
  create: z.union([ z.lazy(() => BuildingCreateWithoutLodgmentsInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLodgmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BuildingCreateOrConnectWithoutLodgmentsInputSchema).optional(),
  connect: z.lazy(() => BuildingWhereUniqueInputSchema).optional()
}).strict();

export const StudentCreateNestedManyWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentCreateNestedManyWithoutLodgmentInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutLodgmentInputSchema),z.lazy(() => StudentCreateWithoutLodgmentInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema),z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyLodgmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StudentUncheckedCreateNestedManyWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUncheckedCreateNestedManyWithoutLodgmentInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutLodgmentInputSchema),z.lazy(() => StudentCreateWithoutLodgmentInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema),z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyLodgmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumLodgmentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLodgmentStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => LodgmentStatusSchema).optional()
}).strict();

export const BuildingUpdateOneRequiredWithoutLodgmentsNestedInputSchema: z.ZodType<Prisma.BuildingUpdateOneRequiredWithoutLodgmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BuildingCreateWithoutLodgmentsInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLodgmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BuildingCreateOrConnectWithoutLodgmentsInputSchema).optional(),
  upsert: z.lazy(() => BuildingUpsertWithoutLodgmentsInputSchema).optional(),
  connect: z.lazy(() => BuildingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BuildingUpdateToOneWithWhereWithoutLodgmentsInputSchema),z.lazy(() => BuildingUpdateWithoutLodgmentsInputSchema),z.lazy(() => BuildingUncheckedUpdateWithoutLodgmentsInputSchema) ]).optional(),
}).strict();

export const StudentUpdateManyWithoutLodgmentNestedInputSchema: z.ZodType<Prisma.StudentUpdateManyWithoutLodgmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutLodgmentInputSchema),z.lazy(() => StudentCreateWithoutLodgmentInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema),z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentUpsertWithWhereUniqueWithoutLodgmentInputSchema),z.lazy(() => StudentUpsertWithWhereUniqueWithoutLodgmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyLodgmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentUpdateWithWhereUniqueWithoutLodgmentInputSchema),z.lazy(() => StudentUpdateWithWhereUniqueWithoutLodgmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentUpdateManyWithWhereWithoutLodgmentInputSchema),z.lazy(() => StudentUpdateManyWithWhereWithoutLodgmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentScalarWhereInputSchema),z.lazy(() => StudentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentUncheckedUpdateManyWithoutLodgmentNestedInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyWithoutLodgmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutLodgmentInputSchema),z.lazy(() => StudentCreateWithoutLodgmentInputSchema).array(),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema),z.lazy(() => StudentCreateOrConnectWithoutLodgmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentUpsertWithWhereUniqueWithoutLodgmentInputSchema),z.lazy(() => StudentUpsertWithWhereUniqueWithoutLodgmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentCreateManyLodgmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentWhereUniqueInputSchema),z.lazy(() => StudentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentUpdateWithWhereUniqueWithoutLodgmentInputSchema),z.lazy(() => StudentUpdateWithWhereUniqueWithoutLodgmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentUpdateManyWithWhereWithoutLodgmentInputSchema),z.lazy(() => StudentUpdateManyWithWhereWithoutLodgmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentScalarWhereInputSchema),z.lazy(() => StudentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FacultyCreateNestedOneWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyCreateNestedOneWithoutReservationsInput> = z.object({
  create: z.union([ z.lazy(() => FacultyCreateWithoutReservationsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FacultyCreateOrConnectWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => FacultyWhereUniqueInputSchema).optional()
}).strict();

export const AcademicSessionCreateNestedOneWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionCreateNestedOneWithoutReservationInput> = z.object({
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutReservationInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutReservationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AcademicSessionCreateOrConnectWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => AcademicSessionWhereUniqueInputSchema).optional()
}).strict();

export const AdminCreateNestedOneWithoutReservationsInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutReservationsInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const EnumReservationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReservationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReservationStatusSchema).optional()
}).strict();

export const FacultyUpdateOneRequiredWithoutReservationsNestedInputSchema: z.ZodType<Prisma.FacultyUpdateOneRequiredWithoutReservationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FacultyCreateWithoutReservationsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FacultyCreateOrConnectWithoutReservationsInputSchema).optional(),
  upsert: z.lazy(() => FacultyUpsertWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => FacultyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FacultyUpdateToOneWithWhereWithoutReservationsInputSchema),z.lazy(() => FacultyUpdateWithoutReservationsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutReservationsInputSchema) ]).optional(),
}).strict();

export const AcademicSessionUpdateOneRequiredWithoutReservationNestedInputSchema: z.ZodType<Prisma.AcademicSessionUpdateOneRequiredWithoutReservationNestedInput> = z.object({
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutReservationInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutReservationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AcademicSessionCreateOrConnectWithoutReservationInputSchema).optional(),
  upsert: z.lazy(() => AcademicSessionUpsertWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => AcademicSessionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AcademicSessionUpdateToOneWithWhereWithoutReservationInputSchema),z.lazy(() => AcademicSessionUpdateWithoutReservationInputSchema),z.lazy(() => AcademicSessionUncheckedUpdateWithoutReservationInputSchema) ]).optional(),
}).strict();

export const AdminUpdateOneRequiredWithoutReservationsNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutReservationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutReservationsInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutReservationsInputSchema),z.lazy(() => AdminUpdateWithoutReservationsInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutReservationsInputSchema) ]).optional(),
}).strict();

export const StudentCreateNestedOneWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutRenewalsInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutRenewalsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutRenewalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutRenewalsInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const AcademicSessionCreateNestedOneWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionCreateNestedOneWithoutRenewalInput> = z.object({
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutRenewalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AcademicSessionCreateOrConnectWithoutRenewalInputSchema).optional(),
  connect: z.lazy(() => AcademicSessionWhereUniqueInputSchema).optional()
}).strict();

export const FacultyCreateNestedOneWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyCreateNestedOneWithoutRenewalsInput> = z.object({
  create: z.union([ z.lazy(() => FacultyCreateWithoutRenewalsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutRenewalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FacultyCreateOrConnectWithoutRenewalsInputSchema).optional(),
  connect: z.lazy(() => FacultyWhereUniqueInputSchema).optional()
}).strict();

export const AdminCreateNestedOneWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutRenewalsInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutRenewalsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutRenewalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutRenewalsInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const EnumRenewalStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRenewalStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RenewalStatusSchema).optional()
}).strict();

export const StudentUpdateOneRequiredWithoutRenewalsNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneRequiredWithoutRenewalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutRenewalsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutRenewalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutRenewalsInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutRenewalsInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutRenewalsInputSchema),z.lazy(() => StudentUpdateWithoutRenewalsInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutRenewalsInputSchema) ]).optional(),
}).strict();

export const AcademicSessionUpdateOneRequiredWithoutRenewalNestedInputSchema: z.ZodType<Prisma.AcademicSessionUpdateOneRequiredWithoutRenewalNestedInput> = z.object({
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutRenewalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AcademicSessionCreateOrConnectWithoutRenewalInputSchema).optional(),
  upsert: z.lazy(() => AcademicSessionUpsertWithoutRenewalInputSchema).optional(),
  connect: z.lazy(() => AcademicSessionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AcademicSessionUpdateToOneWithWhereWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUpdateWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUncheckedUpdateWithoutRenewalInputSchema) ]).optional(),
}).strict();

export const FacultyUpdateOneWithoutRenewalsNestedInputSchema: z.ZodType<Prisma.FacultyUpdateOneWithoutRenewalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FacultyCreateWithoutRenewalsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutRenewalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FacultyCreateOrConnectWithoutRenewalsInputSchema).optional(),
  upsert: z.lazy(() => FacultyUpsertWithoutRenewalsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => FacultyWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => FacultyWhereInputSchema) ]).optional(),
  connect: z.lazy(() => FacultyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FacultyUpdateToOneWithWhereWithoutRenewalsInputSchema),z.lazy(() => FacultyUpdateWithoutRenewalsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutRenewalsInputSchema) ]).optional(),
}).strict();

export const AdminUpdateOneRequiredWithoutRenewalsNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutRenewalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutRenewalsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutRenewalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutRenewalsInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutRenewalsInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutRenewalsInputSchema),z.lazy(() => AdminUpdateWithoutRenewalsInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutRenewalsInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AdminCreateNestedOneWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutMaintenancesInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutMaintenancesInputSchema),z.lazy(() => AdminUncheckedCreateWithoutMaintenancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutMaintenancesInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const MaintainerCreateNestedManyWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerCreateNestedManyWithoutMaintenancesInput> = z.object({
  create: z.union([ z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema).array(),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MaintainerUncheckedCreateNestedManyWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUncheckedCreateNestedManyWithoutMaintenancesInput> = z.object({
  create: z.union([ z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema).array(),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumMaintenanceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMaintenanceTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MaintenanceTypeSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumMaintenanceStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMaintenanceStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MaintenanceStatusSchema).optional()
}).strict();

export const AdminUpdateOneRequiredWithoutMaintenancesNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutMaintenancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutMaintenancesInputSchema),z.lazy(() => AdminUncheckedCreateWithoutMaintenancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutMaintenancesInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutMaintenancesInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutMaintenancesInputSchema),z.lazy(() => AdminUpdateWithoutMaintenancesInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutMaintenancesInputSchema) ]).optional(),
}).strict();

export const MaintainerUpdateManyWithoutMaintenancesNestedInputSchema: z.ZodType<Prisma.MaintainerUpdateManyWithoutMaintenancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema).array(),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MaintainerUpsertWithWhereUniqueWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUpsertWithWhereUniqueWithoutMaintenancesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MaintainerUpdateWithWhereUniqueWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUpdateWithWhereUniqueWithoutMaintenancesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MaintainerUpdateManyWithWhereWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUpdateManyWithWhereWithoutMaintenancesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MaintainerScalarWhereInputSchema),z.lazy(() => MaintainerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MaintainerUncheckedUpdateManyWithoutMaintenancesNestedInputSchema: z.ZodType<Prisma.MaintainerUncheckedUpdateManyWithoutMaintenancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema).array(),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema),z.lazy(() => MaintainerCreateOrConnectWithoutMaintenancesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MaintainerUpsertWithWhereUniqueWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUpsertWithWhereUniqueWithoutMaintenancesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintainerWhereUniqueInputSchema),z.lazy(() => MaintainerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MaintainerUpdateWithWhereUniqueWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUpdateWithWhereUniqueWithoutMaintenancesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MaintainerUpdateManyWithWhereWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUpdateManyWithWhereWithoutMaintenancesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MaintainerScalarWhereInputSchema),z.lazy(() => MaintainerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceCreateNestedManyWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceCreateNestedManyWithoutMaintainersInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceUncheckedCreateNestedManyWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUncheckedCreateNestedManyWithoutMaintainersInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceUpdateManyWithoutMaintainersNestedInputSchema: z.ZodType<Prisma.MaintenanceUpdateManyWithoutMaintainersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutMaintainersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutMaintainersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MaintenanceUpdateManyWithWhereWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUpdateManyWithWhereWithoutMaintainersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MaintenanceScalarWhereInputSchema),z.lazy(() => MaintenanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MaintenanceUncheckedUpdateManyWithoutMaintainersNestedInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateManyWithoutMaintainersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema).array(),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema),z.lazy(() => MaintenanceCreateOrConnectWithoutMaintainersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUpsertWithWhereUniqueWithoutMaintainersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MaintenanceWhereUniqueInputSchema),z.lazy(() => MaintenanceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUpdateWithWhereUniqueWithoutMaintainersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MaintenanceUpdateManyWithWhereWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUpdateManyWithWhereWithoutMaintainersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MaintenanceScalarWhereInputSchema),z.lazy(() => MaintenanceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationCreateNestedManyWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationCreateNestedManyWithoutAcademicSessionInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RenewalCreateNestedManyWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalCreateNestedManyWithoutAcademicSessionInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedCreateNestedManyWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateNestedManyWithoutAcademicSessionInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RenewalUncheckedCreateNestedManyWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateNestedManyWithoutAcademicSessionInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationUpdateManyWithoutAcademicSessionNestedInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithoutAcademicSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutAcademicSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RenewalUpdateManyWithoutAcademicSessionNestedInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithoutAcademicSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutAcademicSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutAcademicSessionNestedInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutAcademicSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutAcademicSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutAcademicSessionNestedInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutAcademicSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema).array(),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema),z.lazy(() => RenewalCreateOrConnectWithoutAcademicSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUpsertWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RenewalCreateManyAcademicSessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RenewalWhereUniqueInputSchema),z.lazy(() => RenewalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUpdateWithWhereUniqueWithoutAcademicSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RenewalUpdateManyWithWhereWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUpdateManyWithWhereWithoutAcademicSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LodgmentCreateNestedManyWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentCreateNestedManyWithoutBuildingInput> = z.object({
  create: z.union([ z.lazy(() => LodgmentCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateWithoutBuildingInputSchema).array(),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LodgmentCreateManyBuildingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LodgmentUncheckedCreateNestedManyWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUncheckedCreateNestedManyWithoutBuildingInput> = z.object({
  create: z.union([ z.lazy(() => LodgmentCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateWithoutBuildingInputSchema).array(),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LodgmentCreateManyBuildingInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LodgmentUpdateManyWithoutBuildingNestedInputSchema: z.ZodType<Prisma.LodgmentUpdateManyWithoutBuildingNestedInput> = z.object({
  create: z.union([ z.lazy(() => LodgmentCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateWithoutBuildingInputSchema).array(),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LodgmentUpsertWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LodgmentUpsertWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LodgmentCreateManyBuildingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LodgmentUpdateWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LodgmentUpdateWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LodgmentUpdateManyWithWhereWithoutBuildingInputSchema),z.lazy(() => LodgmentUpdateManyWithWhereWithoutBuildingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LodgmentScalarWhereInputSchema),z.lazy(() => LodgmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LodgmentUncheckedUpdateManyWithoutBuildingNestedInputSchema: z.ZodType<Prisma.LodgmentUncheckedUpdateManyWithoutBuildingNestedInput> = z.object({
  create: z.union([ z.lazy(() => LodgmentCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateWithoutBuildingInputSchema).array(),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema),z.lazy(() => LodgmentCreateOrConnectWithoutBuildingInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LodgmentUpsertWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LodgmentUpsertWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LodgmentCreateManyBuildingInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LodgmentWhereUniqueInputSchema),z.lazy(() => LodgmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LodgmentUpdateWithWhereUniqueWithoutBuildingInputSchema),z.lazy(() => LodgmentUpdateWithWhereUniqueWithoutBuildingInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LodgmentUpdateManyWithWhereWithoutBuildingInputSchema),z.lazy(() => LodgmentUpdateManyWithWhereWithoutBuildingInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LodgmentScalarWhereInputSchema),z.lazy(() => LodgmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EnumAnnouncementStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAnnouncementStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AnnouncementStatusSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordResetTokenInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPasswordResetTokenNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasswordResetTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokenInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPasswordResetTokenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUpdateWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokenInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedEnumGenderFilterSchema: z.ZodType<Prisma.NestedEnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const NestedEnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const NestedEnumLodgmentStatusFilterSchema: z.ZodType<Prisma.NestedEnumLodgmentStatusFilter> = z.object({
  equals: z.lazy(() => LodgmentStatusSchema).optional(),
  in: z.lazy(() => LodgmentStatusSchema).array().optional(),
  notIn: z.lazy(() => LodgmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => NestedEnumLodgmentStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumLodgmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLodgmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LodgmentStatusSchema).optional(),
  in: z.lazy(() => LodgmentStatusSchema).array().optional(),
  notIn: z.lazy(() => LodgmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => NestedEnumLodgmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLodgmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLodgmentStatusFilterSchema).optional()
}).strict();

export const NestedEnumReservationStatusFilterSchema: z.ZodType<Prisma.NestedEnumReservationStatusFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReservationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReservationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional()
}).strict();

export const NestedEnumRenewalStatusFilterSchema: z.ZodType<Prisma.NestedEnumRenewalStatusFilter> = z.object({
  equals: z.lazy(() => RenewalStatusSchema).optional(),
  in: z.lazy(() => RenewalStatusSchema).array().optional(),
  notIn: z.lazy(() => RenewalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => NestedEnumRenewalStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRenewalStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRenewalStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RenewalStatusSchema).optional(),
  in: z.lazy(() => RenewalStatusSchema).array().optional(),
  notIn: z.lazy(() => RenewalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => NestedEnumRenewalStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRenewalStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRenewalStatusFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumMaintenanceTypeFilterSchema: z.ZodType<Prisma.NestedEnumMaintenanceTypeFilter> = z.object({
  equals: z.lazy(() => MaintenanceTypeSchema).optional(),
  in: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => NestedEnumMaintenanceTypeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumMaintenanceStatusFilterSchema: z.ZodType<Prisma.NestedEnumMaintenanceStatusFilter> = z.object({
  equals: z.lazy(() => MaintenanceStatusSchema).optional(),
  in: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => NestedEnumMaintenanceStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumMaintenanceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMaintenanceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MaintenanceTypeSchema).optional(),
  in: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => NestedEnumMaintenanceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceTypeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedEnumMaintenanceStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMaintenanceStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MaintenanceStatusSchema).optional(),
  in: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  notIn: z.lazy(() => MaintenanceStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => NestedEnumMaintenanceStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceStatusFilterSchema).optional()
}).strict();

export const NestedEnumAnnouncementStatusFilterSchema: z.ZodType<Prisma.NestedEnumAnnouncementStatusFilter> = z.object({
  equals: z.lazy(() => AnnouncementStatusSchema).optional(),
  in: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  notIn: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => NestedEnumAnnouncementStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAnnouncementStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAnnouncementStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AnnouncementStatusSchema).optional(),
  in: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  notIn: z.lazy(() => AnnouncementStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AnnouncementStatusSchema),z.lazy(() => NestedEnumAnnouncementStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAnnouncementStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAnnouncementStatusFilterSchema).optional()
}).strict();

export const PasswordResetTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateWithoutUserInput> = z.object({
  token: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const PasswordResetTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateWithoutUserInput> = z.object({
  token: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const PasswordResetTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AdminCreateWithoutUserInputSchema: z.ZodType<Prisma.AdminCreateWithoutUserInput> = z.object({
  role: z.lazy(() => RoleSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutAdminInputSchema).optional(),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutUserInput> = z.object({
  role: z.lazy(() => RoleSchema),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const StudentCreateWithoutUserInputSchema: z.ZodType<Prisma.StudentCreateWithoutUserInput> = z.object({
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  faculty: z.lazy(() => FacultyCreateNestedOneWithoutStudentsInputSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutStudentInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentCreateNestedOneWithoutStudentsInputSchema)
}).strict();

export const StudentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutUserInput> = z.object({
  facultyId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int(),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateWithoutUserInput> = z.object({
  token: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RefreshTokenCreateManyUserInputSchema),z.lazy(() => RefreshTokenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PasswordResetTokenUpsertWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => PasswordResetTokenWhereInputSchema).optional()
}).strict();

export const PasswordResetTokenUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PasswordResetTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUpsertWithoutUserInputSchema: z.ZodType<Prisma.AdminUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutUserInputSchema),z.lazy(() => AdminUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutUserInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AdminUpdateWithoutUserInputSchema: z.ZodType<Prisma.AdminUpdateWithoutUserInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutAdminNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutUserInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const StudentUpsertWithoutUserInputSchema: z.ZodType<Prisma.StudentUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutUserInputSchema),z.lazy(() => StudentUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutUserInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const StudentUpdateWithoutUserInputSchema: z.ZodType<Prisma.StudentUpdateWithoutUserInput> = z.object({
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  faculty: z.lazy(() => FacultyUpdateOneRequiredWithoutStudentsNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutStudentNestedInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentUpdateOneRequiredWithoutStudentsNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutUserInput> = z.object({
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const RefreshTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RefreshTokenUpdateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RefreshTokenUpdateWithoutUserInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RefreshTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RefreshTokenUpdateManyMutationInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RefreshTokenScalarWhereInputSchema: z.ZodType<Prisma.RefreshTokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenScalarWhereInputSchema),z.lazy(() => RefreshTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutAdminInputSchema: z.ZodType<Prisma.UserCreateWithoutAdminInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAdminInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const RenewalCreateWithoutAdminInputSchema: z.ZodType<Prisma.RenewalCreateWithoutAdminInput> = z.object({
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutRenewalsInputSchema),
  academicSession: z.lazy(() => AcademicSessionCreateNestedOneWithoutRenewalInputSchema),
  Faculty: z.lazy(() => FacultyCreateNestedOneWithoutRenewalsInputSchema).optional()
}).strict();

export const RenewalUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateWithoutAdminInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable()
}).strict();

export const RenewalCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.RenewalCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RenewalCreateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const RenewalCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.RenewalCreateManyAdminInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RenewalCreateManyAdminInputSchema),z.lazy(() => RenewalCreateManyAdminInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReservationCreateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationCreateWithoutAdminInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  status: z.lazy(() => ReservationStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  faculty: z.lazy(() => FacultyCreateNestedOneWithoutReservationsInputSchema),
  academicSession: z.lazy(() => AcademicSessionCreateNestedOneWithoutReservationInputSchema)
}).strict();

export const ReservationUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateWithoutAdminInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  status: z.lazy(() => ReservationStatusSchema),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReservationCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.ReservationCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ReservationCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.ReservationCreateManyAdminInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReservationCreateManyAdminInputSchema),z.lazy(() => ReservationCreateManyAdminInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MaintenanceCreateWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceCreateWithoutAdminInput> = z.object({
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  maintainers: z.lazy(() => MaintainerCreateNestedManyWithoutMaintenancesInputSchema).optional()
}).strict();

export const MaintenanceUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUncheckedCreateWithoutAdminInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  maintainers: z.lazy(() => MaintainerUncheckedCreateNestedManyWithoutMaintenancesInputSchema).optional()
}).strict();

export const MaintenanceCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const MaintenanceCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.MaintenanceCreateManyAdminInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MaintenanceCreateManyAdminInputSchema),z.lazy(() => MaintenanceCreateManyAdminInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutAdminInputSchema: z.ZodType<Prisma.UserUpsertWithoutAdminInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAdminInputSchema),z.lazy(() => UserUncheckedCreateWithoutAdminInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAdminInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const UserUpdateWithoutAdminInputSchema: z.ZodType<Prisma.UserUpdateWithoutAdminInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RenewalUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RenewalUpdateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => RenewalCreateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const RenewalUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateWithoutAdminInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const RenewalUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => RenewalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateManyMutationInputSchema),z.lazy(() => RenewalUncheckedUpdateManyWithoutAdminInputSchema) ]),
}).strict();

export const RenewalScalarWhereInputSchema: z.ZodType<Prisma.RenewalScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RenewalScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RenewalScalarWhereInputSchema),z.lazy(() => RenewalScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NICURL: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumRenewalStatusFilterSchema),z.lazy(() => RenewalStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ReservationUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReservationUpdateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ReservationUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const ReservationUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateManyMutationInputSchema),z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminInputSchema) ]),
}).strict();

export const ReservationScalarWhereInputSchema: z.ZodType<Prisma.ReservationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NICUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schoolCertificateUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  academicSessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const MaintenanceUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MaintenanceUpdateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const MaintenanceUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MaintenanceUpdateWithoutAdminInputSchema),z.lazy(() => MaintenanceUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const MaintenanceUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => MaintenanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MaintenanceUpdateManyMutationInputSchema),z.lazy(() => MaintenanceUncheckedUpdateManyWithoutAdminInputSchema) ]),
}).strict();

export const MaintenanceScalarWhereInputSchema: z.ZodType<Prisma.MaintenanceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MaintenanceScalarWhereInputSchema),z.lazy(() => MaintenanceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintenanceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintenanceScalarWhereInputSchema),z.lazy(() => MaintenanceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumMaintenanceTypeFilterSchema),z.lazy(() => MaintenanceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMaintenanceStatusFilterSchema),z.lazy(() => MaintenanceStatusSchema) ]).optional(),
  adminId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutRefreshTokensInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenCreateNestedOneWithoutUserInputSchema).optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRefreshTokensInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]),
}).strict();

export const UserUpsertWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutRefreshTokensInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]),
}).strict();

export const UserUpdateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutRefreshTokensInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUpdateOneWithoutUserNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRefreshTokensInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const StudentCreateWithoutFacultyInputSchema: z.ZodType<Prisma.StudentCreateWithoutFacultyInput> = z.object({
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutStudentInputSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutStudentInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentCreateNestedOneWithoutStudentsInputSchema)
}).strict();

export const StudentUncheckedCreateWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutFacultyInput> = z.object({
  userId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int(),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutFacultyInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutFacultyInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema) ]),
}).strict();

export const StudentCreateManyFacultyInputEnvelopeSchema: z.ZodType<Prisma.StudentCreateManyFacultyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StudentCreateManyFacultyInputSchema),z.lazy(() => StudentCreateManyFacultyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReservationCreateWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationCreateWithoutFacultyInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  status: z.lazy(() => ReservationStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  academicSession: z.lazy(() => AcademicSessionCreateNestedOneWithoutReservationInputSchema),
  admin: z.lazy(() => AdminCreateNestedOneWithoutReservationsInputSchema)
}).strict();

export const ReservationUncheckedCreateWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateWithoutFacultyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  status: z.lazy(() => ReservationStatusSchema),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const ReservationCreateOrConnectWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationCreateOrConnectWithoutFacultyInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationCreateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema) ]),
}).strict();

export const ReservationCreateManyFacultyInputEnvelopeSchema: z.ZodType<Prisma.ReservationCreateManyFacultyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReservationCreateManyFacultyInputSchema),z.lazy(() => ReservationCreateManyFacultyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RenewalCreateWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalCreateWithoutFacultyInput> = z.object({
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutRenewalsInputSchema),
  academicSession: z.lazy(() => AcademicSessionCreateNestedOneWithoutRenewalInputSchema),
  admin: z.lazy(() => AdminCreateNestedOneWithoutRenewalsInputSchema)
}).strict();

export const RenewalUncheckedCreateWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateWithoutFacultyInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const RenewalCreateOrConnectWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalCreateOrConnectWithoutFacultyInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RenewalCreateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema) ]),
}).strict();

export const RenewalCreateManyFacultyInputEnvelopeSchema: z.ZodType<Prisma.RenewalCreateManyFacultyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RenewalCreateManyFacultyInputSchema),z.lazy(() => RenewalCreateManyFacultyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StudentUpsertWithWhereUniqueWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUpsertWithWhereUniqueWithoutFacultyInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentUpdateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutFacultyInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedCreateWithoutFacultyInputSchema) ]),
}).strict();

export const StudentUpdateWithWhereUniqueWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUpdateWithWhereUniqueWithoutFacultyInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentUpdateWithoutFacultyInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutFacultyInputSchema) ]),
}).strict();

export const StudentUpdateManyWithWhereWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUpdateManyWithWhereWithoutFacultyInput> = z.object({
  where: z.lazy(() => StudentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentUpdateManyMutationInputSchema),z.lazy(() => StudentUncheckedUpdateManyWithoutFacultyInputSchema) ]),
}).strict();

export const StudentScalarWhereInputSchema: z.ZodType<Prisma.StudentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentScalarWhereInputSchema),z.lazy(() => StudentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentScalarWhereInputSchema),z.lazy(() => StudentScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  facultyId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emergencyNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  NIC: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lodgmentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ReservationUpsertWithWhereUniqueWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUpsertWithWhereUniqueWithoutFacultyInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReservationUpdateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutFacultyInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationCreateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutFacultyInputSchema) ]),
}).strict();

export const ReservationUpdateWithWhereUniqueWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUpdateWithWhereUniqueWithoutFacultyInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateWithoutFacultyInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutFacultyInputSchema) ]),
}).strict();

export const ReservationUpdateManyWithWhereWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithWhereWithoutFacultyInput> = z.object({
  where: z.lazy(() => ReservationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateManyMutationInputSchema),z.lazy(() => ReservationUncheckedUpdateManyWithoutFacultyInputSchema) ]),
}).strict();

export const RenewalUpsertWithWhereUniqueWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUpsertWithWhereUniqueWithoutFacultyInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RenewalUpdateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutFacultyInputSchema) ]),
  create: z.union([ z.lazy(() => RenewalCreateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutFacultyInputSchema) ]),
}).strict();

export const RenewalUpdateWithWhereUniqueWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUpdateWithWhereUniqueWithoutFacultyInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateWithoutFacultyInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutFacultyInputSchema) ]),
}).strict();

export const RenewalUpdateManyWithWhereWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithWhereWithoutFacultyInput> = z.object({
  where: z.lazy(() => RenewalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateManyMutationInputSchema),z.lazy(() => RenewalUncheckedUpdateManyWithoutFacultyInputSchema) ]),
}).strict();

export const UserCreateWithoutStudentInputSchema: z.ZodType<Prisma.UserCreateWithoutStudentInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenCreateNestedOneWithoutUserInputSchema).optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStudentInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const FacultyCreateWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyCreateWithoutStudentsInput> = z.object({
  name: z.string(),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutFacultyInputSchema).optional(),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyUncheckedCreateWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyUncheckedCreateWithoutStudentsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutFacultyInputSchema).optional(),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyCreateOrConnectWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyCreateOrConnectWithoutStudentsInput> = z.object({
  where: z.lazy(() => FacultyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FacultyCreateWithoutStudentsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutStudentsInputSchema) ]),
}).strict();

export const RenewalCreateWithoutStudentInputSchema: z.ZodType<Prisma.RenewalCreateWithoutStudentInput> = z.object({
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  academicSession: z.lazy(() => AcademicSessionCreateNestedOneWithoutRenewalInputSchema),
  Faculty: z.lazy(() => FacultyCreateNestedOneWithoutRenewalsInputSchema).optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutRenewalsInputSchema)
}).strict();

export const RenewalUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateWithoutStudentInput> = z.object({
  id: z.number().int().optional(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable(),
  adminId: z.number().int()
}).strict();

export const RenewalCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.RenewalCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RenewalCreateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const RenewalCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.RenewalCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RenewalCreateManyStudentInputSchema),z.lazy(() => RenewalCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LodgmentCreateWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentCreateWithoutStudentsInput> = z.object({
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema),
  building: z.lazy(() => BuildingCreateNestedOneWithoutLodgmentsInputSchema)
}).strict();

export const LodgmentUncheckedCreateWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentUncheckedCreateWithoutStudentsInput> = z.object({
  id: z.number().int().optional(),
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  buildingId: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema)
}).strict();

export const LodgmentCreateOrConnectWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentCreateOrConnectWithoutStudentsInput> = z.object({
  where: z.lazy(() => LodgmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LodgmentCreateWithoutStudentsInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutStudentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutStudentInputSchema: z.ZodType<Prisma.UserUpsertWithoutStudentInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutStudentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentInputSchema),z.lazy(() => UserUncheckedCreateWithoutStudentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStudentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const UserUpdateWithoutStudentInputSchema: z.ZodType<Prisma.UserUpdateWithoutStudentInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUpdateOneWithoutUserNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordResetToken: z.lazy(() => PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FacultyUpsertWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyUpsertWithoutStudentsInput> = z.object({
  update: z.union([ z.lazy(() => FacultyUpdateWithoutStudentsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutStudentsInputSchema) ]),
  create: z.union([ z.lazy(() => FacultyCreateWithoutStudentsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutStudentsInputSchema) ]),
  where: z.lazy(() => FacultyWhereInputSchema).optional()
}).strict();

export const FacultyUpdateToOneWithWhereWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyUpdateToOneWithWhereWithoutStudentsInput> = z.object({
  where: z.lazy(() => FacultyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FacultyUpdateWithoutStudentsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutStudentsInputSchema) ]),
}).strict();

export const FacultyUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyUpdateWithoutStudentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutFacultyNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const FacultyUncheckedUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.FacultyUncheckedUpdateWithoutStudentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const RenewalUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RenewalUpdateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => RenewalCreateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const RenewalUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateWithoutStudentInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const RenewalUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => RenewalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateManyMutationInputSchema),z.lazy(() => RenewalUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const LodgmentUpsertWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentUpsertWithoutStudentsInput> = z.object({
  update: z.union([ z.lazy(() => LodgmentUpdateWithoutStudentsInputSchema),z.lazy(() => LodgmentUncheckedUpdateWithoutStudentsInputSchema) ]),
  create: z.union([ z.lazy(() => LodgmentCreateWithoutStudentsInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutStudentsInputSchema) ]),
  where: z.lazy(() => LodgmentWhereInputSchema).optional()
}).strict();

export const LodgmentUpdateToOneWithWhereWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentUpdateToOneWithWhereWithoutStudentsInput> = z.object({
  where: z.lazy(() => LodgmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LodgmentUpdateWithoutStudentsInputSchema),z.lazy(() => LodgmentUncheckedUpdateWithoutStudentsInputSchema) ]),
}).strict();

export const LodgmentUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentUpdateWithoutStudentsInput> = z.object({
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  building: z.lazy(() => BuildingUpdateOneRequiredWithoutLodgmentsNestedInputSchema).optional()
}).strict();

export const LodgmentUncheckedUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.LodgmentUncheckedUpdateWithoutStudentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  buildingId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildingCreateWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingCreateWithoutLodgmentsInput> = z.object({
  name: z.string(),
  floors: z.number().int(),
  illustrationUrl: z.string()
}).strict();

export const BuildingUncheckedCreateWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateWithoutLodgmentsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  floors: z.number().int(),
  illustrationUrl: z.string()
}).strict();

export const BuildingCreateOrConnectWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingCreateOrConnectWithoutLodgmentsInput> = z.object({
  where: z.lazy(() => BuildingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BuildingCreateWithoutLodgmentsInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLodgmentsInputSchema) ]),
}).strict();

export const StudentCreateWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentCreateWithoutLodgmentInput> = z.object({
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutStudentInputSchema),
  faculty: z.lazy(() => FacultyCreateNestedOneWithoutStudentsInputSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutLodgmentInput> = z.object({
  userId: z.number().int(),
  facultyId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutLodgmentInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema) ]),
}).strict();

export const StudentCreateManyLodgmentInputEnvelopeSchema: z.ZodType<Prisma.StudentCreateManyLodgmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StudentCreateManyLodgmentInputSchema),z.lazy(() => StudentCreateManyLodgmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BuildingUpsertWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingUpsertWithoutLodgmentsInput> = z.object({
  update: z.union([ z.lazy(() => BuildingUpdateWithoutLodgmentsInputSchema),z.lazy(() => BuildingUncheckedUpdateWithoutLodgmentsInputSchema) ]),
  create: z.union([ z.lazy(() => BuildingCreateWithoutLodgmentsInputSchema),z.lazy(() => BuildingUncheckedCreateWithoutLodgmentsInputSchema) ]),
  where: z.lazy(() => BuildingWhereInputSchema).optional()
}).strict();

export const BuildingUpdateToOneWithWhereWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingUpdateToOneWithWhereWithoutLodgmentsInput> = z.object({
  where: z.lazy(() => BuildingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BuildingUpdateWithoutLodgmentsInputSchema),z.lazy(() => BuildingUncheckedUpdateWithoutLodgmentsInputSchema) ]),
}).strict();

export const BuildingUpdateWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingUpdateWithoutLodgmentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  floors: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BuildingUncheckedUpdateWithoutLodgmentsInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateWithoutLodgmentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  floors: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  illustrationUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentUpsertWithWhereUniqueWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUpsertWithWhereUniqueWithoutLodgmentInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentUpdateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutLodgmentInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutLodgmentInputSchema) ]),
}).strict();

export const StudentUpdateWithWhereUniqueWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUpdateWithWhereUniqueWithoutLodgmentInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentUpdateWithoutLodgmentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutLodgmentInputSchema) ]),
}).strict();

export const StudentUpdateManyWithWhereWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUpdateManyWithWhereWithoutLodgmentInput> = z.object({
  where: z.lazy(() => StudentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentUpdateManyMutationInputSchema),z.lazy(() => StudentUncheckedUpdateManyWithoutLodgmentInputSchema) ]),
}).strict();

export const FacultyCreateWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyCreateWithoutReservationsInput> = z.object({
  name: z.string(),
  students: z.lazy(() => StudentCreateNestedManyWithoutFacultyInputSchema).optional(),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyUncheckedCreateWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyUncheckedCreateWithoutReservationsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  students: z.lazy(() => StudentUncheckedCreateNestedManyWithoutFacultyInputSchema).optional(),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyCreateOrConnectWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyCreateOrConnectWithoutReservationsInput> = z.object({
  where: z.lazy(() => FacultyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FacultyCreateWithoutReservationsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutReservationsInputSchema) ]),
}).strict();

export const AcademicSessionCreateWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionCreateWithoutReservationInput> = z.object({
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional().nullable(),
  Renewal: z.lazy(() => RenewalCreateNestedManyWithoutAcademicSessionInputSchema).optional()
}).strict();

export const AcademicSessionUncheckedCreateWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionUncheckedCreateWithoutReservationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional().nullable(),
  Renewal: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutAcademicSessionInputSchema).optional()
}).strict();

export const AcademicSessionCreateOrConnectWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionCreateOrConnectWithoutReservationInput> = z.object({
  where: z.lazy(() => AcademicSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutReservationInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutReservationInputSchema) ]),
}).strict();

export const AdminCreateWithoutReservationsInputSchema: z.ZodType<Prisma.AdminCreateWithoutReservationsInput> = z.object({
  role: z.lazy(() => RoleSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAdminInputSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutReservationsInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutReservationsInput> = z.object({
  userId: z.number().int(),
  role: z.lazy(() => RoleSchema),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutReservationsInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutReservationsInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationsInputSchema) ]),
}).strict();

export const FacultyUpsertWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyUpsertWithoutReservationsInput> = z.object({
  update: z.union([ z.lazy(() => FacultyUpdateWithoutReservationsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutReservationsInputSchema) ]),
  create: z.union([ z.lazy(() => FacultyCreateWithoutReservationsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutReservationsInputSchema) ]),
  where: z.lazy(() => FacultyWhereInputSchema).optional()
}).strict();

export const FacultyUpdateToOneWithWhereWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyUpdateToOneWithWhereWithoutReservationsInput> = z.object({
  where: z.lazy(() => FacultyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FacultyUpdateWithoutReservationsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutReservationsInputSchema) ]),
}).strict();

export const FacultyUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyUpdateWithoutReservationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUpdateManyWithoutFacultyNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const FacultyUncheckedUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.FacultyUncheckedUpdateWithoutReservationsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const AcademicSessionUpsertWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionUpsertWithoutReservationInput> = z.object({
  update: z.union([ z.lazy(() => AcademicSessionUpdateWithoutReservationInputSchema),z.lazy(() => AcademicSessionUncheckedUpdateWithoutReservationInputSchema) ]),
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutReservationInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutReservationInputSchema) ]),
  where: z.lazy(() => AcademicSessionWhereInputSchema).optional()
}).strict();

export const AcademicSessionUpdateToOneWithWhereWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionUpdateToOneWithWhereWithoutReservationInput> = z.object({
  where: z.lazy(() => AcademicSessionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AcademicSessionUpdateWithoutReservationInputSchema),z.lazy(() => AcademicSessionUncheckedUpdateWithoutReservationInputSchema) ]),
}).strict();

export const AcademicSessionUpdateWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionUpdateWithoutReservationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Renewal: z.lazy(() => RenewalUpdateManyWithoutAcademicSessionNestedInputSchema).optional()
}).strict();

export const AcademicSessionUncheckedUpdateWithoutReservationInputSchema: z.ZodType<Prisma.AcademicSessionUncheckedUpdateWithoutReservationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Renewal: z.lazy(() => RenewalUncheckedUpdateManyWithoutAcademicSessionNestedInputSchema).optional()
}).strict();

export const AdminUpsertWithoutReservationsInputSchema: z.ZodType<Prisma.AdminUpsertWithoutReservationsInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutReservationsInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutReservationsInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationsInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutReservationsInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutReservationsInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutReservationsInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutReservationsInputSchema) ]),
}).strict();

export const AdminUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.AdminUpdateWithoutReservationsInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAdminNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutReservationsInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const StudentCreateWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentCreateWithoutRenewalsInput> = z.object({
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutStudentInputSchema),
  faculty: z.lazy(() => FacultyCreateNestedOneWithoutStudentsInputSchema),
  lodgment: z.lazy(() => LodgmentCreateNestedOneWithoutStudentsInputSchema)
}).strict();

export const StudentUncheckedCreateWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutRenewalsInput> = z.object({
  userId: z.number().int(),
  facultyId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int()
}).strict();

export const StudentCreateOrConnectWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutRenewalsInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutRenewalsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutRenewalsInputSchema) ]),
}).strict();

export const AcademicSessionCreateWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionCreateWithoutRenewalInput> = z.object({
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional().nullable(),
  Reservation: z.lazy(() => ReservationCreateNestedManyWithoutAcademicSessionInputSchema).optional()
}).strict();

export const AcademicSessionUncheckedCreateWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionUncheckedCreateWithoutRenewalInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional().nullable(),
  Reservation: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAcademicSessionInputSchema).optional()
}).strict();

export const AcademicSessionCreateOrConnectWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionCreateOrConnectWithoutRenewalInput> = z.object({
  where: z.lazy(() => AcademicSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutRenewalInputSchema) ]),
}).strict();

export const FacultyCreateWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyCreateWithoutRenewalsInput> = z.object({
  name: z.string(),
  students: z.lazy(() => StudentCreateNestedManyWithoutFacultyInputSchema).optional(),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyUncheckedCreateWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyUncheckedCreateWithoutRenewalsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  students: z.lazy(() => StudentUncheckedCreateNestedManyWithoutFacultyInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutFacultyInputSchema).optional()
}).strict();

export const FacultyCreateOrConnectWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyCreateOrConnectWithoutRenewalsInput> = z.object({
  where: z.lazy(() => FacultyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FacultyCreateWithoutRenewalsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutRenewalsInputSchema) ]),
}).strict();

export const AdminCreateWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminCreateWithoutRenewalsInput> = z.object({
  role: z.lazy(() => RoleSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAdminInputSchema),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutRenewalsInput> = z.object({
  userId: z.number().int(),
  role: z.lazy(() => RoleSchema),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutRenewalsInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutRenewalsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutRenewalsInputSchema) ]),
}).strict();

export const StudentUpsertWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentUpsertWithoutRenewalsInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutRenewalsInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutRenewalsInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutRenewalsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutRenewalsInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutRenewalsInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutRenewalsInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutRenewalsInputSchema) ]),
}).strict();

export const StudentUpdateWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentUpdateWithoutRenewalsInput> = z.object({
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  faculty: z.lazy(() => FacultyUpdateOneRequiredWithoutStudentsNestedInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentUpdateOneRequiredWithoutStudentsNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutRenewalsInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutRenewalsInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AcademicSessionUpsertWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionUpsertWithoutRenewalInput> = z.object({
  update: z.union([ z.lazy(() => AcademicSessionUpdateWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUncheckedUpdateWithoutRenewalInputSchema) ]),
  create: z.union([ z.lazy(() => AcademicSessionCreateWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUncheckedCreateWithoutRenewalInputSchema) ]),
  where: z.lazy(() => AcademicSessionWhereInputSchema).optional()
}).strict();

export const AcademicSessionUpdateToOneWithWhereWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionUpdateToOneWithWhereWithoutRenewalInput> = z.object({
  where: z.lazy(() => AcademicSessionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AcademicSessionUpdateWithoutRenewalInputSchema),z.lazy(() => AcademicSessionUncheckedUpdateWithoutRenewalInputSchema) ]),
}).strict();

export const AcademicSessionUpdateWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionUpdateWithoutRenewalInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation: z.lazy(() => ReservationUpdateManyWithoutAcademicSessionNestedInputSchema).optional()
}).strict();

export const AcademicSessionUncheckedUpdateWithoutRenewalInputSchema: z.ZodType<Prisma.AcademicSessionUncheckedUpdateWithoutRenewalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation: z.lazy(() => ReservationUncheckedUpdateManyWithoutAcademicSessionNestedInputSchema).optional()
}).strict();

export const FacultyUpsertWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyUpsertWithoutRenewalsInput> = z.object({
  update: z.union([ z.lazy(() => FacultyUpdateWithoutRenewalsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutRenewalsInputSchema) ]),
  create: z.union([ z.lazy(() => FacultyCreateWithoutRenewalsInputSchema),z.lazy(() => FacultyUncheckedCreateWithoutRenewalsInputSchema) ]),
  where: z.lazy(() => FacultyWhereInputSchema).optional()
}).strict();

export const FacultyUpdateToOneWithWhereWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyUpdateToOneWithWhereWithoutRenewalsInput> = z.object({
  where: z.lazy(() => FacultyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FacultyUpdateWithoutRenewalsInputSchema),z.lazy(() => FacultyUncheckedUpdateWithoutRenewalsInputSchema) ]),
}).strict();

export const FacultyUpdateWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyUpdateWithoutRenewalsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUpdateManyWithoutFacultyNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const FacultyUncheckedUpdateWithoutRenewalsInputSchema: z.ZodType<Prisma.FacultyUncheckedUpdateWithoutRenewalsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutFacultyNestedInputSchema).optional()
}).strict();

export const AdminUpsertWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminUpsertWithoutRenewalsInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutRenewalsInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutRenewalsInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutRenewalsInputSchema),z.lazy(() => AdminUncheckedCreateWithoutRenewalsInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutRenewalsInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutRenewalsInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutRenewalsInputSchema) ]),
}).strict();

export const AdminUpdateWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminUpdateWithoutRenewalsInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAdminNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutRenewalsInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutRenewalsInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminCreateWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminCreateWithoutMaintenancesInput> = z.object({
  role: z.lazy(() => RoleSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAdminInputSchema),
  renewals: z.lazy(() => RenewalCreateNestedManyWithoutAdminInputSchema).optional(),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutMaintenancesInput> = z.object({
  userId: z.number().int(),
  role: z.lazy(() => RoleSchema),
  renewals: z.lazy(() => RenewalUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutMaintenancesInputSchema),z.lazy(() => AdminUncheckedCreateWithoutMaintenancesInputSchema) ]),
}).strict();

export const MaintainerCreateWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerCreateWithoutMaintenancesInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const MaintainerUncheckedCreateWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUncheckedCreateWithoutMaintenancesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const MaintainerCreateOrConnectWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerCreateOrConnectWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => MaintainerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema) ]),
}).strict();

export const AdminUpsertWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminUpsertWithoutMaintenancesInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutMaintenancesInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutMaintenancesInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutMaintenancesInputSchema),z.lazy(() => AdminUncheckedCreateWithoutMaintenancesInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutMaintenancesInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutMaintenancesInputSchema) ]),
}).strict();

export const AdminUpdateWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminUpdateWithoutMaintenancesInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAdminNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutAdminNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutMaintenancesInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutMaintenancesInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const MaintainerUpsertWithWhereUniqueWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUpsertWithWhereUniqueWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => MaintainerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MaintainerUpdateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedUpdateWithoutMaintenancesInputSchema) ]),
  create: z.union([ z.lazy(() => MaintainerCreateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedCreateWithoutMaintenancesInputSchema) ]),
}).strict();

export const MaintainerUpdateWithWhereUniqueWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUpdateWithWhereUniqueWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => MaintainerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MaintainerUpdateWithoutMaintenancesInputSchema),z.lazy(() => MaintainerUncheckedUpdateWithoutMaintenancesInputSchema) ]),
}).strict();

export const MaintainerUpdateManyWithWhereWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUpdateManyWithWhereWithoutMaintenancesInput> = z.object({
  where: z.lazy(() => MaintainerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MaintainerUpdateManyMutationInputSchema),z.lazy(() => MaintainerUncheckedUpdateManyWithoutMaintenancesInputSchema) ]),
}).strict();

export const MaintainerScalarWhereInputSchema: z.ZodType<Prisma.MaintainerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MaintainerScalarWhereInputSchema),z.lazy(() => MaintainerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MaintainerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MaintainerScalarWhereInputSchema),z.lazy(() => MaintainerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const MaintenanceCreateWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceCreateWithoutMaintainersInput> = z.object({
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutMaintenancesInputSchema)
}).strict();

export const MaintenanceUncheckedCreateWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUncheckedCreateWithoutMaintainersInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  adminId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MaintenanceCreateOrConnectWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceCreateOrConnectWithoutMaintainersInput> = z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema) ]),
}).strict();

export const MaintenanceUpsertWithWhereUniqueWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUpsertWithWhereUniqueWithoutMaintainersInput> = z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MaintenanceUpdateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedUpdateWithoutMaintainersInputSchema) ]),
  create: z.union([ z.lazy(() => MaintenanceCreateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedCreateWithoutMaintainersInputSchema) ]),
}).strict();

export const MaintenanceUpdateWithWhereUniqueWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUpdateWithWhereUniqueWithoutMaintainersInput> = z.object({
  where: z.lazy(() => MaintenanceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MaintenanceUpdateWithoutMaintainersInputSchema),z.lazy(() => MaintenanceUncheckedUpdateWithoutMaintainersInputSchema) ]),
}).strict();

export const MaintenanceUpdateManyWithWhereWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUpdateManyWithWhereWithoutMaintainersInput> = z.object({
  where: z.lazy(() => MaintenanceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MaintenanceUpdateManyMutationInputSchema),z.lazy(() => MaintenanceUncheckedUpdateManyWithoutMaintainersInputSchema) ]),
}).strict();

export const ReservationCreateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationCreateWithoutAcademicSessionInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  status: z.lazy(() => ReservationStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  faculty: z.lazy(() => FacultyCreateNestedOneWithoutReservationsInputSchema),
  admin: z.lazy(() => AdminCreateNestedOneWithoutReservationsInputSchema)
}).strict();

export const ReservationUncheckedCreateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateWithoutAcademicSessionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  status: z.lazy(() => ReservationStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const ReservationCreateOrConnectWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationCreateOrConnectWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema) ]),
}).strict();

export const ReservationCreateManyAcademicSessionInputEnvelopeSchema: z.ZodType<Prisma.ReservationCreateManyAcademicSessionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReservationCreateManyAcademicSessionInputSchema),z.lazy(() => ReservationCreateManyAcademicSessionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RenewalCreateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalCreateWithoutAcademicSessionInput> = z.object({
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutRenewalsInputSchema),
  Faculty: z.lazy(() => FacultyCreateNestedOneWithoutRenewalsInputSchema).optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutRenewalsInputSchema)
}).strict();

export const RenewalUncheckedCreateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUncheckedCreateWithoutAcademicSessionInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable(),
  adminId: z.number().int()
}).strict();

export const RenewalCreateOrConnectWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalCreateOrConnectWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema) ]),
}).strict();

export const RenewalCreateManyAcademicSessionInputEnvelopeSchema: z.ZodType<Prisma.RenewalCreateManyAcademicSessionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RenewalCreateManyAcademicSessionInputSchema),z.lazy(() => RenewalCreateManyAcademicSessionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReservationUpsertWithWhereUniqueWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUpsertWithWhereUniqueWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReservationUpdateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutAcademicSessionInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationCreateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAcademicSessionInputSchema) ]),
}).strict();

export const ReservationUpdateWithWhereUniqueWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUpdateWithWhereUniqueWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateWithoutAcademicSessionInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutAcademicSessionInputSchema) ]),
}).strict();

export const ReservationUpdateManyWithWhereWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithWhereWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => ReservationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateManyMutationInputSchema),z.lazy(() => ReservationUncheckedUpdateManyWithoutAcademicSessionInputSchema) ]),
}).strict();

export const RenewalUpsertWithWhereUniqueWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUpsertWithWhereUniqueWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RenewalUpdateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutAcademicSessionInputSchema) ]),
  create: z.union([ z.lazy(() => RenewalCreateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedCreateWithoutAcademicSessionInputSchema) ]),
}).strict();

export const RenewalUpdateWithWhereUniqueWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUpdateWithWhereUniqueWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => RenewalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateWithoutAcademicSessionInputSchema),z.lazy(() => RenewalUncheckedUpdateWithoutAcademicSessionInputSchema) ]),
}).strict();

export const RenewalUpdateManyWithWhereWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUpdateManyWithWhereWithoutAcademicSessionInput> = z.object({
  where: z.lazy(() => RenewalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RenewalUpdateManyMutationInputSchema),z.lazy(() => RenewalUncheckedUpdateManyWithoutAcademicSessionInputSchema) ]),
}).strict();

export const LodgmentCreateWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentCreateWithoutBuildingInput> = z.object({
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema),
  students: z.lazy(() => StudentCreateNestedManyWithoutLodgmentInputSchema).optional()
}).strict();

export const LodgmentUncheckedCreateWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUncheckedCreateWithoutBuildingInput> = z.object({
  id: z.number().int().optional(),
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema),
  students: z.lazy(() => StudentUncheckedCreateNestedManyWithoutLodgmentInputSchema).optional()
}).strict();

export const LodgmentCreateOrConnectWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentCreateOrConnectWithoutBuildingInput> = z.object({
  where: z.lazy(() => LodgmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LodgmentCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema) ]),
}).strict();

export const LodgmentCreateManyBuildingInputEnvelopeSchema: z.ZodType<Prisma.LodgmentCreateManyBuildingInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LodgmentCreateManyBuildingInputSchema),z.lazy(() => LodgmentCreateManyBuildingInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LodgmentUpsertWithWhereUniqueWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUpsertWithWhereUniqueWithoutBuildingInput> = z.object({
  where: z.lazy(() => LodgmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LodgmentUpdateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedUpdateWithoutBuildingInputSchema) ]),
  create: z.union([ z.lazy(() => LodgmentCreateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedCreateWithoutBuildingInputSchema) ]),
}).strict();

export const LodgmentUpdateWithWhereUniqueWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUpdateWithWhereUniqueWithoutBuildingInput> = z.object({
  where: z.lazy(() => LodgmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LodgmentUpdateWithoutBuildingInputSchema),z.lazy(() => LodgmentUncheckedUpdateWithoutBuildingInputSchema) ]),
}).strict();

export const LodgmentUpdateManyWithWhereWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUpdateManyWithWhereWithoutBuildingInput> = z.object({
  where: z.lazy(() => LodgmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LodgmentUpdateManyMutationInputSchema),z.lazy(() => LodgmentUncheckedUpdateManyWithoutBuildingInputSchema) ]),
}).strict();

export const LodgmentScalarWhereInputSchema: z.ZodType<Prisma.LodgmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LodgmentScalarWhereInputSchema),z.lazy(() => LodgmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LodgmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LodgmentScalarWhereInputSchema),z.lazy(() => LodgmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  capacity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  floor: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roomNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  buildingId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumLodgmentStatusFilterSchema),z.lazy(() => LodgmentStatusSchema) ]).optional(),
}).strict();

export const UserCreateWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserCreateWithoutPasswordResetTokenInput> = z.object({
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPasswordResetTokenInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  admin: z.lazy(() => AdminUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordResetTokenInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokenInputSchema) ]),
}).strict();

export const UserUpsertWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserUpsertWithoutPasswordResetTokenInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokenInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokenInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokenInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPasswordResetTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokenInputSchema) ]),
}).strict();

export const UserUpdateWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserUpdateWithoutPasswordResetTokenInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.lazy(() => AdminUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPasswordResetTokenInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPasswordResetTokenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.lazy(() => AdminUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  student: z.lazy(() => StudentUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RefreshTokenCreateManyUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalCreateManyAdminInputSchema: z.ZodType<Prisma.RenewalCreateManyAdminInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable()
}).strict();

export const ReservationCreateManyAdminInputSchema: z.ZodType<Prisma.ReservationCreateManyAdminInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  status: z.lazy(() => ReservationStatusSchema),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MaintenanceCreateManyAdminInputSchema: z.ZodType<Prisma.MaintenanceCreateManyAdminInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => MaintenanceTypeSchema),
  description: z.string().optional().nullable(),
  status: z.lazy(() => MaintenanceStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RenewalUpdateWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUpdateWithoutAdminInput> = z.object({
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional(),
  academicSession: z.lazy(() => AcademicSessionUpdateOneRequiredWithoutRenewalNestedInputSchema).optional(),
  Faculty: z.lazy(() => FacultyUpdateOneWithoutRenewalsNestedInputSchema).optional()
}).strict();

export const RenewalUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutAdminInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReservationUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpdateWithoutAdminInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  faculty: z.lazy(() => FacultyUpdateOneRequiredWithoutReservationsNestedInputSchema).optional(),
  academicSession: z.lazy(() => AcademicSessionUpdateOneRequiredWithoutReservationNestedInputSchema).optional()
}).strict();

export const ReservationUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MaintenanceUpdateWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUpdateWithoutAdminInput> = z.object({
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  maintainers: z.lazy(() => MaintainerUpdateManyWithoutMaintenancesNestedInputSchema).optional()
}).strict();

export const MaintenanceUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  maintainers: z.lazy(() => MaintainerUncheckedUpdateManyWithoutMaintenancesNestedInputSchema).optional()
}).strict();

export const MaintenanceUncheckedUpdateManyWithoutAdminInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateManyWithoutAdminInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentCreateManyFacultyInputSchema: z.ZodType<Prisma.StudentCreateManyFacultyInput> = z.object({
  userId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int()
}).strict();

export const ReservationCreateManyFacultyInputSchema: z.ZodType<Prisma.ReservationCreateManyFacultyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  status: z.lazy(() => ReservationStatusSchema),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const RenewalCreateManyFacultyInputSchema: z.ZodType<Prisma.RenewalCreateManyFacultyInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const StudentUpdateWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUpdateWithoutFacultyInput> = z.object({
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutStudentNestedInputSchema).optional(),
  lodgment: z.lazy(() => LodgmentUpdateOneRequiredWithoutStudentsNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutFacultyInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateManyWithoutFacultyInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyWithoutFacultyInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lodgmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUpdateWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUpdateWithoutFacultyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  academicSession: z.lazy(() => AcademicSessionUpdateOneRequiredWithoutReservationNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationUncheckedUpdateWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateWithoutFacultyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutFacultyInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutFacultyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalUpdateWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUpdateWithoutFacultyInput> = z.object({
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional(),
  academicSession: z.lazy(() => AcademicSessionUpdateOneRequiredWithoutRenewalNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional()
}).strict();

export const RenewalUncheckedUpdateWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateWithoutFacultyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutFacultyInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutFacultyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalCreateManyStudentInputSchema: z.ZodType<Prisma.RenewalCreateManyStudentInput> = z.object({
  id: z.number().int().optional(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  academicSessionId: z.number().int(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable(),
  adminId: z.number().int()
}).strict();

export const RenewalUpdateWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUpdateWithoutStudentInput> = z.object({
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  academicSession: z.lazy(() => AcademicSessionUpdateOneRequiredWithoutRenewalNestedInputSchema).optional(),
  Faculty: z.lazy(() => FacultyUpdateOneWithoutRenewalsNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional()
}).strict();

export const RenewalUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  academicSessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentCreateManyLodgmentInputSchema: z.ZodType<Prisma.StudentCreateManyLodgmentInput> = z.object({
  userId: z.number().int(),
  facultyId: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string()
}).strict();

export const StudentUpdateWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUpdateWithoutLodgmentInput> = z.object({
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStudentNestedInputSchema).optional(),
  faculty: z.lazy(() => FacultyUpdateOneRequiredWithoutStudentsNestedInputSchema).optional(),
  renewals: z.lazy(() => RenewalUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutLodgmentInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  renewals: z.lazy(() => RenewalUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateManyWithoutLodgmentInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyWithoutLodgmentInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MaintainerUpdateWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUpdateWithoutMaintenancesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MaintainerUncheckedUpdateWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUncheckedUpdateWithoutMaintenancesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MaintainerUncheckedUpdateManyWithoutMaintenancesInputSchema: z.ZodType<Prisma.MaintainerUncheckedUpdateManyWithoutMaintenancesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MaintenanceUpdateWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUpdateWithoutMaintainersInput> = z.object({
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutMaintenancesNestedInputSchema).optional()
}).strict();

export const MaintenanceUncheckedUpdateWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateWithoutMaintainersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MaintenanceUncheckedUpdateManyWithoutMaintainersInputSchema: z.ZodType<Prisma.MaintenanceUncheckedUpdateManyWithoutMaintainersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => MaintenanceTypeSchema),z.lazy(() => EnumMaintenanceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MaintenanceStatusSchema),z.lazy(() => EnumMaintenanceStatusFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationCreateManyAcademicSessionInputSchema: z.ZodType<Prisma.ReservationCreateManyAcademicSessionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  gender: z.lazy(() => GenderSchema),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  status: z.lazy(() => ReservationStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminId: z.number().int()
}).strict();

export const RenewalCreateManyAcademicSessionInputSchema: z.ZodType<Prisma.RenewalCreateManyAcademicSessionInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  phoneNumber: z.string(),
  emergencyNumber: z.string(),
  profileUrl: z.string(),
  schoolCertificateUrl: z.string(),
  NICURL: z.string(),
  status: z.lazy(() => RenewalStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  facultyId: z.number().int().optional().nullable(),
  adminId: z.number().int()
}).strict();

export const ReservationUpdateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUpdateWithoutAcademicSessionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  faculty: z.lazy(() => FacultyUpdateOneRequiredWithoutReservationsNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationUncheckedUpdateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateWithoutAcademicSessionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutAcademicSessionInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutAcademicSessionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  nationality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NIC: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalUpdateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUpdateWithoutAcademicSessionInput> = z.object({
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional(),
  Faculty: z.lazy(() => FacultyUpdateOneWithoutRenewalsNestedInputSchema).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutRenewalsNestedInputSchema).optional()
}).strict();

export const RenewalUncheckedUpdateWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateWithoutAcademicSessionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RenewalUncheckedUpdateManyWithoutAcademicSessionInputSchema: z.ZodType<Prisma.RenewalUncheckedUpdateManyWithoutAcademicSessionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergencyNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schoolCertificateUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  NICURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RenewalStatusSchema),z.lazy(() => EnumRenewalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  facultyId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  adminId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LodgmentCreateManyBuildingInputSchema: z.ZodType<Prisma.LodgmentCreateManyBuildingInput> = z.object({
  id: z.number().int().optional(),
  capacity: z.number().int(),
  floor: z.number().int(),
  roomNumber: z.number().int(),
  status: z.lazy(() => LodgmentStatusSchema)
}).strict();

export const LodgmentUpdateWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUpdateWithoutBuildingInput> = z.object({
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUpdateManyWithoutLodgmentNestedInputSchema).optional()
}).strict();

export const LodgmentUncheckedUpdateWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUncheckedUpdateWithoutBuildingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  students: z.lazy(() => StudentUncheckedUpdateManyWithoutLodgmentNestedInputSchema).optional()
}).strict();

export const LodgmentUncheckedUpdateManyWithoutBuildingInputSchema: z.ZodType<Prisma.LodgmentUncheckedUpdateManyWithoutBuildingInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  capacity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  floor: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roomNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LodgmentStatusSchema),z.lazy(() => EnumLodgmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AdminFindFirstArgsSchema: z.ZodType<Prisma.AdminFindFirstArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AdminFindFirstOrThrowArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminFindManyArgsSchema: z.ZodType<Prisma.AdminFindManyArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AdminAggregateArgsSchema: z.ZodType<Prisma.AdminAggregateArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AdminGroupByArgsSchema: z.ZodType<Prisma.AdminGroupByArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithAggregationInputSchema.array(),AdminOrderByWithAggregationInputSchema ]).optional(),
  by: AdminScalarFieldEnumSchema.array(),
  having: AdminScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AdminFindUniqueArgsSchema: z.ZodType<Prisma.AdminFindUniqueArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const AdminFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AdminFindUniqueOrThrowArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenFindFirstArgsSchema: z.ZodType<Prisma.RefreshTokenFindFirstArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RefreshTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokenFindFirstOrThrowArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RefreshTokenFindManyArgsSchema: z.ZodType<Prisma.RefreshTokenFindManyArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RefreshTokenAggregateArgsSchema: z.ZodType<Prisma.RefreshTokenAggregateArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RefreshTokenGroupByArgsSchema: z.ZodType<Prisma.RefreshTokenGroupByArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithAggregationInputSchema.array(),RefreshTokenOrderByWithAggregationInputSchema ]).optional(),
  by: RefreshTokenScalarFieldEnumSchema.array(),
  having: RefreshTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RefreshTokenFindUniqueArgsSchema: z.ZodType<Prisma.RefreshTokenFindUniqueArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokenFindUniqueOrThrowArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const FacultyFindFirstArgsSchema: z.ZodType<Prisma.FacultyFindFirstArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  where: FacultyWhereInputSchema.optional(),
  orderBy: z.union([ FacultyOrderByWithRelationInputSchema.array(),FacultyOrderByWithRelationInputSchema ]).optional(),
  cursor: FacultyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FacultyScalarFieldEnumSchema,FacultyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FacultyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FacultyFindFirstOrThrowArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  where: FacultyWhereInputSchema.optional(),
  orderBy: z.union([ FacultyOrderByWithRelationInputSchema.array(),FacultyOrderByWithRelationInputSchema ]).optional(),
  cursor: FacultyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FacultyScalarFieldEnumSchema,FacultyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FacultyFindManyArgsSchema: z.ZodType<Prisma.FacultyFindManyArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  where: FacultyWhereInputSchema.optional(),
  orderBy: z.union([ FacultyOrderByWithRelationInputSchema.array(),FacultyOrderByWithRelationInputSchema ]).optional(),
  cursor: FacultyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FacultyScalarFieldEnumSchema,FacultyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FacultyAggregateArgsSchema: z.ZodType<Prisma.FacultyAggregateArgs> = z.object({
  where: FacultyWhereInputSchema.optional(),
  orderBy: z.union([ FacultyOrderByWithRelationInputSchema.array(),FacultyOrderByWithRelationInputSchema ]).optional(),
  cursor: FacultyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FacultyGroupByArgsSchema: z.ZodType<Prisma.FacultyGroupByArgs> = z.object({
  where: FacultyWhereInputSchema.optional(),
  orderBy: z.union([ FacultyOrderByWithAggregationInputSchema.array(),FacultyOrderByWithAggregationInputSchema ]).optional(),
  by: FacultyScalarFieldEnumSchema.array(),
  having: FacultyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FacultyFindUniqueArgsSchema: z.ZodType<Prisma.FacultyFindUniqueArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  where: FacultyWhereUniqueInputSchema,
}).strict() ;

export const FacultyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FacultyFindUniqueOrThrowArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  where: FacultyWhereUniqueInputSchema,
}).strict() ;

export const StudentFindFirstArgsSchema: z.ZodType<Prisma.StudentFindFirstArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentFindFirstOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindManyArgsSchema: z.ZodType<Prisma.StudentFindManyArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAggregateArgsSchema: z.ZodType<Prisma.StudentAggregateArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentGroupByArgsSchema: z.ZodType<Prisma.StudentGroupByArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithAggregationInputSchema.array(),StudentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentScalarFieldEnumSchema.array(),
  having: StudentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentFindUniqueArgsSchema: z.ZodType<Prisma.StudentFindUniqueArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentFindUniqueOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const LodgmentFindFirstArgsSchema: z.ZodType<Prisma.LodgmentFindFirstArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  where: LodgmentWhereInputSchema.optional(),
  orderBy: z.union([ LodgmentOrderByWithRelationInputSchema.array(),LodgmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LodgmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LodgmentScalarFieldEnumSchema,LodgmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LodgmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LodgmentFindFirstOrThrowArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  where: LodgmentWhereInputSchema.optional(),
  orderBy: z.union([ LodgmentOrderByWithRelationInputSchema.array(),LodgmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LodgmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LodgmentScalarFieldEnumSchema,LodgmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LodgmentFindManyArgsSchema: z.ZodType<Prisma.LodgmentFindManyArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  where: LodgmentWhereInputSchema.optional(),
  orderBy: z.union([ LodgmentOrderByWithRelationInputSchema.array(),LodgmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LodgmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LodgmentScalarFieldEnumSchema,LodgmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LodgmentAggregateArgsSchema: z.ZodType<Prisma.LodgmentAggregateArgs> = z.object({
  where: LodgmentWhereInputSchema.optional(),
  orderBy: z.union([ LodgmentOrderByWithRelationInputSchema.array(),LodgmentOrderByWithRelationInputSchema ]).optional(),
  cursor: LodgmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LodgmentGroupByArgsSchema: z.ZodType<Prisma.LodgmentGroupByArgs> = z.object({
  where: LodgmentWhereInputSchema.optional(),
  orderBy: z.union([ LodgmentOrderByWithAggregationInputSchema.array(),LodgmentOrderByWithAggregationInputSchema ]).optional(),
  by: LodgmentScalarFieldEnumSchema.array(),
  having: LodgmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LodgmentFindUniqueArgsSchema: z.ZodType<Prisma.LodgmentFindUniqueArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  where: LodgmentWhereUniqueInputSchema,
}).strict() ;

export const LodgmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LodgmentFindUniqueOrThrowArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  where: LodgmentWhereUniqueInputSchema,
}).strict() ;

export const ReservationFindFirstArgsSchema: z.ZodType<Prisma.ReservationFindFirstArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationScalarFieldEnumSchema,ReservationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReservationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReservationFindFirstOrThrowArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationScalarFieldEnumSchema,ReservationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReservationFindManyArgsSchema: z.ZodType<Prisma.ReservationFindManyArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationScalarFieldEnumSchema,ReservationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReservationAggregateArgsSchema: z.ZodType<Prisma.ReservationAggregateArgs> = z.object({
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReservationGroupByArgsSchema: z.ZodType<Prisma.ReservationGroupByArgs> = z.object({
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithAggregationInputSchema.array(),ReservationOrderByWithAggregationInputSchema ]).optional(),
  by: ReservationScalarFieldEnumSchema.array(),
  having: ReservationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReservationFindUniqueArgsSchema: z.ZodType<Prisma.ReservationFindUniqueArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
}).strict() ;

export const ReservationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReservationFindUniqueOrThrowArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
}).strict() ;

export const RenewalFindFirstArgsSchema: z.ZodType<Prisma.RenewalFindFirstArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  where: RenewalWhereInputSchema.optional(),
  orderBy: z.union([ RenewalOrderByWithRelationInputSchema.array(),RenewalOrderByWithRelationInputSchema ]).optional(),
  cursor: RenewalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RenewalScalarFieldEnumSchema,RenewalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RenewalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RenewalFindFirstOrThrowArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  where: RenewalWhereInputSchema.optional(),
  orderBy: z.union([ RenewalOrderByWithRelationInputSchema.array(),RenewalOrderByWithRelationInputSchema ]).optional(),
  cursor: RenewalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RenewalScalarFieldEnumSchema,RenewalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RenewalFindManyArgsSchema: z.ZodType<Prisma.RenewalFindManyArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  where: RenewalWhereInputSchema.optional(),
  orderBy: z.union([ RenewalOrderByWithRelationInputSchema.array(),RenewalOrderByWithRelationInputSchema ]).optional(),
  cursor: RenewalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RenewalScalarFieldEnumSchema,RenewalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RenewalAggregateArgsSchema: z.ZodType<Prisma.RenewalAggregateArgs> = z.object({
  where: RenewalWhereInputSchema.optional(),
  orderBy: z.union([ RenewalOrderByWithRelationInputSchema.array(),RenewalOrderByWithRelationInputSchema ]).optional(),
  cursor: RenewalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RenewalGroupByArgsSchema: z.ZodType<Prisma.RenewalGroupByArgs> = z.object({
  where: RenewalWhereInputSchema.optional(),
  orderBy: z.union([ RenewalOrderByWithAggregationInputSchema.array(),RenewalOrderByWithAggregationInputSchema ]).optional(),
  by: RenewalScalarFieldEnumSchema.array(),
  having: RenewalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RenewalFindUniqueArgsSchema: z.ZodType<Prisma.RenewalFindUniqueArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  where: RenewalWhereUniqueInputSchema,
}).strict() ;

export const RenewalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RenewalFindUniqueOrThrowArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  where: RenewalWhereUniqueInputSchema,
}).strict() ;

export const MaintenanceFindFirstArgsSchema: z.ZodType<Prisma.MaintenanceFindFirstArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  where: MaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ MaintenanceOrderByWithRelationInputSchema.array(),MaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MaintenanceScalarFieldEnumSchema,MaintenanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MaintenanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MaintenanceFindFirstOrThrowArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  where: MaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ MaintenanceOrderByWithRelationInputSchema.array(),MaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MaintenanceScalarFieldEnumSchema,MaintenanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MaintenanceFindManyArgsSchema: z.ZodType<Prisma.MaintenanceFindManyArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  where: MaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ MaintenanceOrderByWithRelationInputSchema.array(),MaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MaintenanceScalarFieldEnumSchema,MaintenanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MaintenanceAggregateArgsSchema: z.ZodType<Prisma.MaintenanceAggregateArgs> = z.object({
  where: MaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ MaintenanceOrderByWithRelationInputSchema.array(),MaintenanceOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintenanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MaintenanceGroupByArgsSchema: z.ZodType<Prisma.MaintenanceGroupByArgs> = z.object({
  where: MaintenanceWhereInputSchema.optional(),
  orderBy: z.union([ MaintenanceOrderByWithAggregationInputSchema.array(),MaintenanceOrderByWithAggregationInputSchema ]).optional(),
  by: MaintenanceScalarFieldEnumSchema.array(),
  having: MaintenanceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MaintenanceFindUniqueArgsSchema: z.ZodType<Prisma.MaintenanceFindUniqueArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  where: MaintenanceWhereUniqueInputSchema,
}).strict() ;

export const MaintenanceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MaintenanceFindUniqueOrThrowArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  where: MaintenanceWhereUniqueInputSchema,
}).strict() ;

export const MaintainerFindFirstArgsSchema: z.ZodType<Prisma.MaintainerFindFirstArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  where: MaintainerWhereInputSchema.optional(),
  orderBy: z.union([ MaintainerOrderByWithRelationInputSchema.array(),MaintainerOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintainerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MaintainerScalarFieldEnumSchema,MaintainerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MaintainerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MaintainerFindFirstOrThrowArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  where: MaintainerWhereInputSchema.optional(),
  orderBy: z.union([ MaintainerOrderByWithRelationInputSchema.array(),MaintainerOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintainerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MaintainerScalarFieldEnumSchema,MaintainerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MaintainerFindManyArgsSchema: z.ZodType<Prisma.MaintainerFindManyArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  where: MaintainerWhereInputSchema.optional(),
  orderBy: z.union([ MaintainerOrderByWithRelationInputSchema.array(),MaintainerOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintainerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MaintainerScalarFieldEnumSchema,MaintainerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MaintainerAggregateArgsSchema: z.ZodType<Prisma.MaintainerAggregateArgs> = z.object({
  where: MaintainerWhereInputSchema.optional(),
  orderBy: z.union([ MaintainerOrderByWithRelationInputSchema.array(),MaintainerOrderByWithRelationInputSchema ]).optional(),
  cursor: MaintainerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MaintainerGroupByArgsSchema: z.ZodType<Prisma.MaintainerGroupByArgs> = z.object({
  where: MaintainerWhereInputSchema.optional(),
  orderBy: z.union([ MaintainerOrderByWithAggregationInputSchema.array(),MaintainerOrderByWithAggregationInputSchema ]).optional(),
  by: MaintainerScalarFieldEnumSchema.array(),
  having: MaintainerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MaintainerFindUniqueArgsSchema: z.ZodType<Prisma.MaintainerFindUniqueArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  where: MaintainerWhereUniqueInputSchema,
}).strict() ;

export const MaintainerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MaintainerFindUniqueOrThrowArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  where: MaintainerWhereUniqueInputSchema,
}).strict() ;

export const AcademicSessionFindFirstArgsSchema: z.ZodType<Prisma.AcademicSessionFindFirstArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  where: AcademicSessionWhereInputSchema.optional(),
  orderBy: z.union([ AcademicSessionOrderByWithRelationInputSchema.array(),AcademicSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AcademicSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AcademicSessionScalarFieldEnumSchema,AcademicSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AcademicSessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AcademicSessionFindFirstOrThrowArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  where: AcademicSessionWhereInputSchema.optional(),
  orderBy: z.union([ AcademicSessionOrderByWithRelationInputSchema.array(),AcademicSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AcademicSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AcademicSessionScalarFieldEnumSchema,AcademicSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AcademicSessionFindManyArgsSchema: z.ZodType<Prisma.AcademicSessionFindManyArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  where: AcademicSessionWhereInputSchema.optional(),
  orderBy: z.union([ AcademicSessionOrderByWithRelationInputSchema.array(),AcademicSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AcademicSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AcademicSessionScalarFieldEnumSchema,AcademicSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AcademicSessionAggregateArgsSchema: z.ZodType<Prisma.AcademicSessionAggregateArgs> = z.object({
  where: AcademicSessionWhereInputSchema.optional(),
  orderBy: z.union([ AcademicSessionOrderByWithRelationInputSchema.array(),AcademicSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AcademicSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AcademicSessionGroupByArgsSchema: z.ZodType<Prisma.AcademicSessionGroupByArgs> = z.object({
  where: AcademicSessionWhereInputSchema.optional(),
  orderBy: z.union([ AcademicSessionOrderByWithAggregationInputSchema.array(),AcademicSessionOrderByWithAggregationInputSchema ]).optional(),
  by: AcademicSessionScalarFieldEnumSchema.array(),
  having: AcademicSessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AcademicSessionFindUniqueArgsSchema: z.ZodType<Prisma.AcademicSessionFindUniqueArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  where: AcademicSessionWhereUniqueInputSchema,
}).strict() ;

export const AcademicSessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AcademicSessionFindUniqueOrThrowArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  where: AcademicSessionWhereUniqueInputSchema,
}).strict() ;

export const BuildingFindFirstArgsSchema: z.ZodType<Prisma.BuildingFindFirstArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildingScalarFieldEnumSchema,BuildingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BuildingFindFirstOrThrowArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildingScalarFieldEnumSchema,BuildingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildingFindManyArgsSchema: z.ZodType<Prisma.BuildingFindManyArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BuildingScalarFieldEnumSchema,BuildingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BuildingAggregateArgsSchema: z.ZodType<Prisma.BuildingAggregateArgs> = z.object({
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithRelationInputSchema.array(),BuildingOrderByWithRelationInputSchema ]).optional(),
  cursor: BuildingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BuildingGroupByArgsSchema: z.ZodType<Prisma.BuildingGroupByArgs> = z.object({
  where: BuildingWhereInputSchema.optional(),
  orderBy: z.union([ BuildingOrderByWithAggregationInputSchema.array(),BuildingOrderByWithAggregationInputSchema ]).optional(),
  by: BuildingScalarFieldEnumSchema.array(),
  having: BuildingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BuildingFindUniqueArgsSchema: z.ZodType<Prisma.BuildingFindUniqueArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const BuildingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BuildingFindUniqueOrThrowArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const AnnouncementFindFirstArgsSchema: z.ZodType<Prisma.AnnouncementFindFirstArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  where: AnnouncementWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementOrderByWithRelationInputSchema.array(),AnnouncementOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnnouncementScalarFieldEnumSchema,AnnouncementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnnouncementFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AnnouncementFindFirstOrThrowArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  where: AnnouncementWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementOrderByWithRelationInputSchema.array(),AnnouncementOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnnouncementScalarFieldEnumSchema,AnnouncementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnnouncementFindManyArgsSchema: z.ZodType<Prisma.AnnouncementFindManyArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  where: AnnouncementWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementOrderByWithRelationInputSchema.array(),AnnouncementOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnnouncementScalarFieldEnumSchema,AnnouncementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnnouncementAggregateArgsSchema: z.ZodType<Prisma.AnnouncementAggregateArgs> = z.object({
  where: AnnouncementWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementOrderByWithRelationInputSchema.array(),AnnouncementOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnnouncementGroupByArgsSchema: z.ZodType<Prisma.AnnouncementGroupByArgs> = z.object({
  where: AnnouncementWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementOrderByWithAggregationInputSchema.array(),AnnouncementOrderByWithAggregationInputSchema ]).optional(),
  by: AnnouncementScalarFieldEnumSchema.array(),
  having: AnnouncementScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnnouncementFindUniqueArgsSchema: z.ZodType<Prisma.AnnouncementFindUniqueArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  where: AnnouncementWhereUniqueInputSchema,
}).strict() ;

export const AnnouncementFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AnnouncementFindUniqueOrThrowArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  where: AnnouncementWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenFindFirstArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema,PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordResetTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstOrThrowArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema,PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordResetTokenFindManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindManyArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema,PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordResetTokenAggregateArgsSchema: z.ZodType<Prisma.PasswordResetTokenAggregateArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasswordResetTokenGroupByArgsSchema: z.ZodType<Prisma.PasswordResetTokenGroupByArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithAggregationInputSchema.array(),PasswordResetTokenOrderByWithAggregationInputSchema ]).optional(),
  by: PasswordResetTokenScalarFieldEnumSchema.array(),
  having: PasswordResetTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasswordResetTokenFindUniqueArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueOrThrowArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const AdminCreateArgsSchema: z.ZodType<Prisma.AdminCreateArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  data: z.union([ AdminCreateInputSchema,AdminUncheckedCreateInputSchema ]),
}).strict() ;

export const AdminUpsertArgsSchema: z.ZodType<Prisma.AdminUpsertArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
  create: z.union([ AdminCreateInputSchema,AdminUncheckedCreateInputSchema ]),
  update: z.union([ AdminUpdateInputSchema,AdminUncheckedUpdateInputSchema ]),
}).strict() ;

export const AdminCreateManyArgsSchema: z.ZodType<Prisma.AdminCreateManyArgs> = z.object({
  data: z.union([ AdminCreateManyInputSchema,AdminCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AdminDeleteArgsSchema: z.ZodType<Prisma.AdminDeleteArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const AdminUpdateArgsSchema: z.ZodType<Prisma.AdminUpdateArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  data: z.union([ AdminUpdateInputSchema,AdminUncheckedUpdateInputSchema ]),
  where: AdminWhereUniqueInputSchema,
}).strict() ;

export const AdminUpdateManyArgsSchema: z.ZodType<Prisma.AdminUpdateManyArgs> = z.object({
  data: z.union([ AdminUpdateManyMutationInputSchema,AdminUncheckedUpdateManyInputSchema ]),
  where: AdminWhereInputSchema.optional(),
}).strict() ;

export const AdminDeleteManyArgsSchema: z.ZodType<Prisma.AdminDeleteManyArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
}).strict() ;

export const RefreshTokenCreateArgsSchema: z.ZodType<Prisma.RefreshTokenCreateArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  data: z.union([ RefreshTokenCreateInputSchema,RefreshTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const RefreshTokenUpsertArgsSchema: z.ZodType<Prisma.RefreshTokenUpsertArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
  create: z.union([ RefreshTokenCreateInputSchema,RefreshTokenUncheckedCreateInputSchema ]),
  update: z.union([ RefreshTokenUpdateInputSchema,RefreshTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const RefreshTokenCreateManyArgsSchema: z.ZodType<Prisma.RefreshTokenCreateManyArgs> = z.object({
  data: z.union([ RefreshTokenCreateManyInputSchema,RefreshTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RefreshTokenDeleteArgsSchema: z.ZodType<Prisma.RefreshTokenDeleteArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenUpdateArgsSchema: z.ZodType<Prisma.RefreshTokenUpdateArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  data: z.union([ RefreshTokenUpdateInputSchema,RefreshTokenUncheckedUpdateInputSchema ]),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict() ;

export const RefreshTokenUpdateManyArgsSchema: z.ZodType<Prisma.RefreshTokenUpdateManyArgs> = z.object({
  data: z.union([ RefreshTokenUpdateManyMutationInputSchema,RefreshTokenUncheckedUpdateManyInputSchema ]),
  where: RefreshTokenWhereInputSchema.optional(),
}).strict() ;

export const RefreshTokenDeleteManyArgsSchema: z.ZodType<Prisma.RefreshTokenDeleteManyArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
}).strict() ;

export const FacultyCreateArgsSchema: z.ZodType<Prisma.FacultyCreateArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  data: z.union([ FacultyCreateInputSchema,FacultyUncheckedCreateInputSchema ]),
}).strict() ;

export const FacultyUpsertArgsSchema: z.ZodType<Prisma.FacultyUpsertArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  where: FacultyWhereUniqueInputSchema,
  create: z.union([ FacultyCreateInputSchema,FacultyUncheckedCreateInputSchema ]),
  update: z.union([ FacultyUpdateInputSchema,FacultyUncheckedUpdateInputSchema ]),
}).strict() ;

export const FacultyCreateManyArgsSchema: z.ZodType<Prisma.FacultyCreateManyArgs> = z.object({
  data: z.union([ FacultyCreateManyInputSchema,FacultyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FacultyDeleteArgsSchema: z.ZodType<Prisma.FacultyDeleteArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  where: FacultyWhereUniqueInputSchema,
}).strict() ;

export const FacultyUpdateArgsSchema: z.ZodType<Prisma.FacultyUpdateArgs> = z.object({
  select: FacultySelectSchema.optional(),
  include: FacultyIncludeSchema.optional(),
  data: z.union([ FacultyUpdateInputSchema,FacultyUncheckedUpdateInputSchema ]),
  where: FacultyWhereUniqueInputSchema,
}).strict() ;

export const FacultyUpdateManyArgsSchema: z.ZodType<Prisma.FacultyUpdateManyArgs> = z.object({
  data: z.union([ FacultyUpdateManyMutationInputSchema,FacultyUncheckedUpdateManyInputSchema ]),
  where: FacultyWhereInputSchema.optional(),
}).strict() ;

export const FacultyDeleteManyArgsSchema: z.ZodType<Prisma.FacultyDeleteManyArgs> = z.object({
  where: FacultyWhereInputSchema.optional(),
}).strict() ;

export const StudentCreateArgsSchema: z.ZodType<Prisma.StudentCreateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
}).strict() ;

export const StudentUpsertArgsSchema: z.ZodType<Prisma.StudentUpsertArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
  create: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
  update: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
}).strict() ;

export const StudentCreateManyArgsSchema: z.ZodType<Prisma.StudentCreateManyArgs> = z.object({
  data: z.union([ StudentCreateManyInputSchema,StudentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StudentDeleteArgsSchema: z.ZodType<Prisma.StudentDeleteArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateArgsSchema: z.ZodType<Prisma.StudentUpdateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateManyArgsSchema: z.ZodType<Prisma.StudentUpdateManyArgs> = z.object({
  data: z.union([ StudentUpdateManyMutationInputSchema,StudentUncheckedUpdateManyInputSchema ]),
  where: StudentWhereInputSchema.optional(),
}).strict() ;

export const StudentDeleteManyArgsSchema: z.ZodType<Prisma.StudentDeleteManyArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
}).strict() ;

export const LodgmentCreateArgsSchema: z.ZodType<Prisma.LodgmentCreateArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  data: z.union([ LodgmentCreateInputSchema,LodgmentUncheckedCreateInputSchema ]),
}).strict() ;

export const LodgmentUpsertArgsSchema: z.ZodType<Prisma.LodgmentUpsertArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  where: LodgmentWhereUniqueInputSchema,
  create: z.union([ LodgmentCreateInputSchema,LodgmentUncheckedCreateInputSchema ]),
  update: z.union([ LodgmentUpdateInputSchema,LodgmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const LodgmentCreateManyArgsSchema: z.ZodType<Prisma.LodgmentCreateManyArgs> = z.object({
  data: z.union([ LodgmentCreateManyInputSchema,LodgmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LodgmentDeleteArgsSchema: z.ZodType<Prisma.LodgmentDeleteArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  where: LodgmentWhereUniqueInputSchema,
}).strict() ;

export const LodgmentUpdateArgsSchema: z.ZodType<Prisma.LodgmentUpdateArgs> = z.object({
  select: LodgmentSelectSchema.optional(),
  include: LodgmentIncludeSchema.optional(),
  data: z.union([ LodgmentUpdateInputSchema,LodgmentUncheckedUpdateInputSchema ]),
  where: LodgmentWhereUniqueInputSchema,
}).strict() ;

export const LodgmentUpdateManyArgsSchema: z.ZodType<Prisma.LodgmentUpdateManyArgs> = z.object({
  data: z.union([ LodgmentUpdateManyMutationInputSchema,LodgmentUncheckedUpdateManyInputSchema ]),
  where: LodgmentWhereInputSchema.optional(),
}).strict() ;

export const LodgmentDeleteManyArgsSchema: z.ZodType<Prisma.LodgmentDeleteManyArgs> = z.object({
  where: LodgmentWhereInputSchema.optional(),
}).strict() ;

export const ReservationCreateArgsSchema: z.ZodType<Prisma.ReservationCreateArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  data: z.union([ ReservationCreateInputSchema,ReservationUncheckedCreateInputSchema ]),
}).strict() ;

export const ReservationUpsertArgsSchema: z.ZodType<Prisma.ReservationUpsertArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
  create: z.union([ ReservationCreateInputSchema,ReservationUncheckedCreateInputSchema ]),
  update: z.union([ ReservationUpdateInputSchema,ReservationUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReservationCreateManyArgsSchema: z.ZodType<Prisma.ReservationCreateManyArgs> = z.object({
  data: z.union([ ReservationCreateManyInputSchema,ReservationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReservationDeleteArgsSchema: z.ZodType<Prisma.ReservationDeleteArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
}).strict() ;

export const ReservationUpdateArgsSchema: z.ZodType<Prisma.ReservationUpdateArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  data: z.union([ ReservationUpdateInputSchema,ReservationUncheckedUpdateInputSchema ]),
  where: ReservationWhereUniqueInputSchema,
}).strict() ;

export const ReservationUpdateManyArgsSchema: z.ZodType<Prisma.ReservationUpdateManyArgs> = z.object({
  data: z.union([ ReservationUpdateManyMutationInputSchema,ReservationUncheckedUpdateManyInputSchema ]),
  where: ReservationWhereInputSchema.optional(),
}).strict() ;

export const ReservationDeleteManyArgsSchema: z.ZodType<Prisma.ReservationDeleteManyArgs> = z.object({
  where: ReservationWhereInputSchema.optional(),
}).strict() ;

export const RenewalCreateArgsSchema: z.ZodType<Prisma.RenewalCreateArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  data: z.union([ RenewalCreateInputSchema,RenewalUncheckedCreateInputSchema ]),
}).strict() ;

export const RenewalUpsertArgsSchema: z.ZodType<Prisma.RenewalUpsertArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  where: RenewalWhereUniqueInputSchema,
  create: z.union([ RenewalCreateInputSchema,RenewalUncheckedCreateInputSchema ]),
  update: z.union([ RenewalUpdateInputSchema,RenewalUncheckedUpdateInputSchema ]),
}).strict() ;

export const RenewalCreateManyArgsSchema: z.ZodType<Prisma.RenewalCreateManyArgs> = z.object({
  data: z.union([ RenewalCreateManyInputSchema,RenewalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RenewalDeleteArgsSchema: z.ZodType<Prisma.RenewalDeleteArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  where: RenewalWhereUniqueInputSchema,
}).strict() ;

export const RenewalUpdateArgsSchema: z.ZodType<Prisma.RenewalUpdateArgs> = z.object({
  select: RenewalSelectSchema.optional(),
  include: RenewalIncludeSchema.optional(),
  data: z.union([ RenewalUpdateInputSchema,RenewalUncheckedUpdateInputSchema ]),
  where: RenewalWhereUniqueInputSchema,
}).strict() ;

export const RenewalUpdateManyArgsSchema: z.ZodType<Prisma.RenewalUpdateManyArgs> = z.object({
  data: z.union([ RenewalUpdateManyMutationInputSchema,RenewalUncheckedUpdateManyInputSchema ]),
  where: RenewalWhereInputSchema.optional(),
}).strict() ;

export const RenewalDeleteManyArgsSchema: z.ZodType<Prisma.RenewalDeleteManyArgs> = z.object({
  where: RenewalWhereInputSchema.optional(),
}).strict() ;

export const MaintenanceCreateArgsSchema: z.ZodType<Prisma.MaintenanceCreateArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  data: z.union([ MaintenanceCreateInputSchema,MaintenanceUncheckedCreateInputSchema ]),
}).strict() ;

export const MaintenanceUpsertArgsSchema: z.ZodType<Prisma.MaintenanceUpsertArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  where: MaintenanceWhereUniqueInputSchema,
  create: z.union([ MaintenanceCreateInputSchema,MaintenanceUncheckedCreateInputSchema ]),
  update: z.union([ MaintenanceUpdateInputSchema,MaintenanceUncheckedUpdateInputSchema ]),
}).strict() ;

export const MaintenanceCreateManyArgsSchema: z.ZodType<Prisma.MaintenanceCreateManyArgs> = z.object({
  data: z.union([ MaintenanceCreateManyInputSchema,MaintenanceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MaintenanceDeleteArgsSchema: z.ZodType<Prisma.MaintenanceDeleteArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  where: MaintenanceWhereUniqueInputSchema,
}).strict() ;

export const MaintenanceUpdateArgsSchema: z.ZodType<Prisma.MaintenanceUpdateArgs> = z.object({
  select: MaintenanceSelectSchema.optional(),
  include: MaintenanceIncludeSchema.optional(),
  data: z.union([ MaintenanceUpdateInputSchema,MaintenanceUncheckedUpdateInputSchema ]),
  where: MaintenanceWhereUniqueInputSchema,
}).strict() ;

export const MaintenanceUpdateManyArgsSchema: z.ZodType<Prisma.MaintenanceUpdateManyArgs> = z.object({
  data: z.union([ MaintenanceUpdateManyMutationInputSchema,MaintenanceUncheckedUpdateManyInputSchema ]),
  where: MaintenanceWhereInputSchema.optional(),
}).strict() ;

export const MaintenanceDeleteManyArgsSchema: z.ZodType<Prisma.MaintenanceDeleteManyArgs> = z.object({
  where: MaintenanceWhereInputSchema.optional(),
}).strict() ;

export const MaintainerCreateArgsSchema: z.ZodType<Prisma.MaintainerCreateArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  data: z.union([ MaintainerCreateInputSchema,MaintainerUncheckedCreateInputSchema ]),
}).strict() ;

export const MaintainerUpsertArgsSchema: z.ZodType<Prisma.MaintainerUpsertArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  where: MaintainerWhereUniqueInputSchema,
  create: z.union([ MaintainerCreateInputSchema,MaintainerUncheckedCreateInputSchema ]),
  update: z.union([ MaintainerUpdateInputSchema,MaintainerUncheckedUpdateInputSchema ]),
}).strict() ;

export const MaintainerCreateManyArgsSchema: z.ZodType<Prisma.MaintainerCreateManyArgs> = z.object({
  data: z.union([ MaintainerCreateManyInputSchema,MaintainerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MaintainerDeleteArgsSchema: z.ZodType<Prisma.MaintainerDeleteArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  where: MaintainerWhereUniqueInputSchema,
}).strict() ;

export const MaintainerUpdateArgsSchema: z.ZodType<Prisma.MaintainerUpdateArgs> = z.object({
  select: MaintainerSelectSchema.optional(),
  include: MaintainerIncludeSchema.optional(),
  data: z.union([ MaintainerUpdateInputSchema,MaintainerUncheckedUpdateInputSchema ]),
  where: MaintainerWhereUniqueInputSchema,
}).strict() ;

export const MaintainerUpdateManyArgsSchema: z.ZodType<Prisma.MaintainerUpdateManyArgs> = z.object({
  data: z.union([ MaintainerUpdateManyMutationInputSchema,MaintainerUncheckedUpdateManyInputSchema ]),
  where: MaintainerWhereInputSchema.optional(),
}).strict() ;

export const MaintainerDeleteManyArgsSchema: z.ZodType<Prisma.MaintainerDeleteManyArgs> = z.object({
  where: MaintainerWhereInputSchema.optional(),
}).strict() ;

export const AcademicSessionCreateArgsSchema: z.ZodType<Prisma.AcademicSessionCreateArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  data: z.union([ AcademicSessionCreateInputSchema,AcademicSessionUncheckedCreateInputSchema ]),
}).strict() ;

export const AcademicSessionUpsertArgsSchema: z.ZodType<Prisma.AcademicSessionUpsertArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  where: AcademicSessionWhereUniqueInputSchema,
  create: z.union([ AcademicSessionCreateInputSchema,AcademicSessionUncheckedCreateInputSchema ]),
  update: z.union([ AcademicSessionUpdateInputSchema,AcademicSessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const AcademicSessionCreateManyArgsSchema: z.ZodType<Prisma.AcademicSessionCreateManyArgs> = z.object({
  data: z.union([ AcademicSessionCreateManyInputSchema,AcademicSessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AcademicSessionDeleteArgsSchema: z.ZodType<Prisma.AcademicSessionDeleteArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  where: AcademicSessionWhereUniqueInputSchema,
}).strict() ;

export const AcademicSessionUpdateArgsSchema: z.ZodType<Prisma.AcademicSessionUpdateArgs> = z.object({
  select: AcademicSessionSelectSchema.optional(),
  include: AcademicSessionIncludeSchema.optional(),
  data: z.union([ AcademicSessionUpdateInputSchema,AcademicSessionUncheckedUpdateInputSchema ]),
  where: AcademicSessionWhereUniqueInputSchema,
}).strict() ;

export const AcademicSessionUpdateManyArgsSchema: z.ZodType<Prisma.AcademicSessionUpdateManyArgs> = z.object({
  data: z.union([ AcademicSessionUpdateManyMutationInputSchema,AcademicSessionUncheckedUpdateManyInputSchema ]),
  where: AcademicSessionWhereInputSchema.optional(),
}).strict() ;

export const AcademicSessionDeleteManyArgsSchema: z.ZodType<Prisma.AcademicSessionDeleteManyArgs> = z.object({
  where: AcademicSessionWhereInputSchema.optional(),
}).strict() ;

export const BuildingCreateArgsSchema: z.ZodType<Prisma.BuildingCreateArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  data: z.union([ BuildingCreateInputSchema,BuildingUncheckedCreateInputSchema ]),
}).strict() ;

export const BuildingUpsertArgsSchema: z.ZodType<Prisma.BuildingUpsertArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
  create: z.union([ BuildingCreateInputSchema,BuildingUncheckedCreateInputSchema ]),
  update: z.union([ BuildingUpdateInputSchema,BuildingUncheckedUpdateInputSchema ]),
}).strict() ;

export const BuildingCreateManyArgsSchema: z.ZodType<Prisma.BuildingCreateManyArgs> = z.object({
  data: z.union([ BuildingCreateManyInputSchema,BuildingCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BuildingDeleteArgsSchema: z.ZodType<Prisma.BuildingDeleteArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const BuildingUpdateArgsSchema: z.ZodType<Prisma.BuildingUpdateArgs> = z.object({
  select: BuildingSelectSchema.optional(),
  include: BuildingIncludeSchema.optional(),
  data: z.union([ BuildingUpdateInputSchema,BuildingUncheckedUpdateInputSchema ]),
  where: BuildingWhereUniqueInputSchema,
}).strict() ;

export const BuildingUpdateManyArgsSchema: z.ZodType<Prisma.BuildingUpdateManyArgs> = z.object({
  data: z.union([ BuildingUpdateManyMutationInputSchema,BuildingUncheckedUpdateManyInputSchema ]),
  where: BuildingWhereInputSchema.optional(),
}).strict() ;

export const BuildingDeleteManyArgsSchema: z.ZodType<Prisma.BuildingDeleteManyArgs> = z.object({
  where: BuildingWhereInputSchema.optional(),
}).strict() ;

export const AnnouncementCreateArgsSchema: z.ZodType<Prisma.AnnouncementCreateArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  data: z.union([ AnnouncementCreateInputSchema,AnnouncementUncheckedCreateInputSchema ]),
}).strict() ;

export const AnnouncementUpsertArgsSchema: z.ZodType<Prisma.AnnouncementUpsertArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  where: AnnouncementWhereUniqueInputSchema,
  create: z.union([ AnnouncementCreateInputSchema,AnnouncementUncheckedCreateInputSchema ]),
  update: z.union([ AnnouncementUpdateInputSchema,AnnouncementUncheckedUpdateInputSchema ]),
}).strict() ;

export const AnnouncementCreateManyArgsSchema: z.ZodType<Prisma.AnnouncementCreateManyArgs> = z.object({
  data: z.union([ AnnouncementCreateManyInputSchema,AnnouncementCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnnouncementDeleteArgsSchema: z.ZodType<Prisma.AnnouncementDeleteArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  where: AnnouncementWhereUniqueInputSchema,
}).strict() ;

export const AnnouncementUpdateArgsSchema: z.ZodType<Prisma.AnnouncementUpdateArgs> = z.object({
  select: AnnouncementSelectSchema.optional(),
  data: z.union([ AnnouncementUpdateInputSchema,AnnouncementUncheckedUpdateInputSchema ]),
  where: AnnouncementWhereUniqueInputSchema,
}).strict() ;

export const AnnouncementUpdateManyArgsSchema: z.ZodType<Prisma.AnnouncementUpdateManyArgs> = z.object({
  data: z.union([ AnnouncementUpdateManyMutationInputSchema,AnnouncementUncheckedUpdateManyInputSchema ]),
  where: AnnouncementWhereInputSchema.optional(),
}).strict() ;

export const AnnouncementDeleteManyArgsSchema: z.ZodType<Prisma.AnnouncementDeleteManyArgs> = z.object({
  where: AnnouncementWhereInputSchema.optional(),
}).strict() ;

export const PasswordResetTokenCreateArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  data: z.union([ PasswordResetTokenCreateInputSchema,PasswordResetTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const PasswordResetTokenUpsertArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpsertArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
  create: z.union([ PasswordResetTokenCreateInputSchema,PasswordResetTokenUncheckedCreateInputSchema ]),
  update: z.union([ PasswordResetTokenUpdateInputSchema,PasswordResetTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const PasswordResetTokenCreateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyArgs> = z.object({
  data: z.union([ PasswordResetTokenCreateManyInputSchema,PasswordResetTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PasswordResetTokenDeleteArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenUpdateArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  data: z.union([ PasswordResetTokenUpdateInputSchema,PasswordResetTokenUncheckedUpdateInputSchema ]),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenUpdateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyArgs> = z.object({
  data: z.union([ PasswordResetTokenUpdateManyMutationInputSchema,PasswordResetTokenUncheckedUpdateManyInputSchema ]),
  where: PasswordResetTokenWhereInputSchema.optional(),
}).strict() ;

export const PasswordResetTokenDeleteManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteManyArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(),
}).strict() ;