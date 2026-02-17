const client = async () => {
  const conn = await Deno.connect({
    port: 3030,
  });

  const input = prompt("enter to whom you want to send");
  conn.write(new TextEncoder().encode("hello"));
};

client();
