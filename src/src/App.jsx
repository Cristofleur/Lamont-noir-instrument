/**
 * LA MONT NOIR — THE EXCAVATION INSTRUMENT
 * Phase One: Archetype Recognition Rite
 * Visual Rebuild — Ornate / Eccentric / Archival
 *
 * A = VARA   · Command / Authority
 * B = SETH   · Perception / Concealment
 * C = DRAE   · Continuity / Endurance
 * D = UNAR   · Intensity / Disruption
 * E = GRYTH  · Care / Offering
 */

import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   SECTION COLOUR WORLDS
   Each section has its own atmospheric register.
═══════════════════════════════════════════════════════════ */

const WORLDS = {
  threshold: {
    outer: "#1A0B16",
    inner: "#E8DFD0",
    accent: "#A8844F",
    docText: "#211B18",
    label: "#A8844F",
    stripe: "rgba(168,132,79,0.06)",
  },
  1: { bg: "#3D0808", card: "#2D0505", accent: "#D4884A", text: "#F2E8D8", label: "#C87A3A", border: "rgba(212,136,74,0.35)" },
  2: { bg: "#253320", card: "#1C2A18", accent: "#8FAF6B", text: "#F0EBE0", label: "#7A9A5A", border: "rgba(143,175,107,0.35)" },
  3: { bg: "#28153D", card: "#1E0D30", accent: "#9B7EC4", text: "#F0E8FA", label: "#8A6AB8", border: "rgba(155,126,196,0.35)" },
  4: { bg: "#111E35", card: "#0D1628", accent: "#7A90BF", text: "#E8EEF8", label: "#6A80AF", border: "rgba(122,144,191,0.35)" },
  5: { bg: "#0A2418", card: "#071A10", accent: "#6BA888", text: "#E8F2EC", label: "#5A9878", border: "rgba(107,168,136,0.35)" },
  6: { bg: "#331A00", card: "#261200", accent: "#C89A3A", text: "#F5E8CC", label: "#B88A2A", border: "rgba(200,154,58,0.35)" },
  7: { bg: "#280820", card: "#1E0518", accent: "#B06A90", text: "#F5E8F2", label: "#A05A80", border: "rgba(176,106,144,0.35)" },
  8: { bg: "#141414", card: "#0D0D0D", accent: "#9A9080", text: "#EAE6E0", label: "#8A8070", border: "rgba(154,144,128,0.35)" },
  9: { bg: "#080608", card: "#040404", accent: "#A8844F", text: "#F0E8D8", label: "#987040", border: "rgba(168,132,79,0.35)" },
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-text-size-adjust: 100%; }
    body { background: #080608; overflow-x: hidden; }

    .cf  { font-family: 'Cormorant Garamond', Georgia, serif; }
    .sf  { font-family: 'Inter', system-ui, sans-serif; }

    /* ── Animations ── */
    .fade   { animation: lmn-fade  0.55s cubic-bezier(0.16,1,0.3,1) both; }
    .rise   { animation: lmn-rise  0.55s cubic-bezier(0.16,1,0.3,1) both; }
    .world  { animation: lmn-world 0.7s  cubic-bezier(0.16,1,0.3,1) both; }

    @keyframes lmn-fade  { from{opacity:0}            to{opacity:1} }
    @keyframes lmn-rise  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes lmn-world { from{opacity:0;transform:scale(0.98)} to{opacity:1;transform:scale(1)} }

    /* ── Texture overlays ── */
    .tex-linen {
      background-image:
        repeating-linear-gradient(0deg,   rgba(0,0,0,0.06) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
        repeating-linear-gradient(90deg,  rgba(0,0,0,0.04) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px);
    }
    .tex-paper {
      background-image:
        radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%),
        radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.07) 0%, transparent 50%),
        repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, transparent 1px, transparent 4px);
    }

    /* ── Answer cards ── */
    .ans-card {
      cursor: pointer;
      position: relative;
      transition: all 0.18s ease;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.22);
    }
    .ans-card:hover {
      background: rgba(255,255,255,0.07);
      border-color: rgba(255,255,255,0.22);
    }
    .ans-card.chosen {
      background: rgba(255,255,255,0.13);
      border-color: rgba(255,255,255,0.55);
    }
    .ans-card .corner {
      position: absolute;
      width: 7px; height: 7px;
      border-color: inherit;
    }
    .ans-card .corner.tl { top:-1px; left:-1px; border-top:1px solid; border-left:1px solid; }
    .ans-card .corner.tr { top:-1px; right:-1px; border-top:1px solid; border-right:1px solid; }
    .ans-card .corner.bl { bottom:-1px; left:-1px; border-bottom:1px solid; border-left:1px solid; }
    .ans-card .corner.br { bottom:-1px; right:-1px; border-bottom:1px solid; border-right:1px solid; }

    /* ── Buttons ── */
    .lmn-btn {
      cursor: pointer;
      background: none;
      border: none;
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      letter-spacing: 0.22em;
      font-weight: 400;
      text-transform: uppercase;
      transition: opacity 0.2s ease;
      outline: none;
    }
    .lmn-btn:hover  { opacity: 0.78; }
    .lmn-btn:active { opacity: 0.55; }
    .lmn-btn:disabled { cursor: not-allowed; opacity: 0.3; }

    /* ── Progress ── */
    .prog-track { height: 1px; background: rgba(255,255,255,0.1); position: relative; }
    .prog-fill  { position: absolute; top:0; left:0; height:100%; transition: width 0.4s cubic-bezier(0.16,1,0.3,1); }

    /* ── Dashboard ── */
    .dash-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 10px 0;
      border-bottom: 1px solid rgba(168,132,79,0.1);
      gap: 16px;
    }
    .dash-bar-track { height: 2px; background: rgba(168,132,79,0.1); margin-top: 6px; }
    .dash-bar-fill  { height: 100%; background: rgba(168,132,79,0.5); transition: width 0.7s ease; }
    .decree-block {
      background: #0A0608;
      border: 1px solid rgba(168,132,79,0.22);
      border-left: 2px solid #A8844F;
      padding: 20px 22px;
      margin-top: 14px;
    }

    .preline { white-space: pre-line; }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #080608; }
    ::-webkit-scrollbar-thumb { background: rgba(168,132,79,0.3); }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════
   SVG ORNAMENTS
═══════════════════════════════════════════════════════════ */

/* Compass rose sigil */
const HouseSigil = ({ color = "#A8844F", size = 64 }) => {
  const c = 32, r = 30;
  const diags = [45, 135, 225, 315];
  const ticks = Array.from({length: 48}, (_, i) => i * 7.5).filter(d => d % 90 !== 0);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Outer ring */}
      <circle cx={c} cy={c} r={r}   stroke={color} strokeWidth="0.7" opacity="0.45"/>
      <circle cx={c} cy={c} r={r*.78} stroke={color} strokeWidth="0.4" opacity="0.3"/>
      <circle cx={c} cy={c} r={r*.55} stroke={color} strokeWidth="0.35" opacity="0.25"/>

      {/* Cardinal spikes */}
      <polygon points={`${c},${c-r*.92} ${c+2.2},${c-r*.5} ${c},${c-r*.15} ${c-2.2},${c-r*.5}`} fill={color}/>
      <polygon points={`${c},${c+r*.92} ${c+2.2},${c+r*.5} ${c},${c+r*.15} ${c-2.2},${c+r*.5}`} fill={color}/>
      <polygon points={`${c-r*.92},${c} ${c-r*.5},${c+2.2} ${c-r*.15},${c} ${c-r*.5},${c-2.2}`} fill={color}/>
      <polygon points={`${c+r*.92},${c} ${c+r*.5},${c+2.2} ${c+r*.15},${c} ${c+r*.5},${c-2.2}`} fill={color}/>

      {/* Diagonal spokes */}
      {diags.map(deg => {
        const rad = deg * Math.PI / 180;
        return <line key={deg}
          x1={c + Math.cos(rad)*r*.18} y1={c + Math.sin(rad)*r*.18}
          x2={c + Math.cos(rad)*r*.68} y2={c + Math.sin(rad)*r*.68}
          stroke={color} strokeWidth="0.6" opacity="0.45"/>;
      })}
      {/* Diagonal mini-diamonds */}
      {diags.map(deg => {
        const rad = deg * Math.PI / 180;
        const x = c + Math.cos(rad)*r*.7, y = c + Math.sin(rad)*r*.7;
        return <rect key={deg} x={x-2} y={y-2} width="4" height="4"
          transform={`rotate(45 ${x} ${y})`} fill={color} opacity="0.6"/>;
      })}

      {/* Tick marks */}
      {ticks.map(deg => {
        const rad = deg * Math.PI / 180, isMaj = deg % 22.5 === 0;
        const r1 = r*(isMaj?.86:.91), r2 = r;
        return <line key={deg}
          x1={c+Math.cos(rad)*r1} y1={c+Math.sin(rad)*r1}
          x2={c+Math.cos(rad)*r2} y2={c+Math.sin(rad)*r2}
          stroke={color} strokeWidth={isMaj?"0.5":"0.3"} opacity={isMaj?"0.4":"0.25"}/>;
      })}

      {/* Centre */}
      <circle cx={c} cy={c} r="4"  stroke={color} strokeWidth="0.6" fill={`${color}22`}/>
      <circle cx={c} cy={c} r="1.5" fill={color}/>
    </svg>
  );
};

