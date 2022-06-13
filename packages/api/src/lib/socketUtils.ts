export function sendEvery(path: string, ...args: any[]) {
  for (const socket of [...socketConnections.values()]) {
    if (socket.disconnected) {
      socketConnections.delete(socket.id);
      continue;
    }

    socket.emit(path, ...args);
  }
}
