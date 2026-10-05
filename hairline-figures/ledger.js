/**
 * Ledger: a tray of 30 coin stacks, one stack a day's spend, on a plinth.
 * At rest the tray is spent unevenly — a few tall days, most shallow — with
 * the spendiest day carrying the dot mark. The pointer is the meter: stacks
 * near it rise as if billed, the nearer the more, each on its own spring,
 * and grown stacks take the bright stroke. The slider is the meter's
 * radius, in stacks.
 *
 * The pattern: a continuous field. Hit-tested on the plinth plane, which
 * never moves.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const N = 6, M = 5, CELL = 13.5, FOOT = 10, HMAX = 34, EXT = N * CELL, PB = 5;

/** The meter: 1 at the pointer, .34 at 42% of the radius, .07 beyond. */
const meter = (u) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.66 : u <= 1 ? 0.34 - ((u - 0.417) / 0.583) * 0.27 : 0.07;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.1);
  fit(C, [[-6, -6, -PB], [EXT + 6, EXT + 6, -PB], [EXT + 6, -6, -PB], [-6, EXT + 6, -PB], [0, 0, HMAX]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * CELL, over = null;

  const g = mk("g", {}, svg), cols = [];
  const [pr, pi] = rings(-6, -6, EXT + 6, EXT + 6, 9, 2.2);
  put(solid(g), prism(P, front, pr, pi, -PB, 0));
  // Diagonal by diagonal from the back corner, so appending is painting back to front.
  for (let s = 0; s <= 2 * (N - 1); s++) for (let i = 0; i < N; i++) {
    const j = s - i;
    if (j < 0 || j >= M) continue;
    const u = i / (N - 1), v = j / (M - 1);
    // A few tall days, most shallow: a sparse, uneven spend.
    const h0 = 3 + HMAX * (0.85 * Math.exp(-((u - 0.28) ** 2 + (v - 0.6) ** 2) / 0.03)
      + 0.5 * Math.exp(-((u - 0.75) ** 2 + (v - 0.25) ** 2) / 0.04)
      + 0.1 * Math.sin(u * 9 + v * 5) ** 2);
    const x0 = i * CELL + (CELL - FOOT) / 2, y0 = j * CELL + (CELL - FOOT) / 2;
    const [ring, inner] = rings(x0, y0, x0 + FOOT, y0 + FOOT, 2.4, 0.9);
    cols.push({ i, j, h0, ring, inner, sp: spring(h0, { eps: 0.04 }), el: solid(g), drawn: NaN });
  }

  // The mark: a 3 × 3 of dots riding the lid of the stack under the pointer, or the tallest at rest.
  const mark = mk("g", {}, g), md = [];
  for (let k = 0; k < 9; k++) md.push(flatDot(mark, C, 0.55, k === 4 ? "dot" : "dot m"));
  const peak = cols.reduce((a, b) => (b.h0 > a.h0 ? b : a));
  const byCell = new Map();
  cols.forEach((c) => byCell.set(c.i + "," + c.j, c));
  let mc = null, want = peak;

  function drawMark() {
    if (want !== mc) { mc = want; mc.el.g.after(mark); }
    const cx = (mc.i + 0.5) * CELL, cy = (mc.j + 0.5) * CELL, h = Math.max(0.8, mc.sp.x);
    md.forEach((el, k) => place(el, P(cx + ((k % 3) - 1) * 2.6, cy + (Math.floor(k / 3) - 1) * 2.6, h)));
  }
  function drawCol(c) {
    const h = Math.max(0.8, c.sp.x);
    if (h === c.drawn) return;
    c.drawn = h;
    put(c.el, prism(P, front, c.ring, c.inner, 0, h));
    c.el.sil.classList.toggle("hi", h > c.h0 + HMAX * 0.18);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const c of cols) { if (stepS(c.sp, dt)) m = true; drawCol(c); }
    drawMark();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    for (const c of cols) {
      if (!over) { c.sp.t = c.h0; continue; }
      const dx = (c.i + 0.5) * CELL - over[0], dy = (c.j + 0.5) * CELL - over[1];
      c.sp.t = clamp(c.h0 + HMAX * 0.55 * meter(Math.hypot(dx, dy) / R), 0.8, HMAX);
    }
    if (over) {
      const i = clamp(Math.floor(over[0] / CELL), 0, N - 1), j = clamp(Math.floor(over[1] / CELL), 0, M - 1);
      want = byCell.get(i + "," + j);
      read.textContent = `day ${String(i + 1).padStart(2, "0")}·${j + 1}`;
    } else { want = peak; read.textContent = "rest"; }
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
  name: "ledger",
  means: "A tray of coin stacks, one stack a day's spend; the pointer meters the tray — stacks rise near it, the spendiest marked at rest.",
  rules: [1, 3, 5, 9],
  range: [1.2, 2.5, 4.5],
  mount,
});
