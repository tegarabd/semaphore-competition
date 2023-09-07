export const SEMAPHORE_SIZE = {
  xs: {
    stick: {
      width: "0.125rem",
      height: "3rem",
    },
    redFlag: {
      borderTopWidth: "1.5rem",
      borderRightWidth: "1.5rem",
    },
    yellowFlag: {
      borderBottomWidth: "1.5rem",
      borderLeftWidth: "1.5rem",
    },
  },
  sm: {
    stick: {
      width: "0.25rem",
      height: "6rem",
    },
    redFlag: {
      borderTopWidth: "3rem",
      borderRightWidth: "3rem",
    },
    yellowFlag: {
      borderBottomWidth: "3rem",
      borderLeftWidth: "3rem",
    },
  },
  md: {
    stick: {
      width: "0.5rem",
      height: "12rem",
    },
    redFlag: {
      borderTopWidth: "6rem",
      borderRightWidth: "6rem",
    },
    yellowFlag: {
      borderBottomWidth: "6rem",
      borderLeftWidth: "6rem",
    },
  },
  lg: {
    stick: {
      width: "0.75rem",
      height: "18rem",
    },
    redFlag: {
      borderTopWidth: "9rem",
      borderRightWidth: "9rem",
    },
    yellowFlag: {
      borderBottomWidth: "9rem",
      borderLeftWidth: "9rem",
    },
  },
};

export const STICKMAN_SIZE = {
  xs: {
    outerSpace: {
      height: "8rem",
      width: "8.3rem",
    },
    headSize: {
      width: "1rem",
      height: "1rem",
    },
    headSpace: {
      marginBottom: "0.0625rem",
    },
    bodyWidth: {
      width: "1.5rem",
    },
    bodyHeight: {
      height: "2rem",
    },
    handAndLegSize: {
      width: "0.5rem",
      height: "2rem",
    },
    flagOffset: "translateY(-0.5rem)",
    bodyOffset: { transform: "translateY(2.5rem)" },
  },
  sm: {
    outerSpace: {
      height: "16rem",
      width: "16.6rem",
    },
    headSize: {
      width: "2rem",
      height: "2rem",
    },
    headSpace: {
      marginBottom: "0.125rem",
    },
    bodyWidth: {
      width: "3rem",
    },
    bodyHeight: {
      height: "4rem",
    },
    handAndLegSize: {
      width: "1rem",
      height: "4rem",
    },
    flagOffset: "translateY(-1rem)",
    bodyOffset: { transform: "translateY(5rem)" },
  },
  md: {
    outerSpace: {
      height: "32rem",
      width: "33.3rem",
    },
    headSize: {
      width: "4rem",
      height: "4rem",
    },
    headSpace: {
      marginBottom: "0.25rem",
    },
    bodyWidth: {
      width: "6rem",
    },
    bodyHeight: {
      height: "8rem",
    },
    handAndLegSize: {
      width: "2rem",
      height: "8rem",
    },
    flagOffset: "translateY(-2rem)",
    bodyOffset: { transform: "translateY(10rem)" },
  },
  lg: {
    outerSpace: {
      height: "48rem",
      width: "50rem",
    },
    headSize: {
      width: "6rem",
      height: "6rem",
    },
    headSpace: {
      marginBottom: "0.375rem",
    },
    bodyWidth: {
      width: "9rem",
    },
    bodyHeight: {
      height: "12rem",
    },
    handAndLegSize: {
      width: "3rem",
      height: "12rem",
    },
    flagOffset: "translateY(-3rem)",
    bodyOffset: { transform: "translateY(15rem)" },
  },
};

interface SemaphoreSignal {
  [key: string]: {
    left: {
      rotation: string;
      flip: string;
    };
    right: {
      rotation: string;
      flip: string;
    };
  };
}

