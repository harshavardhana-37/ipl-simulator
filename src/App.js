
import { useState, useEffect } from "react";
import table from "./data/ipl-table.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import MatchList from "./components/MatchList";

const teamData = {
  RCB: { short: "RC", color: "#ec1c24" },
  MI: { short: "MI", color: "#045093" },
  CSK: { short: "CS", color: "#fdb913" },
  KKR: { short: "KK", color: "#3a225d" },
  SRH: { short: "SR", color: "#f26522" },
  DC: { short: "DC", color: "#17479e" },
  PBKS: { short: "PB", color: "#d71920" },
  GT: { short: "GT", color: "#1c1c1c" },
  RR: { short: "RR", color: "#254aa5" },
  LSG: { short: "LS", color: "#a72056" }
};

const teamsData = Object.fromEntries(
  Object.keys(teamData).map(t => [
    t,
    { name: t, played: 0, won: 0, lost: 0, points: 0, nrr: (Math.random() * 2 - 1).toFixed(3) }
  ])
);

const convertToShort = (name) => {
  const map = {
    "Royal Challengers Bengaluru": "RCB",
    "Mumbai Indians": "MI",
    "Chennai Super Kings": "CSK",
    "Kolkata Knight Riders": "KKR",
    "Sunrisers Hyderabad": "SRH",
    "Delhi Capitals": "DC",
    "Punjab Kings": "PBKS",
    "Gujarat Titans": "GT",
    "Rajasthan Royals": "RR",
    "Lucknow Super Giants": "LSG"
  };

  return map[name] || null;
};

