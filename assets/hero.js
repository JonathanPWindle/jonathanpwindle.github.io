// "Voice in. Motion out." hero animation.
// Audio -> sampled frames -> rig curve -> poses, then a playhead plays the motion back.
// Plays once when the hero scrolls into view; ends on the static hero composition.
(function () {
  var fig = document.querySelector('.signal');
  if (!fig) return;
  var NS = 'http://www.w3.org/2000/svg';
  var VOICE = '#7CC4FF', MOTION = '#FF9B5E', WHITE = '#ECEEF1', GREY = '#4A525C';
  var MATH = '"STIX Two Text", "Times New Roman", serif';
  var W = 1200, H = 430;

  // ---------- easing (manim "smooth") ----------
  function sig(x) { return 1 / (1 + Math.exp(-x)); }
  function smooth(t) {
    t = Math.min(Math.max(t, 0), 1);
    var e = sig(-5);
    return Math.min(Math.max((sig(10 * (t - 0.5)) - e) / (1 - 2 * e), 0), 1);
  }
  function prog(T, a, d) { return smooth((T - a) / d); }
  function mix(a, b, t) { return a + (b - a) * t; }
  function clamp(x) { return Math.min(Math.max(x, 0), 1); }

  // ---------- layout ----------
  var X0 = 120, X1 = 1170, N = 8;
  var xs = [];
  for (var k = 0; k < N; k++) xs.push(X0 + (k + 0.5) * (X1 - X0) / N);
  var inten = [0.1, 0.35, 0.7, 1.0, 0.55, 0.85, 0.4, 0.12];
  var AXIS_Y = 362, FEET_Y = 190, S = 0.9, HIP_Y = FEET_Y - 82 * S;

  function catmull(pts, n) {
    var out = [];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
      for (var j = 0; j < n; j++) {
        var t = j / n, t2 = t * t, t3 = t2 * t, q = [];
        for (var c = 0; c < 2; c++)
          q.push(0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3));
        out.push(q);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  var gk = [[X0 - 30, 0.04]];
  for (k = 0; k < N; k++) gk.push([xs[k], inten[k]]);
  gk.push([X1 + 30, 0.04]);
  var GP = catmull(gk, 40);
  function g(x) {
    if (x <= GP[0][0]) return GP[0][1];
    for (var i = 0; i < GP.length - 1; i++) {
      var a = GP[i], b = GP[i + 1];
      if (a[0] <= x && x <= b[0]) return clamp(mix(a[1], b[1], b[0] > a[0] ? (x - a[0]) / (b[0] - a[0]) : 0));
    }
    return GP[GP.length - 1][1];
  }
  function cy1(x) { return 292 - g(x) * 82; }
  function cy2(x) { return 302 - g(x - 45) * 54; }
  function cy3(x) { return 248 + g(x) * 30; }

  // ---------- geometry ----------
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function lengths(pts) { var L = 0; for (var i = 1; i < pts.length; i++) L += dist(pts[i - 1], pts[i]); return L; }
  function partial(pts, f) {
    if (f >= 1) return pts;
    if (f <= 0) return [pts[0]];
    var target = lengths(pts) * f, acc = 0, out = [pts[0]];
    for (var i = 1; i < pts.length; i++) {
      var d = dist(pts[i - 1], pts[i]);
      if (acc + d >= target) {
        var t = d ? (target - acc) / d : 0;
        out.push([mix(pts[i - 1][0], pts[i][0], t), mix(pts[i - 1][1], pts[i][1], t)]);
        return out;
      }
      out.push(pts[i]); acc += d;
    }
    return out;
  }
  function dOf(pts) {
    var s = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (var i = 1; i < pts.length; i++) s += 'L' + pts[i][0].toFixed(1) + ' ' + pts[i][1].toFixed(1);
    return s;
  }
  function path(pts, color, w, op, extra) {
    if (pts.length < 2 || op <= 0.001) return '';
    return '<path d="' + dOf(pts) + '" stroke="' + color + '" stroke-width="' + w + '" opacity="' + op.toFixed(3) + '"' + (extra || '') + '/>';
  }
  function v(ang, L) { var r = ang * Math.PI / 180; return [L * Math.sin(r), L * Math.cos(r)]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; }

  function figurePaths(x, gv, sway) {
    var lean = 6 * gv;
    function P(q) { return [x + q[0] * S, HIP_Y + q[1] * S]; }
    function T(pts) { return catmull(pts.map(P), 8); }
    var sh = [lean, -62], hip = [0, 0];
    var head = [lean * 1.6 + 2 * gv, -96];
    var shL = [sh[0] - 16, sh[1] + 2], shR = [sh[0] + 16, sh[1] - gv];
    var elR = add(shR, v(6 + 52 * gv, 34)), hdR = add(elR, v(8 + 147 * gv, 30));
    var elL = add(shL, v(-(8 + 18 * gv), 34)), hdL = add(elL, v(-(6 + 49 * gv), 30));
    var circ = [];
    for (var i = 0; i <= 40; i++) { var a = i / 40 * 2 * Math.PI; circ.push(P([head[0] + 13 * Math.sin(a), head[1] + 13 * Math.cos(a)])); }
    return [
      T([[head[0], head[1] + 15], sh, [sh[0] / 2 + 2 * gv, -30], hip]),
      T([hip, [-10 + sway, 44], [-14, 82]]),
      T([hip, [11 + sway, 44], [16, 82]]),
      T([hdL, elL, shL, [sh[0], sh[1] - 2], shR, elR, hdR]),
      circ
    ];
  }
  var STATIC_FIGS = xs.map(function (x, k) { return figurePaths(x, inten[k], 0); });
  function figure(paths, op, f, color) {
    var s = '';
    for (var i = 0; i < paths.length; i++) s += path(partial(paths[i], f), color, 3.4, op);
    return s;
  }
  function diamond(x, y, s, color, op) {
    if (s <= 0) return '';
    var r = 6 * s;
    return '<path d="M' + x + ' ' + (y - r).toFixed(1) + 'L' + (x + r).toFixed(1) + ' ' + y.toFixed(1) + 'L' + x + ' ' + (y + r).toFixed(1) + 'L' + (x - r).toFixed(1) + ' ' + y.toFixed(1) + 'Z" fill="' + color + '" stroke="none" opacity="' + (op == null ? 1 : op).toFixed(3) + '"/>';
  }
  function text(x, y, s, size, color, op, anchor, family) {
    if (op <= 0.001) return '';
    return '<text x="' + x.toFixed(1) + '" y="' + y + '" font-family=\'' + (family || MATH) + '\' font-style="italic" font-size="' + size + '" fill="' + color + '" stroke="none" opacity="' + op.toFixed(3) + '" text-anchor="' + (anchor || 'start') + '">' + s + '</text>';
  }

  // ---------- static data ----------
  var NB = 120, barX = [], barA = [];
  for (var i = 0; i < NB; i++) {
    var bx = X0 + i * (X1 - X0) / (NB - 1);
    barX.push(bx);
    barA.push((0.35 + 0.65 * Math.abs(Math.sin(i * 0.71) * Math.cos(i * 0.19))) * g(bx) * 30 + 3);
  }
  function waveTop(x) {
    var best = 0;
    for (var i = 1; i < NB; i++) if (Math.abs(barX[i] - x) < Math.abs(barX[best] - x)) best = i;
    return AXIS_Y - barA[best];
  }
  var C1 = [], C2 = [], C3 = [];
  for (i = 0; i <= 300; i++) {
    var cx = X0 + i * (X1 - X0) / 300;
    C1.push([cx, cy1(cx)]); C2.push([cx, cy2(cx)]); C3.push([cx, cy3(cx)]);
  }

  // ---------- timeline (seconds) ----------
  var T_AXIS = 0.2, T_WAVE = 0.6, T_SAMPLE = 2.0, T_CURVE = 3.0, T_FIGS = 5.4, T_PLAY = 9.0, T_PLAY_END = 13.6, T_END = 15.4;

  function frame(T) {
    var o = '';
    // axis + t
    var ax = prog(T, T_AXIS, 0.8);
    if (ax > 0) {
      var axEnd = mix(X0 - 20, X1 + 14, ax);
      o += path([[X0 - 20, AXIS_Y], [axEnd, AXIS_Y]], GREY, 1.6, 1);
      if (ax > 0.95) o += '<path d="M' + (axEnd + 10).toFixed(1) + ' ' + AXIS_Y + 'L' + (axEnd - 3).toFixed(1) + ' ' + (AXIS_Y - 5) + 'L' + (axEnd - 3).toFixed(1) + ' ' + (AXIS_Y + 5) + 'Z" fill="' + GREY + '" stroke="none"/>';
      o += text(X1 + 22, AXIS_Y + 7, 't', 22, WHITE, prog(T, T_AXIS + 0.6, 0.5) * 0.8);
    }
    // waveform grows left to right
    var bars = '';
    for (var i = 0; i < NB; i++) {
      var s = prog(T, T_WAVE + 1.2 * i / NB, 0.5);
      if (s > 0) bars += 'M' + barX[i].toFixed(1) + ' ' + (AXIS_Y - barA[i] * s).toFixed(1) + 'V' + (AXIS_Y + barA[i] * s).toFixed(1);
    }
    if (bars) o += '<path d="' + bars + '" stroke="' + VOICE + '" stroke-width="4" opacity="0.92"/>';
    o += text(92, AXIS_Y + 8, 'a(t)', 26, VOICE, prog(T, T_WAVE + 0.8, 0.7), 'end');

    // sampling lines, flashes, t_k
    for (var k = 0; k < N; k++) {
      var x = xs[k], st = T_SAMPLE + 0.08 * k, sl = prog(T, st, 0.55);
      if (sl > 0) {
        var y0 = waveTop(x) - 7;
        o += path([[x, y0], [x, mix(y0, FEET_Y + 8, sl)]], GREY, 1.4, 1, ' stroke-dasharray="2 5"');
        var fl = Math.sin(Math.PI * clamp((T - st) / 0.6));
        o += '<circle cx="' + x.toFixed(1) + '" cy="' + (y0 + 7).toFixed(1) + '" r="' + (3 + 4 * fl).toFixed(1) + '" fill="' + WHITE + '" stroke="none" opacity="' + (0.9 * sl).toFixed(3) + '"/>';
        o += text(x, AXIS_Y + 50, 't<tspan font-size="12" dy="4">' + (k + 1) + '</tspan>', 18, WHITE, 0.6 * prog(T, st + 0.2, 0.5), 'middle');
      }
    }

    // rig curves draw, keyframes pop as the pen passes
    var cp = prog(T, T_CURVE, 2.0);
    o += path(partial(C3, prog(T, T_CURVE + 0.3, 2.0)), MOTION, 1.4, 0.32);
    o += path(partial(C2, prog(T, T_CURVE + 0.15, 2.0)), MOTION, 1.7, 0.55);
    o += path(partial(C1, cp), MOTION, 2.5, 1);
    var pen = mix(X0, X1, cp);
    for (k = 0; k < N; k++) {
      if (cp > 0 && pen >= xs[k]) {
        var tp = T_CURVE + 2.0 * ((xs[k] - X0) / (X1 - X0));
        var u = clamp((T - tp) / 0.35);
        var ds = u < 0.7 ? 1.35 * Math.sin(Math.PI / 2 * u / 0.7) : mix(1.35, 1, (u - 0.7) / 0.3);
        o += diamond(xs[k], cy1(xs[k]), ds, MOTION);
      }
    }
    o += text(92, 262, 'θ(t)', 26, MOTION, prog(T, T_CURVE + 0.9, 0.7), 'end');

    // keyframes fly up and become poses; playhead plays them back
    var playOn = prog(T, T_PLAY - 0.4, 0.6), playOff = prog(T, T_PLAY_END, 0.7), fin = prog(T, T_PLAY_END + 0.2, 1.2);
    var px = T > T_PLAY ? mix(X0 - 15, X1 + 15, smooth((T - T_PLAY) / (T_PLAY_END - T_PLAY))) : X0 - 15;
    for (k = 0; k < N; k++) {
      var a = T_FIGS + 0.3 * k, fly = prog(T, a, 0.5);
      if (fly > 0 && fly < 1) o += diamond(xs[k], mix(cy1(xs[k]), HIP_Y, fly), mix(1, 0.6, fly), MOTION, 1);
      var draw = prog(T, a + 0.4, 0.8);
      if (draw > 0) {
        var near = Math.max(0, 1 - Math.abs(px - xs[k]) / 110) * (1 - playOff);
        var ramp = 0.16 + 0.84 * Math.pow(k / (N - 1), 1.3);
        o += figure(STATIC_FIGS[k], mix(Math.min(1, mix(1, 0.2, playOn) + 0.8 * near), ramp, fin), draw, MOTION);
      }
    }
    var vis = playOn * (1 - playOff);
    if (vis > 0 && T > T_PLAY - 0.4) {
      var edge = Math.min(1, Math.max(0, (px - X0) / 40), Math.max(0, (X1 - px) / 40));
      o += path([[px, AXIS_Y + 30], [px, 8]], WHITE, 1.4, 0.5 * vis);
      if (px >= X0 && px <= X1) {
        var gv = g(px);
        o += figure(figurePaths(px, gv, 3 * Math.sin(px / 25)), vis * edge, 1, WHITE);
        o += '<circle cx="' + px.toFixed(1) + '" cy="' + cy1(px).toFixed(1) + '" r="5" fill="' + WHITE + '" stroke="none" opacity="' + (vis * edge).toFixed(3) + '"/>';
        o += '<circle cx="' + px.toFixed(1) + '" cy="' + waveTop(px).toFixed(1) + '" r="4.5" fill="' + VOICE + '" stroke="none" opacity="' + (vis * edge).toFixed(3) + '"/>';
        o += text(px + 10, cy1(px) - 12, 'θ = ' + gv.toFixed(2), 16, WHITE, vis * edge);
      }
    }
    return o;
  }

  // ---------- mount ----------
  var old = fig.querySelector('svg');
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Animation: a speech waveform is sampled at eight moments, each sample becomes a keyframe on an animation curve, the keyframes become poses of a gesturing figure, and a playhead plays the motion back.');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.classList.add('hero-anim');
  old.replaceWith(svg);

  var replay = document.createElement('button');
  replay.type = 'button';
  replay.className = 'replay';
  replay.textContent = '↻ Replay';
  var cap = fig.querySelector('figcaption');
  if (cap && cap.lastElementChild) cap.lastElementChild.replaceWith(replay);

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var start = null, raf = null, visible = false, done = false, elapsed = 0;
  function tick(now) {
    if (start === null) start = now;
    var T = (now - start) / 1000;
    elapsed = T;
    svg.innerHTML = frame(Math.min(T, T_END));
    if (T < T_END && visible) raf = requestAnimationFrame(tick);
    else { raf = null; if (T >= T_END) { done = true; replay.hidden = false; } }
  }
  function play() {
    if (raf) cancelAnimationFrame(raf);
    start = null; elapsed = 0; done = false; replay.hidden = true;
    raf = requestAnimationFrame(tick);
  }
  replay.addEventListener('click', function () { visible = true; play(); });

  var fixed = /[?&]hero=([\d.]+)/.exec(location.search);
  if (fixed) { svg.innerHTML = frame(parseFloat(fixed[1])); replay.hidden = true; return; }
  if (reduce) { svg.innerHTML = frame(T_END); replay.hidden = true; return; }
  svg.innerHTML = '';
  replay.hidden = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !done && !raf) {
        if (start === null) play();
        else raf = requestAnimationFrame(function (n) { start = n - elapsed * 1000; tick(n); });
      }
    }, { threshold: 0.35 }).observe(svg);
  } else { visible = true; play(); }
})();
