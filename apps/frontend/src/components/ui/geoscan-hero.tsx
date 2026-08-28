mi"use client"

import { useEffect, useRef, useId } from "react"

// Simple canvas-only word wrap — avoids any external text-layout
// dependency, so this component has zero third-party deps beyond React.
function wrapText(ctx: CanvasRenderingContext2D, text: string, font: string, maxWidth: number): string[] {
  ctx.font = font
  const paragraphs = text.split("\n")
  const lines: string[] = []
  for (const para of paragraphs) {
    const words = para.split(" ")
    let current = ""
    for (const word of words) {
      const test = current ? current + " " + word : word
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current)
        current = word
      } else {
        current = test
      }
    }
    lines.push(current)
  }
  return lines
}

// ─────────────────────────────────────────────────────────────
// GEOSCAN HERO
// A scanning device drifts across a field of geospatial
// intelligence fragments, displacing and scattering them — and,
// while the scan beam holds, flagging them for analysis. Physics
// engine and text layout are both a from-scratch canvas
// simulation; no third-party deps beyond React.
// ─────────────────────────────────────────────────────────────

export type EngineConfig = {
  scanSpeed: number
  scanScale: number
  showBeam: boolean
  showAntenna: boolean
  pushForce: number
  springStrength: number
  damping: number
  burnGravity: number
  beamRadius: number
  beamForce: number
  screenShake: boolean
  showEmbers: boolean
  showParticles: boolean
  showStars: boolean
  showCursor: boolean
  textOpacity: number
  showDebris: boolean
  debrisCount: number
  debrisSpeed: number
}

const DEFAULT_CFG: EngineConfig = {
  scanSpeed: 0.18,
  scanScale: 1,
  showBeam: true,
  showAntenna: true,
  pushForce: 6,
  springStrength: 0.015,
  damping: 0.93,
  burnGravity: 0.8,
  beamRadius: 120,
  beamForce: 25,
  screenShake: true,
  showEmbers: true,
  showParticles: true,
  showStars: true,
  showCursor: true,
  textOpacity: 1,
  showDebris: true,
  debrisCount: 8,
  debrisSpeed: 0.6,
}

export const PRESETS: Record<string, Partial<EngineConfig>> = {
  Default: {},
  Gentle: { scanSpeed: 0.1, pushForce: 5, beamForce: 10, beamRadius: 60, screenShake: false, burnGravity: 0.2, springStrength: 0.03 },
  Chaos: { pushForce: 25, beamForce: 50, beamRadius: 200, burnGravity: 2.5, springStrength: 0.005, damping: 0.96, screenShake: true },
  Zen: { showParticles: false, showEmbers: false, screenShake: false, showStars: false, pushForce: 4, beamForce: 8, springStrength: 0.04, burnGravity: 0 },
  Tiny: { scanScale: 0.6, beamRadius: 50, pushForce: 6 },
  Leviathan: { scanScale: 2, scanSpeed: 0.08, pushForce: 20, beamRadius: 180 },
}

export interface CreditLine {
  role: string
  name: string
}

export interface GeoScanHeroProps {
  /** Giant background title watermark. */
  title?: string
  /** Small eyebrow line under the title. */
  tagline?: string
  /** Cast/crew style lines, rendered as physics-driven text. */
  credits?: CreditLine[]
  preset?: keyof typeof PRESETS
  config?: Partial<EngineConfig>
  showFrameCounter?: boolean
  /** Fills 100dvh instead of a fixed aspect ratio — use for a full-screen hero, especially on mobile. */
  fullBleed?: boolean
  /** Small clickable signature in the corner. Set to false to hide it entirely. */
  signature?: { name: string; url: string } | false
  className?: string
  style?: React.CSSProperties
}

// const DEFAULT_CREDITS: CreditLine[] = [
//   { role: "land intelligence", name: "UNDERSTANDING THE TERRITORY" },
//   { role: "spatial analysis", name: "AI-POWERED GEOSPATIAL INSIGHT" },
//   { role: "data sources", name: "SATELLITE · GIS · TERRAIN · ENVIRONMENT" },
//   { role: "intelligence layer", name: "PATTERNS · RISKS · OPPORTUNITIES" },
//   { role: "processing", name: "RAW DATA → STRUCTURED INSIGHT" },
//   { role: "spatial context", name: "LOCATION · TERRAIN · LAND COVER" },
//   { role: "analysis engine", name: "INGEST · PROCESS · ANALYZE · INTERPRET" },
//   { role: "decision support", name: "SEE THE LAND BEFORE YOU ACT" },
// ]

const DEFAULT_CREDITS: CreditLine[] = []

// const TUNNEL_FRAGMENTS = [
//   "SCANNING TERRITORY",
//   "GEOSPATIAL ANALYSIS",
//   "SPATIAL DATA DETECTED",
//   "TERRAIN MODEL READY",
//   "LAND COVER DETECTED",
//   "SPATIAL CONTEXT LOADED",
//   "ANALYSIS ENGINE ONLINE",
//   "INTELLIGENCE LAYER ACTIVE",
//   "PATTERN DETECTION",
//   "ENVIRONMENTAL DATA LOADED",
//   "SATELLITE DATA PROCESSED",
//   "GEOSPATIAL MODEL READY",
//   "LAND INSIGHT GENERATED",
// ]

const TUNNEL_FRAGMENTS: string[] = []