/* Ornate flourish divider */
const OrnateDivider = ({ color = "#A8844F", op = 1 }) => (
  <svg viewBox="0 0 400 22" style={{ width:"100%", height:"22px", display:"block" }} opacity={op}>
    <line x1="0"   y1="11" x2="140" y2="11" stroke={color} strokeWidth="0.6" opacity="0.5"/>
    <line x1="260" y1="11" x2="400" y2="11" stroke={color} strokeWidth="0.6" opacity="0.5"/>

    {/* Left compound cusp */}
    <path d={`M140 11 Q148 5  156 11 Q148 17 140 11`} fill={color} opacity="0.75"/>
    <rect x="157" y="8" width="6" height="6" transform="rotate(45 160 11)" fill={color} opacity="0.85"/>

    {/* Centre ornament */}
    <path d={`M170 11 Q181 2  192 11 Q181 20 170 11`} fill={color}/>
    <rect x="193" y="7" width="8" height="8" transform="rotate(45 197 11)" fill="none" stroke={color} strokeWidth="0.9"/>
    <circle cx="197" cy="11" r="2.2" fill={color}/>
    <path d={`M202 11 Q213 2  224 11 Q213 20 202 11`} fill={color}/>

    {/* Right compound cusp */}
    <rect x="225" y="8" width="6" height="6" transform="rotate(45 228 11)" fill={color} opacity="0.85"/>
    <path d={`M234 11 Q242 5  250 11 Q242 17 234 11`} fill={color} opacity="0.75"/>
  </svg>
);

/* Thin line divider */
const ThinDivider = ({ color = "#A8844F", op = 0.25, my = 20 }) => (
  <div style={{ height:1, background:`linear-gradient(to right, transparent, ${color}, transparent)`, opacity:op, margin:`${my}px 0` }}/>
);

/* Ornate CTA button — SVG-framed, like a Victorian label */
const OrnateButton = ({ children, onClick, color = "#A8844F", disabled = false }) => (
  <button onClick={disabled ? undefined : onClick} disabled={disabled}
    style={{ background:"none", border:"none", cursor:disabled?"not-allowed":"pointer", padding:0, width:"100%", opacity:disabled?.4:1, transition:"opacity .2s" }}>
    <svg viewBox="0 0 360 90" style={{ width:"100%", maxWidth:"320px", display:"block", margin:"0 auto" }}>
      {/* Main frame */}
      <rect x="108" y="18" width="144" height="54" fill={`${color}18`} stroke={color} strokeWidth="0.9"/>
      {/* Corner fills */}
      {[[108,18],[252,18],[108,72],[252,72]].map(([x,y],i) => (
        <rect key={i} x={x-3} y={y-3} width="6" height="6" fill={color}/>
      ))}

      {/* Left scrollwork */}
      <path d="M108 45 Q90 45 74 37 Q64 45 74 53 Q90 45 108 45" fill="none" stroke={color} strokeWidth="0.85"/>
      <path d="M74  45 Q56 45 40 39 Q32 45 40 51 Q56 45 74 45"  fill="none" stroke={color} strokeWidth="0.65" opacity="0.65"/>
      <path d="M40  45 Q24 45 10 41 Q4  45 10 49 Q24 45 40 45"  fill="none" stroke={color} strokeWidth="0.45" opacity="0.4"/>
      <rect x="104" y="42" width="6" height="6" transform="rotate(45 107 45)" fill={color}/>

      {/* Right scrollwork */}
      <path d="M252 45 Q270 45 286 37 Q296 45 286 53 Q270 45 252 45" fill="none" stroke={color} strokeWidth="0.85"/>
      <path d="M286 45 Q304 45 320 39 Q328 45 320 51 Q304 45 286 45" fill="none" stroke={color} strokeWidth="0.65" opacity="0.65"/>
      <path d="M320 45 Q336 45 350 41 Q356 45 350 49 Q336 45 320 45" fill="none" stroke={color} strokeWidth="0.45" opacity="0.4"/>
      <rect x="250" y="42" width="6" height="6" transform="rotate(45 253 45)" fill={color}/>

      {/* Inner border inset */}
      <rect x="113" y="23" width="134" height="44" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5"/>

      {/* Text */}
      <text x="180" y="41" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="8.5" fontWeight="400"
        fill={color} letterSpacing="3.5">{typeof children === "string" ? children.split("\n")[0] : children}</text>
      {typeof children === "string" && children.includes("\n") && (
        <text x="180" y="55" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="8.5" fontWeight="400"
          fill={color} letterSpacing="3.5">{children.split("\n")[1]}</text>
      )}
    </svg>
  </button>
);

/* ═══════════════════════════════════════════════════════════
   DATA — SECTIONS
═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:1, name:"SECTION I",    title:"FIRST CONTACT",           desc:"How you read a room before the room reads you.",        range:[0,8]   },
  { id:2, name:"SECTION II",   title:"RELATIONAL GRAVITY",      desc:"How others orbit you when you stop managing the room.", range:[9,17]  },
  { id:3, name:"SECTION III",  title:"IDENTITY UNDER PRESSURE", desc:"What holds when the room applies its weight.",          range:[18,26] },
  { id:4, name:"SECTION IV",   title:"THE WOUND ARCHITECTURE",  desc:"What you built your strength around.",                  range:[27,35] },
  { id:5, name:"SECTION V",    title:"AUTHORITY AND ITS LIMIT", desc:"Where command lives and where it ends.",                range:[36,44] },
  { id:6, name:"SECTION VI",   title:"MATERIAL HUNGER",         desc:"What you want image and environment to do.",            range:[45,53] },
  { id:7, name:"SECTION VII",  title:"THE VEIL",                desc:"What you conceal and what concealment costs.",          range:[54,62] },
  { id:8, name:"SECTION VIII", title:"CONTRADICTION",           desc:"Where the pattern breaks and why.",                     range:[63,71] },
  { id:9, name:"SECTION IX",   title:"THE DECREE",              desc:"What the pattern ultimately points toward.",            range:[72,80] },
];

/* ═══════════════════════════════════════════════════════════
   DATA — 81 QUESTIONS
═══════════════════════════════════════════════════════════ */

