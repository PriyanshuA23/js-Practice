const handleUser = async (user) => {
  const buffer = new Uint8Array(1024);
  const bytesRead = await user.read(buffer);
  await Deno.stdout.write(buffer.slice(0, bytesRead));
};

const server = async () => {
  const listener = await Deno.listen({
    port: 3030,
  });

  for await (const user of listener) {
    await handleUser(user);
  }
};

server();