const initialMatches = [
 
  { id: 26, teamA: "RCB", teamB: "DC", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 27, teamA: "SRH", teamB: "CSK", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 28, teamA: "KKR", teamB: "RR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 29, teamA: "PBKS", teamB: "LSG", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 30, teamA: "GT", teamB: "MI", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 31, teamA: "SRH", teamB: "DC", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 32, teamA: "LSG", teamB: "RR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 33, teamA: "MI", teamB: "CSK", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 34, teamA: "RCB", teamB: "GT", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 35, teamA: "DC", teamB: "PBKS", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 36, teamA: "RR", teamB: "SRH", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 37, teamA: "GT", teamB: "CSK", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 38, teamA: "LSG", teamB: "KKR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 39, teamA: "DC", teamB: "RCB", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 40, teamA: "PBKS", teamB: "RR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 41, teamA: "MI", teamB: "SRH", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 42, teamA: "GT", teamB: "RCB", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 43, teamA: "RR", teamB: "DC", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 44, teamA: "CSK", teamB: "MI", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 45, teamA: "SRH", teamB: "KKR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 46, teamA: "GT", teamB: "PBKS", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 47, teamA: "MI", teamB: "LSG", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 48, teamA: "DC", teamB: "CSK", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 49, teamA: "SRH", teamB: "PBKS", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 50, teamA: "LSG", teamB: "RCB", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 51, teamA: "DC", teamB: "KKR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 52, teamA: "RR", teamB: "GT", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 53, teamA: "CSK", teamB: "LSG", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 54, teamA: "RCB", teamB: "MI", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 55, teamA: "PBKS", teamB: "DC", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 56, teamA: "GT", teamB: "SRH", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 57, teamA: "RCB", teamB: "KKR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 58, teamA: "PBKS", teamB: "MI", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 59, teamA: "LSG", teamB: "CSK", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 60, teamA: "KKR", teamB: "GT", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 61, teamA: "PBKS", teamB: "RCB", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 62, teamA: "DC", teamB: "RR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 63, teamA: "CSK", teamB: "SRH", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 64, teamA: "RR", teamB: "LSG", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 65, teamA: "KKR", teamB: "MI", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 66, teamA: "CSK", teamB: "GT", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 67, teamA: "SRH", teamB: "RCB", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 68, teamA: "LSG", teamB: "PBKS", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 69, teamA: "MI", teamB: "RR", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" },
  { id: 70, teamA: "KKR", teamB: "DC", result: null, scoreA: "", scoreB: "", oversA: "20", oversB: "20" }
];

function calculatePoints(teams, matches) {
  const table = JSON.parse(JSON.stringify(teams));

  matches.forEach(match => {
    if (!match.result) return;

    const { teamA, teamB, result } = match;

    // Parse runs from "180/5" style scores, or plain numbers, or empty
    const parseRuns = (score) => {
      if (score === undefined || score === null || score === "") return 0;

      // If already a number (your current case)
      if (typeof score === "number") return score;

      // If string like "180/5"
      if (typeof score === "string") {
        if (score.includes("/")) {
          return parseInt(score.split("/")[0]) || 0;
        }
        return parseInt(score) || 0;
      }

      return 0;
    };

    const runsA = parseRuns(match.scoreA);
    const runsB = parseRuns(match.scoreB);

    table[teamA].played++;
    table[teamB].played++;

    // Overs for NRR calculation
    const oversA = parseFloat(match.oversA) || 20;
    const oversB = parseFloat(match.oversB) || 20;

    if (result === "NR") {
      table[teamA].points += 1;
      table[teamB].points += 1;
    } else if (result === teamA) {
      table[teamA].won++;
      table[teamA].points += 2;
      table[teamB].lost++;
    } else if (result === teamB) {
      table[teamB].won++;
      table[teamB].points += 2;
      table[teamA].lost++;
    }

    // NRR update based on run rates if both scores are present
    if (runsA && runsB) {
      const runRateA = runsA / oversA;
      const runRateB = runsB / oversB;

      const diff = runRateA - runRateB;

      table[teamA].nrr = (
        parseFloat(table[teamA].nrr) + diff
      ).toFixed(3);

      table[teamB].nrr = (
        parseFloat(table[teamB].nrr) - diff
      ).toFixed(3);
    }
  });

  return Object.values(table).sort((a, b) => b.points - a.points);
}

function generatePositionHistory(baseTable, matches) {
  if (!baseTable || baseTable.length === 0) return [];

  let history = [];

  // Start from base table positions (reset everything to 0 for simulation clarity)
  let currentTable = Object.fromEntries(
    baseTable.map(t => [
      t.name,
      { name: t.name, played: 0, won: 0, lost: 0, points: 0, nrr: 0 }
    ])
  );

  // Push initial state (before any match)
  let initialSorted = Object.values(currentTable).sort((a, b) => b.points - a.points);
  let initialPositions = {};
  initialSorted.forEach((team, index) => {
    initialPositions[team.name] = index + 1;
  });
  history.push({ ...initialPositions });

  // Process matches ONE BY ONE (sequential, not random)
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    // FORCE first match realistic start (RCB beats SRH)
    if (i === 0) {
      const forcedMatch = {
        ...match,
        teamA: "RCB",
        teamB: "SRH",
        result: "RCB",
        scoreA: 180,
        scoreB: 160,
        oversA: 20,
        oversB: 20
      };

      const tempMatches = [forcedMatch];

      currentTable = Object.fromEntries(
        Object.values(
          calculatePoints(currentTable, tempMatches)
        ).map(t => [t.name, { ...t }])
      );

      const sorted = Object.values(currentTable).sort((a, b) => b.points - a.points);

      const positions = {};
      sorted.forEach((team, index) => {
        positions[team.name] = index + 1;
      });

      history.push({ ...positions });
      continue;
    }

    // If no result, RANDOMIZE realistic result for evolution
    let finalMatch = match;

    if (!match.result) {
      const winner = Math.random() > 0.5 ? match.teamA : match.teamB;

      finalMatch = {
        ...match,
        result: winner,
        scoreA: Math.floor(140 + Math.random() * 80),
        scoreB: Math.floor(140 + Math.random() * 80),
        oversA: 20,
        oversB: 20
      };

      // Ensure winner actually has higher score
      if (winner === finalMatch.teamA && finalMatch.scoreA <= finalMatch.scoreB) {
        finalMatch.scoreA = finalMatch.scoreB + 1;
      }
      if (winner === finalMatch.teamB && finalMatch.scoreB <= finalMatch.scoreA) {
        finalMatch.scoreB = finalMatch.scoreA + 1;
      }
    }

    // apply ONLY this match incrementally
    const tempMatches = [finalMatch];

    currentTable = Object.fromEntries(
      Object.values(
        calculatePoints(currentTable, tempMatches)
      ).map(t => [t.name, { ...t }])
    );

    const sorted = Object.values(currentTable).sort((a, b) => b.points - a.points);

    const positions = {};
    sorted.forEach((team, index) => {
      positions[team.name] = index + 1;
    });

    history.push({ ...positions });
  }

  return history;
}