const QUESTIONS = [
  // I — FIRST CONTACT
  {s:1,q:"In a new room, your attention fixes first on:",A:"Who already holds control, and whether it is deserved",B:"What is being concealed, and who benefits from the concealment",C:"What has been here longer than anyone is acknowledging",D:"Where something is about to rupture",E:"Who is quietly asking to be handled"},
  {s:1,q:"Before anyone speaks, you usually understand:",A:"Where decisions will actually be made",B:"Who is watching more than they reveal",C:"What rhythm the room expects you to obey",D:"Which tension everyone is pretending not to feel",E:"Who will require emotional translation"},
  {s:1,q:"When you enter a space where no one knows you, you tend to:",A:"Establish your presence before anyone can misplace you",B:"Let others reveal themselves before offering access",C:"Find the safest rhythm and settle into it",D:"Disturb the room before deciding whether it deserves you",E:"Make yourself readable enough that others soften"},
  {s:1,q:"Your body, left alone in public, most often becomes:",A:"An anchor others must move around",B:"A closed door with the lights still on",C:"A composed object that refuses unnecessary change",D:"A signal that something has entered the room",E:"A softened surface others mistake for permission"},
  {s:1,q:"What irritates you first in an unfamiliar environment?",A:"Weak authority pretending to lead",B:"Obvious secrets performed badly",C:"Carelessness with what should have been preserved",D:"Dead air with no charge in it",E:"People ignoring the discomfort they are creating"},
  {s:1,q:"When you do not understand a room yet, you:",A:"Take control of one small thing and build from there",B:"Become harder to read until the pattern exposes itself",C:"Return to familiar behaviors until the ground steadies",D:"Press the room slightly to see what reacts",E:"Make others comfortable while privately assessing danger"},
  {s:1,q:"The first thing people misunderstand about your presence is:",A:"That your certainty is negotiable",B:"That your silence means absence",C:"That your restraint means simplicity",D:"That your intensity is accidental",E:"That your softness is available to everyone"},
  {s:1,q:"If a room resists you, your instinct is to:",A:"Clarify your position until resistance has shape",B:"Observe who benefits from the resistance",C:"Hold steady until the room exhausts itself",D:"Increase charge until the room reveals its fault line",E:"Soften the surface while protecting the center"},
  {s:1,q:"Your arrival is most often:",A:"A correction",B:"A surveillance",C:"A return",D:"An interruption",E:"An offering"},
  // II — RELATIONAL GRAVITY
  {s:2,q:"In groups, people tend to:",A:"Let you decide, even when they should not",B:"Watch you before they trust the room",C:"Bring you their stories because you seem able to hold them",D:"Feel something shift and act differently around you",E:"Relax in ways that quietly cost you something"},
  {s:2,q:"When you go quiet, others usually:",A:"Wait for your verdict",B:"Try to read what you are withholding",C:"Fill the silence with familiarity",D:"Become uneasy and overcorrect",E:"Try to reconnect you to the room"},
  {s:2,q:"Strangers often assume you are:",A:"In charge of more than you admit",B:"Not telling the whole story",C:"Safer than you actually feel",D:"More dangerous than you intended to appear",E:"Kinder than you have agreed to be"},
  {s:2,q:"People come to you when they need:",A:"Direction without apology",B:"A truth they cannot say aloud",C:"Continuity when something feels unstable",D:"Permission to feel what is not polite",E:"A place to put what they cannot carry"},
  {s:2,q:"Your effect on others becomes clearest when:",A:"Someone needs a decision and looks at you first",B:"Someone confesses without knowing why",C:"Someone settles because you stayed steady",D:"Someone becomes braver or stranger near you",E:"Someone lets their guard down too quickly"},
  {s:2,q:"When someone wants closeness with you, they usually try to access:",A:"Your approval",B:"Your hidden thoughts",C:"Your loyalty",D:"Your fire",E:"Your tenderness"},
  {s:2,q:"You are most often mistaken for someone who will:",A:"Take responsibility automatically",B:"Understand without being told",C:"Preserve what others neglect",D:"Make life more interesting",E:"Forgive before you are ready"},
  {s:2,q:"When people depend on you, the danger is that:",A:"They mistake your competence for consent",B:"They mistake your perception for intimacy",C:"They mistake your endurance for endlessness",D:"They mistake your force for entertainment",E:"They mistake your care for obligation"},
  {s:2,q:"The room changes around you because:",A:"Authority reorganizes itself",B:"Hidden dynamics become more visible",C:"What was scattered begins to gather",D:"The temperature rises",E:"People feel permitted to soften"},
  // III — IDENTITY UNDER PRESSURE
  {s:3,q:"When someone misreads you publicly, your first impulse is to:",A:"Correct the record with precision",B:"Let the misread exist and study what it reveals",C:"Return to form until the misread dissolves naturally",D:"Make the misread cost them something",E:"Absorb the wound and repair it privately"},
  {s:3,q:"Under sustained criticism, you typically:",A:"Hold your position until the argument exhausts itself",B:"Become more opaque and harder to target",C:"Find historical precedent for your value",D:"Accelerate rather than contract",E:"Offer enough to stop the pain without conceding the core"},
  {s:3,q:"When someone knows something true about your weakness, you:",A:"Preempt them by claiming it before they can use it",B:"Track who they tell and what version they carry",C:"Continue as if the knowledge changes nothing",D:"Make the disclosure irrelevant by increasing your power",E:"Trust that they will not use it because you would not"},
  {s:3,q:"The version of yourself you protect most fiercely is:",A:"The one that has not yet been proven wrong",B:"The one that has seen things others have not",C:"The one that has endured things without complaint",D:"The one that broke and rebuilt without apology",E:"The one that chose people when it was not required"},
  {s:3,q:"When you are not performing well, you prefer others to:",A:"Say nothing and wait",B:"Ask nothing and observe",C:"Treat you as if nothing has changed",D:"Give you space and distance",E:"Offer presence without pressure"},
  {s:3,q:"Your identity holds most clearly when:",A:"Something requires a decision only you can make",B:"You are the only one who understands what is actually happening",C:"Things continue in the way they were built to continue",D:"Something disrupts the pattern and you are not surprised",E:"Someone needs exactly what you have and cannot get it elsewhere"},
  {s:3,q:"The self you project under observation is:",A:"Accurate, because accuracy is control",B:"Partial, because completeness is exposure",C:"Consistent, because consistency is authority",D:"Intensified, because observation is pressure",E:"Softened, because softness is strategic"},
  {s:3,q:"You know your identity is holding when:",A:"You do not need to justify anything",B:"You know things the room cannot verify",C:"Nothing has moved that you did not allow to move",D:"The room has had to adjust to you",E:"The people you chose are still there"},
  {s:3,q:"When someone challenges who you are, the most honest response would be:",A:"To outlast them",B:"To already know more than they are revealing",C:"To prove continuity",D:"To increase the charge",E:"To offer something real that stops the game"},
  // IV — WOUND ARCHITECTURE
  {s:4,q:"What you protect most obsessively is actually:",A:"The capacity to be right",B:"The capacity to be the only one who truly sees",C:"The capacity to be needed by something that lasts",D:"The capacity to feel the full force of things",E:"The capacity to be chosen by someone who didn't have to"},
  {s:4,q:"The wound that most organizes your behavior is:",A:"Having been overruled when you were correct",B:"Having been misread when you were present",C:"Having been abandoned when you were reliable",D:"Having been diminished when you were alive",E:"Having been taken for granted when you were giving"},
  {s:4,q:"You built your strength out of:",A:"Needing no one to confirm what you already knew",B:"Seeing before others could warn you",C:"Remaining when others could not",D:"Burning through what did not deserve to survive",E:"Making yourself worth returning to"},
  {s:4,q:"The thing most likely to break your composure is:",A:"Incompetence in a position it doesn't deserve",B:"Being deceived by someone who knew your attention",C:"Discovering that something you preserved was already gone",D:"Forced stillness when the situation demands motion",E:"Offering real care and having it processed as performance"},
  {s:4,q:"When you are in real pain, others can tell because:",A:"Your precision gets colder",B:"Your attention narrows to almost nothing",C:"You become unnervingly still",D:"The charge in you goes flat",E:"Your softness becomes inaccessible"},
  {s:4,q:"What you never fully forgive is:",A:"Weakness pretending to be wisdom",B:"Disclosure weaponized against trust",C:"Negligence with things that took time to build",D:"Dullness that could have been avoided",E:"Care offered and then retracted"},
  {s:4,q:"Your greatest defense mechanism is:",A:"Preemptive authority — taking control before you can be controlled",B:"Strategic opacity — becoming unreadable before you can be read",C:"Temporal depth — reminding yourself and others of what has endured",D:"Intensity escalation — making passivity more costly than engagement",E:"Relational offering — giving enough that aggression becomes bad form"},
  {s:4,q:"The version of yourself you most fear is:",A:"The one who waited too long to act",B:"The one who was transparent and was used for it",C:"The one who stayed so long it became indistinguishable from inertia",D:"The one who burned everything for a feeling that didn't last",E:"The one who kept giving after it stopped mattering"},
  {s:4,q:"When something you built is damaged, your first move is:",A:"Assess who is responsible and what authority they represent",B:"Understand the full scope before responding",C:"Restore the original state with as little disruption as possible",D:"Burn the damaged structure and build with better material",E:"Determine whether the people involved are worth the rebuild"},
  // V — AUTHORITY AND ITS LIMIT
  {s:5,q:"You take control instinctively when:",A:"No one else has demonstrated they deserve it",B:"Control gives you the best vantage point for observation",C:"The situation matches something you have navigated before",D:"The room's inertia has become intolerable",E:"Someone is clearly suffering and no one is moving"},
  {s:5,q:"You defer to others when:",A:"Their competence is verifiable and their authority is earned",B:"Deferring gives you more information than leading would",C:"The form requires deference and breaking it costs more than it earns",D:"You are testing whether they can hold what they are claiming",E:"Someone needs to feel in control more than you need to be"},
  {s:5,q:"The way you prefer to hold authority is:",A:"Structurally — through role, decision, and consequence",B:"Informationally — through knowing what others do not",C:"Historically — through having endured what others haven't",D:"Atmospherically — through presence that reorganizes the room",E:"Relationally — through being the person others cannot afford to lose"},
  {s:5,q:"Authority becomes uncomfortable for you when:",A:"It requires you to be wrong publicly",B:"It makes you visible in ways that compromise your perception",C:"It disrupts rhythms that have earned their permanence",D:"It requires you to soften what should not be softened",E:"It costs someone else in ways you did not authorize"},
  {s:5,q:"You withdraw authority when:",A:"The space doesn't merit the energy of holding it",B:"Withdrawal becomes more informative than presence",C:"The form demands transition and you respect the form",D:"Holding would require performing rather than being",E:"Someone else needs the room more than you need the position"},
  {s:5,q:"Others challenge your authority most effectively by:",A:"Demonstrating competence you cannot discredit",B:"Exposing information you didn't know they had",C:"Appealing to precedent you cannot contradict",D:"Refusing to react to your pressure",E:"Needing something from you that you cannot deny"},
  {s:5,q:"When authority is given to someone unqualified, your response is:",A:"Visible restraint concealing strategic preparation",B:"Silent observation of every mistake they make",C:"Maintenance of your own order within their disorder",D:"Refusal to pretend the situation is acceptable",E:"Quiet protection of those who will be harmed by the incompetence"},
  {s:5,q:"The limit of your authority is most often reached when:",A:"Someone refuses to recognize it without cause",B:"What you know cannot be shared without damaging the knowing",C:"The institution overrides the individual and is correct to do so",D:"The cost of enforcing it exceeds the value of the territory",E:"Enforcing it would require damaging someone who trusted you"},
  {s:5,q:"After you lose a position of authority, you:",A:"Reconstruct the conditions for reentry",B:"Analyze what intelligence you failed to gather",C:"Return to what endured before the position",D:"Refuse to perform grief for something that didn't earn your grief",E:"Stay for the people, not the position"},
  // VI — MATERIAL HUNGER
  {s:6,q:"What you want from your physical environment is:",A:"Evidence that you belong to the category you are claiming",B:"Material that does not explain itself",C:"Objects that have survived longer than you have",D:"Surfaces that hold charge without ornament",E:"Spaces that make others comfortable enough to be honest"},
  {s:6,q:"When you dress, the primary logic is:",A:"Authority made visible without announcement",B:"Concealment that reads as aesthetic choice",C:"Continuity with what has been refined over time",D:"Disruption that makes the room reorganize",E:"Approachability that is actually strategic access"},
  {s:6,q:"What you cannot tolerate aesthetically is:",A:"Cheapness performing as quality",B:"Legibility where opacity would serve better",C:"Novelty without memory",D:"Stillness where there should be charge",E:"Coldness where there should be entry"},
  {s:6,q:"The objects you keep longest are:",A:"Those that represent a threshold you crossed",B:"Those that know something about you that others don't",C:"Those that were built to last and have proven it",D:"Those that still carry the charge of when you acquired them",E:"Those that belonged to someone who mattered"},
  {s:6,q:"Your relationship to luxury is primarily:",A:"A language of claim — it announces what does not need announcing",B:"A screen — what is seen prevents what is known",C:"A heritage — what endures has earned the right to endure",D:"A fuel — what is fine makes the body move differently",E:"A gift — what is beautiful should be shared with those who can receive it"},
  {s:6,q:"You want your image to do:",A:"The work of authority before you speak",B:"The work of concealment while appearing present",C:"The work of continuity — reading as always having been",D:"The work of pressure — changing the room before you act",E:"The work of invitation — making the right people approach"},
  {s:6,q:"What you are most reluctant to spend on is:",A:"Things that signal weakness in the purchasing",B:"Things that make you too readable",C:"Things that will not outlast you",D:"Things that do not produce sensation",E:"Things that benefit only yourself"},
  {s:6,q:"In a space that does not match your register, you:",A:"Correct the space by entering it as you are",B:"Use the mismatch to observe who notices",C:"Find the one element with permanence and organize around it",D:"Introduce charge until the space has to acknowledge you",E:"Make it work for the people with you even at cost to yourself"},
  {s:6,q:"What you want your home to feel like is:",A:"An institution you built",B:"A room with secrets that don't require explanation",C:"A house that has already existed for a century",D:"An atmosphere that cannot be fully described",E:"The place where people tell you the truth"},
  // VII — THE VEIL
  {s:7,q:"What you conceal most deliberately is:",A:"Uncertainty — because it would be read as incompetence",B:"The full extent of what you know",C:"How much things have cost you to endure",D:"How close to the edge you operate",E:"How much you need the people you have chosen"},
  {s:7,q:"The veil you maintain most consistently is:",A:"Confidence — because the alternative is chaos",B:"Neutrality — because reaction is intelligence",C:"Stability — because fluctuation would alarm those who depend on you",D:"Control — because revealing the depth would be misunderstood",E:"Self-sufficiency — because expressing need changes the power in the room"},
  {s:7,q:"Others rarely see:",A:"That you have already decided before they finish speaking",B:"That you are cataloguing every contradiction they reveal",C:"That staying is an active choice you make repeatedly",D:"That the intensity is controlled, not released",E:"That you are only open with people who have been vetted through time"},
  {s:7,q:"The thing you are most careful not to let the room see is:",A:"Doubt",B:"How much you already know",C:"Fatigue",D:"Hunger",E:"Longing"},
  {s:7,q:"When you feel exposed, you:",A:"Increase precision to replace the vulnerability with performance",B:"Become more opaque while appearing more present",C:"Return to something you have done long enough to do without thought",D:"Introduce intensity so the exposure has no time to settle",E:"Offer something real to redirect attention from what was seen"},
  {s:7,q:"The most dangerous version of your veil is when:",A:"Your competence conceals that you are failing",B:"Your opacity is mistaken for intimacy",C:"Your consistency is mistaken for contentment",D:"Your intensity is mistaken for stability",E:"Your care is mistaken for availability"},
  {s:7,q:"You remove the veil for:",A:"No one, or one",B:"No one, or the wrong person, which you regret",C:"The same people you have always allowed in",D:"Someone who can hold the charge without flinching",E:"Anyone who stays long enough with enough patience"},
  {s:7,q:"The cost of maintaining your veil is:",A:"The loneliness of always being the one who decides",B:"The distance between who you are and who they think they know",C:"The exhaustion of sustaining form when the form is not enough",D:"The flatness of being safe when you wanted to burn",E:"The longing for someone who makes the veil unnecessary"},
  {s:7,q:"What would happen if the veil came down entirely is:",A:"The room would lose its organizing structure",B:"The intelligence you hold would be wasted",C:"What you have built would require re-explanation",D:"The charge would be too much for most to hold",E:"You would become ordinary in someone's hands"},
  // VIII — CONTRADICTION
  {s:8,q:"The contradiction you live in most continuously is:",A:"Needing control while knowing control is not the same as understanding",B:"Seeing clearly while knowing that clarity is not the same as connection",C:"Staying while knowing that staying is not the same as belonging",D:"Burning while knowing that burning is not the same as building",E:"Giving while knowing that giving is not the same as being received"},
  {s:8,q:"Others find it hardest to reconcile:",A:"Your authority with your occasional need to be held",B:"Your perception with your occasional blindness about yourself",C:"Your constancy with your capacity for sudden departure",D:"Your intensity with your moments of total stillness",E:"Your care with your refusal to be used"},
  {s:8,q:"The thing you know about yourself that contradicts your dominant image is:",A:"That the certainty is a structure built over genuine unknowing",B:"That the perception fails entirely at close range",C:"That the endurance is sometimes just the inability to leave",D:"That the intensity is sometimes terror wearing a different face",E:"That the care is sometimes loneliness wearing a useful form"},
  {s:8,q:"When your contradiction is named by someone else, you:",A:"Deny its relevance without denying its existence",B:"Study them to understand how they arrived at the naming",C:"Accept the name quietly and say nothing",D:"Refuse to let the naming stand without a counter-move",E:"Thank them and let it cost you something privately"},
  {s:8,q:"Your behavior is most contradictory when:",A:"You want to be chosen but refuse to make it easy",B:"You want to be known but reveal nothing that would allow it",C:"You want to stay but have already prepared to leave",D:"You want to be still but require a charge to feel real",E:"You want nothing from people but structure your life around them"},
  {s:8,q:"The contradiction you most need someone to hold is:",A:"That strength is real and so is the cost of maintaining it",B:"That perception is real and so is the loneliness of it",C:"That endurance is real and so is the exhaustion of it",D:"That intensity is real and so is the tenderness under it",E:"That care is real and so is the self inside the one who cares"},
  {s:8,q:"Your contradiction protects you by:",A:"Making you too complex to be reduced",B:"Making you too interesting to dismiss",C:"Making you too familiar to be threatened",D:"Making you too unpredictable to be fully controlled",E:"Making you too necessary to be released"},
  {s:8,q:"The contradiction damages you by:",A:"Preventing the intimacy you do not acknowledge wanting",B:"Preventing the knowledge of yourself that you claim to have",C:"Preventing the belonging that endurance alone cannot guarantee",D:"Preventing the peace that intensity cannot locate",E:"Preventing the rest that care alone cannot provide"},
  {s:8,q:"If you resolved the contradiction, what you would lose is:",A:"The architecture of your authority",B:"The advantage of your position",C:"The identity that survival built",D:"The only version of aliveness you know how to produce",E:"The people you kept by being what they needed"},
  // IX — THE DECREE
  {s:9,q:"What you ultimately want to have been is:",A:"Correct, and recognized as such",B:"The one who saw, before it was too late to matter",C:"The thing that held when everything else moved",D:"The one who made the room feel what it was avoiding",E:"The one who was worth returning to"},
  {s:9,q:"What you want your life to have organized itself around is:",A:"Decisions that deserved to be made by you",B:"Truths that only you were positioned to hold",C:"Things that were worth the endurance they required",D:"Moments that could not have been produced without your charge",E:"People who were better for having been chosen by you"},
  {s:9,q:"If you were to be recognized — genuinely, accurately, completely — you would want to be known as:",A:"Someone who held what needed holding without asking to be thanked",B:"Someone who saw what no one else could afford to see",C:"Someone who stayed when staying required everything",D:"Someone who made the world feel its own aliveness",E:"Someone who made it safe to be real"},
  {s:9,q:"The thing you most want to have built, at the end:",A:"A structure that continues without you",B:"A body of knowledge that could not have existed otherwise",C:"A line of continuity through everything that tried to interrupt it",D:"A charge that still moves in the people who encountered it",E:"A record of having been consequentially present for the ones who needed it"},
  {s:9,q:"The legacy you fear most is:",A:"Having controlled without having understood",B:"Having seen without having been seen",C:"Having endured without having lived",D:"Having burned without having built",E:"Having given without having mattered"},
  {s:9,q:"If you could be remembered for one quality only, you would choose:",A:"Precision",B:"Perception",C:"Constancy",D:"Aliveness",E:"Care"},
  {s:9,q:"What you most want the record to show is:",A:"That you made the right calls and held the room",B:"That you knew, and that knowing had consequence",C:"That you were there, and that being there was not nothing",D:"That you were real, and that the realness was contagious",E:"That you were chosen and worthy of it"},
  {s:9,q:"When you consider who you actually are, beneath image and pattern:",A:"Someone who needs things to be in their right place",B:"Someone who needs to understand what no one is saying",C:"Someone who needs to know that staying meant something",D:"Someone who needs to feel the full weight of being alive",E:"Someone who needs to know they were not a burden to the ones they loved"},
  {s:9,q:"The final question.\nChoose what is true, not what is beautiful.\n\nWhat you are building your entire life around is:",A:"The right to decide",B:"The right to see",C:"The right to remain",D:"The right to feel",E:"The right to be needed"},
];

