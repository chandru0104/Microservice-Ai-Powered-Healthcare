const net = require('net');
const { spawn } = require('child_process');

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => {
      resolve(false);
    });
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '0.0.0.0');
  });
}

async function findAvailablePort(startPort = 3000, maxPort = 3100) {
  for (let port = startPort; port <= maxPort; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found between ${startPort} and ${maxPort}`);
}

async function main() {
  const preferredPort = parseInt(process.env.PORT || '3000', 10);
  const port = await findAvailablePort(preferredPort);
  
  if (port !== preferredPort) {
    console.log(`\x1b[33m[INFO] Port ${preferredPort} is already in use. Automatically switching to port ${port}...\x1b[0m`);
  } else {
    console.log(`\x1b[32m[INFO] Starting client on port ${port}...\x1b[0m`);
  }

  const child = spawn(`npx nx run client:serve --port=${port}`, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: port.toString() }
  });

  child.on('error', (err) => {
    console.error('Failed to start client process:', err);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}

main();
