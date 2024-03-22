import { faker } from "@faker-js/faker";
import {
  AcademicSession,
  Admin,
  Announcement,
  AnnouncementStatus,
  Building,
  Faculty,
  Gender,
  Lodgment,
  Maintainer,
  Maintenance,
  MaintenanceStatus,
  MaintenanceType,
  Origin,
  PrismaClient,
  Renewal,
  RenewalStatus,
  Reservation,
  Role,
  Student,
  User,
} from "@prisma/client";
import { hashSync } from "bcrypt";

const PASSWORD_DEFAULT_VALUE = "password";
export const hashPassword = (): string => {
  const passwordSaltRounds: number = 10;

  return hashSync(PASSWORD_DEFAULT_VALUE, passwordSaltRounds);
};

const prismaClient = new PrismaClient();

const main = async () => {
  const createPhoneNumber = (): string => {
    // TODO improve format
    return faker.phone.number();
  };

  const createGender = (): Gender => {
    return faker.helpers.arrayElement<Gender>(["FEMALE", "MALE"]);
  };

  const createFirstName = (gender: Gender): string => {
    const mappedSex: Record<Gender, "female" | "male"> = {
      FEMALE: "female",
      MALE: "male",
    };

    return faker.person.firstName(mappedSex[gender]);
  };

  const createName = (gender: Gender): string => {
    const mappedSex: Record<Gender, "female" | "male"> = {
      FEMALE: "female",
      MALE: "male",
    };

    return faker.person.lastName(mappedSex[gender]);
  };

  const createOrigin = (): Origin => {
    return faker.helpers.arrayElement<Origin>(["FOREIGNER", "NATIONAL"]);
  };

  const createMaintenanceType = (): MaintenanceType => {
    return faker.helpers.arrayElement<MaintenanceType>([
      "ELECTRICAL",
      "EQUIPMENT",
      "HVAC",
      "OTHER",
      "PLUMBING",
    ]);
  };

  const createNICUrl = (): string => {
    return faker.image.urlLoremFlickr({
      category: "passport,card",
    });
  };

  const createNIC = (): string => {
    return faker.helpers.fromRegExp(/[0-9]{3} [0-9]{3} [0-9]{3} [0-9]{3}/);
  };

  const createSchoolCertificateUrl = (): string => {
    return faker.image.urlLoremFlickr({
      category: "book,copybook",
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Faculty                                  */
  /* -------------------------------------------------------------------------- */

  const createFaculty = (): Promise<Faculty> => {
    return prismaClient.faculty.create({
      data: {
        name: faker.company.name(),
      },
    });
  };

  const createFaculties = (): Promise<Faculty[]> => {
    const count: number = faker.number.int({
      min: 7,
      max: 10,
    });

    return Promise.all(new Array(count).fill(0).map(() => createFaculty()));
  };

  const facultyIds: number[] = await createFaculties().then(
    (faculties: Faculty[]) => faculties.map((faculty: Faculty) => faculty.id),
  );

  /* -------------------------------------------------------------------------- */
  /*                              Academic Session                              */
  /* -------------------------------------------------------------------------- */

  const createAcademicSession = (startAt: Date): Promise<AcademicSession> => {
    const endAt: Date = new Date(startAt.getTime());
    endAt.setFullYear(endAt.getFullYear() + 1);

    return prismaClient.academicSession.create({
      data: {
        startAt,
        endAt,
      },
    });
  };

  const createAcademicSessions = (): Promise<AcademicSession[]> => {
    const count = faker.number.int({
      min: 3,
      max: 4,
    });

    const thisYear: number = new Date().getFullYear();
    let initialYear: number = thisYear - count;

    return Promise.all(
      new Array(count).fill(0).map(() => {
        const startYear = new Date();
        startYear.setFullYear(initialYear, 0, 1);
        startYear.setHours(0, 0, 0, 0);
        initialYear += 1;

        return createAcademicSession(startYear);
      }),
    );
  };

  const academicSessions: AcademicSession[] = await createAcademicSessions();

  /* -------------------------------------------------------------------------- */
  /*                                  Building                                  */
  /* -------------------------------------------------------------------------- */

  const createBuilding = (name: string): Promise<Building> => {
    return prismaClient.building.create({
      data: {
        floors: faker.number.int({
          min: 1,
          max: 3,
        }),
        illustrationUrl: faker.image.urlLoremFlickr({
          category: "building,house",
        }),
        name,
      },
    });
  };

  const createBuildings = (): Promise<Building[]> => {
    const count: number = 3;
    let initialCharCode = 65; // A

    return Promise.all(
      new Array(count).fill(0).map(() => {
        const buildingName: string = String.fromCharCode(initialCharCode);
        initialCharCode += 1;

        return createBuilding(buildingName);
      }),
    );
  };

  const buildings: Building[] = await createBuildings();

  /* -------------------------------------------------------------------------- */
  /*                                  Lodgment                                  */
  /* -------------------------------------------------------------------------- */

  const lodgmentIdFloorArr: [number, number[]][] = [];
  buildings.forEach((building: Building) => {
    const floors: number[] = [];
    for (let i = 0; i <= building.floors; i++) {
      floors.push(i);
    }
    lodgmentIdFloorArr.push([building.id, floors]);
  });

  const createLodgment = (
    buildingId: number,
    floor: number,
    roomNumber: number,
  ): Promise<Lodgment> => {
    const capacity: number = faker.number.int({
      min: 3,
      max: 5,
    });

    return prismaClient.lodgment.create({
      data: {
        capacity,
        floor,
        roomNumber,
        status: "AVAILABLE",
        buildingId,
      },
    });
  };

  const createLodgments = async (): Promise<Lodgment[]> => {
    const result: Lodgment[] = [];

    for (const lodgmentIdFloor of lodgmentIdFloorArr) {
      let initialRoomNumber: number = 1;

      const lodgments: Lodgment[] = (
        await Promise.all(
          lodgmentIdFloor[1].map(async (floor: number) => {
            const roomNumber: number = initialRoomNumber;
            initialRoomNumber += 1;

            const count: number = faker.number.int({
              min: 5,
              max: 10,
            });

            return Promise.all(
              new Array(count)
                .fill(0)
                .map(() =>
                  createLodgment(lodgmentIdFloor[0], floor, roomNumber),
                ),
            );
            // return createLodgment(lodgmentIdFloor[0], floor, roomNumber);
          }),
        )
      ).flatMap((value: Lodgment[]): Lodgment[] => value);

      result.push(...lodgments);
    }

    return result;
  };

  const lodgments: Lodgment[] = await createLodgments();
  const computeAvailableLodgments = (): Lodgment[] => {
    return lodgments.filter((lodgment: Lodgment) => lodgment.capacity > 0);
  };

  /* -------------------------------------------------------------------------- */
  /*                                    User                                    */
  /* -------------------------------------------------------------------------- */

  const createUser = (refDate?: Date): Promise<User> => {
    const gender: Gender = createGender();
    const firstName: string = createFirstName(gender);
    const name: string = createName(gender);
    const createdAt: Date = faker.date.past({
      refDate,
    });

    return prismaClient.user.create({
      data: {
        email: faker.internet.email({
          firstName,
          lastName: name,
        }),
        firstName,
        name,
        password: hashPassword(),
        phoneNumber: faker.phone.number(),
        profileUrl: faker.image.avatarLegacy(),
        createdAt,
        updatedAt: createdAt,
      },
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                    Admin                                   */
  /* -------------------------------------------------------------------------- */

  const createAdmin = async (role: Role): Promise<Admin> => {
    const user: User = await createUser();

    return prismaClient.admin.create({
      data: {
        role,
        userId: user.id,
      },
    });
  };

  const createAdmins = (): Promise<Admin[]> => {
    return Promise.all([
      createAdmin("ROOT"),
      createAdmin("MAINTENANCE"),
      createAdmin("MAINTENANCE"),
      createAdmin("RENEWAL"),
      createAdmin("RENEWAL"),
      createAdmin("RESERVATION"),
      createAdmin("RESERVATION"),
    ]);
  };

  const admins: Admin[] = await createAdmins();
  const filterAdminByRole = (role: Role): Admin[] =>
    admins.filter((admin: Admin) => admin.role === role);
  const renewalAdmins: Admin[] = filterAdminByRole("RENEWAL");
  const reservationAdmins: Admin[] = filterAdminByRole("RESERVATION");
  const maintenanceAdmins: Admin[] = filterAdminByRole("MAINTENANCE");

  /* -------------------------------------------------------------------------- */
  /*                                 Reservation                                */
  /* -------------------------------------------------------------------------- */

  const createReservation = (
    status: RenewalStatus,
    academicSession: AcademicSession,
  ): Promise<Reservation> => {
    const gender: Gender = createGender();
    const firstName: string = createFirstName(gender);
    const name: string = createName(gender);
    const email: string = faker.internet.email({
      firstName,
      lastName: name,
    });
    const createdAt: Date = faker.date.past();

    return prismaClient.reservation.create({
      data: {
        emergencyNumber: createPhoneNumber(),
        NICUrl: createNICUrl(),
        phoneNumber: faker.phone.number(),
        profileUrl: faker.image.avatarLegacy(),
        schoolCertificateUrl: createSchoolCertificateUrl(),
        status,
        academicSessionId: academicSession.id,
        facultyId: faker.helpers.arrayElement(facultyIds),
        adminId: faker.helpers.arrayElement(reservationAdmins).userId,
        email,
        firstName,
        name,
        gender,
        NIC: createNIC(),
        origin: createOrigin(),
        createdAt,
        updatedAt: createdAt,
      },
    });
  };

  const createReservations = async (): Promise<Reservation[]> => {
    const result: Reservation[] = [];

    for (let i = 0; i < academicSessions.length - 1; i++) {
      const academicSession = academicSessions[i];

      const count: number = faker.number.int({
        min: 30,
        max: 40,
      });

      const reservations: Reservation[] = await Promise.all(
        new Array(count)
          .fill(0)
          .map(() => createReservation("REFUSED", academicSession)),
      );

      result.push(...reservations);
    }

    const count: number = faker.number.int({
      min: 30,
      max: 40,
    });

    const reservations: Reservation[] = await Promise.all(
      new Array(count)
        .fill(0)
        .map(() =>
          createReservation(
            "PENDING",
            academicSessions[academicSessions.length - 1],
          ),
        ),
    );

    result.push(...reservations);

    return result;
  };

  await createReservations();

  /* -------------------------------------------------------------------------- */
  /*                                   Student                                  */
  /* -------------------------------------------------------------------------- */

  const createStudent = async (
    academicSession: AcademicSession,
  ): Promise<Student> => {
    const user: User = await createUser(academicSession.startAt);
    const availableLodgments: Lodgment[] = computeAvailableLodgments();
    const lodgment: Lodgment = faker.helpers.arrayElement(availableLodgments);
    lodgment.capacity -= 1;

    return prismaClient.student.create({
      data: {
        emergencyNumber: faker.phone.number(),
        gender: faker.helpers.arrayElement(["FEMALE", "MALE"]),
        NIC: faker.helpers.fromRegExp(/[0-9]{3} [0-9]{3} [0-9]{3} [0-9]{3}/),
        origin: faker.helpers.arrayElement(["NATIONAL", "FOREIGNER"]),
        facultyId: faker.helpers.arrayElement(facultyIds),
        lodgmentId: lodgment.id,
        userId: user.id,
      },
    });
  };

  const createStudents = async (): Promise<Student[]> => {
    const result: Student[] = [];

    for (const academicSession of academicSessions) {
      // create
      const count: number = faker.number.int({
        min: 15,
        max: 20,
      });

      const students: Student[] = await Promise.all(
        new Array(count).fill(0).map(async () => {
          await createReservation("ACCEPTED", academicSession);
          return createStudent(academicSession);
        }),
      );

      result.push(...students);
    }

    return result;
  };

  const students: Student[] = await createStudents();

  /* -------------------------------------------------------------------------- */
  /*                                   Renewal                                  */
  /* -------------------------------------------------------------------------- */

  const createRenewal = (
    student: Student,
    status: RenewalStatus,
    academicSession: AcademicSession,
  ): Promise<Renewal> => {
    const createdAt: Date = faker.date.future({
      refDate: academicSession.startAt,
    });

    return prismaClient.renewal.create({
      data: {
        emergencyNumber: student.emergencyNumber,
        NICUrl: createNICUrl(),
        phoneNumber: faker.phone.number(),
        profileUrl: faker.image.avatarLegacy(),
        schoolCertificateUrl: createSchoolCertificateUrl(),
        status,
        academicSessionId: academicSession.id,
        facultyId: faker.helpers.arrayElement(facultyIds),
        adminId: faker.helpers.arrayElement(renewalAdmins).userId,
        studentId: student.userId,
        createdAt,
        updatedAt: createdAt,
      },
    });
  };

  const createRenewals = async (): Promise<Renewal[]> => {
    const result: Renewal[] = [];

    for (const student of students) {
      // renewals session starts with reservation + 1
      for (let i = 1; i < academicSessions.length - 1; i++) {
        result.push(
          await createRenewal(student, "ACCEPTED", academicSessions[i]),
        );
      }

      result.push(
        await createRenewal(
          student,
          "PENDING",
          academicSessions[academicSessions.length - 1],
        ),
      );
    }

    return result;
  };

  await createRenewals();

  /* -------------------------------------------------------------------------- */
  /*                                 Maintainer                                 */
  /* -------------------------------------------------------------------------- */

  const createMaintainer = (): Promise<Maintainer> => {
    const firstName: string = createFirstName("MALE");
    const name: string = createName("MALE");

    return prismaClient.maintainer.create({
      data: {
        firstName,
        name,
        phoneNumber: createPhoneNumber(),
      },
    });
  };

  const createMaintainers = (): Promise<Maintainer[]> => {
    const count: number = faker.number.int({
      min: 3,
      max: 5,
    });

    return Promise.all(new Array(count).fill(0).map(() => createMaintainer()));
  };

  const maintainers: Maintainer[] = await createMaintainers();

  /* -------------------------------------------------------------------------- */
  /*                                 Maintenance                                */
  /* -------------------------------------------------------------------------- */

  const createMaintenance = (
    status: MaintenanceStatus,
    refDate?: Date,
  ): Promise<Maintenance> => {
    const createdAt: Date = faker.date.future({
      refDate,
    });

    let maintainerConnects: { id: number }[] = [];
    if (status === "DONE" || status === "ONGOING") {
      maintainerConnects = faker.helpers
        .arrayElements<Maintainer>(maintainers, {
          min: 1,
          max: 3,
        })
        .map((maintainer: Maintainer) => {
          return {
            id: maintainer.id,
          };
        });
    }

    return prismaClient.maintenance.create({
      data: {
        type: createMaintenanceType(),
        lodgmentId: faker.helpers.arrayElement(lodgments).id,
        status,
        adminId: faker.helpers.arrayElement(maintenanceAdmins).userId,
        createdAt,
        updatedAt: createdAt,
        maintainers: {
          connect: maintainerConnects,
        },
      },
    });
  };

  const createMaintenances = async (): Promise<Maintenance[]> => {
    const result: Maintenance[] = [];

    for (let i = 0; i < academicSessions.length - 1; i++) {
      const academicSession = academicSessions[i];
      const count: number = faker.number.int({
        min: 2,
        max: 5,
      });

      const maintenances: Maintenance[] = await Promise.all(
        new Array(count)
          .fill(0)
          .map(() =>
            createMaintenance(
              faker.helpers.arrayElement<MaintenanceStatus>([
                "DONE",
                "REFUSED",
              ]),
              academicSession.startAt,
            ),
          ),
      );
      result.push(...maintenances);
    }

    const count: number = faker.number.int({
      min: 2,
      max: 5,
    });

    const maintenances: Maintenance[] = await Promise.all(
      new Array(count)
        .fill(0)
        .map(() =>
          createMaintenance(
            faker.helpers.arrayElement<MaintenanceStatus>([
              "PENDING",
              "ONGOING",
            ]),
          ),
        ),
    );
    result.push(...maintenances);

    return result;
  };

  await createMaintenances();

  /* -------------------------------------------------------------------------- */
  /*                                Announcement                                */
  /* -------------------------------------------------------------------------- */

  const createAnnouncement = (
    status: AnnouncementStatus,
    refDate?: Date,
  ): Promise<Announcement> => {
    const createdAt: Date = faker.date.future({
      refDate,
    });

    let startAt: Date | undefined;
    let endAt: Date | undefined;
    if (
      faker.number.int({
        max: 10,
      }) %
        2 ===
      0
    ) {
      startAt = faker.date.future({
        refDate,
      });
      endAt = faker.date.soon({
        days: faker.number.int({
          min: 2,
          max: 5,
        }),
        refDate: startAt,
      });
    }

    let illustrationUrl: string | undefined;
    if (
      faker.number.int({
        max: 10,
      }) %
        2 ===
      0
    ) {
      illustrationUrl = faker.image.url();
    }

    return prismaClient.announcement.create({
      data: {
        title: faker.lorem.text(),
        content: faker.lorem.paragraphs({
          max: 7,
          min: 3,
        }),
        status,
        createdAt,
        updatedAt: createdAt,
        illustrationUrl,
        startAt,
        endAt,
      },
    });
  };

  const createAnnouncements = async (): Promise<Announcement[]> => {
    const result: Announcement[] = [];

    for (let i = 0; i < academicSessions.length - 1; i++) {
      const academicSession: AcademicSession = academicSessions[i];

      const count: number = faker.number.int({
        min: 7,
        max: 15,
      });

      const announcements: Announcement[] = await Promise.all(
        new Array(count)
          .fill(0)
          .map(() => createAnnouncement("PUBLISHED", academicSession.startAt)),
      );
      result.push(...announcements);
    }

    const count: number = faker.number.int({
      min: 7,
      max: 15,
    });

    const announcements: Announcement[] = await Promise.all(
      new Array(count)
        .fill(0)
        .map(() =>
          createAnnouncement(
            faker.helpers.arrayElement<AnnouncementStatus>([
              "DRAFT",
              "PUBLISHED",
            ]),
            academicSessions[academicSessions.length - 1].startAt,
          ),
        ),
    );
    result.push(...announcements);

    return result;
  };

  await createAnnouncements();
};

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })

  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);

    await prismaClient.$disconnect();

    process.exit(1);
  });