/* ═══════════════════════════════════════════════════════════
   SCORING ENGINE
═══════════════════════════════════════════════════════════ */

const PILLARS = {
  A:{key:"VARA", label:"VARA", axis:"Command",    sub:"Authority / Decision / Control"},
  B:{key:"SETH", label:"SETH", axis:"Perception", sub:"Intelligence / Concealment / Observation"},
  C:{key:"DRAE", label:"DRAE", axis:"Continuity", sub:"Endurance / Preservation / Memory"},
  D:{key:"UNAR", label:"UNAR", axis:"Intensity",  sub:"Disruption / Charge / Aliveness"},
  E:{key:"GRYTH",label:"GRYTH",axis:"Offering",   sub:"Care / Presence / Relational Gravity"},
};

const PRESENCE_AXES = {
  "A-B":"Command Intelligence — authority organized by what it withholds",
  "A-C":"Structured Authority — command through precedent and permanence",
  "A-D":"Sovereign Force — authority felt before it is named",
  "A-E":"Authorized Care — power in the form of what only you can give",
  "B-A":"Intelligence Command — perception deployed as governance",
  "B-C":"Archival Perception — pattern recognition through accumulated time",
  "B-D":"Volatile Insight — disruption as diagnostic instrument",
  "B-E":"Soft Intelligence — care as a chamber for gathering truth",
  "C-A":"Enduring Command — authority proven through what it has survived",
  "C-B":"Preserved Perception — continuity as the vantage point of seeing",
  "C-D":"Enduring Fire — intensity that does not exhaust, only accumulates",
  "C-E":"Sustained Offering — care proven through staying",
  "D-A":"Charged Command — intensity organized into structure",
  "D-B":"Charged Perception — disruption as a form of knowing",
  "D-C":"Charged Endurance — the fire that makes remaining bearable",
  "D-E":"Charged Tenderness — care with the force of a climate change",
  "E-A":"Offering Command — authority granted by those who need what only you provide",
  "E-B":"Offering Perception — care in service of the intelligence it generates",
  "E-C":"Offering Continuity — presence as the form of fidelity",
  "E-D":"Offering Intensity — love with the temperature of event",
};

