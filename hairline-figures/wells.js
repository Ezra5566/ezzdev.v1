/**
 * Wells: a field of 81 pillars on a rounded plinth. The pointer is the query:
 * it drills the store — pillars near it sink to the floor of the bore, and
 * what the bore lifts piles at its rim, each on its own spring. At rest the
 * field is two low rises. A 3 × 3 dot mark rides the floor of the bore, or
 * the taller rise at rest; pillars sunk well below their rest height take
 * the bright stroke. The slider is the bore's radius, in cells.
 *
 * The pattern: a continuous field, inverted — a bowl and a spoil heap
 * instead of a dome — hit-tested on the plinth's plane, which never moves.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const N = 9, CELL = 14, FOOT = 11, DEPTH = 34, SPOIL = 8, EXT = N * CELL, PB = 5;

/** The bore: a bowl to one radius, a spoil heap just past it, both gone by 1.7. */
const bowl = (u) => (u <= 1 ? (1 - u * u) ** 2 : 0);
const heap = (u) => Math.exp(-((u - 1.12) ** 2) / 0.02);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.62);
  fit(C, [[-6, -6, -PB], [EXT + 6, EXT + 6, -PB], [EXT + 6, -6, -PB], [-6, EXT + 6, -PB], [0, 0, 26]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * CELL, over = null;

  const g = mk("g", {}, svg), cols = [];
  const [pr, pi] = rings(-6, -6, EXT + 6, EXT + 6, 9, 2.2);
  put(solid(g), prism(P, front, pr, pi, -PB, 0));
  // Diagonal by diagonal from the back corner, so appending is painting back to front.
  for (let s = 0; s <= 2 * (N - 1); s++) for (let i = 0; i < N; i++) {
    const j = s - i;
    if (j < 0 || j >= N) continue;
    const u = i / (N - 1), v = j / (N - 1);
    const h0 = 5 + 18 * Math.exp(-((u - 0.3) ** 2 + (v - 0.35) ** 2) / 0.07)
      + 10 * Math.exp(-((u - 0.75) ** 2 + (v - 0.7) ** 2) / 0.035);
    const x0 = i * CELL + (CELL - FOOT) / 2, y0 = j * CELL + (CELL - FOOT) / 2;
    const [ring, inner] = rings(x0, y0, x0 + FOOT, y0 + FOOT, 2.6, 0.9);
    cols.push({ i, j, h0, ring, inner, sp: spring(h0, { eps: 0.04 }), el: solid(g), drawn: NaN });
  }

  // The mark: a 3 × 3 of dots riding the floor of the bore, or the taller rise at rest.
  const mark = mk("g", {}, g), md = [];
  for (let k = 0; k < 9; k++) md.push(flatDot(mark, C, 0.55, k === 4 ? "dot" : "dot m"));
  const peak = cols.reduce((a, b) => (b.h0 > a.h0 ? b : a));
  const byCell = new Map();
  cols.forEach((c) => byCell.set(c.i + "," + c.j, c));
  let mc = null, want = peak;

  function drawMark() {
    if (want !== mc) { mc = want; mc.el.g.after(mark); }
    const cx = (mc.i + 0.5) * CELL, cy = (mc.j + 0.5) * CELL, h = Math.max(0.8, mc.sp.x);
    md.forEach((el, k) => place(el, P(cx + ((k % 3) - 1) * 3, cy + (Math.floor(k / 3) - 1) * 3, h)));
  }
  // A pillar whose spring hasn't moved keeps its paths: most of the 81 are still on most frames.
  function drawCol(c) {
    const h = Math.max(0.8, c.sp.x);
    if (h === c.drawn) return;
    c.drawn = h;
    put(c.el, prism(P, front, c.ring, c.inner, 0, h));
    c.el.sil.classList.toggle("hi", h < c.h0 - 12);
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
      const u = Math.hypot(dx, dy) / R;
      c.sp.t = clamp(c.h0 + SPOIL * heap(u) - DEPTH * bowl(u), 0.8, 40);
    }
    if (over) {
      const i = clamp(Math.floor(over[0] / CELL), 0, N - 1), j = clamp(Math.floor(over[1] / CELL), 0, N - 1);
      want = byCell.get(i + "," + j);
      read.textContent = `cell ${i}·${j}`;
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
  name: "wells",
  means: "A field of pillars bores a well under the pointer; what the bore lifts piles at its rim.",
  rules: [1, 3, 5, 9],
  range: [1.2, 2.5, 4.5],
  mount,
});
