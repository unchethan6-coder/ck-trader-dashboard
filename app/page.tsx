"use client"

import { useMemo, useState } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileBadge,
  History,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Trophy,
  Wallet,
  X,
} from "lucide-react"

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Calendar", icon: CalendarDays },
  { label: "Payouts", icon: Wallet },
  { label: "Competitions", icon: Trophy },
  { label: "Certificates", icon: FileBadge },
  { label: "Transactions", icon: History },
  { label: "Support", icon: CircleHelp },
]

const trades = [
  ["Sep 20, 2026", "XAUUSD", "Buy", "0.50", "2,641.22", "2,658.10", "+$844.00", "Profit"],
  ["Sep 19, 2026", "EURUSD", "Sell", "1.00", "1.17642", "1.17388", "+$254.00", "Profit"],
  ["Sep 18, 2026", "NAS100", "Buy", "0.20", "23,840.4", "23,610.2", "-$460.00", "Loss"],
  ["Sep 17, 2026", "GBPJPY", "Sell", "0.30", "198.420", "198.770", "-$693.00", "Loss"],
]

function MiniChart({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 640 190" className={compact ? "h-24 w-full" : "h-64 w-full"} role="img" aria-label="Balance and equity chart">
      <defs>
        <linearGradient id="fillBalance" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8b7cff" stopOpacity=".24" />
          <stop offset="100%" stopColor="#8b7cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[28, 72, 116, 160].map((y) => <line key={y} x1="0" x2="640" y1={y} y2={y} stroke="currentColor" className="text-white/[.06]" />)}
      <path d="M0 132 C42 126 70 140 106 124 S167 111 202 122 S260 145 299 128 S357 105 394 119 S451 126 490 99 S550 84 582 91 S616 76 640 70 L640 190 L0 190Z" fill="url(#fillBalance)" />
      <path d="M0 132 C42 126 70 140 106 124 S167 111 202 122 S260 145 299 128 S357 105 394 119 S451 126 490 99 S550 84 582 91 S616 76 640 70" fill="none" stroke="#8b7cff" strokeWidth="3" />
      <path d="M0 145 C50 142 82 149 118 140 S175 128 210 138 S267 155 304 142 S362 125 400 135 S457 139 494 121 S550 110 584 116 S620 105 640 103" fill="none" stroke="#35d399" strokeWidth="2" strokeDasharray="5 5" opacity=".9" />
      <line x1="0" x2="640" y1="156" y2="156" stroke="#ff7b73" strokeDasharray="6 6" opacity=".8" />
    </svg>
  )
}