export default function App() {
  const [matches, setMatches] = useState(initialMatches);
  const [liveTable, setLiveTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("simulator");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [probabilities, setProbabilities] = useState([]);
  const [hasRun, setHasRun] = useState(false);

  const [simulating, setSimulating] = useState(false);

  // PercentageBar component for probability bars
  const PercentageBar = ({ value }) => {
    const num = parseFloat(value);

    const getColor = () => {
      if (num >= 70) return "#22c55e";
      if (num >= 30) return "#f59e0b";
      return "#ef4444";
    };

    return (
      <div
        style={{
          position: "relative",
          width: "110px",
          height: "28px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${num}%`,
            height: "100%",
            background: getColor(),
            opacity: 0.25,
            transition: "width 0.5s ease"
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: "500",
            color: getColor()
          }}
        >
          {num}%
        </div>
      </div>
    );
  };

 useEffect(() => {
  const fetchBaseTable = async () => {
    try {
      const res = await fetch("/base-table.json");
      const data = await res.json();

      console.log("BASE TABLE:", data);

      setLiveTable(data);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBaseTable();
}, []);
  const textPrimary = darkMode ? "#ffffff" : "#111";
  const textSecondary = darkMode ? "#aaa" : "#555";

const simulatedTable = liveTable.length > 0
  ? calculatePoints(
      Object.fromEntries(
        liveTable.map(t => [
          t.name,
          {
            name: t.name,
            played: t.played,
            won: t.won,
            lost: t.lost,
            points: t.points,
            nrr: t.nrr
          }
        ])
      ),
      matches
    )
  : [];  const table = liveTable;
  const pickedCount = matches.filter(m => m.result).length;

const positionHistory = generatePositionHistory(
  liveTable,
  [...pastMatches, ...matches]
);
  const chartData = positionHistory.map((pos, i) => ({
    match: i,
    ...pos
  }));

  const handleResult = (id, winner) => {
    setMatches(matches.map(m => {
      if (m.id !== id) return m;

      // 🔁 TOGGLE LOGIC
      if (m.result === winner) {
        return { ...m, result: null }; // unselect
      }

      // Winner logic enforcement
      let match = { ...m, result: winner };
      if (winner === m.teamA) {
        if (parseInt(match.scoreA) <= parseInt(match.scoreB)) {
          match.scoreA = (parseInt(match.scoreB) || 0) + 1;
        }
      }
      if (winner === m.teamB) {
        if (parseInt(match.scoreB) <= parseInt(match.scoreA)) {
          match.scoreB = (parseInt(match.scoreA) || 0) + 1;
        }
      }
      return match;
    }));
  };
  const randomizeMatches = () => {
    setMatches(matches.map(match => ({
      ...match,
      result: Math.random() > 0.5 ? match.teamA : match.teamB
    })));
  };

  const resetMatches = () => setMatches(initialMatches);

  const runSimulation = () => {
    setSimulating(true);

    setTimeout(() => {
      const iterations = 5000;
      const results = {};

      liveTable.forEach(team => {
        results[team.name] = { top4: 0, top2: 0, winner: 0 };
      });

      for (let i = 0; i < iterations; i++) {
        const simMatches = matches.map(m => ({
          ...m,
          result: m.result || (Math.random() > 0.5 ? m.teamA : m.teamB)
        }));

        const simTable = calculatePoints(
          Object.fromEntries(
            liveTable.map(t => [t.name, { ...t }])
          ),
          simMatches
        );

        simTable.forEach((team, index) => {
          if (index < 4) results[team.name].top4++;
          if (index < 2) results[team.name].top2++;
          if (index === 0) results[team.name].winner++;
        });
      }

      const final = liveTable.map(team => ({
        name: team.name,
        top4: ((results[team.name].top4 / iterations) * 100).toFixed(1),
        top2: ((results[team.name].top2 / iterations) * 100).toFixed(1),
        winner: ((results[team.name].winner / iterations) * 100).toFixed(1)
      }));

      setProbabilities(final);
      setHasRun(true);
      setSimulating(false);
    }, 400);
  };

  return (
    <div
      style={{
        ...appStyle,
        background: darkMode ? "#0b0b0f" : "#ffffff",
        color: darkMode ? "#e5e7eb" : "#222"
      }}
    >

      {/* HEADER */}
      <div style={headerStyle}>
<div style={{ ...logoStyle, display: "flex", alignItems: "center", gap: "8px" }}>
  
  {/* TROPHY SVG */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#ef4444" }}   // optional gold color
  >
    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
  </svg>

  <span>IPL Twin</span>

</div>
<div style={menuStyle(darkMode)}>
  {/* MATCHES */}
  <span
    onClick={() => setActiveTab("matches")}
    style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M3 10h18"/>
    </svg>
    Matches
  </span>

  {/* STANDINGS */}
  <span
    onClick={() => setActiveTab("table")}
    style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
      <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
      <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
      <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
    </svg>
    Standings
  </span>

  {/* VENUES */}
  <span
    onClick={() => setActiveTab("venues")}
    style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M15 18h-5"/>
      <path d="M18 14h-8"/>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/>
      <rect width="8" height="4" x="10" y="6" rx="1"/>
    </svg>
    Venues
  </span>

</div>

        <div style={rightMenu}>
          <span
  onClick={() => setDarkMode(!darkMode)}
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: darkMode ? "#1f2937" : "#e5e7eb"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "rotate(-150deg) scale(1.1)";
    e.currentTarget.style.boxShadow = "0 0 12px rgba(250,204,21,0.8)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "rotate(0deg) scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  {darkMode ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#ef4444" : "#f59e0b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  )}
</span>
<button
  style={signInBtn(darkMode)}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.background = "#ef4444";
    e.currentTarget.style.color = "#fff";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = darkMode ? "#fff" : "#000";
  }}
>
  Sign in
</button>
 </div>
      </div>

      {/* TABS */}
      <div style={tabsWrapper}>
        <div style={tabsContainer}>
         {[
  {
    key: "table",
    label: (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" style={{ marginRight: "6px" }}>
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
        </svg>
        Table
      </>
    )
  },
  {
    key: "predict",
    label: (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" style={{ marginRight: "6px" }}>
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
        Predict
      </>
    )
  },
  {
    key: "simulator",
    label: (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" style={{ marginRight: "6px" }}>
          <rect width="16" height="20" x="4" y="2" rx="2"/>
          <line x1="8" x2="16" y1="6" y2="6"/>
          <line x1="16" x2="16" y1="14" y2="18"/>
          <path d="M16 10h.01"/>
          <path d="M12 10h.01"/>
          <path d="M8 10h.01"/>
          <path d="M12 14h.01"/>
          <path d="M8 14h.01"/>
          <path d="M12 18h.01"/>
          <path d="M8 18h.01"/>
        </svg>
        Simulator
      </>
    )
  },
  {
    key: "probabilities",
    label: (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" style={{ marginRight: "6px" }}>
          <line x1="19" x2="5" y1="5" y2="19"/>
          <circle cx="6.5" cy="6.5" r="2.5"/>
          <circle cx="17.5" cy="17.5" r="2.5"/>
        </svg>
        Probabilities
      </>
    )
  }
].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                ...tabBtn,
                background: activeTab === tab.key ? "#fff" : "transparent",
                color: activeTab === tab.key ? "#000" : "#aaa"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* PROBABILITIES */}
      {activeTab === "probabilities" && (
        <div
          style={{
            ...card,
            background: darkMode ? "#111117" : "#ffffff",
            borderColor: darkMode ? "#1f1f2a" : "#ddd",
            padding: "35px",
          }}
        >
          <h2 style={{ fontWeight: "400" }}>
            Qualification Probabilities • {matches.filter(m => !m.result).length} matches remaining
          </h2>

          <table style={tableStyle}>
            <thead style={{ color: "#666" }}>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Top 4 %</th>
                <th>Top 2 %</th>
                <th>Winner %</th>
              </tr>
            </thead>

            <tbody>
              {(hasRun ? probabilities : liveTable).map((team, i) => (
                <tr key={team.name} style={{ height: "60px" }}>
                  <td>{i + 1}</td>

                  <td style={{ textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        background: teamData[team.name]?.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px"
                      }}>
                        {teamData[team.name]?.short}
                      </div>
                      {team.name}
                    </div>
                  </td>

                  <td>
                    {hasRun ? <PercentageBar value={team.top4} /> : "—"}
                  </td>
                  <td>
                    {hasRun ? <PercentageBar value={team.top2} /> : "—"}
                  </td>
                  <td>
                    {hasRun ? <PercentageBar value={team.winner} /> : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!hasRun ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <button
                onClick={runSimulation}
                style={{
                  margin: "0 auto",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#6366f1",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                {simulating ? "Running..." : "Run Simulation"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <button
                onClick={() => {
                  setHasRun(false);
                  setProbabilities([]);
                }}
                style={{
                  margin: "0 auto",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#ef4444",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      )}

      {/* SIMULATOR */}
      {activeTab === "table" && (
  <div
    style={{
      ...card,
      background: darkMode ? "#111117" : "#ffffff",
      borderColor: darkMode ? "#1f1f2a" : "#ddd",
      color: darkMode ? "#ffffff" : "#111"
    }}
  >
    <h2 style={{ fontWeight: "400" }}>Points Table</h2>
    {loading && <p style={{color:"#888"}}>Loading IPL table...</p>}
    {!loading && liveTable.length === 0 && <p style={{color:"#ef4444"}}>No table data found</p>}
    <table style={tableStyle}>
      <thead style={{ color: "#666", fontWeight: "400" }}>
        <tr>
          <th style={{ padding: "10px 8px" }}>#</th>
          <th style={{ padding: "10px 8px", textAlign: "left", paddingLeft: "12px" }}>Team</th>
          <th style={{ padding: "10px 8px" }}>P</th>
          <th style={{ padding: "10px 8px" }}>W</th>
          <th style={{ padding: "10px 8px" }}>L</th>
          <th style={{ padding: "10px 8px" }}>Pts</th>
          <th style={{ padding: "10px 8px" }}>NRR</th>
        </tr>
      </thead>

      <tbody>
        {liveTable.map((team, i) => (
          <tr key={team.name} style={{ height: "60px" }}>
            <td style={{ padding: "10px 8px" }}>{i + 1}</td>
            <td style={{ textAlign: "left", padding: "10px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: teamData[team.name]?.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px"
                }}>
                  {teamData[team.name]?.short}
                </div>
                {team.name}
              </div>
            </td>
            <td style={{ padding: "10px 8px" }}>{team.played}</td>
            <td style={{ padding: "10px 8px" }}>{team.won}</td>
            <td style={{ padding: "10px 8px" }}>{team.lost}</td>
            <td style={{ padding: "10px 8px" }}>{team.points}</td>
            <td style={{ padding: "10px 8px" }}>{team.nrr}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
      {activeTab === "simulator" && (
        <div
          style={{
            ...card,
            background: darkMode ? "#111117" : "#ffffff",
            borderColor: darkMode ? "#1f1f2a" : "#ddd",
            color: darkMode ? "#ffffff" : "#111"
          }}
        >
          <h2 style={{ fontWeight: "400" }}>
            IPL Twin – Standings Simulator
          </h2>

          {/* ACTION BAR */}
          <div style={topBar}>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={resetMatches}
                style={{
                  ...btn,
                  background: darkMode ? "#1a1a22" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#111",
                  borderColor: darkMode ? "#2a2a35" : "#ccc"
                }}
              >
                <>
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
    <path d="M16 16h5v5"/>
  </svg>
  Reset
</>
              </button>
              <button
                onClick={randomizeMatches}
                style={{
                  ...btn,
                  background: darkMode ? "#1a1a22" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#111",
                  borderColor: darkMode ? "#2a2a35" : "#ccc"
                }}
              >
                <>
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <rect width="12" height="12" x="2" y="10" rx="2"/>
    <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/>
    <path d="M6 18h.01"/>
    <path d="M10 14h.01"/>
    <path d="M15 6h.01"/>
    <path d="M18 9h.01"/>
  </svg>
  Random
</>
              </button>
              <button
                style={{
                  ...btn,
                  background: darkMode ? "#1a1a22" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#111",
                  borderColor: darkMode ? "#2a2a35" : "#ccc"
                }}
              >
               <>
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
  </svg>
  Edit
</>
              </button>
            </div>

            <div style={{ color: "#aaa" }}>
              {pickedCount} / {matches.length} picked
            </div>
          </div>

<div
  style={{
    display: "flex",
    gap: "40px",
    alignItems: "flex-start"
  }}
>
            {/* MATCHES */}
<div
  style={{
    flex: 1,
    height: "600px",
    overflowY: "auto",
    paddingRight: "8px",
    borderRight: darkMode ? "1px solid #1f1f2a" : "1px solid #ddd"
  }}
>              <h3 style={subHeading}>Remaining Matches</h3>

             {matches.map(match => (
  <div
    key={match.id}
    style={{
      background: darkMode ? "#111117" : "#ffffff",
      padding: "10px 14px",
      borderRadius: "10px",
      marginBottom: "10px",
      border: darkMode ? "1px solid #1f1f2a" : "1px solid #ddd",
      display: "flex",
      flexDirection: "column",
      color: darkMode ? "#fff" : "#111"
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: "#777", fontSize: "12px" }}>
          #{match.id}
        </span>

        <button
          onClick={() => handleResult(match.id, match.teamA)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            position: "relative",
            padding: "6px 10px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            background:
              match.result === match.teamA
                ? teamData[match.teamA].color
                : "#eee",
            color: match.result === match.teamA ? "#fff" : "#333"
          }}
        >
          {match.teamA}
          {match.result === match.teamA && " ✓"}
        </button>

        <span style={{ color: "#666", fontSize: "12px" }}>vs</span>

        <button
          onClick={() => handleResult(match.id, match.teamB)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            background:
              match.result === match.teamB
                ? teamData[match.teamB].color
                : "#eee",
            color: match.result === match.teamB ? "#fff" : "#333"
          }}
        >
          {match.teamB}
          {match.result === match.teamB && " ✓"}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          onClick={() => handleResult(match.id, "NR")}
          style={{
            padding: "5px 10px",
            borderRadius: "20px",
            border: "1px solid #2a2a35",
            background:
              match.result === "NR"
                ? "#ef4444"
                : darkMode
                ? "#1a1a22"
                : "#eee",
            color:
              match.result === "NR"
                ? "#fff"
                : darkMode
                ? "#aaa"
                : "#333",
            fontSize: "12px",
            cursor: "pointer"
          }}
        >
          NR
        </button>

        {match.result && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={darkMode ? "#fff" : "#111"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              cursor: "pointer",
              opacity: 0.8,
              transition: "0.2s"
            }}
            onClick={() => {
              setSelectedMatch(prev => prev?.id === match.id ? null : { id: match.id });
            }}
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
            <path d="m15 5 4 4"/>
          </svg>
        )}
      </div>
    </div>

    {selectedMatch?.id === match.id && (
      <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* TEAM A */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>{match.teamA}</span>
          <input
            type="number"
            value={match.scoreA || ""}
            onChange={(e) => {
              const val = e.target.value;
              setMatches(prev => prev.map(m =>
                m.id === match.id ? { ...m, scoreA: val } : m
              ));
            }}
            style={{ width: "70px" }}
          />
          <input
            type="number"
            value={match.oversA || "20"}
            onChange={(e) => {
              const val = e.target.value;
              setMatches(prev => prev.map(m =>
                m.id === match.id ? { ...m, oversA: val } : m
              ));
            }}
            style={{ width: "60px" }}
          />
          <span>ov</span>
        </div>
        {/* TEAM B */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>{match.teamB}</span>
          <input
            type="number"
            value={match.scoreB || ""}
            onChange={(e) => {
              const val = e.target.value;
              setMatches(prev => prev.map(m =>
                m.id === match.id ? { ...m, scoreB: val } : m
              ));
            }}
            style={{ width: "70px" }}
          />
          <input
            type="number"
            value={match.oversB || "20"}
            onChange={(e) => {
              const val = e.target.value;
              setMatches(prev => prev.map(m =>
                m.id === match.id ? { ...m, oversB: val } : m
              ));
            }}
            style={{ width: "60px" }}
          />
          <span>ov</span>
        </div>
      </div>
    )}
  </div>
))}
            </div>

            {/* TABLE */}
<div
  style={{
    flex: 1
  }}
>
  <h3 style={subHeading}>Simulated Table</h3>

  <table style={tableStyle}>
    <thead style={{ color: "#666", fontWeight: "400" }}>
      <tr>
        <th style={{ padding: "10px 8px" }}>#</th>
        <th style={{ padding: "10px 8px" }}>Team</th>
        <th style={{ padding: "10px 8px" }}>P</th>
        <th style={{ padding: "10px 8px" }}>W</th>
        <th style={{ padding: "10px 8px" }}>L</th>
        <th style={{ padding: "10px 8px" }}>Pts</th>
        <th style={{ padding: "10px 8px" }}>NRR</th>
      </tr>
    </thead>

    <tbody>
      {simulatedTable.map((team, i) => (
        <tr key={team.name} style={{ height: "60px" }}>
          <td style={{ padding: "10px 8px" }}>{i + 1}</td>
          <td style={{ textAlign: "left", padding: "10px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: teamData[team.name].color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px"
              }}>
                {teamData[team.name].short}
              </div>
              {team.name}
            </div>
          </td>
          <td style={{ padding: "10px 8px" }}>{team.played}</td>
          <td style={{ padding: "10px 8px" }}>{team.won}</td>
          <td style={{ padding: "10px 8px" }}>{team.lost}</td>
          <td style={{ padding: "10px 8px" }}>{team.points}</td>
          <td style={{ padding: "10px 8px" }}>{team.nrr}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>
          {/* FULL WIDTH POSITION HISTORY */}
          <div style={{ marginTop: "40px" }}>
            <h3 style={{ ...subHeading, fontWeight: "300", letterSpacing: "0.5px" }}>
              Points Table Evolution (Match-by-Match Positions)
            </h3>
            <div style={{ height: "450px", width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
                >
                  <XAxis
                    dataKey="match"
                    stroke="#888"
                    tick={{ fontSize: 12, fontWeight: 300 }}
                    tickFormatter={(val) => `M${val}`}
                    interval={4}
                  />
                  <YAxis
                    reversed
                    domain={[1, 10]}
                    stroke="#888"
                    tick={{ fontSize: 12, fontWeight: 300 }}
                    tickCount={10}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload) return null;

                      const sorted = [...payload].sort((a, b) => a.value - b.value);

                      return (
                        <div
                          style={{
                            background: "#111",
                            padding: "12px",
                            borderRadius: "10px",
                            color: "#fff"
                          }}
                        >
                          <div style={{ marginBottom: "8px", fontWeight: "600" }}>
                            After Match {label}
                          </div>

                          {sorted.map((entry, index) => (
                            <div key={entry.name} style={{ color: entry.color }}>
                              #{index + 1} : {entry.name}
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  {Object.keys(teamData).map(team => (
                    <Line
                      key={team}
                      type="linear"
                      dataKey={team}
                      stroke={teamData[team].color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "matches" && (
  <MatchList
    matches={matches}
    teamData={teamData}
    darkMode={darkMode}
    handleResult={handleResult}
    selectedMatch={selectedMatch}
    setSelectedMatch={setSelectedMatch}
    setMatches={setMatches}
  />
)}

      {activeTab === "venues" && (
        <div
          style={{
            ...card,
            background: darkMode ? "#111117" : "#ffffff",
            borderColor: darkMode ? "#1f1f2a" : "#ddd",
            color: darkMode ? "#ffffff" : "#111"
          }}
        >
          <h2>No venues data yet</h2>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const appStyle = {
  background: "#0b0b0f",
  minHeight: "100vh",
  padding: "30px",
  color: "white",
  fontFamily: "Inter, sans-serif"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const logoStyle = {
  fontWeight: "600",
  fontSize: "18px"
};
const menuStyle = (darkMode) => ({
  display: "flex",
  gap: "20px",
  color: darkMode ? "#aaa" : "#555"
});

const rightMenu = {
  display: "flex",
  gap: "10px",
  alignItems: "center"
};

const signInBtn = (darkMode) => ({
  padding: "10px 18px",
  borderRadius: "10px",
  border: "1px solid #ef4444",   // 🔴 RED BORDER (moon → now red)
  background: "transparent",

  color: darkMode ? "#ffffff" : "#000000",  // ⚪⚫ text switch

  fontWeight: "400",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.3s ease"
  
});

const tabsWrapper = {
  width: "100%",
  marginBottom: "25px"
};

const tabsContainer = {
  display: "flex",
  gap: "10px",
  background: "#0f0f15",
  padding: "8px",
  borderRadius: "20px",
  width: "100%"   // remove maxWidth
};

const tabBtn = {
  flex: 1,
  padding: "6px 12px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer"
};

const card = {
  borderRadius: "16px",
  padding: "25px",
  border: "1px solid",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  margin: "15px 0"
};

const btn = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "1px solid",
  cursor: "pointer"
};

const subHeading = {
  color: "#aaa",
  fontWeight: "300"
};

const matchCard = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px",
  borderRadius: "10px",
  background: "#ffffff",
  marginBottom: "10px",
  border: "1px solid #ddd"
};

const teamBtn = {
  marginLeft: "6px",
  padding: "6px 12px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 8px",
  textAlign: "center"
};

const teamCell = {
  paddingLeft: "12px",
  whiteSpace: "nowrap"
};
const pastMatches = [
  { teamA: "SRH", teamB: "RCB", result: "RCB", scoreA: 201, scoreB: 203, oversA: 20, oversB: 15 },
  { teamA: "KKR", teamB: "MI", result: "MI", scoreA: 220, scoreB: 224, oversA: 20, oversB: 19 },
  { teamA: "CSK", teamB: "RR", result: "RR", scoreA: 127, scoreB: 128, oversA: 19.4, oversB: 12 },
  { teamA: "GT", teamB: "PBKS", result: "PBKS", scoreA: 162, scoreB: 165, oversA: 20, oversB: 19 },
  { teamA: "LSG", teamB: "DC", result: "DC", scoreA: 141, scoreB: 145, oversA: 18, oversB: 17.1 },
  { teamA: "SRH", teamB: "KKR", result: "SRH", scoreA: 226, scoreB: 161, oversA: 20, oversB: 16 },
  { teamA: "CSK", teamB: "PBKS", result: "PBKS", scoreA: 209, scoreB: 210, oversA: 20, oversB: 18.4 },
  { teamA: "MI", teamB: "DC", result: "DC", scoreA: 162, scoreB: 164, oversA: 20, oversB: 18 },
  { teamA: "RR", teamB: "GT", result: "RR", scoreA: 210, scoreB: 204, oversA: 20, oversB: 20 },
  { teamA: "SRH", teamB: "LSG", result: "LSG", scoreA: 156, scoreB: 160, oversA: 20, oversB: 19.5 },
  { teamA: "RCB", teamB: "CSK", result: "RCB", scoreA: 250, scoreB: 207, oversA: 20, oversB: 19.4 },
  { teamA: "KKR", teamB: "PBKS", result: "NR", scoreA: 25, scoreB: 0, oversA: 3, oversB: 0 },
  { teamA: "RR", teamB: "MI", result: "RR", scoreA: 150, scoreB: 123, oversA: 11, oversB: 11 },
  { teamA: "GT", teamB: "DC", result: "GT", scoreA: 210, scoreB: 209, oversA: 20, oversB: 20 },
  { teamA: "CSK", teamB: "DC", result: "CSK", scoreA: 212, scoreB: 189, oversA: 20, oversB: 20 },
  { teamA: "SRH", teamB: "PBKS", result: "PBKS", scoreA: 219, scoreB: 223, oversA: 20, oversB: 18 },
  { teamA: "MI", teamB: "PBKS", result: "PBKS", scoreA: 195, scoreB: 198, oversA: 20, oversB: 16.3 },
  { teamA: "RCB", teamB: "RR", result: "RR", scoreA: 201, scoreB: 202, oversA: 20, oversB: 18 },
  { teamA: "RCB", teamB: "MI", result: "RCB", scoreA: 240, scoreB: 222, oversA: 20, oversB: 20 },
  { teamA: "LSG", teamB: "RCB", result: "RCB", scoreA: 146, scoreB: 149, oversA: 20, oversB: 15 }
];