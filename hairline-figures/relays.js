/**
 * Relays: a relay station of nine posts down a run, one post a hop the edge
 * network makes. At rest the run is alive: a dot hops from post to post —
 * one eased hop, then the next — and the post that last caught it stays lit.
 * The pointer is demand: the dot hops to the post nearest it and posts near
 * it stretch up to catch, the nearer the more, each on its own spring. The
 * slider is the demand's reach, in hops.
 *
 * The pattern: a field along a row with an ambient dot. Hit-tested on each
 * post's rest position, which never moves.
 */
const {
  Cam, clamp, lerp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  tween, tset, tval, tdone, reducedMotion,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const N = 9, PITCH = 22, W = 13, H = 26;

/** Demand toward the pointer: 1 at it, .5 at one reach, .14 beyond. */
const demand = (u) => (u <= 0 ? 1 : u <= 1 ? 0.5 + 0.5 * (1 - u) ** 2 : u <= 2 ? 0.14 : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.7);
  const EXT = (N - 1) * PITCH + W;
  fit(C, [[-6, -6, 0], [EXT + 6, 6, 0], [EXT + 6, -6, 0], [-6, 6, 0], [0, 0, H + 9]], 200, 166);
  const P = proj(C), front = facing(C);
  const rm = reducedMotion();
  let R = value * PITCH, over = null;

  const g = mk("g", {}, svg), posts = [];
  for (let i = 0; i < N; i++) {
    const x0 = i * PITCH;
    const [ring, inner] = rings(x0, -W / 2, x0 + W, W / 2, 3, 1);
    posts.push({ i, x0, ring, inner, sp: spring(H * 0.86, { eps: 0.04 }), el: solid(g), drawn: NaN, phase: i * 0.9 });
  }
  for (const p of posts) g.appendChild(p.el.g);

  // The relay dot, hopping from lid to lid.
  const rd = flatDot(g, C, 0.7, "dot");
  const hop = tween(0, 700);
  let seg = 0, from = 4, to = 5, lit = 4, said = "";

  function drawPost(p) {
    const h = Math.max(6, p.sp.x);
    if (h === p.drawn) return;
    p.drawn = h;
    put(p.el, prism(P, front, p.ring, p.inner, 0, h));
    p.el.sil.classList.toggle("hi", lit === p.i);
  }
  function say(s) { if (s !== said) { said = s; read.textContent = s; } }

  const B = register(stage, (dt, now) => {
    let m = false;
    for (const p of posts) if (stepS(p.sp, dt)) m = true;
    // Demand stretches the posts; at rest they stand at their rest heights.
    for (const p of posts) {
      const d = over !== null ? demand(Math.abs(p.x0 + W / 2 - over) / R) : 0;
      p.sp.t = H * (0.8 + (rm ? 0 : 0.06 * Math.sin(now / 1000 * 1.6 + p.phase)) + 0.55 * d);
    }
    // The next hop: when the last one has landed, and there is no demand.
    const near = over !== null ? clamp(Math.round(over / PITCH), 0, N - 1) : null;
    if (!rm && tdone(hop, now) && (near === null || near !== lit)) {
      from = lit;
      to = near ?? (lit + 1) % N;
      lit = to;
      seg += 1;
      tset(hop, seg, now, 0);
    }
    const e = rm ? 0 : clamp(tval(hop, now) - seg + 1, 0, 1);
    const ax = posts[from].x0 + W / 2, bx = posts[to].x0 + W / 2;
    const az = Math.max(6, posts[from].sp.x), bz = Math.max(6, posts[to].sp.x);
    place(rd, P(lerp(ax, bx, e), 0, lerp(az, bz, e) + Math.sin(Math.min(1, e) * Math.PI) * 7 + 1.2));
    for (const p of posts) drawPost(p);
    say(near !== null ? `hop ${String(near + 1).padStart(2, "0")}` : "rest");
    return m || !rm; // the run is alive: ambient, so the loop keeps going while visible.
  });
  bag.add(B.unregister);

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0)[0]; B.wake(); },
    leave: () => { over = null; B.wake(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * PITCH; B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "relays",
  means: "A relay station of posts down a run; a dot hops the line always — the pointer is demand, and posts near it catch.",
  rules: [7, 1, 3, 9],
  range: [0.7, 1.4, 2.6],
  mount,
});