// Fonts — loaded once, shared across instances.
const FONT_LINK_ID = "geoscan-hero-fonts"
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400..900;1,400..900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Space+Mono:wght@400;700&display=swap"
function ensureFontsLoaded() {
  if (typeof document === "undefined") return
  if (!document.getElementById(FONT_LINK_ID)) {
    const link = document.createElement("link")
    link.id = FONT_LINK_ID
    link.rel = "stylesheet"
    link.href = FONT_HREF
    document.head.appendChild(link)
  }
}

const F_DISPLAY = '"Bodoni Moda", serif'
const F_CREDIT = '"Cormorant Garamond", serif'
const F_MONO = '"Space Mono", monospace'

// Palette
const COL_BG = "#0b0906"
const COL_TITLE_GHOST = "#4a3c28"
const COL_LABEL = "#f2c879"
const COL_CREDIT = "#e8dcc3"
const COL_DIM = "#8a7350"
const COL_BEAM_A = "rgba(191,233,230,0.16)"
const COL_BEAM_B = "rgba(111,184,194,0.10)"
const COL_STAR = "#e8dcc3"
const EMBER_CHARS = ["·", "•", "∘", "˚", "✺", "∗"]
const EMBER_COLORS = ["#ff9d4d", "#ffbf6b", "#ff6a3d", "#f2c879"]
const STAR_CHARS = ["·", "∘", "˚", "⋆", "."]
const BEAM_CHARS = "· ∘ ○ ◦ ⋄ ∙".split(" ")

type DebrisKind = { shape: "diamond" | "ring" | "triangle" | "cross"; color: string; hp: number; size: number; speed: number }
const DEBRIS_KINDS: DebrisKind[] = [
  { shape: "diamond", color: "#d1653f", hp: 1, size: 9, speed: 1.0 },
  { shape: "ring", color: "#7d95a6", hp: 3, size: 11, speed: 0.5 },
  { shape: "triangle", color: "#e0a63e", hp: 1, size: 7, speed: 2.1 },
  { shape: "cross", color: "#cbb999", hp: 2, size: 8, speed: 0.8 },
]
function drawDebrisShape(ctx: CanvasRenderingContext2D, shape: DebrisKind["shape"], r: number) {
  ctx.beginPath()
  if (shape === "diamond") {
    ctx.moveTo(0, -r)
    ctx.lineTo(r, 0)
    ctx.lineTo(0, r)
    ctx.lineTo(-r, 0)
    ctx.closePath()
    ctx.stroke()
  } else if (shape === "ring") {
    ctx.arc(0, 0, r, 0, Math.PI * 2)
    ctx.stroke()
  } else if (shape === "triangle") {
    ctx.moveTo(0, -r)
    ctx.lineTo(r * 0.9, r * 0.7)
    ctx.lineTo(-r * 0.9, r * 0.7)
    ctx.closePath()
    ctx.stroke()
  } else {
    ctx.moveTo(-r, 0)
    ctx.lineTo(r, 0)
    ctx.moveTo(0, -r)
    ctx.lineTo(0, r)
    ctx.stroke()
  }
}

