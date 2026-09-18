const EVENT_DATA = {
  name: "AI Fusion 2026",
  tagline: "Multidisciplinary AI Innovation Hackathon",
  date: "30 September 2026",
  time: "9:00 AM — 4:30 PM",
  registrationFee: "₹500",
  teamSize: "4 Members",
  countdownTarget: "2026-09-30T09:00:00+05:30",
  registrationUrl: "https://forms.gle/dzrSLbb91cKUKD599",
  institution: "Tagore Institute of Engineering and Technology",
  address:
    "Deviyakurichi - 636 112, Thalaivasal (TK), Salem (DT), Tamil Nadu, India.",
  association: "iGeN Technologies, Chennai",
  contact: { name: "Mr. M. Suresh", phone: "+91 9865654274" },

  announcement: "Registrations are now open. Secure your team’s place before the deadline [25.10.2026].",
};
const NAV_DATA = [
  ["HOME", "home"],
  ["ABOUT", "about"],
  ["TRACKS", "tracks"],
  ["JOURNEY", "journey"],
  ["AWARDS", "awards"],
  ["LEADERSHIP", "leadership"],
  ["FAQ", "faq"],
  ["CONTACT", "contact"],
];
const TRACK_DATA = [
  [
    "Engineering & Technology",
    "Build intelligent systems for tomorrow’s world.",
    "⌘",
    ["Smart Campus", "AI Automation", "IoT + AI", "Robotics", "Cybersecurity"],
  ],
  [
    "Healthcare",
    "Design care that sees further and responds sooner.",
    "✚",
    [
      "AI Diagnostics",
      "Patient Monitoring",
      "Hospital Workflow",
      "Mental Health Support",
      "Drug Discovery",
    ],
  ],
  [
    "Agriculture",
    "Grow a more precise, resilient future.",
    "⌁",
    [
      "Smart Irrigation",
      "Crop Disease Detection",
      "Precision Farming",
      "Drone Applications",
    ],
  ],
  [
    "Commerce",
    "Make every decision smarter and safer.",
    "◈",
    ["Algorithm Dynamic", "Demand forcasting", "Revenue growth", "Customer Behavior Analysis", "Price Optimization"],
  ],
  [
    "Architecture",
    "Shape spaces that understand people.",
    "⌂",
    ["Parametric Facade Design","Smart Buildings Design", "Sustainable Design", "AI Space Planning", "Urban Planing"],
  ],
  [
    "Industry",
    "Bring intelligence to every process.",
    "⚙",
    [
      "Predictive Maintenance",
      "Process Automation",
      "Quality Inspection",
      "Supply Chain Optimization",
    
    ],
  ],
];
// Update this agenda manually as the event programme is confirmed.
// status accepts: "complete", "live", or "upcoming".
const TIMELINE_DATA = [
  ["09:00 AM", "Registration & Check-in", "complete", "Collect your badge, team kit and programme guide.", "Main Entrance"],
  ["10:00 AM", "Opening & Problem Brief", "upcoming", "Kick-off, challenge briefing and team formation.", "Seminar Hall"],
  ["11:00 AM", "Build Sprint Begins", "upcoming", "Turn your concept into a working AI prototype.", "Innovation Lab"],
  ["01:00 PM", "Mentor Checkpoint", "upcoming", "Get feedback on feasibility, impact and your demo plan.", "Innovation Lab"],
  ["02:30 PM", "Prototype Demo", "upcoming", "Validate your build before the final presentation.", "Demo Zone"],
  ["03:30 PM", "Final Presentations", "upcoming", "Pitch your solution to the jury panel.", "Seminar Hall"],
  ["04:00 PM", "Jury Deliberation", "upcoming", "Final scoring and selection of winning teams.", "Jury Room"],
  ["04:30 PM", "Awards & Closing", "upcoming", "Celebrate the teams and take the next step together.", "Seminar Hall"],
];
const AWARD_DATA = [
  "Overall champion-Team",
  "Runner-up",
  "Second Runner-up",
  "Best Engineering and Technology Solution",
  "Best Healthcare Solution",
  "Best Agriculture Solution",
  "Best Commerce Solution",
  "Best Architecture Solution",
  "Best Industry Solution",
  "Best UI/UX",

];
const MANAGEMENT_DATA = [
  ["President", "Mr. R. MUTHUSAMY", "assets/images/leaders/PRESIDENT.png"],
  ["Secretary", "Mr. S. R. MADESHWARAN", "assets/images/leaders/SECRETARY.jpg"],
  ["Treasurer", "Mr. P. KALIYANNAN", "assets/images/leaders/TREASURER.jpg"],
  ["Vice President", "Mr. P. KALIAPPAN", "assets/images/leaders/VICE-PRESIDENT-1.jpg"],
  ["Vice President", "Mr. C. RAVI", "assets/images/leaders/ravi.jpg"],
  ["Joint Secretary", "Mr. K. ARUNKUMAR", "assets/images/leaders/JOIN-SECRETARY-1.jpg"],
  ["Joint Secretary", "Mr. K. VASANTHA KUMAR", "assets/images/leaders/JOINT SECRETARY-2.jpg"],
  
];
const FAQ_DATA = [
  [
    "Who can participate?",
    "Students from eligible colleges are welcome to participate in AI Fusion 2026.",
  ],
  ["What is the recommended team size?", "Teams consist of 4 members."],
  ["What is the registration fee?", "The registration fee is ₹500 per team."],
  [
    "Can students from different disciplines participate?",
    "Yes. AI Fusion is multidisciplinary and encourages diverse teams.",
  ],
  [
    "What are the AI tracks?",
    "Engineering, Healthcare, Agriculture, Commerce, Architecture and Industry.",
  ],
  [
    "What happens during the hackathon?",
    "Teams move from idea formation to prototype, demo, final pitch and judging.",
  ],
  [
    "How are projects evaluated?",
    "Projects are evaluated by the jury during the final presentation and judging stages.",
  ],
  [
    "When will winners be announced?",
    "Winner announcements take place during the awards stage.",
  ],
];
