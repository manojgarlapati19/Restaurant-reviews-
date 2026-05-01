import type { ApiEnvelope, ApiError, PageMeta } from "@dishcovery/types";

export function success<T>(data: T, meta?: PageMeta): ApiEnvelope<T> {
  return {
    data,
    ...(meta ? { meta } : {}),
    error: null
  };
}

export function failure(error: ApiError, meta?: PageMeta): ApiEnvelope<null> {
  return {
    data: null,
    ...(meta ? { meta } : {}),
    error
  };
}
