/**
 * Sieve: a hopper feeding a sieve of 12 mesh bars — the prompt, and what it
 * lets through. At rest the bars stand closed with a bright dot on the pile
 * at the hopper's lip. The pointer pours: bars near it drop and let grain
 * through, the nearer the more, each bar on its own spring. The dropped
 * bars take the bright stroke, and the pile's dot gives its bright up. The
 * slider is the pour's radius, in bars.
 *
 * The pattern: a continuous field along a row. Hit-tested on each bar's
 * rest position.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const N = 12, PITCH = 16, BW = 12, GAP = 5, TOP = 16, DROP = 15;

/** The pour: 1 at the pointer, .5 at one reach, .12 beyond. */
const pour = (u) => (u <= 0 ? 1 : u <= 1 ? 0.5 + 0.5 * (1 - u) ** 2 : u <= 2 ? 0.12 : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.58);
  const EXT = (N - 1) * PITCH + BW;
  fit(C, [[-6, -GAP - 10, -2], [EXT + 6, BW + 6, -2], [EXT + 6, -GAP - 10, -2], [-6, BW + 6, -2], [0, 0, TOP + 8]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * PITCH, over = null;

  const g = mk("g", {}, svg);

  // The hopper: two end plates, taller than the bars, flanking the mesh at the back.
  const [hr, hi] = rings(-5, -GAP - 8, 3, -GAP, 1.6, 0.7);
  put(solid(g), prism(P, front, hr, hi, 0, TOP + 7));
  const [hr2, hi2] = rings(EXT - 3, -GAP - 8, EXT + 5, -GAP, 1.6, 0.7);
  put(solid(g), prism(P, front, hr2, hi2, 0, TOP + 7));

  // The mesh: a row of bars standing from the tray floor.
  const bars = [];
  for (let i = 0; i < N; i++) {
    const x0 = i * PITCH;
    const [ring, inner] = rings(x0, 0, x0 + BW, BW, 2.2, 0.8);
    bars.push({ i, x0, ring, inner, sp: spring(TOP, { eps: 0.04 }), el: solid(g), drawn: NaN });
  }
  // Paint back to front: the plates stand behind the row, so they go first.
  for (const b of bars) g.appendChild(b.el.g);

  // The pile: three dots on the hopper's lip; the top one bright at rest.
  const pile = spring(0, { eps: 0.04 });
  const pileDots = [];
  for (let k = 0; k < 3; k++) pileDots.push(flatDot(g, C, 0.55, k === 0 ? "dot" : "dot m"));
  const pcx = (EXT - BW) / 2 + BW / 2;

  function drawPile() {
    pileDots.forEach((d, k) =>
      place(d, P(pcx + (k - 1) * 4.2, -GAP - 4, TOP + 8 + pile.x * (k === 0 ? 1 : 0.55))));
  }
  function drawBar(b) {
    const h = Math.max(3, b.sp.x);
    if (h === b.drawn) return;
    b.drawn = h;
    put(b.el, prism(P, front, b.ring, b.inner, 0, h));
    b.el.sil.classList.toggle("hi", TOP - h > DROP * 0.35);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const b of bars) { if (stepS(b.sp, dt)) m = true; drawBar(b); }
    if (stepS(pile, dt)) m = true;
    drawPile();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    if (over !== null) {
      const p = clamp(over / PITCH, 0, N - 1);
      for (const b of bars) {
        const u = Math.abs(p - b.i) * PITCH / R;
        b.sp.t = TOP - DROP * pour(u);
      }
      pile.t = 2.5;
      pileDots[0].setAttribute("class", "dot m");
      read.textContent = `mesh ${String(Math.round(p) + 1).padStart(2, "0")}`;
    } else {
      for (const b of bars) b.sp.t = TOP;
      pile.t = 0;
      pileDots[0].setAttribute("class", "dot");
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
  name: "sieve",
  means: "A hopper feeds a sieve; the pointer pours — mesh bars drop near it and let grain through, the nearer the more.",
  rules: [1, 3, 4, 9],
  range: [0.8, 1.6, 3],
  mount,
});