const VEIL_TYPES = {
  A:"The Authority Veil — competence concealing its own cost",
  B:"The Intelligence Veil — perception concealing its position",
  C:"The Constancy Veil — endurance concealing its exhaustion",
  D:"The Intensity Veil — force concealing the tenderness beneath it",
  E:"The Care Veil — offering concealing the longing inside it",
};

const EMBODIMENT_HUNGERS = {
  A:"Claiming — the body and image as institutional declaration",
  B:"Concealing — the image as a screen that manages what is known",
  C:"Continuing — aesthetics as a form of inheritance protocol",
  D:"Charging — beauty and environment as accelerant for sensation",
  E:"Inviting — appearance as threshold management for the right people",
};

const DECREES = {
  "A-B":"The subject commands through the architecture of incomplete disclosure. Authority is structurally real but withheld strategically — information asymmetry functions as governance. Most dangerous in structures where intelligence and power are permitted to converge. The risk: the opacity becomes the prison the subject cannot see themselves inside.",
  "A-C":"The subject commands through continuity. Authority is institutional rather than personal — it preceded them and will survive them. Most formidable in established systems. Risk: confuses permanence with correctness, and endurance with authority over what changes.",
  "A-D":"The subject commands through atmospheric charge. Does not request the room — arrives and the room reorganizes. Authority functions at the level of sensation before argument. Risk: the charge becomes unpredictable when structure is absent.",
  "A-E":"The subject commands through care. Authority is granted by those who need what only this subject can provide. Risk: competence is mistaken for consent, and care becomes servitude without a formal moment of agreement.",
  "B-A":"The subject perceives through authority. Uses position and access to gather intelligence that lateral observation could not reach. Risk: mistakes the view from command for complete understanding.",
  "B-C":"The subject perceives through continuity. Archival intelligence — reads the present through accumulated pattern. Risk: what has always been true eventually stops being true, and the subject is the last to know.",
  "B-D":"The subject perceives through disruption. Introduces charge to observe what pressure reveals — intensity as diagnostic instrument. Risk: the diagnosis damages the patient.",
  "B-E":"The subject perceives through offering. Creates safety and watches what people confess into it. Risk: the offer costs more than the intelligence is worth.",
  "C-A":"The subject endures through authority. The position provides the structure that makes continuing possible. Risk: mistakes the position for the self.",
  "C-B":"The subject endures through intelligence. Knows enough to stay longer than survival alone would warrant. Risk: what is seen cannot always be unseen.",
  "C-D":"The subject endures through charge. Requires intensity to make staying feel like living rather than merely remaining. Risk: when the charge goes, the staying stops.",
  "C-E":"The subject endures through care. The people are the reason the structure stays standing. Risk: the people change, and the structure does not know what to do.",
  "D-A":"The subject burns with command. Intensity is organized — it has structure, purpose, consequence. Risk: direction becomes control, and control becomes its own prison.",
  "D-B":"The subject burns with intelligence. Charge is diagnostic — disruption as a form of knowing. Risk: burning begins to feel like the only form of knowing.",
  "D-C":"The subject burns with endurance. Intensity sustained, not episodic. Risk: this is exhausting in ways the subject does not permit themselves to acknowledge.",
  "D-E":"The subject burns with care. Intensity directed outward — love as charge. Risk: the tenderness under the fire is not protected.",
  "E-A":"The subject offers through authority. Care is structured — has form, hierarchy, consequence. Risk: the structure of the care becomes the care, and the warmth underneath is forgotten.",
  "E-B":"The subject offers through intelligence. Knows what is needed before it is asked. Risk: knowing what is needed does not guarantee ability to provide it without cost.",
  "E-C":"The subject offers through endurance. Is there — consistently, reliably, across time. Risk: presence alone does not always communicate what it intends.",
  "E-D":"The subject offers through charge. Care is alive — it moves things, changes temperatures. Risk: the charge of the care can overwhelm the one being cared for.",
};

const SAME_DECREES = {
  A:"The subject is organized almost entirely by command. Authority is not merely a function but a primary identity structure — its presence is the self. Risk: the need to be right becomes indistinguishable from the need to be.",
  B:"The subject is organized by perception and concealment. Sees everything; reveals little; trusts no one with the full map. The intelligence is real. The isolation is the cost. Risk: what is never shared cannot be verified.",
  C:"The subject is organized by endurance to the point of identity fusion. Continuity has become the self. Risk: the subject mistakes having stayed for having lived.",
  D:"The subject is organized entirely by intensity. Aliveness is the criterion. Risk: the burning is not sustainable, and when it exhausts itself the subject has no other register.",
  E:"The subject is organized by care to the point of self-evacuation. Risk: the subject confuses being needed with being real.",
};

