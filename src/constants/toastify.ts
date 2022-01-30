export const TOASTIFY_ALERT = {
  SUCCESS: (successValue: string) => `${successValue} Success.`,
  FAILED: (failValue: string) => `${failValue} Fail, Please try again.`,
} as const;
