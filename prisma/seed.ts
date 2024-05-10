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
import { parsePhoneNumber } from "libphonenumber-js";
import {
  buildingsData,
  climatAnnouncementsData,
  electricalMaintenanceDescriptionsData,
  equipmentMaintenanceDescriptionsData,
  facultiesData,
  femaleIDCardsData,
  hvacMaintenanceDescriptionsData,
  maleIDCardsData,
  newYearAnnouncementsData,
  otherMaintenanceDescriptionsData,
  plumbingMaintenanceDescriptionsData,
  renewalAnnouncementsData,
  renewalResultAnnouncementsData,
  reservationAnnouncementsData,
  reservationResultAnnouncementsData,
  schoolCertificatesData,
  scienceDayAnnouncementsData,
} from "./seed.data";

const PASSWORD_DEFAULT_VALUE = "password";
export const hashPassword = (): string => {
  const passwordSaltRounds: number = 10;

  return hashSync(PASSWORD_DEFAULT_VALUE, passwordSaltRounds);
};

const prismaClient = new PrismaClient();

const main = async () => {
  const createPhoneNumber = (): string => {
    // French phone Number
    const rawPhoneNumber = faker.helpers.fromRegExp(
      /[+]33 [67] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}/,
    );

    const parsedPhoneNumber =
      parsePhoneNumber(rawPhoneNumber).formatInternational();

    return parsedPhoneNumber;
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

  const createNICUrl = (gender: Gender): string => {
    const gettersPerGender: Record<Gender, () => string> = {
      FEMALE: () => faker.helpers.arrayElement(femaleIDCardsData),
      MALE: () => faker.helpers.arrayElement(maleIDCardsData),
    };

    const getter = gettersPerGender[gender];

    return getter();
  };

  const createNIC = (): string => {
    return faker.helpers.fromRegExp(/[0-9]{3} [0-9]{3} [0-9]{3} [0-9]{3}/);
  };

  const createSchoolCertificateUrl = (): string => {
    return faker.helpers.arrayElement(schoolCertificatesData);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Faculty                                  */
  /* -------------------------------------------------------------------------- */

  const createFaculty = (name: string): Promise<Faculty> => {
    return prismaClient.faculty.create({
      data: {
        name,
      },
    });
  };

  const createFaculties = (): Promise<Faculty[]> => {
    return Promise.all(
      facultiesData.map((facultyName: string) => createFaculty(facultyName)),
    );
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

  const createBuilding = (
    name: string,
    illustrationUrl: string,
  ): Promise<Building> => {
    return prismaClient.building.create({
      data: {
        floors: faker.number.int({
          min: 1,
          max: 3,
        }),
        illustrationUrl,
        name,
      },
    });
  };

  const createBuildings = (): Promise<Building[]> => {
    let initialCharCode = 65; // A

    return Promise.all(
      buildingsData.map((illustrationUrl: string) => {
        const buildingName: string = String.fromCharCode(initialCharCode);
        initialCharCode += 1;

        return createBuilding(buildingName, illustrationUrl);
      }),
    );
  };

  const buildings: Building[] = await createBuildings();

  /* -------------------------------------------------------------------------- */
  /*                                  Lodgment                                  */
  /* -------------------------------------------------------------------------- */

  const buildingIdFloorArr: [number, number[]][] = [];
  buildings.forEach((building: Building) => {
    const floors: number[] = [];
    for (let i = 0; i <= building.floors; i++) {
      floors.push(i);
    }
    buildingIdFloorArr.push([building.id, floors]);
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

    for (const buildingIdFloor of buildingIdFloorArr) {
      let initialRoomNumber: number = 0;

      const lodgments: Lodgment[] = (
        await Promise.all(
          buildingIdFloor[1].map(async (floor: number) => {
            const count: number = faker.number.int({
              min: 5,
              max: 10,
            });

            return Promise.all(
              new Array(count).fill(0).map(() => {
                const roomNumber: number = ++initialRoomNumber;

                return createLodgment(buildingIdFloor[0], floor, roomNumber);
              }),
            );
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
        email: faker.internet
          .email({
            firstName,
            lastName: name,
          })
          .toLowerCase(),
        firstName,
        name,
        password: hashPassword(),
        phoneNumber: createPhoneNumber(),
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
    const email: string = faker.internet
      .email({
        firstName,
        lastName: name,
      })
      .toLowerCase();
    const createdAt: Date = faker.date.past();

    return prismaClient.reservation.create({
      data: {
        emergencyNumber: createPhoneNumber(),
        NICUrl: createNICUrl(gender),
        phoneNumber: createPhoneNumber(),
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
        emergencyNumber: createPhoneNumber(),
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
        NICUrl: createNICUrl(student.gender),
        phoneNumber: createPhoneNumber(),
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
        profileUrl: faker.image.avatarLegacy(),
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

  const createMaintenanceDescription = (type: MaintenanceType): string => {
    const typeGetterObj: Record<MaintenanceType, () => string> = {
      ELECTRICAL: () =>
        faker.helpers.arrayElement(electricalMaintenanceDescriptionsData),
      EQUIPMENT: () =>
        faker.helpers.arrayElement(equipmentMaintenanceDescriptionsData),
      HVAC: () => faker.helpers.arrayElement(hvacMaintenanceDescriptionsData),
      PLUMBING: () =>
        faker.helpers.arrayElement(plumbingMaintenanceDescriptionsData),
      OTHER: () => faker.helpers.arrayElement(otherMaintenanceDescriptionsData),
    };

    const getter = typeGetterObj[type];

    return getter();
  };

  const createMaintenance = (
    status: MaintenanceStatus,
    refDate?: Date,
  ): Promise<Maintenance> => {
    const createdAt: Date = faker.date.future({
      refDate,
    });

    let maintainerConnects: { id: number }[] = [];
    let startAt: Date | undefined;
    let endAt: Date | undefined;
    if (status === "DONE" || status === "ACCEPTED") {
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

      startAt = faker.date.soon({
        days: faker.number.int({
          min: 5,
          max: 15,
        }),
        refDate: createdAt,
      });

      if (status === "DONE") {
        endAt = faker.date.soon({
          days: faker.number.int({
            min: 5,
            max: 15,
          }),
          refDate: startAt,
        });
      }
    }

    const maintenanceType: MaintenanceType = createMaintenanceType();

    return prismaClient.maintenance.create({
      data: {
        type: maintenanceType,
        lodgmentId: faker.helpers.arrayElement(lodgments).id,
        status,
        description: createMaintenanceDescription(maintenanceType),
        adminId: faker.helpers.arrayElement(maintenanceAdmins).userId,
        startAt,
        endAt,
        createdAt,
        updatedAt: createdAt,
        studentId: faker.helpers.arrayElement(students).userId,
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
        min: 5,
        max: 10,
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
              "ACCEPTED",
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

  type AnnouncementSubject =
    | "NEW_YEAR"
    | "RENEWAL_RESULT"
    | "RENEWAL"
    | "RESERVATION"
    | "RESERVATION_RESULT"
    | "CLIMATE_CHANGE"
    | "SCIENCE_DAY";

  const announcementsDataGetters: Record<
    AnnouncementSubject,
    () => {
      title: string;
      content: string;
      illustrationUrl: string;
    }
  > = {
    NEW_YEAR: () => faker.helpers.arrayElement(newYearAnnouncementsData),
    RENEWAL: () => faker.helpers.arrayElement(renewalAnnouncementsData),
    RENEWAL_RESULT: () =>
      faker.helpers.arrayElement(renewalResultAnnouncementsData),
    RESERVATION: () => faker.helpers.arrayElement(reservationAnnouncementsData),
    RESERVATION_RESULT: () =>
      faker.helpers.arrayElement(reservationResultAnnouncementsData),
    CLIMATE_CHANGE: () => faker.helpers.arrayElement(climatAnnouncementsData),
    SCIENCE_DAY: () => faker.helpers.arrayElement(scienceDayAnnouncementsData),
  };

  // const announcementsCreators: Record<AnnouncementSubject, () => Promise<Announcement>> = {
  //   "NEW_YEAR": () => {
  //     const data =
  //   }
  // };

  // const getNewAnnouncementData = () =>

  const createAnnouncement = (
    status: AnnouncementStatus,
    subject: AnnouncementSubject,
    refDate?: Date,
  ): Promise<Announcement> => {
    const createdAt: Date = faker.date.future({
      refDate,
    });

    const data: {
      title: string;
      content: string;
      illustrationUrl: string;
    } = announcementsDataGetters[subject]();

    let startAt: Date | undefined;
    let endAt: Date | undefined;
    if (
      ["RENEWAL", "RESERVATION", "CLIMATE_CHANGE", "SCIENCE_DAY"].includes(
        subject,
      )
    ) {
      startAt = faker.date.future({
        refDate,
      });
      endAt = faker.date.soon({
        days: faker.number.int({
          min: 7,
          max: 10,
        }),
        refDate: startAt,
      });
    }

    return prismaClient.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        status,
        createdAt,
        updatedAt: createdAt,
        illustrationUrl: data.illustrationUrl,
        startAt,
        endAt,
      },
    });
  };

  const createAnnouncementsPerYear = async (
    isPast: boolean,
    refDate?: Date,
  ): Promise<Announcement[]> => {
    // it have order, so we don't use Promise.all
    const announcements: Announcement[] = [
      await createAnnouncement("PUBLISHED", "NEW_YEAR", refDate),
      await createAnnouncement("PUBLISHED", "RENEWAL", refDate),
      await createAnnouncement(
        isPast ? "PUBLISHED" : "DRAFT",
        "RENEWAL_RESULT",
        refDate,
      ),
      await createAnnouncement(
        isPast ? "PUBLISHED" : "DRAFT",
        "RESERVATION",
        refDate,
      ),
      await createAnnouncement(
        isPast ? "PUBLISHED" : "DRAFT",
        "RESERVATION_RESULT",
        refDate,
      ),
      await createAnnouncement(
        isPast ? "PUBLISHED" : "DRAFT",
        "CLIMATE_CHANGE",
        refDate,
      ),
      await createAnnouncement(
        isPast ? "PUBLISHED" : "DRAFT",
        "SCIENCE_DAY",
        refDate,
      ),
    ];

    return announcements;
  };

  const createAnnouncements = async (): Promise<Announcement[]> => {
    const result: Announcement[] = [];

    for (let i = 0; i < academicSessions.length - 1; i++) {
      const academicSession: AcademicSession = academicSessions[i];

      const announcements: Announcement[] = await createAnnouncementsPerYear(
        true,
        academicSession.startAt,
      );

      result.push(...announcements);
    }

    const announcements: Announcement[] = await createAnnouncementsPerYear(
      false,
      academicSessions[academicSessions.length - 1].startAt,
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
