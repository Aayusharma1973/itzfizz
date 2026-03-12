import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {

  const starsRef      = useRef(null);
  const smokeRef      = useRef(null);
  const heroRef       = useRef(null);
  const navRef        = useRef(null);
  const leftRef       = useRef(null);
  const rightRef      = useRef(null);
  const rocketWrapRef = useRef(null);
  const flameSvgRef   = useRef(null);
  const flameOuterRef = useRef(null);
  const flameInnerRef = useRef(null);
  const padGlowRef    = useRef(null);
  const altFillRef    = useRef(null);
  const altTipRef     = useRef(null);
  const prgFillRef    = useRef(null);
  const prgDotRef     = useRef(null);
  const pctRef        = useRef(null);
  const btmRef        = useRef(null);
  const pinRef        = useRef(null);
  const mqtRef        = useRef(null);

  /* ── marquee words ── */
  const mqWords = [
    "Launch Ready","Digital Experience","Pick-Up Innovation",
    "ITZFIZZ","Blast Off","Efficiency Leaders","T-Minus Zero"
  ];
  const mqAll = [...mqWords,...mqWords,...mqWords,...mqWords];

  /* ── stats data ── */
  const stats = [
    { arrow:"↑", t:58, lbl:"Increase in\npick-up point use" },
    { arrow:"↓", t:23, lbl:"Decreased in\ncustomer phone calls" },
    { arrow:"↑", t:27, lbl:"Increase in\npick-up point use" },
    { arrow:"↓", t:40, lbl:"Decreased in\ncustomer phone calls" },
  ];

  /* ── section 2 data ── */
  const s2cards = [
    { t:58, name:"Pick-Up Growth",   desc:"Increase in pick-up\npoint utilization",      f:58 },
    { t:23, name:"Call Reduction",   desc:"Decrease in inbound\ncustomer phone calls",   f:23 },
    { t:27, name:"Efficiency Boost", desc:"Increase in overall\noperational efficiency", f:27 },
    { t:40, name:"Wait Time Drop",   desc:"Decrease in average\ncustomer wait time",     f:40 },
  ];

  /* ── letters ── */
  const welcome = ["W","E","L","C","O","M","E"];
  const itzfizz = ["I","T","Z","F","I","Z","Z"];

  useEffect(() => {

    /* ════════════════════════════════════
       STAR FIELD
    ════════════════════════════════════ */
    const c   = starsRef.current;
    const ctx = c.getContext("2d");
    let W, H;
    const starList = [];

    function resizeStars() {
      W = c.width  = window.innerWidth;
      H = c.height = window.innerHeight;
    }
    resizeStars();
    window.addEventListener("resize", resizeStars);

    for (let i = 0; i < 200; i++) {
      starList.push({
        x:  Math.random() * 2000,
        y:  Math.random() * 1000,
        r:  Math.random() * 1.4 + 0.2,
        a:  Math.random() * 0.8 + 0.1,
        sp: Math.random() * 0.3 + 0.05,
      });
    }

    let frame = 0;
    let starRAF;
    function drawStars() {
      frame++;
      ctx.clearRect(0, 0, W, H);
      starList.forEach(s => {
        const flicker = s.a + Math.sin(frame * 0.04 + s.r * 10) * 0.08;
        ctx.beginPath();
        ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, flicker)})`;
        ctx.fill();
        s.y -= s.sp;
        if (s.y < 0) s.y = H;
      });
      starRAF = requestAnimationFrame(drawStars);
    }
    drawStars();

    const sc    = smokeRef.current;
    const sctx  = sc.getContext("2d");
    let smokeParticles = [];

    function resizeSmoke() {
      sc.width  = window.innerWidth;
      sc.height = window.innerHeight;
    }
    resizeSmoke();
    window.addEventListener("resize", resizeSmoke);

    function spawnSmoke(x, y, intensity) {
      for (let i = 0; i < Math.floor(3 + intensity * 4); i++) {
        smokeParticles.push({
          x:    x + (Math.random() - 0.5) * 20,
          y:    y + Math.random() * 10,
          vx:   (Math.random() - 0.5) * 1.2,
          vy:   0.8 + Math.random() * 1.4,
          r:    6 + Math.random() * 18,
          a:    0.22 + Math.random() * 0.15,
          da:   0.004 + Math.random() * 0.004,
          grow: 0.5 + Math.random() * 0.8,
          hue:  Math.random() > 0.5 ? 220 : 30,
        });
      }
    }

    let smokeRAF;
    function drawSmoke() {
      sctx.clearRect(0, 0, sc.width, sc.height);
      smokeParticles = smokeParticles.filter(p => p.a > 0);
      smokeParticles.forEach(p => {
        sctx.beginPath();
        sctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        sctx.fillStyle = `hsla(${p.hue},15%,60%,${p.a.toFixed(3)})`;
        sctx.fill();
        p.x  += p.vx;  p.y  += p.vy;
        p.r  += p.grow; p.a  -= p.da;
        p.vx *= 0.98;   p.vy *= 0.97;
      });
      smokeRAF = requestAnimationFrame(drawSmoke);
    }
    drawSmoke();

   
    function countUp(el, target, dur = 1400) {
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(e * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(navRef.current, { opacity:0, y:-16, duration:0.6 }, 0.1)
      .to(".ltr:not(.gap)", { opacity:1, x:0, duration:0.5, stagger:0.05, ease:"power4.out" }, 0.25)
      .fromTo(rocketWrapRef.current,
        { y:0, opacity:0, scale:0.7 },
        { y:0, opacity:1, scale:1, duration:0.9, ease:"back.out(1.2)" }, 0.5)
      .to(".stat", { opacity:1, x:0, duration:0.5, stagger:0.1, ease:"power3.out" }, 0.75)
      .to(btmRef.current, { opacity:1, duration:0.5 }, 1.1)
      .call(() => {
        document.querySelectorAll(".sv").forEach(el => countUp(el, parseInt(el.dataset.t), 1500));
      }, null, 1.1);

  
    gsap.to(flameOuterRef.current, {
      scaleX:1.12, scaleY:0.95, duration:0.08,
      repeat:-1, yoyo:true, ease:"none", transformOrigin:"50% 0%",
    });
    gsap.to(flameInnerRef.current, {
      scaleX:0.88, scaleY:1.08, duration:0.06,
      repeat:-1, yoyo:true, ease:"none", transformOrigin:"50% 0%",
    });

    
    const heroH = window.innerHeight;

    ScrollTrigger.create({
      trigger: pinRef.current,
      start:   "top top",
      end:     "bottom bottom",
      scrub:   1.0,
      onUpdate(self) {
        const p = self.progress;

        prgFillRef.current.style.width = (p * 100) + "%";
        prgDotRef.current.style.left   = (p * 100) + "%";
        pctRef.current.textContent =
          p < 0.015 ? "SCROLL TO LAUNCH ↑"
          : p < 0.99 ? `T+${Math.round(p * 100)}s`
          : "ORBIT REACHED ✓";

        const rocketY = -p * heroH * 1.05;
        const tilt    = Math.sin(p * Math.PI * 3) * (4 * (1 - p));
        const scale   = 1 - p * 0.25;
        gsap.set(rocketWrapRef.current, {
          y: rocketY, rotation: tilt, scale,
          transformOrigin: "50% 100%",
        });

        /* flame grows */
        gsap.set(flameSvgRef.current, {
          scaleY:  1 + p * 1.8,
          scaleX:  1 + p * 0.4,
          opacity: 0.5 + p * 0.5,
          transformOrigin: "50% 0%",
        });

        /* pad glow */
        const glowG = Math.round(106 + p * 100);
        const glowA = Math.min(p * 2, 0.4).toFixed(2);
        padGlowRef.current.style.background =
          `radial-gradient(ellipse, rgba(255,${glowG},0,${glowA}) 0%, transparent 80%)`;

        /* altimeter */
        altFillRef.current.style.height = (p * 100) + "%";
        altTipRef.current.style.bottom  = (p * 100) + "%";

        /* smoke */
        if (p > 0.01 && p < 0.98) {
          const rect = rocketWrapRef.current.getBoundingClientRect();
          spawnSmoke(rect.left + rect.width * 0.5, rect.bottom, p);
        }

        /* letters drift left */
        gsap.set(leftRef.current,  { x: -p * 45, opacity: 1 - p * 0.6 });

        /* stats drift right */
        gsap.set(rightRef.current, { x:  p * 45, opacity: 1 - p * 0.6 });

        /* bg darkens */
        heroRef.current.style.background =
          `hsl(240,30%,${Math.max(0.5, 2 - p * 2)}%)`;
      },
    });

    /* ════════════════════════════════════
       SECTION 2 REVEAL
    ════════════════════════════════════ */
    let s2done = false;
    ScrollTrigger.create({
      trigger: "#s2",
      start:   "top 78%",
      onEnter() {
        if (s2done) return; s2done = true;
        gsap.to(".s2-card", {
          opacity:1, y:0, duration:0.75, stagger:0.13, ease:"power3.out",
          onComplete() {
            document.querySelectorAll(".cv").forEach(el =>
              countUp(el, parseInt(el.dataset.t), 1200)
            );
            document.querySelectorAll(".s2-bf").forEach(el =>
              gsap.to(el, { width: el.dataset.f + "%", duration:1.3, ease:"power3.out" })
            );
          },
        });
      },
    });

    /* ── cleanup ── */
    return () => {
      cancelAnimationFrame(starRAF);
      cancelAnimationFrame(smokeRAF);
      window.removeEventListener("resize", resizeStars);
      window.removeEventListener("resize", resizeSmoke);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  /* ════════════════════════════════════════════════════
     JSX
  ════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── ALL CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --bg:    #05050d;
          --bg2:   #08081a;
          --lime:  #c8ff00;
          --w:     #e4e6f2;
          --dim:   rgba(228,230,242,0.38);
        }
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:var(--bg); color:var(--w); font-family:'Space Mono',monospace; overflow-x:hidden; }
        ::-webkit-scrollbar { width:2px; }
        ::-webkit-scrollbar-thumb { background:var(--lime); }

        #pin-wrap { position:relative; height:500vh; }

        #hero {
          position:sticky; top:0;
          width:100vw; height:100vh;
          overflow:hidden;
          display:grid;
          grid-template-rows: 64px 1fr 50px;
          background:var(--bg);
        }
        #stars { position:absolute; inset:0; z-index:0; pointer-events:none; }
        #ground {
          position:absolute; bottom:50px; left:0; right:0; height:2px;
          background:linear-gradient(90deg,
            transparent 0%, rgba(200,255,0,0.15) 20%,
            rgba(200,255,0,0.35) 50%,
            rgba(200,255,0,0.15) 80%, transparent 100%);
          z-index:5;
        }
        #pad {
          position:absolute; bottom:52px; left:50%; transform:translateX(-50%);
          width:100px; height:12px; border-radius:50%;
          background:rgba(200,255,0,0.08); border:1px solid rgba(200,255,0,0.2); z-index:5;
        }
        #pad-glow {
          position:absolute; bottom:30px; left:50%; transform:translateX(-50%);
          width:260px; height:60px; border-radius:50%;
          background:radial-gradient(ellipse,rgba(255,106,0,0) 0%,transparent 80%);
          filter:blur(18px); z-index:4; pointer-events:none;
        }
        #smoke-canvas { position:absolute; inset:0; z-index:3; pointer-events:none; }

        /* NAV */
        #nav {
          position:relative; z-index:30;
          display:flex; justify-content:space-between; align-items:center;
          padding:0 52px;
          border-bottom:1px solid rgba(255,255,255,0.05);
          opacity:0;
        }
        .logo { font-family:'Antonio',sans-serif; font-weight:700; font-size:1.05rem; letter-spacing:0.38em; color:var(--lime); }
        .nav-links { display:flex; gap:32px; list-style:none; }
        .nav-links a { font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--dim); text-decoration:none; transition:color .2s; }
        .nav-links a:hover { color:var(--lime); }
        .nav-btn { font-size:0.58rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--bg); background:var(--lime); border:none; padding:7px 18px; cursor:pointer; font-family:'Space Mono',monospace; }

        /* STAGE */
        #stage { position:relative; z-index:10; display:grid; grid-template-columns:1fr 220px; align-items:center; overflow:hidden; }

        /* LEFT LETTERS */
        #left {
          position:absolute;
          top: calc(50% + 7px); left:52px;
          transform:translateY(-50%);
          display:flex; flex-direction:column; align-items:flex-start;
          z-index:6; pointer-events:none; will-change:transform;
          max-height:calc(100vh - 64px - 50px - 20px);
          justify-content:center;
        }
        .ltr {
          font-family:'Antonio',sans-serif; font-weight:700;
          font-size:clamp(1.2rem,4.5vh,2.8rem);
          line-height:1.05; color:#ffffff; letter-spacing:0.04em; display:block;
          opacity:0; transform:translateX(-50px);
          text-shadow:0 0 30px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.8);
        }
        .ltr.acc {
          color:var(--lime);
          text-shadow:0 0 18px rgba(200,255,0,0.9), 0 0 40px rgba(200,255,0,0.45), 0 0 70px rgba(200,255,0,0.2);
        }
        .ltr.gap { height:1vh; display:block; }

        /* CENTER */
        #center { display:flex; align-items:flex-end; justify-content:center; position:relative; height:100%; padding-bottom:50px; }
        #rocket-wrap { position:absolute; bottom:50px; left:50%; transform:translateX(-50%); width:120px; will-change:transform; display:flex; flex-direction:column; align-items:center; }
        #rocket-svg  { width:100px; display:block; overflow:visible; }
        #flame-svg   { width:60px;  display:block; overflow:visible; }

        /* ALTIMETER */
        #altimeter { position:absolute; right:18%; top:15%; bottom:60px; width:1px; background:rgba(200,255,0,0.08); z-index:8; }
        #alt-fill  { position:absolute; bottom:0; left:0; width:1px; height:0%; background:linear-gradient(to top,var(--lime),rgba(200,255,0,0.1)); transition:height .05s linear; }
        #alt-label { position:absolute; bottom:0; left:10px; font-size:0.5rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--lime); white-space:nowrap; font-family:'Space Mono',monospace; }
        #alt-tip   { position:absolute; left:-3px; width:7px; height:7px; border-radius:50%; background:var(--lime); bottom:0%; transition:bottom .05s linear; box-shadow:0 0 8px 2px rgba(200,255,0,0.5); }

        /* RIGHT STATS */
        #right { display:flex; flex-direction:column; padding-right:52px; border-left:1px solid rgba(255,255,255,0.05); will-change:transform; }
        .stat  { padding:20px 0 20px 26px; border-bottom:1px solid rgba(255,255,255,0.04); opacity:0; transform:translateX(40px); position:relative; overflow:hidden; }
        .stat::after { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:var(--lime); transform:scaleY(0); transform-origin:bottom; transition:transform .45s cubic-bezier(.22,1,.36,1); }
        .stat:hover::after { transform:scaleY(1); }
        .snum  { font-family:'Antonio',sans-serif; font-weight:700; font-size:clamp(1.7rem,2.8vw,2.5rem); color:var(--lime); line-height:1; }
        .sarrow{ font-size:.6em; margin-right:3px; }
        .slbl  { font-size:0.5rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--dim); margin-top:5px; line-height:1.75; white-space:pre-line; }

        /* BOTTOM BAR */
        #btm { position:relative; z-index:30; display:flex; justify-content:space-between; align-items:center; padding:0 52px; border-top:1px solid rgba(255,255,255,0.05); opacity:0; }
        .btxt { font-size:0.52rem; letter-spacing:0.22em; text-transform:uppercase; color:rgba(228,230,242,0.2); }
        #prg-track { flex:1; max-width:200px; height:1px; background:rgba(255,255,255,0.07); margin:0 28px; position:relative; }
        #prg-fill  { position:absolute; left:0; top:0; height:100%; width:0; background:var(--lime); }
        #prg-dot   { position:absolute; top:50%; width:6px; height:6px; border-radius:50%; background:var(--lime); transform:translate(-50%,-50%); left:0; box-shadow:0 0 6px 2px rgba(200,255,0,0.4); }

        /* MARQUEE */
        #mq { background:var(--lime); overflow:hidden; padding:12px 0; }
        .mq-track { display:flex; width:max-content; animation:mqAnim 22s linear infinite; }
        @keyframes mqAnim { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mq-item { font-family:'Antonio',sans-serif; font-size:0.8rem; font-weight:700; letter-spacing:0.24em; text-transform:uppercase; color:var(--bg); padding:0 38px; white-space:nowrap; display:flex; align-items:center; gap:38px; }
        .mq-dot  { width:4px; height:4px; border-radius:50%; background:rgba(5,5,13,0.35); }

        /* SECTION 2 */
        #s2 { background:var(--bg2); padding:110px 52px; position:relative; overflow:hidden; }
        #s2::before { content:'METRICS'; position:absolute; font-family:'Antonio',sans-serif; font-size:clamp(7rem,19vw,17rem); font-weight:700; color:rgba(200,255,0,0.02); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; white-space:nowrap; user-select:none; }
        .s2-eye { font-size:.58rem; letter-spacing:.3em; text-transform:uppercase; color:var(--lime); margin-bottom:20px; display:flex; align-items:center; gap:14px; }
        .s2-eye::before { content:''; width:28px; height:1px; background:var(--lime); display:block; }
        .s2-h   { font-family:'Antonio',sans-serif; font-size:clamp(2.8rem,5.5vw,5.8rem); font-weight:700; letter-spacing:-.02em; line-height:.92; margin-bottom:72px; }
        .s2-h em{ color:var(--lime); font-style:normal; }
        .s2-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(200,255,0,0.05); position:relative; z-index:1; }
        .s2-card{ background:var(--bg2); padding:44px 32px; opacity:0; transform:translateY(44px); transition:background .3s; }
        .s2-card:hover { background:rgba(200,255,0,.025); }
        .s2-big { font-family:'Antonio',sans-serif; font-size:clamp(3.5rem,5.5vw,5rem); font-weight:700; color:var(--lime); line-height:1; }
        .s2-name{ font-family:'Antonio',sans-serif; font-size:1.05rem; font-weight:700; color:var(--w); margin:10px 0 7px; }
        .s2-desc{ font-size:.55rem; letter-spacing:.14em; line-height:1.95; text-transform:uppercase; color:var(--dim); white-space:pre-line; }
        .s2-bar { margin-top:22px; height:2px; background:rgba(200,255,0,.08); overflow:hidden; }
        .s2-bf  { height:100%; background:var(--lime); width:0; }

        /* FOOTER */
        footer { background:var(--bg); border-top:1px solid rgba(200,255,0,.08); padding:28px 52px; display:flex; justify-content:space-between; align-items:center; }
        .f-logo { font-family:'Antonio',sans-serif; font-weight:700; font-size:.95rem; letter-spacing:.32em; color:var(--lime); }
        .f-copy { font-size:.52rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(228,230,242,.18); }

        /* RESPONSIVE */
        @media(max-width:860px){
          #stage { grid-template-columns:1fr 180px; }
          #right { padding-right:24px; }
        }
        @media(max-width:600px){
          #stage { grid-template-columns:1fr; grid-template-rows:auto auto auto; padding:16px; gap:16px; align-items:start; }
          #left  { position:relative; top:auto; left:auto; transform:none; flex-direction:row; flex-wrap:wrap; max-height:none; gap:2px 6px; }
          .ltr   { font-size:1.9rem; }
          .ltr.gap { width:10px; height:auto; }
          #right { border-left:none; border-top:1px solid rgba(255,255,255,.05); padding:16px 0 0; flex-direction:row; flex-wrap:wrap; }
          .stat  { flex:1; min-width:130px; }
          #center { order:-1; }
          #altimeter { display:none; }
          #nav   { padding:0 20px; }
          #btm   { padding:0 20px; }
          .s2-grid { grid-template-columns:repeat(2,1fr); }
          #s2    { padding:64px 20px; }
          footer { padding:24px 20px; flex-direction:column; gap:8px; text-align:center; }
        }
      `}</style>

      {/* ══ PIN WRAPPER ══ */}
      <div id="pin-wrap" ref={pinRef}>
        <section id="hero" ref={heroRef}>

          <canvas id="stars" ref={starsRef} />
          <canvas id="smoke-canvas" ref={smokeRef} />
          <div id="ground" />
          <div id="pad" />
          <div id="pad-glow" ref={padGlowRef} />

          {/* NAV */}
          <nav id="nav" ref={navRef}>
            <div className="logo">ITZFIZZ</div>
            <ul className="nav-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Work</a></li>
            </ul>
            <button className="nav-btn">Get Started</button>
          </nav>

          {/* STAGE */}
          <div id="stage">

            {/* LEFT — stacked letters (absolute, sits over center) */}
            <div id="left" ref={leftRef}>
              {welcome.map((ch, i) => (
                <span key={i} className="ltr">{ch}</span>
              ))}
              <span className="ltr gap" />
              {itzfizz.map((ch, i) => (
                <span key={i} className="ltr acc">{ch}</span>
              ))}
            </div>

            {/* CENTER — rocket */}
            <div id="center">
              <div id="altimeter">
                <div id="alt-fill" ref={altFillRef} />
                <div id="alt-tip"  ref={altTipRef} />
                <div id="alt-label">ALT</div>
              </div>

              <div id="rocket-wrap" ref={rocketWrapRef}>
                {/* FLAME */}
                <svg id="flame-svg" ref={flameSvgRef} viewBox="0 0 60 80" fill="none">
                  <defs>
                    <radialGradient id="fg1" cx="50%" cy="0%" r="80%">
                      <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                      <stop offset="30%"  stopColor="#ffee00" stopOpacity="1"/>
                      <stop offset="65%"  stopColor="#ff6a00" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#ff2200" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="fg2" cx="50%" cy="0%" r="70%">
                      <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9"/>
                      <stop offset="40%"  stopColor="#ffcc00" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#ff6a00" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <path ref={flameOuterRef} d="M30,0 C18,12 8,22 10,40 C12,55 20,65 30,75 C40,65 48,55 50,40 C52,22 42,12 30,0Z" fill="url(#fg1)" opacity="0.9"/>
                  <path ref={flameInnerRef} d="M30,4 C23,14 18,24 20,38 C22,50 26,60 30,68 C34,60 38,50 40,38 C42,24 37,14 30,4Z" fill="url(#fg2)" opacity="1"/>
                  <ellipse cx="30" cy="12" rx="7" ry="10" fill="white" opacity="0.85"/>
                </svg>

                {/* ROCKET */}
                <svg id="rocket-svg" viewBox="0 0 100 260" fill="none">
                  <defs>
                    <linearGradient id="bodyG" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#5a5e78"/>
                      <stop offset="35%"  stopColor="#d0d4ec"/>
                      <stop offset="65%"  stopColor="#d0d4ec"/>
                      <stop offset="100%" stopColor="#4a4e68"/>
                    </linearGradient>
                    <linearGradient id="noseG" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#888caa"/>
                      <stop offset="50%"  stopColor="#ffffff"/>
                      <stop offset="100%" stopColor="#888caa"/>
                    </linearGradient>
                    <linearGradient id="finG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#6068a0"/>
                      <stop offset="100%" stopColor="#2a2e48"/>
                    </linearGradient>
                    <radialGradient id="windowG" cx="40%" cy="35%" r="60%">
                      <stop offset="0%"   stopColor="#c8ff00" stopOpacity="0.95"/>
                      <stop offset="70%"  stopColor="#80aa00" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#4a6600" stopOpacity="0.4"/>
                    </radialGradient>
                    <filter id="rimLight">
                      <feGaussianBlur stdDeviation="1.5" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  <path d="M28,195 L5,245 L28,235 Z"  fill="url(#finG)" opacity="0.95"/>
                  <path d="M28,195 L5,245 L28,235 Z"  stroke="rgba(200,255,0,0.25)" strokeWidth="0.8" fill="none"/>
                  <path d="M72,195 L95,245 L72,235 Z" fill="url(#finG)" opacity="0.95"/>
                  <path d="M72,195 L95,245 L72,235 Z" stroke="rgba(200,255,0,0.25)" strokeWidth="0.8" fill="none"/>
                  <path d="M32,80 L20,40 L34,60 Z"    fill="#5058a0" opacity="0.7"/>
                  <path d="M68,80 L80,40 L66,60 Z"    fill="#5058a0" opacity="0.7"/>
                  <path d="M50,4 C62,4 70,14 72,30 L74,195 C74,210 63,220 50,220 C37,220 26,210 26,195 L28,30 C30,14 38,4 50,4Z" fill="url(#bodyG)"/>
                  <path d="M50,4 C62,4 70,14 72,30 L74,195 C74,210 63,220 50,220" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none"/>
                  <path d="M50,4 C38,4 30,14 28,30 L26,195 C26,210 37,220 50,220" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
                  <path d="M50,4 C56,4 64,12 66,28 L50,24 L34,28 C36,12 44,4 50,4Z" fill="url(#noseG)"/>
                  <circle cx="50" cy="5" r="3.5" fill="white" opacity="0.9"/>
                  <rect x="26" y="130" width="48" height="3"   fill="rgba(200,255,0,0.35)" rx="1"/>
                  <rect x="26" y="160" width="48" height="1.5" fill="rgba(200,255,0,0.15)" rx="1"/>
                  <ellipse cx="50" cy="90" rx="13" ry="15" fill="url(#windowG)" filter="url(#rimLight)"/>
                  <ellipse cx="50" cy="90" rx="10" ry="12" fill="rgba(200,255,0,0.15)"/>
                  <ellipse cx="45" cy="84" rx="4"  ry="5"  fill="rgba(255,255,255,0.4)" transform="rotate(-15,45,84)"/>
                  <line x1="38" y1="40"  x2="62" y2="40"  stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
                  <line x1="36" y1="55"  x2="64" y2="55"  stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>
                  <line x1="34" y1="118" x2="66" y2="118" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>
                  <line x1="32" y1="145" x2="68" y2="145" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
                  <line x1="30" y1="175" x2="70" y2="175" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
                  <line x1="50" y1="24"  x2="50" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="6 5"/>
                  <path d="M32,215 L26,238 L38,232 Z" fill="#303450" opacity="0.9"/>
                  <path d="M68,215 L74,238 L62,232 Z" fill="#303450" opacity="0.9"/>
                  <ellipse cx="50" cy="222" rx="10" ry="6" fill="#202234" opacity="0.95"/>
                  <ellipse cx="50" cy="222" rx="7"  ry="4" fill="#101120"/>
                  <text x="50" y="200" fill="rgba(200,255,0,0.5)" fontFamily="Space Mono" fontSize="5" letterSpacing="1" textAnchor="middle">ITZFIZZ</text>
                </svg>
              </div>
            </div>

            {/* RIGHT — stats */}
            <div id="right" ref={rightRef}>
              {stats.map((s, i) => (
                <div key={i} className="stat">
                  <div className="snum">
                    <span className="sarrow">{s.arrow}</span>
                    <span className="sv" data-t={s.t}>0</span>%
                  </div>
                  <div className="slbl">{s.lbl}</div>
                </div>
              ))}
            </div>

          </div>{/* /stage */}

          {/* BOTTOM BAR */}
          <div id="btm" ref={btmRef}>
            <span className="btxt">© 2024 ITZFIZZ</span>
            <div id="prg-track">
              <div id="prg-fill" ref={prgFillRef} />
              <div id="prg-dot"  ref={prgDotRef} />
            </div>
            <span className="btxt" ref={pctRef}>SCROLL TO LAUNCH ↑</span>
          </div>

        </section>
      </div>{/* /pin-wrap */}

      {/* MARQUEE */}
      <div id="mq">
        <div className="mq-track" ref={mqtRef}>
          {mqAll.map((w, i) => (
            <span key={i} className="mq-item">
              {w}
              {i < mqAll.length - 1 && <span className="mq-dot" />}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 2 */}
      <section id="s2">
        <p className="s2-eye">Impact Report</p>
        <h2 className="s2-h">RESULTS<br />THAT <em>MATTER.</em></h2>
        <div className="s2-grid">
          {s2cards.map((c, i) => (
            <div key={i} className="s2-card">
              <div className="s2-big"><span className="cv" data-t={c.t}>0</span>%</div>
              <div className="s2-name">{c.name}</div>
              <div className="s2-desc">{c.desc}</div>
              <div className="s2-bar"><div className="s2-bf" data-f={c.f} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="f-logo">ITZFIZZ</div>
        <div className="f-copy">Next-gen digital experience · Est. 2024</div>
        <div className="f-copy">All rights reserved</div>
      </footer>
    </>
  );
}