function computeScore(answers) {
  const totals = {A:0,B:0,C:0,D:0,E:0};
  const sectional = {};
  SECTIONS.forEach(s => { sectional[s.id] = {A:0,B:0,C:0,D:0,E:0}; });

  Object.entries(answers).forEach(([i, ans]) => {
    if (!ans) return;
    const q = QUESTIONS[parseInt(i)];
    if (!q) return;
    totals[ans]++;
    sectional[q.s][ans]++;
  });

  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  const primary = sorted[0][0], secondary = sorted[1][0];
  const sectionSpikes = SECTIONS.map(sec => {
    const sc = sectional[sec.id];
    const spike = Object.entries(sc).sort((a,b)=>b[1]-a[1])[0];
    return { section:sec, dominant:spike[0], count:spike[1] };
  });
  const n = Object.keys(answers).length;
  const contradictionRate = n ? Math.round(Object.values(answers).filter(a=>a!==primary).length / n * 100) : 0;
  const axisKey = `${primary}-${secondary}`;
  const presenceAxis = PRESENCE_AXES[axisKey] || `${PILLARS[primary].label}—${PILLARS[secondary].label} Complex`;
  const veilPillar    = Object.entries(sectional[7]).sort((a,b)=>b[1]-a[1])[0][0];
  const hungerPillar  = Object.entries(sectional[6]).sort((a,b)=>b[1]-a[1])[0][0];
  const constraintPillar = Object.entries(sectional[9]).sort((a,b)=>b[1]-a[1])[0][0];
  const atmosphereTriad = sorted.slice(0,3).map(([k])=>PILLARS[k].label);
  const decree = primary===secondary ? SAME_DECREES[primary] : (DECREES[axisKey] || DECREES[`${secondary}-${primary}`] || `Primary: ${PILLARS[primary].label}. Secondary: ${PILLARS[secondary].label}. Full decree pending House review.`);
  return {
    totals, sorted, primary, secondary, sectionSpikes,
    contradictionRate, presenceAxis,
    veilType: VEIL_TYPES[veilPillar],
    embodimentHunger: EMBODIMENT_HUNGERS[hungerPillar],
    atmosphereTriad, constraintPillar, decree,
    variance: sorted[0][1]-sorted[4][1],
    completedAt: new Date().toISOString(),
  };
}

/* ═══════════════════════════════════════════════════════════
   PAGE: THRESHOLD
═══════════════════════════════════════════════════════════ */