export const SEMAPHORE_SIGNAL: SemaphoreSignal = {
  "!": {
    left: {
      rotation: "rotate(-15deg)",
      flip: "scale(-1, 1)",
    },
    right: {
      rotation: "rotate(15deg)",
      flip: "scale(1, 1)",
    },
  },
  a: {
    left: {
      rotation: "rotate(45deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(15deg)",
      flip: "scale(1, 1)",
    },
  },
  b: {
    left: {
      rotation: "rotate(90deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(15deg)",
      flip: "scale(1, 1)",
    },
  },
  c: {
    left: {
      rotation: "rotate(135deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(15deg)",
      flip: "scale(1, 1)",
    },
  },
  d: {
    left: {
      rotation: "rotate(180deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(15deg)",
      flip: "scale(1, 1)",
    },
  },
  e: {
    left: {
      rotation: "rotate(-15deg)",
      flip: "scale(-1, 1)",
    },
    right: {
      rotation: "rotate(-135deg)",
      flip: "scale(-1, 1)",
    },
  },
  f: {
    left: {
      rotation: "rotate(-15deg)",
      flip: "scale(-1, 1)",
    },
    right: {
      rotation: "rotate(-90deg)",
      flip: "scale(-1, 1)",
    },
  },
  g: {
    left: {
      rotation: "rotate(-15deg)",
      flip: "scale(-1, 1)",
    },
    right: {
      rotation: "rotate(-45deg)",
      flip: "scale(-1, 1)",
    },
  },
  h: {
    left: {
      rotation: "rotate(45deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(90deg)",
      flip: "scale(1, 1)",
    },
  },
  i: {
    left: {
      rotation: "rotate(45deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(135deg)",
      flip: "scale(1, 1)",
    },
  },
  j: {
    left: {
      rotation: "rotate(180deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-90deg)",
      flip: "scale(-1, 1)",
    },
  },
  k: {
    left: {
      rotation: "rotate(45deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(180deg)",
      flip: "scale(-1, 1)",
    },
  },
  l: {
    left: {
      rotation: "rotate(45deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-135deg)",
      flip: "scale(-1, 1)",
    },
  },
  m: {
    left: {
      rotation: "rotate(45deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-90deg)",
      flip: "scale(-1, 1)",
    },
  },
  n: {
    left: {
      rotation: "rotate(45deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-45deg)",
      flip: "scale(-1, 1)",
    },
  },
  o: {
    left: {
      rotation: "rotate(90deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(135deg)",
      flip: "scale(1, 1)",
    },
  },
  p: {
    left: {
      rotation: "rotate(90deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(180deg)",
      flip: "scale(-1, 1)",
    },
  },
  q: {
    left: {
      rotation: "rotate(90deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-135deg)",
      flip: "scale(-1, 1)",
    },
  },
  r: {
    left: {
      rotation: "rotate(90deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-90deg)",
      flip: "scale(-1, 1)",
    },
  },
  s: {
    left: {
      rotation: "rotate(90deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-45deg)",
      flip: "scale(-1, 1)",
    },
  },
  t: {
    left: {
      rotation: "rotate(135deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-180deg)",
      flip: "scale(-1, 1)",
    },
  },
  u: {
    left: {
      rotation: "rotate(135deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-135deg)",
      flip: "scale(-1, 1)",
    },
  },
  v: {
    left: {
      rotation: "rotate(180deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-45deg)",
      flip: "scale(-1, 1)",
    },
  },
  w: {
    left: {
      rotation: "rotate(-135deg)",
      flip: "scale(-1, 1)",
    },
    right: {
      rotation: "rotate(-90deg)",
      flip: "scale(-1, 1)",
    },
  },
  x: {
    left: {
      rotation: "rotate(-135deg)",
      flip: "scale(-1, 1)",
    },
    right: {
      rotation: "rotate(-45deg)",
      flip: "scale(-1, 1)",
    },
  },
  y: {
    left: {
      rotation: "rotate(135deg)",
      flip: "scale(1, 1)",
    },
    right: {
      rotation: "rotate(-90deg)",
      flip: "scale(-1, 1)",
    },
  },
  z: {
    left: {
      rotation: "rotate(-45deg)",
      flip: "scale(-1, 1)",
    },
    right: {
      rotation: "rotate(-90deg)",
      flip: "scale(-1, 1)",
    },
  },
};
