/**
 * Surge: a queue of crates, four lanes wide, waiting to pass a gate. At rest
 * the queue is dense at the back and loose at the front. The pointer is
 * load: crates near it surge forward and bunch against the gate, the nearer
 * the more, each on its own spring; a crate takes the bright stroke when it
 * is at the gate. The slider is the surge's reach, in lanes.
 *
 * The pattern: a continuous field. Hit-tested against each crate's rest
 * spot, which never moves.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const COLS = 6, LANES = 4, PITCH = 24, LP = 24, W = 17, H = 11, GATE = 9;

/** Surge toward the load: 1 at it, .5 at one pitch, .14 beyond. */
const surge = (u) => (u <= 0 ? 1 : u <= 1 ? 0.5 + 0.5 * (1 - u) ** 2 : u <= 2 ? 0.14 : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.66);
  const EXT = (COLS - 1) * PITCH + W;
  fit(C, [[-6, -(LANES / 2) * LP - 4, -2], [EXT + GATE + 8, (LANES / 2) * LP + 4, -2],
    [EXT + GATE + 8, -(LANES / 2) * LP - 4, -2], [-6, (LANES / 2) * LP + 4, -2], [0, 0, H + 12]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * PITCH, over = null;

  const g = mk("g", {}, svg), crates = [];
  for (let c = 0; c < COLS; c++) {
    for (let l = 0; l < LANES; l++) {
      const x0 = c * PITCH, y0 = (l - (LANES - 1) / 2) * LP;
      const [ring, inner] = rings(x0, y0 - W / 2, x0 + W, y0 + W / 2, 3, 1);
      crates.push({ c, l, x0, y0, ring, inner, sp: spring(0, { eps: 0.04 }), el: solid(g), drawn: NaN });
    }
  }
  // Paint back to front: nearest lane last, front column last within a lane.
  for (const k of [...crates].sort((a, b) => a.c - b.c || a.y0 - b.y0)) g.appendChild(k.el.g);

  // The gate: one thin plate across the lanes, with a bright dot at its middle.
  const [gr, gi] = rings(EXT + 5, -(LANES / 2) * LP - 2, EXT + 8, (LANES / 2) * LP + 2, 2, 0.8);
  put(solid(g), prism(P, front, gr, gi, 0, H + 5));
  const gd = flatDot(g, C, 0.7, "dot");
  place(gd, P(EXT + 6.5, 0, H + 6.2));

  let mc = null;
  function drawCrates() {
    for (const k of crates) {
      const z1 = H + k.sp.x;
      if (z1 === k.drawn) continue;
      k.drawn = z1;
      put(k.el, prism(P, front, k.ring, k.inner, 0, z1));
      k.el.sil.classList.toggle("hi", mc === k.c);
    }
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const k of crates) if (stepS(k.sp, dt)) m = true;
    drawCrates();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    if (over) {
      const p = clamp(over / PITCH, 0, COLS - 1);
      for (const k of crates) {
        const u = Math.hypot(p - k.c, (k.y0 / LP)) * PITCH / R;
        k.sp.t = GATE * surge(u) * (1 - k.c / (COLS + 2));
      }
      mc = Math.round(p);
      read.textContent = `car ${String(mc + 1).padStart(2, "0")}`;
    } else {
      for (const k of crates) k.sp.t = 0;
      mc = null;
      read.textContent = "rest";
    }
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0)[0]; retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * PITCH; if (over !== null) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "surge",
  means: "A queue of crates bunches against a gate; the pointer surges it forward, the nearest crates first.",
  rules: [1, 3, 5, 9],
  range: [0.8, 1.6, 3],
  mount,
});
