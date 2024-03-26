import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type LodgmentFullRaw = Simplify<
  prismaCtx.Lodgment & {
    _count: {
      students: number;
      maintenances: number;
    };
    building: prismaCtx.Building;
  }
>;

export const lodgmentFullRawToLodgmentFull = (
  lodgment: LodgmentFullRaw,
): LodgmentFull => {
  const lodgmentFull: LodgmentFull = {
    id: lodgment.id,
    capacity: lodgment.capacity,
    floor: lodgment.floor,
    roomNumber: lodgment.roomNumber,
    buildingId: lodgment.buildingId,
    status: lodgment.status,
    createdAt: lodgment.createdAt,
    updatedAt: lodgment.updatedAt,
    deletedAt: lodgment.deletedAt,
    _count: {
      students: lodgment._count.students,
      maintenances: lodgment._count.maintenances,
      available: lodgment.capacity - lodgment._count.students,
    },
    building: lodgment.building,
  };

  return lodgmentFull;
};
