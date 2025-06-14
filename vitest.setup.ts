import { setupServer } from "msw/node";
import type { SetupServerApi } from "msw/node";
import { beforeAll, afterEach, afterAll } from "vitest";

export const server: SetupServerApi = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
