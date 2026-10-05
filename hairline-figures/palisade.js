/**
 * Palisade: a stockade of 14 palings round a keep, with a gate of two leaves.
 * At rest it stands whole, one paling bright where the watch begins. The
 * pointer is the attack: palings near it bow inward and sink, the nearer the
 * more, each on its own spring. Palings sunk well below their rest height
 * take the bright stroke, and the watch's dot gives its bright up. The
 * slider is the attack's radius, in palings.
 *
 * The pattern: a continuous field round a ring. Hit-tested on each paling's
 * rest position.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const N = 14, RING = 62, PW = 7, PH = 30, KEEP = 26, KH = 34;

/** Breach toward the attack: 1 at it, .45 at one reach, .1 beyond. */
const breach = (u) => (u <= 0 ? 1 : u <= 1 ? 0.45 + 0.55 * (1 - u) ** 2 : 0.1);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.88);
  fit(C, [[-RING - 10, -RING - 10, 0], [RING + 10, RING + 10, 0], [RING + 10, -RING - 10, 0],
    [-RING - 10, RING + 10, 0], [0, 0, PH + 12]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * (2 * Math.PI * RING / N), over = null;

  const g = mk("g", {}, svg), posts = [];
  for (let k = 0; k < N; k++) {
    const a = (k / N) * 2 * Math.PI + Math.PI / N;
    const cx = RING * Math.cos(a), cy = RING * Math.sin(a);
    const [ring, inner] = rings(cx - PW / 2, cy - PW / 2, cx + PW / 2, cy + PW / 2, 2, 0.8);
    posts.push({ k, a, ring, inner, sp: spring(0, { eps: 0.04 }), el: solid(g), drawn: NaN });
  }
  // Paint back to front: at this camera, ascending x + y.
  const key = (p) => Math.cos(p.a) + Math.sin(p.a);
  for (const p of [...posts].sort((a, b) => key(a) - key(b))) g.appendChild(p.el.g);

  // The keep: one tall solid at the centre, painted between the palings
  // behind it and those before it, so nothing shows through.
  const [kr, ki] = rings(-KEEP / 2, -KEEP / 2, KEEP / 2, KEEP / 2, 5, 1.4);
  const keep = solid(g);
  g.insertBefore(keep.g, g.children[posts.filter((p) => key(p) <= 0).length]);
  put(keep, prism(P, front, kr, ki, 0, KH));
  const kd = flatDot(g, C, 0.7, "dot");
  place(kd, P(0, 0, KH + 1.2));

  function drawPost(p) {
    const sunk = p.sp.x;
    if (sunk === p.drawn) return;
    p.drawn = sunk;
    const lean = Math.sin(4 * sunk / PH) * 2.2;
    const ca = Math.cos(p.a + lean * 0.02), sa = Math.sin(p.a + lean * 0.02);
    const cx = RING * ca, cy = RING * sa;
    const [ring, inner] = rings(cx - PW / 2, cy - PW / 2, cx + PW / 2, cy + PW / 2, 2, 0.8);
    const z1 = Math.max(PH - sunk, 4);
    put(p.el, prism(P, front, ring, inner, 0, z1));
    p.el.sil.classList.toggle("hi", sunk > PH * 0.35);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const p of posts) { if (stepS(p.sp, dt)) m = true; drawPost(p); }
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    if (over) {
      const d = Math.hypot(over[0], over[1]);
      const ang = Math.atan2(over[1], over[0]);
      for (const p of posts) {
        let da = Math.abs(p.a - ang) % (2 * Math.PI);
        if (da > Math.PI) da = 2 * Math.PI - da;
        const arc = da * RING;
        const depth = PH * breach(arc / R) * clamp((d - KEEP * 0.7) / (RING - KEEP * 0.7), 0, 1);
        p.sp.t = depth;
      }
      const attacked = Math.round(((ang + 2 * Math.PI) % (2 * Math.PI)) / (2 * Math.PI / N) + N - 0.5) % N;
      read.textContent = `pale ${String(attacked + 1).padStart(2, "0")}`;
    } else {
      for (const p of posts) p.sp.t = 0;
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
    set: (v) => { R = v * (2 * Math.PI * RING / N); if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "palisade",
  means: "A stockade round a keep; the pointer is the attack — palings bow and sink near it, the gate leaf nearest swings.",
  rules: [1, 3, 4, 9],
  range: [0.5, 1.1, 2],
  mount,
});
