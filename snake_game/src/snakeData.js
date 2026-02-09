export const SNAKES = [
  {
    x: 5,
    y: 5,
    heading: "E",
    icon: "🐍",
    bodyParts: [
      {
        x: 5,
        y: 5,
        icon: "🟩",
      },
    ],

    food: {
      x: 8,
      y: 5,
      icon: "🍔",
    },
    score: 0,
    isPause: false,
    isDead: false,
    isBounded: true,
    delayTime: 100,
  },
];
