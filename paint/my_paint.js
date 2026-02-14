const decoder = new TextDecoder();
const encoder = new TextEncoder();
const mouseTracking = "\x1b[?1002h\x1b[?1006h";
const colors = {
  red: { position: "\x1b[31;18H\x1b[31mred\x1b[0m", y: 31, x: 18 },
  green: { position: "\x1b[31;24H\x1b[32mgreen\x1b[0m", y: 31, x: 24 },
  yellow: { position: "\x1b[31;32H\x1b[33myellow\x1b[0m", y: 31, x: 32 },
  erase: { position: "\x1b[31;40H\x1b[37merase\x1b[0m", y: 31, x: 40 },
};

Deno.stdout.write(encoder.encode("\x1b[2J\x1b[H"));
Deno.stdin.setRaw(true, { cbreak: true });
Deno.stdout.write(encoder.encode(mouseTracking));
Deno.stdout.write(
  encoder.encode(
    "\x1b[31;1HCOLOR OPTIONS:" + colors.red.position + colors.green.position +
      colors.yellow.position + colors.erase.position,
  ),
);

const ifSeqIsOfColorThanChangeColor = (seqX, seqY, color) => {
  const { y } = colors.red;
  if (y !== seqY) return color;
  if (seqX >= 18 && seqX <= 21) return 41;
  if (seqX >= 24 && seqX <= 29) return 42;
  if (seqX >= 32 && seqX <= 36) return 44;
  if (seqX >= 40 && seqX <= 45) return 49;
};
let color = 40;

const tranformer = new TransformStream({
  transform(chunk, ctrl) {
    const seq = decoder.decode(chunk);
    const parsedSeq = [...seq.match(/\d+/g)];
    const [, x, y] = parsedSeq;
    color = ifSeqIsOfColorThanChangeColor(+x, +y, color);
    if (+y !== 31) {
      const coloredSeq = `\x1b[${y};${x}H\x1b[${color}m \x1b[0m`;
      ctrl.enqueue(encoder.encode(coloredSeq));
    } else {
      ctrl.enqueue(encoder.encode(`\x1b[${y};${x}H`));
    }
  },
});

await Deno.stdin.readable.pipeThrough(tranformer).pipeTo(Deno.stdout.writable);
