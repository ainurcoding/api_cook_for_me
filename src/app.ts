// src/app.ts

import { Server } from './server';

(() => {
  main();
})();

function main(): void {
  const server = new Server(); 
  void server.start();
}