export default function GeoScanHero({
  title = "GEOSCANAI",
  tagline = "FROM RAW TERRITORY TO INTELLIGENT INSIGHT",
  credits = DEFAULT_CREDITS,
  preset = "Default",
  config,
  showFrameCounter = false,
  fullBleed = false,
  signature = false,
  className,
  style,
}: GeoScanHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  useEffect(() => {
    ensureFontsLoaded()
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window)

    const cfg: EngineConfig = { ...DEFAULT_CFG, ...PRESETS[preset], ...config }

    let W = 0,
      H = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2)
    let initialized = false

    // ─── Responsive sizing (container-driven, not window-driven) ───
    function resize() {
      const rect = container!.getBoundingClientRect()
      W = Math.max(1, rect.width)
      H = Math.max(1, rect.height)
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (initialized) {
        layoutAllText()
        buildTunnel()
      }
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // Design-reference width used to scale type down on small screens.
    const BASE_W = 1400
    function responsiveScale() {
      return Math.max(0.4, Math.min(1.1, W / BASE_W))
    }

    // ─── Pointer ─────────────────────────────────────────────────
    const pointer = { x: W / 2, y: H / 2 }
    const cursor = { x: W / 2, y: H / 2 }
    function setPointerFromEvent(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = clientX - rect.left
      pointer.y = clientY - rect.top
    }
    const onMove = (e: PointerEvent) => setPointerFromEvent(e.clientX, e.clientY)
    const onDown = (e: PointerEvent) => {
      setPointerFromEvent(e.clientX, e.clientY)
      isBeaming = true
    }
    const onUp = () => {
      isBeaming = false
    }
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    canvas.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        e.preventDefault()
        const t = e.touches[0]
        if (t) setPointerFromEvent(t.clientX, t.clientY)
      },
      { passive: false }
    )

    
    // ─── Shake ───────────────────────────────────────────────────
    let shakeIntensity = 0,
      shakeX = 0,
      shakeY = 0
    function triggerShake(intensity: number) {
      if (!cfg.screenShake) return
      shakeIntensity = Math.max(shakeIntensity, Math.min(intensity, 8))
    }
    function updateShake() {
      if (shakeIntensity > 0.1) {
        shakeX = (Math.random() - 0.5) * shakeIntensity
        shakeY = (Math.random() - 0.5) * shakeIntensity
        shakeIntensity *= 0.85
      } else {
        shakeX = 0
        shakeY = 0
        shakeIntensity = 0
      }
    }

    // ─── Letters (structure-of-arrays for perf) ────────────────────
    const MAX_LETTERS = 2000
    let letterCount = 0
    const lHomeX = new Float32Array(MAX_LETTERS)
    const lHomeY = new Float32Array(MAX_LETTERS)
    const lX = new Float32Array(MAX_LETTERS)
    const lY = new Float32Array(MAX_LETTERS)
    const lVx = new Float32Array(MAX_LETTERS)
    const lVy = new Float32Array(MAX_LETTERS)
    const lAngle = new Float32Array(MAX_LETTERS)
    const lAngVel = new Float32Array(MAX_LETTERS)
    const lCharW = new Float32Array(MAX_LETTERS)
    const lBaseAlpha = new Float32Array(MAX_LETTERS)
    const lBurnTimer = new Float32Array(MAX_LETTERS)
    const lScaleMul = new Float32Array(MAX_LETTERS)
    const lGravity = new Float32Array(MAX_LETTERS)
    const lChar: string[] = []
    const lFont: string[] = []
    const lColor: string[] = []

    // ─── Embers + particles ────────────────────────────────────────
    const MAX_EMBERS = 60
    let emberCount = 0
    const emX = new Float32Array(MAX_EMBERS)
    const emY = new Float32Array(MAX_EMBERS)
    const emVx = new Float32Array(MAX_EMBERS)
    const emVy = new Float32Array(MAX_EMBERS)
    const emLife = new Float32Array(MAX_EMBERS)
    const emSize = new Float32Array(MAX_EMBERS)
    const emChar: string[] = new Array(MAX_EMBERS)
    const emColor: string[] = new Array(MAX_EMBERS)
    function spawnEmber(x: number, y: number) {
      if (!cfg.showEmbers || emberCount >= MAX_EMBERS) return
      const i = emberCount++
      const a = Math.random() * Math.PI * 2
      emX[i] = x
      emY[i] = y
      emVx[i] = Math.cos(a) * (1 + Math.random() * 3)
      emVy[i] = Math.sin(a) * (1 + Math.random() * 3) - 2
      emLife[i] = 0.3 + Math.random() * 0.6
      emSize[i] = 4 + Math.random() * 7
      emChar[i] = EMBER_CHARS[(Math.random() * EMBER_CHARS.length) | 0]
      emColor[i] = EMBER_COLORS[(Math.random() * EMBER_COLORS.length) | 0]
    }

    const MAX_PARTICLES = 150
    let particleCount = 0
    const pX = new Float32Array(MAX_PARTICLES)
    const pY = new Float32Array(MAX_PARTICLES)
    const pVx = new Float32Array(MAX_PARTICLES)
    const pVy = new Float32Array(MAX_PARTICLES)
    const pLife = new Float32Array(MAX_PARTICLES)
    const pMaxLife = new Float32Array(MAX_PARTICLES)
    const pSize = new Float32Array(MAX_PARTICLES)
    const pChar: string[] = new Array(MAX_PARTICLES)

    // ─── Text entries ────────────────────────────────────────────
    type TextEntry = {
      text: string
      font: string
      fontSize: number
      color: string
      alpha: number
      yOffset: number
      maxWidth: number
      lineHeight: number
      column: "left" | "right" | "center"
    }

    function buildTextEntries(scale: number, availH: number, twoCol: boolean): TextEntry[] {
      const entries: TextEntry[] = [
        {
          text: title,
          font: F_DISPLAY,
          fontSize: 130 * scale,
          color: COL_TITLE_GHOST,
          alpha: 0.4,
          yOffset: -20 * scale,
          maxWidth: 1300,
          lineHeight: 140 * scale,
          column: "center",
        },
        {
          text: tagline,
          font: F_MONO,
          fontSize: 13 * scale,
          color: COL_DIM,
          alpha: 0.6,
          yOffset: 130 * scale,
          maxWidth: 900,
          lineHeight: 20,
          column: "center",
        },
      ]
      // Rows: in two-column mode, left/right entries share a row, roughly
      // halving how much vertical space the list needs. Row gap is derived
      // from the *actual* available height so the last credit never falls
      // outside the container, on any screen size.
      const startY = 210 * scale
      const rowCount = twoCol ? Math.ceil(credits.length / 2) : credits.length
      const bottomMargin = 60 * scale
      const idealGap = rowCount > 0 ? (availH - startY - bottomMargin) / rowCount : 0
      const rowGap = Math.max(56 * scale, Math.min(96 * scale, idealGap))
      const nameSize = Math.max(15, Math.min(34, rowGap * 0.34)) * scale
      const labelSize = 12 * scale

      credits.forEach((c, i) => {
        const row = twoCol ? Math.floor(i / 2) : i
        const y = startY + row * rowGap
        const col = twoCol ? (i % 2 === 0 ? "left" : "right") : "left"
        entries.push({
          text: c.role.toUpperCase(),
          font: F_MONO,
          fontSize: labelSize,
          color: COL_LABEL,
          alpha: 0.85,
          yOffset: y,
          maxWidth: 900,
          lineHeight: 18,
          column: col,
        })
        entries.push({
          text: c.name,
          font: `italic 500 ${nameSize}px ${F_CREDIT}`,
          fontSize: nameSize,
          color: COL_CREDIT,
          alpha: 0.92,
          yOffset: y + Math.max(18, nameSize * 0.7),
          maxWidth: 640,
          lineHeight: nameSize * 1.15,
          column: col,
        })
      })
      return entries
    }

    function layoutAllText() {
      letterCount = 0
      lChar.length = 0
      lFont.length = 0
      lColor.length = 0

      const scale = responsiveScale()
      const mx = Math.max(30, W * 0.06)
      const my = Math.max(50, H * 0.08)
      const cw = W - mx * 2
      const twoCol = cw > 640
      const availH = H - my
      const entries = buildTextEntries(scale, availH, twoCol)
      const col2X = twoCol ? mx + cw * 0.56 : mx

      for (const entry of entries) {
        // entry.font may already carry weight/style (credit names); otherwise build it
        const fontStr = entry.font.includes("px") ? entry.font : `${entry.fontSize}px ${entry.font}`
        let baseX: number, maxW: number
        if (entry.column === "right") {
          baseX = twoCol ? col2X : mx
          maxW = Math.min(entry.maxWidth * scale, twoCol ? cw * 0.4 : cw)
        } else if (entry.column === "center") {
          maxW = Math.min(entry.maxWidth * scale, cw)
          baseX = mx + (cw - maxW) / 2
        } else {
          baseX = mx
          maxW = Math.min(entry.maxWidth * scale, twoCol ? cw * 0.5 : cw)
        }
        const baseY = my + entry.yOffset

        try {
          const lines = wrapText(ctx!, entry.text, fontStr, maxW)
          for (let li = 0; li < lines.length; li++) {
            let xc = baseX
            const y = baseY + li * entry.lineHeight
            ctx!.font = fontStr
            for (const char of lines[li]) {
              if (letterCount >= MAX_LETTERS) continue
              const cw2 = ctx!.measureText(char).width
              const i = letterCount++
              lHomeX[i] = xc + cw2 / 2
              lHomeY[i] = y + entry.lineHeight / 2
              lX[i] = lHomeX[i]
              lY[i] = lHomeY[i]
              lVx[i] = 0
              lVy[i] = 0
              lAngle[i] = 0
              lAngVel[i] = 0
              lCharW[i] = cw2
              lBaseAlpha[i] = entry.alpha
              lBurnTimer[i] = 0
              lScaleMul[i] = 1
              lGravity[i] = 0
              lChar[i] = char
              lFont[i] = fontStr
              lColor[i] = entry.color
              xc += cw2
            }
          }
        } catch {
          /* skip malformed entry */
        }
      }
    }

    // ─── Scanner ─────────────────────────────────────────────────
    let scanX = W / 2,
      scanY = H / 2
    let scanPx = scanX,
      scanPy = scanY
    function updateScanner() {
      scanPx = scanX
      scanPy = scanY
      scanX += (pointer.x - scanX) * cfg.scanSpeed
      scanY += (pointer.y - scanY) * cfg.scanSpeed
    }

    function interactLetters(dt: number) {
      const sc = cfg.scanScale * responsiveScale()
      const bodyRadX = 52 * sc
      const bodyRadY = 18 * sc
      const domeRadX = 28 * sc
      const domeRadY = 22 * sc
      const damp = cfg.damping,
        spring = cfg.springStrength,
        push = cfg.pushForce,
        bGrav = cfg.burnGravity
      const vdx = scanX - scanPx,
        vdy = scanY - scanPy

      for (let li = 0; li < letterCount; li++) {
        let vx = lVx[li],
          vy = lVy[li],
          av = lAngVel[li]
        const x = lX[li],
          y = lY[li],
          cw = lCharW[li]

        const dxBody = x - scanX,
          dyBody = y - scanY
        const ellipseBody = (dxBody / bodyRadX) ** 2 + (dyBody / bodyRadY) ** 2
        const ellipseDome = (dxBody / domeRadX) ** 2 + ((dyBody - domeRadY * 0.8) / domeRadY) ** 2

        if (ellipseBody < 1.15 || ellipseDome < 1.1) {
          const d = Math.sqrt(dxBody * dxBody + dyBody * dyBody) || 1
          const minD = 28 * sc + cw * 0.4 + 4
          const f = push * Math.max(0, (minD - d) / minD) * sc
          const nx = dxBody / d,
            ny = dyBody / d
          vx += nx * f + vdx * 0.4
          vy += ny * f + vdy * 0.4
          av += (nx * 0.3 - ny * 0.2) * f * 0.12
        }

        const wdx = x - scanPx,
          wdy = y - scanPy
        const wdSq = wdx * wdx + wdy * wdy
        if (wdSq < 1800 && wdSq > 100) {
          const w = (1 - Math.sqrt(wdSq) / 42) * 0.1
          vx += vdx * w
          vy += vdy * w
        }

        if (lBurnTimer[li] > 0) {
          lBurnTimer[li] -= dt
          lScaleMul[li] = 1 + lBurnTimer[li] * 0.4
          lGravity[li] = bGrav
          if (Math.random() < dt * 2) spawnEmber(x, y)
          if (lBurnTimer[li] <= 0) {
            lBurnTimer[li] = 0
            lScaleMul[li] = 1
            lGravity[li] = 0
          }
        }

        const hdx = lHomeX[li] - x,
          hdy = lHomeY[li] - y
        const hd = Math.sqrt(hdx * hdx + hdy * hdy)
        if (hd > 0.5) {
          const sf = spring * (1 + hd * 0.001)
          vx += hdx * sf
          vy += hdy * sf
          av -= lAngle[li] * 0.05
        } else {
          lAngle[li] *= 0.9
        }

        vy += lGravity[li]
        lVx[li] = vx * damp
        lVy[li] = vy * damp
        lAngVel[li] = av * 0.91
        lX[li] = x + lVx[li]
        lY[li] = y + lVy[li]
        lAngle[li] += lAngVel[li]
      }
    }

    function beamBlastAt(bx: number, by: number, dx: number, dy: number) {
      let hits = 0
      const rSq = cfg.beamRadius * cfg.beamRadius,
        ff = cfg.beamForce,
        fr = cfg.beamRadius
      for (let li = 0; li < letterCount; li++) {
        const ldx = lX[li] - bx,
          ldy = lY[li] - by
        const dSq = ldx * ldx + ldy * ldy
        if (dSq < rSq && dSq > 0.01) {
          const d = Math.sqrt(dSq),
            f = ff * (1 - d / fr) ** 2
          lVx[li] += (ldx / d) * 0.4 * f + dx * 0.6 * f
          lVy[li] += (ldy / d) * 0.4 * f + dy * 0.6 * f - f * 0.2
          lAngVel[li] += (Math.random() - 0.5) * f * 0.3
          lBurnTimer[li] = Math.max(lBurnTimer[li], 0.5 + Math.random() * 1.2)
          hits++
        }
      }
      if (hits > 3) {
        triggerShake(Math.min(hits * 0.4, 6))
        for (let i = 0; i < Math.min(hits, 4); i++) spawnEmber(bx, by)
      }
    }

    function drawLetters() {
      const opMul = cfg.textOpacity
      let prevFont = ""
      for (let i = 0; i < letterCount; i++) {
        const burning = lBurnTimer[i] > 0
        let alpha = lBaseAlpha[i] * opMul
        let color = lColor[i]
        if (burning) {
          const h = Math.min(1, lBurnTimer[i])
          // data-flag glow: amber core cooling as the highlight fades
          color = `rgb(255,${(140 + h * 90) | 0},${(60 + h * 40) | 0})`
          alpha = Math.min(1, alpha + 0.5)
        }
        const font = lFont[i]
        if (font !== prevFont) {
          ctx!.font = font
          prevFont = font
        }
        ctx!.save()
        ctx!.translate(lX[i], lY[i])
        if (lAngle[i] !== 0) ctx!.rotate(lAngle[i])
        const sm = lScaleMul[i]
        if (sm !== 1) ctx!.scale(sm, sm)
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = color
        ctx!.textAlign = "center"
        ctx!.textBaseline = "middle"
        ctx!.fillText(lChar[i], 0, 0)
        if (burning && lBurnTimer[i] > 0.3) {
          ctx!.globalAlpha = lBurnTimer[i] * 0.3
          ctx!.fillStyle = "#ffbf6b"
          ctx!.fillText(lChar[i], 0, 0)
        }
        ctx!.restore()
      }
    }

    let isBeaming = false,
      beamAccum = 0,
      totalBeamTime = 0
    function emitBeam(dt: number) {
      if (!isBeaming) {
        totalBeamTime = 0
        return
      }
      beamAccum += dt
      totalBeamTime += dt
      const hx = scanX,
        hy = scanY
      if (cfg.showParticles) {
        while (beamAccum > 0.02) {
          beamAccum -= 0.02
          if (particleCount >= MAX_PARTICLES) break
          for (let j = 0; j < 3; j++) {
            if (particleCount >= MAX_PARTICLES) break
            const i = particleCount++
            const sp = (Math.random() - 0.5) * 0.3
            const spd = 6 + Math.random() * 8
            pX[i] = hx + sp * 30
            pY[i] = hy + 20
            pVx[i] = sp * 2
            pVy[i] = spd
            pLife[i] = 1
            pMaxLife[i] = 0.25 + Math.random() * 0.35
            pSize[i] = 8 + Math.random() * 10
            pChar[i] = BEAM_CHARS[(Math.random() * BEAM_CHARS.length) | 0]
          }
        }
      } else {
        beamAccum = 0
      }
      const bx = hx,
        by = hy + cfg.beamRadius * 0.5
      beamBlastAt(bx, by, 0, 1)
      hitDebrisWithBeam(bx, by)
      triggerShake(Math.min(1 + totalBeamTime * 0.15, 2.5))
    }

    function updateParticlesAndEmbers(dt: number) {
      for (let i = particleCount - 1; i >= 0; i--) {
        pX[i] += pVx[i]
        pY[i] += pVy[i]
        pVy[i] += 0.3
        pVx[i] *= 0.98
        pLife[i] -= dt / pMaxLife[i]
        if (pLife[i] <= 0) {
          particleCount--
          pX[i] = pX[particleCount]
          pY[i] = pY[particleCount]
          pVx[i] = pVx[particleCount]
          pVy[i] = pVy[particleCount]
          pLife[i] = pLife[particleCount]
          pMaxLife[i] = pMaxLife[particleCount]
          pSize[i] = pSize[particleCount]
          pChar[i] = pChar[particleCount]
        }
      }
      for (let i = emberCount - 1; i >= 0; i--) {
        emX[i] += emVx[i]
        emY[i] += emVy[i]
        emVy[i] += 0.12
        emVx[i] *= 0.97
        emLife[i] -= dt
        if (emLife[i] <= 0) {
          emberCount--
          emX[i] = emX[emberCount]
          emY[i] = emY[emberCount]
          emVx[i] = emVx[emberCount]
          emVy[i] = emVy[emberCount]
          emLife[i] = emLife[emberCount]
          emSize[i] = emSize[emberCount]
          emChar[i] = emChar[emberCount]
          emColor[i] = emColor[emberCount]
        }
      }
    }

    function drawParticles() {
      if (cfg.showEmbers) {
        ctx!.textAlign = "center"
        ctx!.textBaseline = "middle"
        for (let i = 0; i < emberCount; i++) {
          ctx!.globalAlpha = Math.min(1, emLife[i] * 2)
          ctx!.font = `${emSize[i]}px ${F_MONO}`
          ctx!.fillStyle = emColor[i]
          ctx!.fillText(emChar[i], emX[i], emY[i])
        }
      }
      if (cfg.showParticles && isBeaming) {
        const bw = cfg.beamRadius * 0.55 * cfg.scanScale
        const bh = cfg.beamRadius * 1.2
        const grad = ctx!.createLinearGradient(scanX, scanY + 20, scanX, scanY + 20 + bh)
        grad.addColorStop(0, COL_BEAM_A)
        grad.addColorStop(0.5, COL_BEAM_B)
        grad.addColorStop(1, "rgba(191,233,230,0)")
        ctx!.beginPath()
        ctx!.moveTo(scanX - bw * 0.2, scanY + 20)
        ctx!.lineTo(scanX + bw * 0.2, scanY + 20)
        ctx!.lineTo(scanX + bw, scanY + 20 + bh)
        ctx!.lineTo(scanX - bw, scanY + 20 + bh)
        ctx!.closePath()
        ctx!.fillStyle = grad
        ctx!.fill()
      }
      if (cfg.showParticles) {
        ctx!.textAlign = "center"
        ctx!.textBaseline = "middle"
        for (let i = 0; i < particleCount; i++) {
          const t = pLife[i]
          ctx!.globalAlpha = t * 0.75
          ctx!.font = `${pSize[i] * (0.4 + t * 0.6)}px ${F_MONO}`
          ctx!.fillStyle = `rgba(191,233,230,${0.4 + t * 0.5})`
          ctx!.fillText(pChar[i], pX[i], pY[i])
        }
      }
      ctx!.globalAlpha = 1
    }

    // ─── Tunnel (drifting system fragments, depth-faded) ──────────
    const TUNNEL_RINGS = 14
    const TUNNEL_DEPTH = 1200
    const tunnelZ = new Float32Array(TUNNEL_RINGS)
    const tunnelSide = new Uint8Array(TUNNEL_RINGS)
    const tunnelTextIdx = new Uint8Array(TUNNEL_RINGS)
    function buildTunnel() {
      for (let i = 0; i < TUNNEL_RINGS; i++) {
        tunnelZ[i] = (i / TUNNEL_RINGS) * TUNNEL_DEPTH
        tunnelSide[i] = i % 4
        tunnelTextIdx[i] = TUNNEL_FRAGMENTS.length > 0 ? i % TUNNEL_FRAGMENTS.length : 0
      }
    }
    buildTunnel()
    function drawTunnel() {
      if (TUNNEL_FRAGMENTS.length === 0) return
      const cx = W * 0.5,
        cy = H * 0.5
      ctx!.font = `11px ${F_MONO}`
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      for (let i = 0; i < TUNNEL_RINGS; i++) {
        tunnelZ[i] -= 0.5
        if (tunnelZ[i] < 10) {
          tunnelZ[i] += TUNNEL_DEPTH
          tunnelSide[i] = (tunnelSide[i] + 1) % 4
          tunnelTextIdx[i] = (Math.random() * TUNNEL_FRAGMENTS.length) | 0
        }
        const scale = 400 / (400 + tunnelZ[i])
        const alpha = Math.max(0, Math.min(0.06, 0.075 * scale - 0.01))
        if (alpha < 0.003) continue
        const spread = 350 * scale
        let x: number, y: number
        const s = tunnelSide[i]
        if (s === 0) {
          x = cx
          y = cy - spread
        } else if (s === 1) {
          x = cx + spread
          y = cy
        } else if (s === 2) {
          x = cx
          y = cy + spread
        } else {
          x = cx - spread
          y = cy
        }
        const fragment = TUNNEL_FRAGMENTS[tunnelTextIdx[i]]
        if (!fragment) continue
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = COL_DIM
        ctx!.fillText(fragment, x, y)
      }
      ctx!.globalAlpha = 1
    }

    // ─── Debris (roaming spatial noise caught by the scan beam) ──
    type Debris = {
      x: number
      y: number
      vx: number
      vy: number
      hp: number
      shape: DebrisKind["shape"]
      size: number
      color: string
      phase: number
      dying: boolean
      deathTimer: number
      kind: number
    }
    const debris: Debris[] = []
    let score = 0,
      scoreFlash = 0
    function spawnDebris() {
      const ki = (Math.random() * DEBRIS_KINDS.length) | 0
      const k = DEBRIS_KINDS[ki]
      const edge = (Math.random() * 4) | 0
      let x = 0,
        y = 0
      if (edge === 0) {
        x = -30
        y = Math.random() * H
      } else if (edge === 1) {
        x = W + 30
        y = Math.random() * H
      } else if (edge === 2) {
        x = Math.random() * W
        y = -30
      } else {
        x = Math.random() * W
        y = H + 30
      }
      debris.push({
        x,
        y,
        vx: (Math.random() - 0.5) * k.speed * 2,
        vy: (Math.random() - 0.5) * k.speed * 2,
        hp: k.hp,
        shape: k.shape,
        size: k.size,
        color: k.color,
        phase: Math.random() * Math.PI * 2,
        dying: false,
        deathTimer: 0,
        kind: ki,
      })
    }
    function updateDebris(dt: number, time: number) {
      if (!cfg.showDebris) return
      let alive = 0
      for (let i = 0; i < debris.length; i++) if (!debris[i].dying) alive++
      while (alive < cfg.debrisCount) {
        spawnDebris()
        alive++
      }
      for (let i = debris.length - 1; i >= 0; i--) {
        const e = debris[i]
        if (e.dying) {
          e.deathTimer -= dt
          e.x += e.vx
          e.y += e.vy
          e.vx *= 0.95
          e.vy *= 0.95
          if (e.deathTimer <= 0) {
            debris[i] = debris[debris.length - 1]
            debris.pop()
          }
          continue
        }
        const spd = cfg.debrisSpeed
        if (e.kind === 2) {
          e.x += Math.sin(time * 1.5 + e.phase) * spd * 1.2
          e.y += Math.cos(time * 1.2 + e.phase * 1.3) * spd * 0.8
        } else if (e.kind === 1) {
          e.x += e.vx * spd
          e.y += e.vy * spd
          if (Math.random() < dt * 0.5) {
            e.vx += (Math.random() - 0.5) * 3
            e.vy += (Math.random() - 0.5) * 3
          }
          e.vx *= 0.99
          e.vy *= 0.99
        } else {
          e.vx += (W / 2 - e.x) * 0.0001 + (Math.random() - 0.5) * 0.1
          e.vy += (H / 2 - e.y) * 0.0001 + (Math.random() - 0.5) * 0.1
          e.vx *= 0.995
          e.vy *= 0.995
          e.x += e.vx * spd
          e.y += e.vy * spd
        }
        if (e.x < -50) e.x = W + 40
        if (e.x > W + 50) e.x = -40
        if (e.y < -50) e.y = H + 40
        if (e.y > H + 50) e.y = -40
        const dx = e.x - scanX,
          dy = e.y - scanY,
          dSq = dx * dx + dy * dy
        if (dSq < 15000) {
          const d = Math.sqrt(dSq) || 1
          const fl = 1.5 * (1 - d / 122)
          e.vx += (dx / d) * fl
          e.vy += (dy / d) * fl
        }
      }
      if (scoreFlash > 0) scoreFlash -= dt * 3
    }
    function hitDebrisWithBeam(fx: number, fy: number) {
      if (!cfg.showDebris) return
      const hr = cfg.beamRadius * 0.6,
        hrSq = hr * hr
      for (const e of debris) {
        if (e.dying) continue
        const dx = e.x - fx,
          dy = e.y - fy,
          dSq = dx * dx + dy * dy
        if (dSq < hrSq) {
          const d = Math.sqrt(dSq) || 1
          e.hp--
          e.vx += (dx / d) * 5
          e.vy += (dy / d) * 5
          if (e.hp <= 0) {
            e.dying = true
            e.deathTimer = 0.5
            e.vx = (dx / d) * 8
            e.vy = (dy / d) * 8 - 3
            score += 10 + e.kind * 5
            scoreFlash = 1
            for (let j = 0; j < 3; j++) spawnEmber(e.x, e.y)
          }
        }
      }
    }
    function drawDebris(time: number) {
      if (!cfg.showDebris) return
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      for (const e of debris) {
        if (e.dying) {
          const t = e.deathTimer / 0.5
          ctx!.save()
          ctx!.translate(e.x, e.y)
          ctx!.rotate(time * 15)
          ctx!.scale(t, t)
          ctx!.globalAlpha = t * 0.8
          ctx!.strokeStyle = "#ffbf6b"
          ctx!.lineWidth = Math.max(1, e.size * 0.12)
          drawDebrisShape(ctx!, e.shape, e.size)
          ctx!.restore()
        } else {
          const bob = Math.sin(time * 2.5 + e.phase) * 4
          ctx!.save()
          ctx!.translate(e.x, e.y + bob)
          ctx!.globalAlpha = e.kind === 2 ? 0.4 + Math.sin(time * 3 + e.phase) * 0.2 : 0.75
          ctx!.strokeStyle = e.color
          ctx!.lineWidth = Math.max(1, e.size * 0.12)
          drawDebrisShape(ctx!, e.shape, e.size)
          ctx!.restore()
        }
      }
      if (showFrameCounter && score > 0) {
        ctx!.globalAlpha = 0.35 + scoreFlash * 0.4
        ctx!.font = `600 12px ${F_MONO}`
        ctx!.fillStyle = scoreFlash > 0 ? COL_LABEL : COL_DIM
        ctx!.textAlign = "left"
        ctx!.textBaseline = "top"
        ctx!.fillText(`ANOMALIES FLAGGED — ${String(score).padStart(4, "0")}`, 16 * responsiveScale(), 16)
      }
      ctx!.globalAlpha = 1
    }

    // ─── Stars (ambient drifting field) ────────────────────────────
    const STAR_N = 10
    const starX = new Float32Array(STAR_N),
      starY = new Float32Array(STAR_N)
    const starSpd = new Float32Array(STAR_N),
      starPhase = new Float32Array(STAR_N)
    const starSz = new Float32Array(STAR_N),
      starOp = new Float32Array(STAR_N)
    const starC: string[] = []
    for (let i = 0; i < STAR_N; i++) {
      starX[i] = Math.random() * (W || 1)
      starY[i] = Math.random() * (H || 1)
      starSpd[i] = 0.1 + Math.random() * 0.4
      starPhase[i] = Math.random() * Math.PI * 2
      starSz[i] = 10 + Math.random() * 10
      starOp[i] = 0.03 + Math.random() * 0.05
      starC[i] = STAR_CHARS[(Math.random() * STAR_CHARS.length) | 0]
    }
    function drawStars(time: number) {
      if (!cfg.showStars) return
      ctx!.fillStyle = COL_STAR
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      for (let i = 0; i < STAR_N; i++) {
        starY[i] -= starSpd[i]
        if (starY[i] < -30) {
          starY[i] = H + 30
          starX[i] = Math.random() * W
        }
        ctx!.globalAlpha = starOp[i] * (0.5 + Math.sin(time * 0.4 + starPhase[i]) * 0.5)
        ctx!.font = `${starSz[i]}px ${F_MONO}`
        ctx!.fillText(starC[i], starX[i] + Math.sin(time * 0.7 + starPhase[i]) * 10, starY[i])
      }
      ctx!.globalAlpha = 1
    }

    function updateCursor() {
    const lerp = 0.08

    cursor.x += (pointer.x - cursor.x) * lerp
    cursor.y += (pointer.y - cursor.y) * lerp
  }
