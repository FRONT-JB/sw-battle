export const TOASTIFY_ALERT = {
  SUCCESS: (successValue: string) => `${successValue} Success.`,
  FAILED: (failValue: string) => `${failValue} Fail, Please try again.`,
  CONFLICT: (conflictTarget: string) => `These are Conflict ${conflictTarget}.`,
} as const;