export default function Page() {
  const [collapsed, setCollapsed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Overview")
  const [range, setRange] = useState("7D")
  const [hidden, setHidden] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [section, setSection] = useState("Overview")
  const value = (text: string) => hidden ? "••••••" : text
  const nav = useMemo(() => navItems, [])

  function refresh() {
    setRefreshing(true)
    window.setTimeout(() => setRefreshing(false), 900)
  }

  return (
    <main className="min-h-screen bg-[#0c0d14] text-white">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-30 flex w-[248px] flex-col border-r border-white/[.07] bg-[#10111a] px-4 py-5 transition-transform duration-200 lg:relative lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-[82px]" : ""}`}>
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
            {!collapsed && <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl bg-[#8b7cff] shadow-lg shadow-violet-500/20"><Activity className="size-5 text-white" /></div><span className="text-[15px] font-semibold tracking-tight">Apex Trader</span></div>}
            <button onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-2 text-[#8990a7] transition hover:bg-white/[.06] hover:text-white lg:block" aria-label="Toggle sidebar">{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</button>
            <button onClick={() => setMenuOpen(false)} className="rounded-lg p-2 text-[#8990a7] lg:hidden" aria-label="Close menu"><X /></button>
          </div>
          <div className="mt-9 flex flex-col gap-1">
            {nav.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setSection(label); setMenuOpen(false) }} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${section === label ? "bg-[#8b7cff]/15 text-white" : "text-[#8990a7] hover:bg-white/[.05] hover:text-white"}`} title={collapsed ? label : undefined}><Icon className={`size-[18px] shrink-0 ${section === label ? "text-[#a89fff]" : ""}`} />{!collapsed && <span>{label}</span>}{!collapsed && label === "Payouts" && <span className="ml-auto rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[10px] text-emerald-300">New</span>}</button>)}
          </div>
          {!collapsed && <div className="mt-auto rounded-2xl border border-[#8b7cff]/20 bg-gradient-to-br from-[#19182a] to-[#11121c] p-4"><div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-[#8b7cff]/15 text-[#b5adff]"><Sparkles className="size-4" /></div><p className="text-sm font-medium">Level up your edge</p><p className="mt-1 text-xs leading-5 text-[#8990a7]">Unlock advanced analytics and priority support.</p><button className="mt-4 w-full rounded-lg bg-[#8b7cff] py-2 text-xs font-semibold text-white transition hover:bg-[#9c90ff]">Explore Pro</button></div>}
          <div className={`mt-5 flex items-center gap-3 border-t border-white/[.07] pt-5 ${collapsed ? "justify-center" : ""}`}><div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#d5b49d] to-[#775a56] text-xs font-bold">JD</div>{!collapsed && <div className="min-w-0"><p className="truncate text-sm font-medium">Jordan Davis</p><p className="truncate text-xs text-[#8990a7]">Pro member</p></div>}{!collapsed && <ChevronDown className="ml-auto size-4 text-[#8990a7]" />}</div>
        </aside>
        {menuOpen && <button className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation overlay" />}

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-white/[.07] bg-[#0c0d14]/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8"><div className="flex items-center justify-between gap-4"><div className="flex min-w-0 items-center gap-3"><button onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-[#aeb4c7] lg:hidden" aria-label="Open menu"><Menu /></button><div className="hidden text-xs text-[#8990a7] sm:block">Accounts <ChevronRight className="mx-1 inline size-3" /> <span className="text-white">Overview</span></div><div className="sm:hidden"><p className="text-sm font-semibold">Overview</p><p className="text-[11px] text-[#8990a7]">Apex Trader Dashboard</p></div></div><div className="flex items-center gap-2"><button onClick={refresh} className="rounded-lg border border-white/[.08] p-2 text-[#aeb4c7] transition hover:bg-white/[.06]" aria-label="Refresh dashboard"><RefreshCw className={refreshing ? "size-4 animate-spin" : "size-4"} /></button><button className="relative rounded-lg border border-white/[.08] p-2 text-[#aeb4c7] transition hover:bg-white/[.06]" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#ff7b73]" /></button><div className="ml-1 hidden size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d5b49d] to-[#775a56] text-[10px] font-bold sm:flex">JD</div></div></div><div className="mt-4 flex flex-wrap items-center gap-2"><div className="flex items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.03] px-3 py-2"><span className="size-2 rounded-full bg-emerald-400" /><span className="text-xs font-medium">Stellar 2-Step</span><span className="text-xs text-[#8990a7]">• $100K</span></div><span className="text-xs text-[#8990a7]">Login ID <strong className="font-medium text-[#d8dbea]">14123683</strong></span><span className="rounded-md bg-white/[.06] px-2 py-1 text-[10px] font-medium text-[#aeb4c7]">Active</span><span className="rounded-md bg-white/[.06] px-2 py-1 text-[10px] font-medium text-[#aeb4c7]">MT5</span><span className="rounded-md bg-white/[.06] px-2 py-1 text-[10px] font-medium text-[#aeb4c7]">Swap</span><span className="ml-auto hidden text-xs text-[#8990a7] md:block">Trading cycle <strong className="font-medium text-white">Day 3 of 30</strong></span></div></header>

          <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mb-6 flex items-center gap-1 overflow-x-auto border-b border-white/[.07] pb-px">{["Overview", "Calendar", "History", "Reset", "Platform"].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap border-b-2 px-4 pb-3 text-sm transition ${activeTab === tab ? "border-[#8b7cff] text-white" : "border-transparent text-[#8990a7] hover:text-white"}`}>{tab}</button>)}</div>
            <div className="mb-6 rounded-2xl border border-[#ff7b73]/25 bg-[#26171b]/80 p-4 sm:p-5"><div className="flex items-start gap-3"><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#ff7b73]/15 text-[#ff9189]"><AlertTriangle className="size-5" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-semibold">Account at risk</h2><span className="rounded-md bg-[#ff7b73]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ff9189]">Critical</span></div><p className="mt-1 text-xs leading-5 text-[#c89b9b]">Your account is $175.46 away from the maximum loss limit. Consider reducing exposure before placing new trades.</p></div><button className="hidden text-xs font-medium text-[#ff9a92] sm:block">View risk rules <ChevronRight className="ml-1 inline size-3" /></button></div></div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><div className="rounded-2xl border border-white/[.07] bg-[#141621] p-5 sm:col-span-2"><div className="flex items-center justify-between"><p className="text-xs text-[#8990a7]">Current balance</p><button onClick={() => setHidden(!hidden)} className="text-xs text-[#8990a7] hover:text-white">{hidden ? "Show balance" : "Hide balance"}</button></div><p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{value("$90,175.46")}</p><div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/[.07] pt-4 sm:grid-cols-4"><div><p className="text-[11px] text-[#8990a7]">Initial balance</p><p className="mt-1 text-sm font-medium">{value("$100,000")}</p></div><div><p className="text-[11px] text-[#8990a7]">Equity</p><p className="mt-1 text-sm font-medium">{value("$90,175.46")}</p></div><div><p className="text-[11px] text-[#8990a7]">P/L</p><p className="mt-1 text-sm font-medium text-[#ff9189]">{value("-$9,824.54")}</p></div><div><p className="text-[11px] text-[#8990a7]">Floating P/L</p><p className="mt-1 text-sm font-medium">{value("$0.00")}</p></div></div></div><Objective label="Profit target" value="$5,000" sub="Result $0" percent={0} tone="violet" /><Objective label="Minimum trading days" value="5 days" sub="3 completed" percent={60} tone="green" /><Objective label="Daily loss limit" value="$5,000" sub="$175.46 remaining" percent={96.5} tone="coral" risk /><Objective label="Max loss limit" value="$10,000" sub="$175.46 remaining" percent={98.2} tone="coral" risk /></div>
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]"><section className="rounded-2xl border border-white/[.07] bg-[#141621] p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><h2 className="font-semibold">Account status</h2><span className="rounded-md bg-[#ff7b73]/10 px-2 py-1 text-[10px] font-medium text-[#ff9189]">At risk</span></div><p className="mt-1 text-xs text-[#8990a7]">Balance performance over time</p></div><div className="flex rounded-lg border border-white/[.08] p-1">{["7D", "30D"].map((item) => <button key={item} onClick={() => setRange(item)} className={`rounded-md px-3 py-1.5 text-xs ${range === item ? "bg-white/[.1] text-white" : "text-[#8990a7]"}`}>{item}</button>)}</div></div><div className="mt-5"><MiniChart /><div className="flex justify-between text-[10px] text-[#697188]"><span>Sep 14</span><span>Sep 16</span><span>Sep 18</span><span>Sep 20</span></div></div><div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[.07] pt-4 text-xs"><span><i className="mr-2 inline-block size-2 rounded-full bg-[#8b7cff]" />Balance <strong className="ml-1 text-white">$90,175.46</strong></span><span><i className="mr-2 inline-block size-2 rounded-full bg-emerald-400" />Equity <strong className="ml-1 text-white">$90,175.46</strong></span><span className="text-[#8990a7]"><i className="mr-2 inline-block size-2 rounded-full bg-[#ff7b73]" />Max loss $90,000</span></div></section><section className="rounded-2xl border border-white/[.07] bg-[#141621] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Risk insights</h2><p className="mt-1 text-xs text-[#8990a7]">Rules that keep you in control</p></div><ShieldCheck className="size-5 text-emerald-400" /></div><div className="mt-5 flex flex-col gap-3"><Insight label="Quick strike" value="30%" status="Clean" /><Insight label="Risk limit" value="3%" status="No impact" /><Insight label="News trades" value="0" status="No impact" /></div><div className="mt-5 rounded-xl bg-white/[.035] p-4"><p className="text-xs leading-5 text-[#aeb4c7]">You have <strong className="text-white">$175.46</strong> of room before your maximum loss rule is breached.</p></div></section></div>
            <section className="mt-6 rounded-2xl border border-white/[.07] bg-[#141621] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Recent activity</h2><p className="mt-1 text-xs text-[#8990a7]">Your latest closed trades</p></div><button className="text-xs font-medium text-[#a89fff]">View all <ChevronRight className="ml-1 inline size-3" /></button></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead><tr className="border-b border-white/[.07] text-[#697188]"><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Instrument</th><th className="pb-3 font-medium">Side</th><th className="pb-3 font-medium">Volume</th><th className="pb-3 font-medium">Entry</th><th className="pb-3 font-medium">Exit</th><th className="pb-3 font-medium">P/L</th><th className="pb-3 text-right font-medium">Status</th></tr></thead><tbody>{trades.map((trade) => <tr key={trade[0] + trade[1]} className="border-b border-white/[.05] last:border-0"><td className="py-4 text-[#aeb4c7]">{trade[0]}</td><td className="py-4 font-medium">{trade[1]}</td><td className={`py-4 ${trade[2] === "Buy" ? "text-emerald-400" : "text-[#ff9189]"}`}>{trade[2]}</td><td className="py-4 text-[#aeb4c7]">{trade[3]}</td><td className="py-4 text-[#aeb4c7]">{trade[4]}</td><td className="py-4 text-[#aeb4c7]">{trade[5]}</td><td className={`py-4 font-medium ${trade[7].startsWith("+") ? "text-emerald-400" : "text-[#ff9189]"}`}>{trade[7]}</td><td className="py-4 text-right"><span className={`rounded-md px-2 py-1 text-[10px] ${trade[8] === "Profit" ? "bg-emerald-400/10 text-emerald-300" : "bg-[#ff7b73]/10 text-[#ff9189]"}`}>{trade[8]}</span></td></tr>)}</tbody></table></div></section>
          </div>
        </section>
      </div>
    </main>
  )
}

function Objective({ label, value, sub, percent, tone, risk = false }: { label: string; value: string; sub: string; percent: number; tone: "violet" | "green" | "coral"; risk?: boolean }) {
  const color = tone === "green" ? "bg-emerald-400" : tone === "coral" ? "bg-[#ff7b73]" : "bg-[#8b7cff]"
  const text = tone === "green" ? "text-emerald-300" : tone === "coral" ? "text-[#ff9189]" : "text-[#b5adff]"
  return <div className="rounded-2xl border border-white/[.07] bg-[#141621] p-5"><div className="flex items-center justify-between"><p className="text-xs text-[#8990a7]">{label}</p><CircleHelp className="size-3.5 text-[#697188]" /></div><p className="mt-3 text-xl font-semibold">{value}</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[.07]"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(percent, 100)}%` }} /></div><div className="mt-3 flex items-center justify-between text-[11px]"><span className={risk ? text : "text-[#8990a7]"}>{sub}</span><span className="text-[#697188]">{risk ? "Near limit" : `${percent}%`}</span></div></div>
}

function Insight({ label, value, status }: { label: string; value: string; status: string }) { return <div className="flex items-center justify-between rounded-xl border border-white/[.06] bg-white/[.025] px-4 py-3"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-emerald-400/10"><ShieldCheck className="size-4 text-emerald-400" /></span><span className="text-sm">{label}</span></div><div className="text-right"><p className="text-sm font-semibold">{value}</p><p className="text-[10px] text-emerald-300">{status}</p></div></div> }

export function LoadingState() { return <div className="flex min-h-48 items-center justify-center rounded-2xl border border-white/[.07] bg-[#141621] text-sm text-[#8990a7]">Loading account overview…</div> }
export function EmptyState() { return <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[.12] bg-[#141621] text-center"><TrendingDown className="size-6 text-[#697188]" /><p className="mt-3 text-sm font-medium">No activity yet</p><p className="mt-1 text-xs text-[#8990a7]">Closed trades will appear here.</p></div> }