function drawCursor() {
  if (!cfg.showCursor || isTouchDevice) return

  const mx = cursor.x
  const my = cursor.y

  const radius = 16
  const markLen = 5
  const markGap = 3

  ctx!.save()

  ctx!.translate(mx, my)

  ctx!.strokeStyle = "#bfe9e6"
  ctx!.lineWidth = 1
  ctx!.lineCap = "square"
  ctx!.globalAlpha = isBeaming ? 0.55 : 0.32

  // Circle
  ctx!.beginPath()
  ctx!.arc(0, 0, radius, 0, Math.PI * 2)
  ctx!.stroke()

  // Top mark
  ctx!.beginPath()
  ctx!.moveTo(-markLen / 2, -radius - markGap)
  ctx!.lineTo(markLen / 2, -radius - markGap)
  ctx!.stroke()

  // Bottom mark
  ctx!.beginPath()
  ctx!.moveTo(-markLen / 2, radius + markGap)
  ctx!.lineTo(markLen / 2, radius + markGap)
  ctx!.stroke()

  // Left mark
  ctx!.beginPath()
  ctx!.moveTo(-radius - markGap, -markLen / 2)
  ctx!.lineTo(-radius - markGap, markLen / 2)
  ctx!.stroke()

  // Right mark
  ctx!.beginPath()
  ctx!.moveTo(radius + markGap, -markLen / 2)
  ctx!.lineTo(radius + markGap, markLen / 2)
  ctx!.stroke()

  ctx!.restore()
  ctx!.globalAlpha = 1
}

    // ─── Main loop ──────────────────────────────────────────────
    let lastTime = performance.now(),
      time = 0
    let rafId = 0

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      time += dt

      updateShake()
      ctx!.save()
      ctx!.translate(shakeX, shakeY)
      ctx!.fillStyle = COL_BG
      ctx!.fillRect(-10, -10, W + 20, H + 20)
      drawTunnel()
      drawStars(time)
      updateScanner()
      interactLetters(dt)
      emitBeam(dt)
      updateParticlesAndEmbers(dt)
      updateDebris(dt, time)
      drawLetters()
      drawDebris(time)
      drawParticles()
      updateCursor()
      drawCursor()
      ctx!.restore()

      rafId = requestAnimationFrame(frame)
    }

    initialized = true
    Promise.all([
      document.fonts?.load(`130px ${F_DISPLAY}`),
      document.fonts?.load(`italic 500 34px ${F_CREDIT}`),
      document.fonts?.load(`12px ${F_MONO}`),
    ])
      .catch(() => {})
      .finally(() => layoutAllText())

    if (reduceMotion) {
      // Render a single static frame instead of a continuous loop.
      frame(performance.now())
    } else {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, tagline, credits, preset, config, showFrameCounter])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: fullBleed ? "100dvh" : undefined,
        aspectRatio: fullBleed || style?.height ? undefined : "16 / 9",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        ...style,
      }}
      aria-label={`${title} — interactive geospatial intelligence hero`}
      role="img"
    >
      <canvas ref={canvasRef} id={`geoscan-hero-${uid}`} style={{ display: "block", width: "100%", height: "100%" }} />
      {signature && (
        <a
          href={signature.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: F_MONO,
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.04em",
            color: COL_DIM,
            textDecoration: "none",
            opacity: 0.75,
            transition: "opacity 0.2s ease, color 0.2s ease",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.opacity = "1"
            e.currentTarget.style.color = COL_LABEL
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.opacity = "0.75"
            e.currentTarget.style.color = COL_DIM
          }}
        >
          {signature.name}
        </a>
      )}
    </div>
  )
}