const ThresholdPage = ({ onEnter }) => {
  const w = WORLDS.threshold;
  return (
    <div className="fade" style={{ minHeight:"100vh", background:w.outer, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px" }}>
      {/* Outer textured border effect */}
      <div className="tex-linen" style={{
        position:"fixed", inset:0, background:w.outer, zIndex:0,
        boxShadow:"inset 0 0 80px rgba(0,0,0,0.6)",
      }}/>

      {/* Inner document card */}
      <div style={{
        position:"relative", zIndex:1,
        width:"100%", maxWidth:"430px",
        background:w.inner,
        boxShadow:"0 0 0 8px #0F080E, 0 0 0 10px rgba(168,132,79,0.3), 0 0 60px rgba(0,0,0,0.8)",
      }} className="tex-paper world">
        <div style={{ padding:"clamp(32px,7vw,56px) clamp(28px,7vw,48px)" }}>

          {/* Sigil */}
          <div style={{ textAlign:"center", marginBottom:"20px" }}>
            <HouseSigil color={w.accent} size={60}/>
          </div>

          <OrnateDivider color={w.accent}/>

          <div style={{ textAlign:"center", margin:"24px 0 20px" }}>
            <p className="sf" style={{ fontSize:"9px", letterSpacing:"0.26em", color:w.accent, marginBottom:"14px" }}>
              LA MONT NOIR
            </p>
            <h1 className="cf" style={{ fontSize:"clamp(26px,7vw,38px)", fontWeight:600, color:w.docText, lineHeight:1.1, letterSpacing:"0.04em", marginBottom:"8px" }}>
              THE EXCAVATION<br/>INSTRUMENT
            </h1>
            <p className="sf" style={{ fontSize:"8.5px", letterSpacing:"0.18em", color:"#9A8E84" }}>
              PHASE ONE — ARCHETYPE RECOGNITION RITE
            </p>
          </div>

          <OrnateDivider color={w.accent} op={0.5}/>

          <div style={{ margin:"24px 0", textAlign:"center" }}>
            <p className="cf" style={{ fontSize:"17px", color:w.docText, fontStyle:"italic", lineHeight:1.7, marginBottom:"10px" }}>
              This instrument does not ask who you wish to be.
            </p>
            <p className="cf" style={{ fontSize:"19px", fontWeight:600, color:w.docText, fontStyle:"italic", letterSpacing:"0.02em" }}>
              It reads what repeats.
            </p>
          </div>

          <ThinDivider color={w.accent} op={0.3} my={16}/>

          <div style={{ margin:"16px 0 28px", textAlign:"center" }}>
            <p className="sf" style={{ fontSize:"10px", color:"#6B5A4E", lineHeight:2.2, letterSpacing:"0.05em" }}>
              You will be given a sequence of forced choices.<br/>
              Each answer carries consequence.<br/>
              Choose quickly. Do not explain yourself.
            </p>
            <p className="cf" style={{ fontSize:"16px", color:w.docText, marginTop:"14px", fontStyle:"italic" }}>
              The House will receive the pattern.
            </p>
          </div>

          <OrnateDivider color={w.accent} op={0.7}/>

          <div style={{ marginTop:"28px" }}>
            <OrnateButton onClick={onEnter} color={w.accent}>{"ENTER\nTHE HOUSE"}</OrnateButton>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE: RULES
═══════════════════════════════════════════════════════════ */

const RulesPage = ({ onBegin }) => {
  const [agreed, setAgreed] = useState(false);
  const w = WORLDS.threshold;
  return (
    <div className="fade" style={{ minHeight:"100vh", background:w.outer, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px" }}>
      <div className="tex-linen" style={{ position:"fixed", inset:0, background:w.outer, zIndex:0 }}/>
      <div style={{
        position:"relative", zIndex:1,
        width:"100%", maxWidth:"430px",
        background:w.inner,
        boxShadow:"0 0 0 8px #0F080E, 0 0 0 10px rgba(168,132,79,0.3), 0 0 60px rgba(0,0,0,0.8)",
      }} className="tex-paper world">
        <div style={{ padding:"clamp(32px,7vw,52px) clamp(28px,7vw,48px)" }}>

          <div style={{ textAlign:"center", marginBottom:"16px" }}>
            <p className="sf" style={{ fontSize:"8.5px", letterSpacing:"0.22em", color:w.accent }}>LA MONT NOIR — THE RITE</p>
          </div>

          <OrnateDivider color={w.accent}/>

          <h2 className="cf" style={{ fontSize:"22px", fontWeight:600, color:w.docText, textAlign:"center", letterSpacing:"0.1em", margin:"20px 0 22px" }}>
            RULES OF THE RITE
          </h2>

          <div style={{ marginBottom:"18px" }}>
            {["Choose what repeats, not what flatters.","Do not choose the answer you admire.","Do not choose the answer you wish were true.","Choose the answer that returns under pressure."].map((r,i)=>(
              <p key={i} className="cf" style={{ fontSize:"16px", color:w.docText, lineHeight:1.75, marginBottom:"6px" }}>{r}</p>
            ))}
          </div>

          <ThinDivider color={w.accent} op={0.3} my={14}/>

          <div style={{ marginBottom:"18px" }}>
            {["There are no neutral answers.","There are no correct answers.","There is only pattern."].map((l,i)=>(
              <p key={i} className="cf" style={{ fontSize:"16px", color:"#3A2E2A", lineHeight:1.8, fontStyle:"italic" }}>{l}</p>
            ))}
          </div>

          <ThinDivider color={w.accent} op={0.3} my={14}/>

          <div style={{ marginBottom:"6px" }}>
            {["Answer quickly.","Do not explain yourself.","Do not negotiate with the question."].map((l,i)=>(
              <p key={i} className="sf" style={{ fontSize:"10px", color:"#6B5A4E", lineHeight:2.3, letterSpacing:"0.05em" }}>{l}</p>
            ))}
            <p className="cf" style={{ fontSize:"16px", color:w.docText, marginTop:"14px", fontStyle:"italic" }}>
              The House will read what returns.
            </p>
          </div>

          <OrnateDivider color={w.accent} op={0.6}/>

          <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", margin:"20px 0 22px", cursor:"pointer" }}
            onClick={()=>setAgreed(v=>!v)}>
            <div style={{
              width:"15px", height:"15px", border:`1px solid ${agreed?"#A8844F":"rgba(168,132,79,0.45)"}`,
              background:agreed?"#A8844F":"transparent", flexShrink:0, marginTop:"2px",
              transition:"all .15s ease",
            }}/>
            <p className="sf" style={{ fontSize:"10px", color:"#6B5A4E", lineHeight:1.8, letterSpacing:"0.04em" }}>
              I understand that this instrument reads pattern, not preference.
            </p>
          </div>

          <OrnateButton onClick={onBegin} color={agreed?w.accent:"#C0B098"} disabled={!agreed}>
            {"BEGIN\nTHE RITE"}
          </OrnateButton>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE: SECTION TRANSITION
═══════════════════════════════════════════════════════════ */

const SectionTransitionPage = ({ section, onContinue }) => {
  const w = WORLDS[section.id] || WORLDS[1];
  return (
    <div className="world" style={{
      minHeight:"100vh", background:w.bg,
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"24px 16px",
    }}>
      {/* Texture overlay */}
      <div style={{ position:"fixed", inset:0, background:`radial-gradient(ellipse at center, ${w.card} 0%, ${w.bg} 70%)`, zIndex:0 }}/>

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:"380px", textAlign:"center" }}>
        <HouseSigil color={w.accent} size={56}/>

        <div style={{ margin:"24px 0" }}>
          <OrnateDivider color={w.accent}/>
        </div>

        <p className="sf" style={{ fontSize:"8.5px", letterSpacing:"0.26em", color:w.label, marginBottom:"16px" }}>
          {section.name}
        </p>
        <h2 className="cf" style={{ fontSize:"clamp(22px,6vw,32px)", fontWeight:600, color:w.text, letterSpacing:"0.06em", lineHeight:1.15, marginBottom:"20px" }}>
          {section.title}
        </h2>

        <div style={{ margin:"20px 0" }}>
          <OrnateDivider color={w.accent} op={0.6}/>
        </div>

        <p className="cf" style={{ fontSize:"16px", color:`${w.text}BB`, fontStyle:"italic", lineHeight:1.7 }}>
          {section.desc}
        </p>

        <div style={{ marginTop:"36px" }}>
          <button onClick={onContinue} className="lmn-btn"
            style={{ color:w.accent, border:`1px solid ${w.border}`, padding:"12px 40px" }}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE: QUESTION — THE RITE
═══════════════════════════════════════════════════════════ */

const QuestionPage = ({ question, qIdx, totalQ, selected, onSelect, onContinue }) => {
  const w = WORLDS[question.s] || WORLDS[1];
  const sec = SECTIONS.find(s => s.id === question.s);
  const pct = ((qIdx + 1) / totalQ * 100).toFixed(1);
  const letters = ["A","B","C","D","E"];
  const isLast = qIdx === totalQ - 1;

  return (
    <div className="world" style={{ minHeight:"100vh", background:w.bg, display:"flex", flexDirection:"column" }}>
      {/* Atmospheric gradient */}
      <div style={{ position:"fixed", inset:0, background:`radial-gradient(ellipse at 30% 20%, ${w.card} 0%, ${w.bg} 65%)`, zIndex:0 }}/>

      <div style={{ position:"relative", zIndex:1, maxWidth:"560px", margin:"0 auto", width:"100%", flex:1, display:"flex", flexDirection:"column", padding:"0 18px" }}>

        {/* Masthead */}
        <div style={{ padding:"18px 0 14px", borderBottom:`1px solid ${w.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p className="sf" style={{ fontSize:"7.5px", letterSpacing:"0.24em", color:w.label }}>LA MONT NOIR</p>
              <p className="sf" style={{ fontSize:"7px", letterSpacing:"0.16em", color:`${w.label}88`, marginTop:"2px" }}>THE EXCAVATION INSTRUMENT</p>
            </div>
            <p className="sf" style={{ fontSize:"8px", color:`${w.text}66`, letterSpacing:"0.08em" }}>
              {qIdx + 1} / {totalQ}
            </p>
          </div>
          {/* Progress */}
          <div className="prog-track" style={{ marginTop:"10px" }}>
            <div className="prog-fill" style={{ width:`${pct}%`, background:w.accent }}/>
          </div>
          {/* Section label */}
          <p className="sf" style={{ fontSize:"7.5px", letterSpacing:"0.2em", color:w.label, marginTop:"8px", opacity:.7 }}>
            {sec ? `${sec.name}  —  ${sec.title}` : ""}
          </p>
        </div>

        {/* Question */}
        <div style={{ padding:"28px 0 20px", flex:1 }}>
          <p className="cf preline" style={{
            fontSize:"clamp(19px,5.2vw,25px)",
            fontWeight:500,
            fontStyle:"italic",
            color:w.text,
            lineHeight:1.45,
            marginBottom:"28px",
            textShadow:`0 2px 30px ${w.accent}22`,
          }}>
            {question.q}
          </p>

          {/* Answer cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            {letters.map(lt => {
              const chosen = selected === lt;
              return (
                <div
                  key={lt}
                  className={`ans-card ${chosen?"chosen":""}`}
                  onClick={() => onSelect(lt)}
                  style={{
                    display:"flex", alignItems:"flex-start", gap:"14px",
                    padding:"13px 15px",
                    borderColor: chosen ? w.accent : w.border,
                    borderRadius:"1px",
                  }}
                >
                  {/* Corner ornaments */}
                  {["tl","tr","bl","br"].map(c=>(
                    <div key={c} className={`corner ${c}`}
                      style={{ borderColor: chosen ? w.accent : `${w.accent}60` }}/>
                  ))}

                  {/* Letter badge */}
                  <div style={{
                    width:"22px", height:"22px", flexShrink:0,
                    background: chosen ? w.accent : "transparent",
                    border:`1px solid ${chosen?w.accent:w.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    transform:"rotate(45deg)", marginTop:"1px",
                  }}>
                    <span className="sf" style={{
                      fontSize:"8px", fontWeight:500, letterSpacing:0,
                      color: chosen ? w.bg : w.label,
                      transform:"rotate(-45deg)",
                    }}>{lt}</span>
                  </div>

                  {/* Answer text */}
                  <span className="cf" style={{
                    fontSize:"15px", lineHeight:1.55,
                    color: chosen ? w.text : `${w.text}99`,
                    fontWeight: chosen ? 500 : 400,
                    flex:1,
                  }}>
                    {question[lt]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue */}
        <div style={{ padding:"16px 0 32px" }}>
          <div style={{ height:1, background:`linear-gradient(to right, transparent, ${w.accent}40, transparent)`, marginBottom:"20px" }}/>
          <button
            className="lmn-btn"
            onClick={onContinue}
            disabled={!selected}
            style={{
              width:"100%", padding:"14px",
              background: selected ? w.accent : "transparent",
              color: selected ? w.bg : `${w.text}44`,
              border: `1px solid ${selected ? w.accent : w.border}`,
              letterSpacing:"0.22em",
            }}
          >
            {isLast ? "Seal the Rite" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE: COMPLETION
═══════════════════════════════════════════════════════════ */

const CompletionPage = ({ onHouseAccess }) => {
  const w = WORLDS.threshold;
  return (
    <div className="fade" style={{ minHeight:"100vh", background:w.outer, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px" }}>
      <div className="tex-linen" style={{ position:"fixed", inset:0, background:w.outer, zIndex:0 }}/>
      <div style={{
        position:"relative", zIndex:1,
        width:"100%", maxWidth:"430px",
        background:w.inner,
        boxShadow:"0 0 0 8px #0F080E, 0 0 0 10px rgba(168,132,79,0.3), 0 0 60px rgba(0,0,0,0.8)",
      }} className="tex-paper world">
        <div style={{ padding:"clamp(32px,7vw,52px) clamp(28px,7vw,48px)" }}>

          <div style={{ textAlign:"center", marginBottom:"20px" }}>
            <HouseSigil color={w.accent} size={52}/>
          </div>

          <OrnateDivider color={w.accent}/>

          <div style={{ textAlign:"center", margin:"22px 0 18px" }}>
            <h2 className="cf" style={{ fontSize:"clamp(18px,5vw,24px)", fontWeight:600, color:w.docText, letterSpacing:"0.07em", lineHeight:1.25 }}>
              THE PATTERN HAS<br/>BEEN RECEIVED
            </h2>
          </div>

          <ThinDivider color={w.accent} op={0.3} my={16}/>

          <p className="cf" style={{ fontSize:"17px", color:w.docText, textAlign:"center", fontStyle:"italic", marginBottom:"20px" }}>
            The Rite is complete.
          </p>
          <p className="sf" style={{ fontSize:"10px", color:"#6B5A4E", textAlign:"center", lineHeight:2.4, letterSpacing:"0.04em", marginBottom:"20px" }}>
            Your answers have been sealed for House review.<br/>
            No single answer will be read alone.<br/>
            The House reads repetition, contradiction,<br/>
            pressure, concealment, and hunger.
          </p>

          <ThinDivider color={w.accent} op={0.3} my={14}/>

          <div style={{ textAlign:"center", marginBottom:"26px" }}>
            <p className="cf" style={{ fontSize:"16px", color:w.docText, marginBottom:"8px" }}>
              You will not be assigned by preference.
            </p>
            <p className="cf" style={{ fontSize:"16px", color:w.docText }}>
              You will be recognized by pattern.
            </p>
          </div>

          <OrnateDivider color={w.accent} op={0.7}/>

          <div style={{ marginTop:"26px" }}>
            <OrnateButton onClick={()=>{}} color={w.accent}>{"CLOSE\nTHE RITE"}</OrnateButton>
          </div>

          <button onClick={onHouseAccess} className="lmn-btn"
            style={{ display:"block", margin:"18px auto 0", color:`${w.accent}50`, fontSize:"9px", letterSpacing:"0.14em" }}>
            ∴ HOUSE ACCESS
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE: HOUSE DASHBOARD
═══════════════════════════════════════════════════════════ */

const DashboardPage = ({ scores }) => {
  if (!scores) return null;
  const { totals, sorted, primary, secondary, sectionSpikes, contradictionRate, presenceAxis, veilType, embodimentHunger, atmosphereTriad, constraintPillar, decree, variance, completedAt } = scores;
  const maxTotal = Math.max(...Object.values(totals));
  const dateStr = completedAt ? new Date(completedAt).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"}) : "—";

  const Sec = ({ title, children }) => (
    <div style={{ borderTop:"1px solid rgba(168,132,79,0.2)", paddingTop:"20px", marginTop:"4px" }}>
      <p className="sf" style={{ fontSize:"8px", letterSpacing:"0.24em", color:"#A8844F", marginBottom:"14px" }}>{title}</p>
      {children}
    </div>
  );
  const Row = ({ label, value }) => (
    <div className="dash-row">
      <span className="sf" style={{ fontSize:"9px", color:"#6B5A4E", letterSpacing:"0.05em", lineHeight:1.6, maxWidth:"42%" }}>{label}</span>
      <span className="cf" style={{ fontSize:"14px", color:"#D8CCB8", textAlign:"right", lineHeight:1.4 }}>{value}</span>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#080608", padding:"0 18px 64px" }}>
      <div style={{ maxWidth:"520px", margin:"0 auto" }} className="fade">

        {/* Header */}
        <div style={{ padding:"48px 0 28px", textAlign:"center" }}>
          <HouseSigil color="#A8844F" size={56}/>
          <div style={{ margin:"20px 0" }}><OrnateDivider color="#A8844F"/></div>
          <p className="sf" style={{ fontSize:"8px", letterSpacing:"0.22em", color:"#4B3A36", marginBottom:"8px" }}>LA MONT NOIR — RESTRICTED</p>
          <h1 className="cf" style={{ fontSize:"28px", fontWeight:300, color:"#E8DFD0", letterSpacing:"0.06em", marginBottom:"6px" }}>
            HOUSE DASHBOARD
          </h1>
          <p className="sf" style={{ fontSize:"8px", letterSpacing:"0.15em", color:"#6B5A4E" }}>
            ARCHETYPE RECOGNITION RITE — PHASE ONE
          </p>
          <div style={{ margin:"20px 0" }}><OrnateDivider color="#A8844F" op={0.5}/></div>
        </div>

        <Sec title="Subject Overview">
          <Row label="Completion Status" value="SEALED"/>
          <Row label="Date Processed" value={dateStr}/>
          <Row label="Items Answered" value="81 / 81"/>
          <Row label="Contradiction Rate" value={`${contradictionRate}%`}/>
          <Row label="Pressure Variance" value={`${variance} point spread`}/>
        </Sec>

        <Sec title="Pillar Distribution">
          {sorted.map(([key,val])=>(
            <div key={key} style={{ marginBottom:"14px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                <span className="sf" style={{ fontSize:"9px", color:"#9A8E84", letterSpacing:"0.1em" }}>{PILLARS[key].label} · {PILLARS[key].axis}</span>
                <span className="sf" style={{ fontSize:"9px", color:"#A8844F" }}>{val}</span>
              </div>
              <div className="dash-bar-track">
                <div className="dash-bar-fill" style={{ width:maxTotal>0?`${val/maxTotal*100}%`:"0%" }}/>
              </div>
            </div>
          ))}
        </Sec>

        <Sec title="Archetype Axis">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"14px" }}>
            {[{label:"Primary",key:primary,op:1},{label:"Secondary",key:secondary,op:0.7}].map(({label,key,op})=>(
              <div key={key} style={{ background:"#0F080E", border:"1px solid rgba(168,132,79,0.2)", padding:"14px", opacity:op }}>
                <p className="sf" style={{ fontSize:"8px", color:"#A8844F", letterSpacing:"0.18em", marginBottom:"8px" }}>{label.toUpperCase()}</p>
                <p className="cf" style={{ fontSize:"26px", color:"#E8DFD0", fontWeight:300 }}>{PILLARS[key].label}</p>
                <p className="sf" style={{ fontSize:"8px", color:"#6B5A4E", marginTop:"4px" }}>{PILLARS[key].axis}</p>
              </div>
            ))}
          </div>
          <Row label="Presence Axis" value={presenceAxis}/>
        </Sec>

        <Sec title="Sectional Spikes">
          {sectionSpikes.map(({section,dominant,count})=>(
            <div key={section.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid rgba(168,132,79,0.08)" }}>
              <div>
                <p className="sf" style={{ fontSize:"8px", color:"#6B5A4E", letterSpacing:"0.08em" }}>{section.name}</p>
                <p className="sf" style={{ fontSize:"7.5px", color:"#4B3A36", marginTop:"2px" }}>{section.title}</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <span className="cf" style={{ fontSize:"18px", color:"#E8DFD0" }}>{PILLARS[dominant].label}</span>
                <span className="sf" style={{ fontSize:"8px", color:"#6B5A4E", marginLeft:"8px" }}>{count}/9</span>
              </div>
            </div>
          ))}
        </Sec>

        <Sec title="Presence and Atmosphere">
          <Row label="Atmosphere Triad" value={atmosphereTriad.join(" — ")}/>
          <Row label="Dominant Axis" value={presenceAxis}/>
        </Sec>

        <Sec title="Veil and Embodiment">
          <Row label="Veil Type" value={veilType}/>
          <Row label="Embodiment Hunger" value={embodimentHunger}/>
        </Sec>

        <Sec title="Signature Constraint">
          <Row label="Governing Pillar" value={PILLARS[constraintPillar]?.label || "—"}/>
          <Row label="Drive Axis" value={PILLARS[constraintPillar]?.axis || "—"}/>
          <Row label="Operative Form" value={PILLARS[constraintPillar]?.sub || "—"}/>
        </Sec>

        <div style={{ borderTop:"1px solid rgba(168,132,79,0.28)", paddingTop:"20px", marginTop:"4px" }}>
          <p className="sf" style={{ fontSize:"8px", letterSpacing:"0.24em", color:"#A8844F", marginBottom:"0" }}>
            House Decree
          </p>
          <div className="decree-block">
            <p className="cf" style={{ fontSize:"15px", color:"#D8CCB8", fontStyle:"italic", lineHeight:1.8 }}>{decree}</p>
          </div>
        </div>

        <div style={{ margin:"36px 0 0" }}><OrnateDivider color="#A8844F" op={0.4}/></div>
        <p className="sf" style={{ fontSize:"8px", color:"#2A1E1A", letterSpacing:"0.16em", textAlign:"center", marginTop:"16px" }}>
          CONFIDENTIAL — HOUSE USE ONLY — LA MONT NOIR
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ROOT APPLICATION — STATE MACHINE
═══════════════════════════════════════════════════════════ */

export default function App() {
  const [view, setView]           = useState("threshold");
  const [qIdx, setQIdx]           = useState(0);
  const [answers, setAnswers]     = useState({});
  const [selected, setSelected]   = useState(null);
  const [scores, setScores]       = useState(null);
  const [pending, setPending]     = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selected) return;
    const newAnswers = { ...answers, [qIdx]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    const nextIdx = qIdx + 1;
    if (nextIdx >= QUESTIONS.length) {
      setScores(computeScore(newAnswers));
      setView("complete");
      return;
    }
    const nextSec = SECTIONS.find(s => s.range[0] === nextIdx);
    if (nextSec) {
      setPending({ section: nextSec, nextIdx });
      setView("transition");
    } else {
      setQIdx(nextIdx);
    }
  }, [selected, answers, qIdx]);

  const handleTransition = useCallback(() => {
    if (pending) { setQIdx(pending.nextIdx); setPending(null); }
    setView("rite");
  }, [pending]);

  return (
    <>
      <GlobalStyles/>
      <div style={{ minHeight:"100vh", background:"#080608" }}>
        {view === "threshold"  && <ThresholdPage onEnter={() => setView("rules")}/>}
        {view === "rules"      && <RulesPage onBegin={() => setView("rite")}/>}
        {view === "transition" && pending && <SectionTransitionPage section={pending.section} onContinue={handleTransition}/>}
        {view === "rite"       && QUESTIONS[qIdx] && (
          <QuestionPage
            question={QUESTIONS[qIdx]}
            qIdx={qIdx}
            totalQ={QUESTIONS.length}
            selected={selected}
            onSelect={setSelected}
            onContinue={handleContinue}
          />
        )}
        {view === "complete"   && <CompletionPage onHouseAccess={() => setView("dashboard")}/>}
        {view === "dashboard"  && <DashboardPage scores={scores}/>}
      </div>
    </>
  );
          }
