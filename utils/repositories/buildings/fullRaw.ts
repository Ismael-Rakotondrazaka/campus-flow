import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type BuildingFullRaw = Simplify<
  prismaCtx.Building & {
    lodgments: (prismaCtx.Lodgment & {
      _count: {
        students: number;
      };
    })[];
  } & {
    _count: {
      lodgments: number;
    };
  }
>;

export const buildingFullRawToBuildingFull = (
  building: BuildingFullRaw,
): BuildingFull => {
  const buildingFull: BuildingFull = {
    id: building.id,
    name: building.name,
    floors: building.floors,
    illustrationUrl: building.illustrationUrl,
    createdAt: building.createdAt,
    updatedAt: building.updatedAt,
    deletedAt: building.deletedAt,
    _count: {
      lodgments: building._count.lodgments,
      available: 0,
      capacity: 0,
      students: 0,
    },
  };

  building.lodgments.forEach((lodgement) => {
    buildingFull._count.available +=
      lodgement.capacity - lodgement._count.students;
    buildingFull._count.capacity += lodgement.capacity;
    buildingFull._count.students += lodgement._count.students;
  });

  return buildingFull;
};
