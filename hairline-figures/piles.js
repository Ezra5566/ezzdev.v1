/**
 * Piles: a building site of 15 piles in three storeys, one storey a stage
 * of the build, standing at staggered heights. The pointer is the stage
 * under work: piles near it sink as they are used, the nearer the more,
 * each on its own spring, and the crane's dot rides the deepest. The used
 * piles take the bright stroke. The slider is the work's reach, in piles.
 *
 * The pattern: a continuous field on a stepped grid. Hit-tested on each
 * pile's rest top.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const COLS = 5, ROWS = 3, CELL = 24, W = 17, GH = 10, STEP = 7, MAXSINK = 8;

/** Use toward the work: 1 at it, .5 at one reach, .12 beyond. */
const used = (u) => (u <= 0 ? 1 : u <= 1 ? 0.5 + 0.5 * (1 - u) ** 2 : u <= 2 ? 0.12 : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.05);
  const EXT = (COLS - 1) * CELL + W;
  fit(C, [[-6, -6, 0], [EXT + 6, 6, 0], [EXT + 6, -6, 0], [-6, 6, 0], [0, 0, GH + 3 * STEP]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * CELL, over = null;

  const g = mk("g", {}, svg), piles = [];
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const x0 = i * CELL, y0 = j * CELL, rest = GH + j * STEP;
      const [ring, inner] = rings(x0, y0, x0 + W, y0 + W, 2.6, 1);
      piles.push({ i, j, x0, y0, rest, ring, inner, sp: spring(rest, { eps: 0.04 }), el: solid(g), drawn: NaN });
    }
  }
  // Paint back to front: ascending x + y from the far corner.
  for (const p of [...piles].sort((a, b) => (a.x0 + a.y0) - (b.x0 + b.y0))) g.appendChild(p.el.g);

  // The mark: the crane's dot, riding the pile deepest in work.
  const cd = flatDot(g, C, 0.7, "dot");
  let mc = piles[7];

  function drawPile(p) {
    const z1 = Math.max(2, p.sp.x);
    if (z1 === p.drawn) return;
    p.drawn = z1;
    put(p.el, prism(P, front, p.ring, p.inner, 0, z1));
    p.el.sil.classList.toggle("hi", p.rest - z1 > MAXSINK * 0.45);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const p of piles) { if (stepS(p.sp, dt)) m = true; drawPile(p); }
    if (mc) place(cd, P(mc.x0 + W / 2, mc.y0 + W / 2, Math.max(2, mc.sp.x) + 1.2));
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    if (over) {
      const ci = clamp(Math.floor(over[0] / CELL), 0, COLS - 1), cj = clamp(Math.floor(over[1] / CELL), 0, ROWS - 1);
      let deep = piles[0], umin = Infinity;
      for (const p of piles) {
        const u = Math.hypot(p.x0 + W / 2 - over[0], p.y0 + W / 2 - over[1]) / R;
        if (u < umin) { umin = u; deep = p; }
        p.sp.t = p.rest - MAXSINK * used(u);
      }
      mc = deep;
      read.textContent = `pile ${ci + 1}·${cj + 1}`;
    } else {
      for (const p of piles) p.sp.t = p.rest;
      mc = piles[7]; // the centre pile carries the crane's dot at rest
      read.textContent = "rest";
    }
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * CELL; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "piles",
  means: "A building site of piles in three storeys; the pointer puts piles to work — they sink, the crane rides the deepest.",
  rules: [1, 3, 5, 9],
  range: [0.8, 1.6, 2.8],
  mount,
});
