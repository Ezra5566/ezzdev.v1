/**
 * Strata: 25 blocks in five rows, one row a tier of the memory hierarchy,
 * stepping down from the register tier at the back to long-term storage at
 * the front. The pointer's line across the field picks the hot tier; it and
 * its neighbours, the nearer the more, lift as they are recalled — each block
 * on its own spring. The hot tier's blocks take the bright stroke, and the
 * dot rides its middle block. The slider is the recall's spread, in tiers.
 *
 * The pattern: a field of five rows. Hit-tested on each row's rest plane.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const TIERS = 5, PER = 5, PITCH = 15, W = 11, GAP = 4, H = 9, STEP = 5.5;

/** Recall toward the hot tier: 1 at it, .45 at one tier away, .12 beyond. */
const recall = (d) => (d <= 0 ? 1 : d <= 1 ? 0.45 + 0.55 * (1 - d) ** 2 : d <= 2 ? 0.12 : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.8);
  const EXT = (TIERS - 1) * PITCH + W;
  fit(C, [[-6, -33, 0], [EXT + 6, 33, 0], [EXT + 6, -33, 0], [-6, 33, 0], [0, 0, H + 7]], 200, 166);
  const P = proj(C), front = facing(C);
  let SPREAD = value * PITCH, over = null;

  const g = mk("g", {}, svg), blocks = [];
  for (let t = 0; t < TIERS; t++) {
    for (let k = 0; k < PER; k++) {
      const x0 = t * PITCH, y0 = -W / 2 - (k - (PER - 1) / 2) * (W + GAP);
      const [ring, inner] = rings(x0, y0, x0 + W, y0 + W, 2.4, 0.9);
      blocks.push({ t, k, x0, y0, ring, inner, sp: spring(0.6, { eps: 0.04 }), el: solid(g), drawn: NaN });
    }
  }
  // Paint back to front: within a row the middle blocks stand nearest.
  for (const b of [...blocks].sort((a, c) => a.t - c.t || Math.abs(a.y0) - Math.abs(c.y0))) g.appendChild(b.el.g);

  // The mark: one dot on the lid of the hot tier's middle block, or the register tier at rest.
  const md = flatDot(g, C, 0.7, "dot");
  let mt = null;

  function drawMark() {
    const t = mt ?? 0, b = blocks[t * PER + Math.floor(PER / 2)];
    const h = H + b.sp.x + 1.2;
    place(md, P(b.x0 + W / 2, b.y0 + W / 2, h));
  }
  function drawBlock(b) {
    const z1 = H + b.sp.x;
    if (z1 === b.drawn) return;
    b.drawn = z1;
    put(b.el, prism(P, front, b.ring, b.inner, 0, z1));
    b.el.sil.classList.toggle("hi", mt === b.t);
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const b of blocks) { if (stepS(b.sp, dt)) m = true; drawBlock(b); }
    drawMark();
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    if (over) {
      const p = clamp(over / PITCH, 0, TIERS - 1);
      for (const b of blocks) {
        const d = Math.abs(p - b.t) * PITCH / SPREAD;
        b.sp.t = 6 * recall(d);
      }
      mt = Math.round(p);
      read.textContent = `tier ${mt + 1}`;
    } else {
      for (const b of blocks) b.sp.t = 0.6;
      mt = null;
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
    set: (v) => { SPREAD = v * PITCH; if (over !== null) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "strata",
  means: "Five tiers of blocks step down a bank; the pointer recalls a tier and its neighbours lift, the nearer the more.",
  rules: [1, 2, 4, 9],
  range: [0.6, 1.2, 2.2],
  mount,
});
