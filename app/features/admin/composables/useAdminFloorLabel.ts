export function useAdminFloorLabel() {
  const { t } = useI18n();

  const formatFloor = (floorNumber: number) => {
    if (floorNumber === 0) {
      return t('admin.floor.ground');
    }

    if (floorNumber < 0) {
      return t('admin.floor.basement', { n: Math.abs(floorNumber) });
    }

    if (floorNumber === 1) {
      return t('admin.floor.first');
    }

    return t('admin.floor.ordinal', { n: floorNumber });
  };

  const formatLocationLine = (
    buildingName: string,
    floor: number,
    roomNumber: number | string
  ) =>
    t('admin.location.line', {
      building: t('admin.location.building', { name: buildingName }),
      floor: formatFloor(floor),
      room: t('admin.location.room', { number: roomNumber }),
    });

  return { formatFloor, formatLocationLine };
}
