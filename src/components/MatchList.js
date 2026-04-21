import { useState } from "react";

export default function MatchList({ matches, teamData, darkMode }) {
  const [activeTab, setActiveTab] = useState("fixtures");
  const [selectedTeam, setSelectedTeam] = useState("ALL");

  // ❌ remove GT & KKR
  const filteredMatches = matches;

  // split
  const fixtures = filteredMatches.filter(m => !m.result);
  const results = filteredMatches.filter(m => m.result);

  // 📍 venue mapping
  const venueMap = {
    RCB: "Bengaluru",
    DC: "Delhi",
    CSK: "Chennai",
    SRH: "Hyderabad",
    PBKS: "New Chandigarh",
    RR: "Jaipur",
    LSG: "Lucknow",
    MI: "Mumbai"
  };

  // 🎯 team filter options
  const teamOptions = [
    "ALL",
    "RCB",
    "MI",
    "CSK",
    "SRH",
    "DC",
    "PBKS",
    "RR",
    "LSG"
  ];

  const baseMatches = activeTab === "fixtures" ? fixtures : results;

  const displayMatches = selectedTeam === "ALL"
    ? baseMatches
    : baseMatches.filter(
        m => m.teamA === selectedTeam || m.teamB === selectedTeam
      );

  // 📅 schedule mapping (YOUR DATA)
 const scheduleMap = {
  26: { date: "Apr 18", time: "3:30 PM" },
  27: { date: "Apr 18", time: "7:30 PM" },
  28: { date: "Apr 19", time: "3:30 PM" },
  29: { date: "Apr 19", time: "7:30 PM" },
  30: { date: "Apr 20", time: "7:30 PM" },
  31: { date: "Apr 21", time: "7:30 PM" },
  32: { date: "Apr 22", time: "7:30 PM" },
  33: { date: "Apr 23", time: "7:30 PM" },
  34: { date: "Apr 24", time: "7:30 PM" },
  35: { date: "Apr 25", time: "3:30 PM" },
  36: { date: "Apr 25", time: "7:30 PM" },
  37: { date: "Apr 26", time: "3:30 PM" },
  38: { date: "Apr 26", time: "7:30 PM" },
  39: { date: "Apr 27", time: "7:30 PM" },
  40: { date: "Apr 28", time: "7:30 PM" },
  41: { date: "Apr 29", time: "7:30 PM" },
  42: { date: "Apr 30", time: "7:30 PM" },
  43: { date: "May 1", time: "7:30 PM" },
  44: { date: "May 2", time: "7:30 PM" },
  45: { date: "May 3", time: "3:30 PM" },
  46: { date: "May 3", time: "7:30 PM" },
  47: { date: "May 4", time: "7:30 PM" },
  48: { date: "May 5", time: "7:30 PM" },
  49: { date: "May 6", time: "7:30 PM" },
  50: { date: "May 7", time: "7:30 PM" },
  51: { date: "May 8", time: "7:30 PM" },
  52: { date: "May 9", time: "7:30 PM" },
  53: { date: "May 10", time: "3:30 PM" },
  54: { date: "May 10", time: "7:30 PM" },
  55: { date: "May 11", time: "7:30 PM" },
  56: { date: "May 12", time: "7:30 PM" },
  57: { date: "May 13", time: "7:30 PM" },
  58: { date: "May 14", time: "7:30 PM" },
  59: { date: "May 15", time: "7:30 PM" },
  60: { date: "May 16", time: "7:30 PM" },
  61: { date: "May 17", time: "3:30 PM" },
  62: { date: "May 17", time: "7:30 PM" },
  63: { date: "May 18", time: "7:30 PM" },
  64: { date: "May 19", time: "7:30 PM" },
  65: { date: "May 20", time: "7:30 PM" },
  66: { date: "May 21", time: "7:30 PM" },
  67: { date: "May 22", time: "7:30 PM" },
  68: { date: "May 23", time: "7:30 PM" },
  69: { date: "May 24", time: "3:30 PM" },
  70: { date: "May 24", time: "7:30 PM" }
};

  return (
    <div>
      {/* HEADER */}
      <h1 style={{ fontSize: "26px", marginBottom: "8px" }}>Matches</h1>
      <p style={{ color: "#888", marginBottom: "20px" }}>
        Live scores, upcoming fixtures, and completed results
      </p>

      {/* TABS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["fixtures", "results"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: activeTab === tab ? "#6366f1" : "#1a1a22",
              color: "#fff"
            }}
          >
            {tab === "fixtures" ? "Fixtures" : "Results"}
          </button>
        ))}
      </div>

      {/* TEAM FILTER */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        {teamOptions.map(team => (
          <button
            key={team}
            onClick={() => setSelectedTeam(team)}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background:
                selectedTeam === team
                  ? "#ef4444"
                  : "#1a1a22",
              color: "#fff",
              fontSize: "12px"
            }}
          >
            {team}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",          
gap: "24px"
        }}
      >
        {displayMatches.map(match => {
          const venue =
            match.venue || venueMap[match.teamA] || "India";

          const schedule = scheduleMap[match.id] || {};
          const date = schedule.date || "TBD";
          const time = schedule.time || "TBD";

          return (
            <div
              key={match.id}
              style={{
                background: "#111117",
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid #1f1f2a",
                transition: "0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* TOP */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#888",
                  marginBottom: "10px"
                }}
              >
                IPL 2026 •{" "}
                {activeTab === "fixtures" ? "Upcoming" : "Result"}
              </div>

              {/* TEAMS */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {/* TEAM A */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: teamData[match.teamA]?.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff"
                  }}
                >
                  {match.teamA}
                </div>

                <span style={{ color: "#888" }}>VS</span>

                {/* TEAM B */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: teamData[match.teamB]?.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff"
                  }}
                >
                  {match.teamB}
                </div>
              </div>

              {/* DATE + VENUE */}
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  color: "#aaa"
                }}
              >
                {date} • {time} • {venue}
              </div>

              {/* RESULT */}
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#ccc"
                }}
              >
                {match.result
                  ? `Winner: ${match.result}`
                  : "Match yet to be played"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}