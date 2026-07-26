export const getCalibrationCacheKey = (userId: string) =>
  `latest-calibration:${userId}`;

export const getStoredCalibration = (userId: string): unknown => {
  const key = getCalibrationCacheKey(userId);
  const saved = window.localStorage.getItem(key);

  if (!saved) {
    return null;
  }

  try {
    const report: unknown = JSON.parse(saved);

    if (
      typeof report !== "object" ||
      report === null ||
      !("ownerId" in report) ||
      report.ownerId !== userId
    ) {
      window.localStorage.removeItem(key);
      return null;
    }

    return report;
  } catch {
    window.localStorage.removeItem(key);
    return null;
  }
};
