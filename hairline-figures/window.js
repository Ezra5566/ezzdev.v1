/**
 * Window: a row of 11 slats, the context window. At rest it sags in the
 * middle — attention falls off toward the centre — with a bright dot at the
 * first slat, where reading starts. The pointer rides the row: slats near it
 * rise into a ridge of attention, falling off with distance, each on its own
 * spring. The chosen slat takes the bright stroke and the dot. The slider is
 * the ridge's reach, in slats.
 *
 * The pattern: a continuous field along one row. Hit-tested against the
 * slats' rest positions, which never move.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const N = 11, PITCH = 21, W = 16, GAP = 2.2, TOP = 8, SAG = 14, RISE = 30;

/** Attention toward the pointer: 1 at it, .38 at one reach, .1 beyond. */
const attn = (u) => (u <= 0 ? 1 : u <= 1 ? 0.38 + 0.62 * (1 - u) ** 2 : 0.1);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.7);
  const EXT = (N - 1) * PITCH + W;
  fit(C, [[-6, -6, -TOP], [EXT + 6, 6, -TOP], [EXT + 6, -6, -TOP], [-6, 6, -TOP], [0, 0, SAG + RISE]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * PITCH, over = null;

  const g = mk("g", {}, svg), slats = [];
  for (let i = 0; i < N; i++) {
    const x0 = i * PITCH, sag = (1 - Math.abs(i / (N - 1) - 0.5) * 2) ** 2;
    const h0 = 4 + SAG * sag;
    const [ring, inner] = rings(x0, -W / 2, x0 + W, W / 2, 3, 1);
    slats.push({ i, h0, ring, inner, sp: spring(h0, { eps: 0.04 }), el: solid(g), drawn: NaN });
  }
  // Paint back to front: at this camera +y runs toward the viewer, so front slats go last.
  for (const s of [...slats].sort((a, b) => a.h0 - b.h0)) g.appendChild(s.el.g);

  // The mark: one dot on the lid of the chosen slat, or the first slat at rest.
  const md = flatDot(g, C, 0.7, "dot");
  let mi = null;

  function drawMark() {
    const s = slats[mi ?? 0];
    const h = Math.max(TOP, s.sp.x) + 1.2;
    const [lx] = [s.i * PITCH + W / 2];
    place(md, P(lx, 0, h));
  }
  function drawSlat(s) {
    const h = Math.max(TOP, s.sp.x);
    if (h === s.drawn) return;
    s.drawn = h;
    put(s.el, prism(P, front, s.ring, s.inner, -h, 0));
    s.el.sil.classList.toggle("hi", mi === s.i);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const s of slats) { if (stepS(s.sp, dt)) m = true; drawSlat(s); }
    drawMark();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    if (over) {
      const p = clamp(over / PITCH, 0, N - 1);
      for (const s of slats) {
        const u = Math.abs(p - s.i) * PITCH / R;
        s.sp.t = clamp(s.h0 + RISE * attn(u), TOP, SAG + RISE);
      }
      mi = Math.round(p);
      read.textContent = `tok ${String(mi + 1).padStart(2, "0")}`;
    } else {
      for (const s of slats) s.sp.t = s.h0;
      mi = null;
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
  name: "window",
  means: "A row of slats sags at rest; the pointer raises a ridge of attention that falls off with distance.",
  rules: [1, 3, 4, 9],
  range: [0.8, 1.6, 3],
  mount,
});
