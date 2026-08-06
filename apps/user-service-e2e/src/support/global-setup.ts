import { waitForPortOpen } from '@nx/node/utils';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.)
  console.log('\nSetting up...\n');

  const host = process.env.HOST ?? 'localhost';
  // USER_SERVICE_PORT from .env = 5002
  const port = process.env.USER_SERVICE_PORT
    ? Number(process.env.USER_SERVICE_PORT)
    : 5002;

  console.log(`Waiting for user-service on ${host}:${port}...`);

  await waitForPortOpen(port, { host, retries: 30, retryDelay: 1000 });

  console.log(`user-service is ready on port ${port}`);

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
