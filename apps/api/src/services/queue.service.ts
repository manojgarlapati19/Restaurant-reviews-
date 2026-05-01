type JobPayload = Record<string, unknown>;

export async function enqueueJob(queueName: string, payload: JobPayload) {
  return {
    queueName,
    payload,
    queuedAt: new Date().toISOString()
  };
}
