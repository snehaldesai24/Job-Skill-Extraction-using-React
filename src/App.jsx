
import { useState } from "react";
import "./App.css";

import jobDescriptions from "./data/jobDescriptions.json";

/* =========================================================
   SKILL CATEGORIES
========================================================= */

const SKILL_CATEGORIES = {
  Programming: [
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "C++",
    "C#",
    "PHP",
    "R",
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Node.js",
    "Vue.js",
    "Bootstrap",
    "Frontend Development",
    "Backend Development",
    "API",
  ],

  Database: [
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Oracle",
    "SQLite",
    "Database",
    "Database Design",
    "Relational Database",
    "Database Development",
    "Query Optimization",
  ],

  "BI & Analytics": [
    "Power BI",
    "Tableau",
    "Excel",
    "DAX",
    "Power Query",
    "Data Analysis",
    "Data Visualization",
    "Statistics",
    "Business Intelligence",
    "Reporting",
    "Dashboards",
    "Social Media Analytics",
  ],

  Cloud: [
    "AWS",
    "Azure",
    "Google Cloud",
    "GCP",
  ],

  "AI & Machine Learning": [
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
  ],

  NLP: [
    "NLP",
    "Natural Language Processing",
    "BERT",
    "Transformers",
    "spaCy",
    "NLTK",
  ],

  DevOps: [
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "Jenkins",
  ],

  Testing: [
    "Software Testing",
    "Quality Assurance",
    "Automation Testing",
    "Test Automation",
    "Test Scripts",
    "Testing Frameworks",
    "Bug Tracking",
    "Test Case Design",
  ],

  Networking: [
    "Networking",
    "Wireless Networking",
    "Network Troubleshooting",
    "Network Monitoring",
  ],

  Cybersecurity: [
    "Cybersecurity",
    "Network Security",
    "Data Security",
    "Threat Detection",
    "Incident Response",
    "Database Security",
  ],

  Marketing: [
    "Social Media",
    "Content Creation",
  ],

  "Data Engineering": [
    "Data Architecture",
    "Data Infrastructure",
    "Data Management",
  ],
};

/* =========================================================
   ALIASES
========================================================= */

const ALIASES = {
  python3: "Python",
  "python 3": "Python",
  "python programming": "Python",

  powerbi: "Power BI",
  "power bi": "Power BI",

  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",

  js: "JavaScript",

  ml: "Machine Learning",

  ai: "Artificial Intelligence",

  "natural language processing": "NLP",

  sklearn: "Scikit-learn",
  "scikit learn": "Scikit-learn",

  "front end": "Frontend Development",
  frontend: "Frontend Development",

  "back end": "Backend Development",
  backend: "Backend Development",

  "social media": "Social Media",
  "content creation": "Content Creation",
};

/* =========================================================
   JOB TITLE BASED SKILL SUGGESTIONS

   Example:
   Data Analyst
   ↓
   Power BI
   Python
   Tableau
   SQL
   Excel
========================================================= */

const JOB_TITLE_SKILLS = {
  "data analyst": [
    "Power BI",
    "Python",
    "Tableau",
    "SQL",
    "Excel",
    "Data Analysis",
    "Data Visualization",
    "Statistics",
    "Power Query",
    "Reporting",
    "Dashboards",
  ],

  "business analyst": [
    "SQL",
    "Excel",
    "Power BI",
    "Tableau",
    "Data Analysis",
    "Data Visualization",
    "Statistics",
    "Reporting",
    "Dashboards",
  ],

  "data scientist": [
    "Python",
    "SQL",
    "Machine Learning",
    "Statistics",
    "Data Analysis",
    "Data Visualization",
    "Scikit-learn",
  ],

  "power bi developer": [
    "Power BI",
    "DAX",
    "Power Query",
    "SQL",
    "Excel",
    "Data Analysis",
    "Data Visualization",
    "Reporting",
    "Dashboards",
  ],

  "bi developer": [
    "Power BI",
    "Tableau",
    "SQL",
    "DAX",
    "Power Query",
    "Excel",
    "Business Intelligence",
    "Data Analysis",
    "Reporting",
    "Dashboards",
  ],

  "software developer": [
    "Java",
    "Python",
    "JavaScript",
    "SQL",
    "Git",
    "GitHub",
    "API",
    "Software Testing",
  ],

  "frontend developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Angular",
    "Vue.js",
    "Bootstrap",
    "Frontend Development",
    "API",
  ],

  "backend developer": [
    "Java",
    "Python",
    "Node.js",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "API",
    "Backend Development",
    "Git",
  ],

  "full stack developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "MongoDB",
    "API",
    "Frontend Development",
    "Backend Development",
    "Git",
  ],

  "machine learning engineer": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "SQL",
    "Git",
  ],

  "nlp engineer": [
    "Python",
    "NLP",
    "Natural Language Processing",
    "BERT",
    "Transformers",
    "spaCy",
    "NLTK",
    "Machine Learning",
  ],

  "data engineer": [
    "Python",
    "SQL",
    "Data Architecture",
    "Data Infrastructure",
    "Data Management",
    "Database",
    "AWS",
    "Azure",
    "Git",
  ],

  "cloud engineer": [
    "AWS",
    "Azure",
    "Google Cloud",
    "GCP",
    "Docker",
    "Kubernetes",
    "Networking",
  ],

  "devops engineer": [
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "Jenkins",
    "AWS",
    "Azure",
  ],

  "software tester": [
    "Software Testing",
    "Quality Assurance",
    "Automation Testing",
    "Test Automation",
    "Test Scripts",
    "Testing Frameworks",
    "Bug Tracking",
    "Test Case Design",
  ],

  "qa engineer": [
    "Software Testing",
    "Quality Assurance",
    "Automation Testing",
    "Test Automation",
    "Test Scripts",
    "Testing Frameworks",
    "Bug Tracking",
    "Test Case Design",
  ],
};

/* =========================================================
   SAMPLE TEXT
========================================================= */

const SAMPLE_TEXT = `
Looking for a Data Analyst with strong experience in Python,
SQL, Power BI and Excel.

The candidate should have experience in data analysis,
data visualization, statistics and Power Query.

Knowledge of Tableau and Machine Learning is an additional advantage.
`;

/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/\be\.?g\.?,?\s*/gi, "")
    .replace(/[“”‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   ESCAPE REGEX
========================================================= */

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* =========================================================
   GET CATEGORY
========================================================= */

function getCategory(skill) {
  for (const [category, skills] of Object.entries(
    SKILL_CATEGORIES
  )) {
    if (
      skills.some(
        (item) =>
          item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      return category;
    }
  }

  return "Other";
}

/* =========================================================
   CHECK WHETHER TEXT CONTAINS SKILL
========================================================= */

function containsSkill(text, skill) {
  const escapedSkill = escapeRegex(
    skill.toLowerCase()
  );

  const pattern = new RegExp(
    `(^|[^a-zA-Z0-9+#])${escapedSkill}([^a-zA-Z0-9+#]|$)`,
    "i"
  );

  return pattern.test(text);
}

/* =========================================================
   GET SKILLS FROM JOB TITLE
========================================================= */

function getTitleSuggestions(text) {
  const normalized = normalizeText(text);
  const suggestions = [];

  Object.entries(JOB_TITLE_SKILLS).forEach(
    ([title, titleSkills]) => {
      const titlePattern = new RegExp(
        `(^|[^a-zA-Z0-9+#])${escapeRegex(
          title
        )}([^a-zA-Z0-9+#]|$)`,
        "i"
      );

      if (titlePattern.test(normalized)) {
        titleSkills.forEach((skill) => {
          if (!suggestions.includes(skill)) {
            suggestions.push(skill);
          }
        });
      }
    }
  );

  return suggestions;
}

/* =========================================================
   EXTRACT SKILLS
========================================================= */

function extractSkills(text) {
  if (!text.trim()) {
    return [];
  }

  const cleanedText = normalizeText(text);

  const jsonSkills = [];

  /* -----------------------------------------
     Skills from JSON dataset
  ----------------------------------------- */

  jobDescriptions.forEach((job) => {
    if (Array.isArray(job.skills)) {
      job.skills.forEach((skill) => {
        if (!jsonSkills.includes(skill)) {
          jsonSkills.push(skill);
        }
      });
    }
  });

  /* -----------------------------------------
     Skills from categories
  ----------------------------------------- */

  const categorySkills =
    Object.values(SKILL_CATEGORIES).flat();

  /* -----------------------------------------
     Combine all known skills
  ----------------------------------------- */

  const allSkills = [
    ...new Set([
      ...jsonSkills,
      ...categorySkills,
      ...Object.keys(ALIASES),
    ]),
  ];

  /* -----------------------------------------
     Longest skills first
  ----------------------------------------- */

  const sortedSkills = allSkills.sort(
    (a, b) => b.length - a.length
  );

  const detected = [];

  /* -----------------------------------------
     STEP 1
     Detect skills explicitly present
     in the entered text.
  ----------------------------------------- */

  sortedSkills.forEach((skill) => {
    if (containsSkill(cleanedText, skill)) {
      const canonical =
        ALIASES[skill.toLowerCase()] || skill;

      if (!detected.includes(canonical)) {
        detected.push(canonical);
      }
    }
  });

  /* -----------------------------------------
     STEP 2
     Detect job title.

     Example:
     "Data Analyst"

     Even though the user did not write
     Python / Power BI / Tableau etc.,
     the system adds the recommended
     skills for Data Analyst.
  ----------------------------------------- */

  const titleSuggestions =
    getTitleSuggestions(cleanedText);

  titleSuggestions.forEach((skill) => {
    if (!detected.includes(skill)) {
      detected.push(skill);
    }
  });

  return detected;
}

/* =========================================================
   GET CLASSIFICATION
========================================================= */

function getClassification(skills) {
  const result = {};

  skills.forEach((skill) => {
    result[skill] = getCategory(skill);
  });

  jobDescriptions.forEach((job) => {
    if (job.classification) {
      Object.entries(job.classification).forEach(
        ([skill, category]) => {
          if (
            skills.some(
              (detectedSkill) =>
                detectedSkill.toLowerCase() ===
                skill.toLowerCase()
            )
          ) {
            result[skill] = category;
          }
        }
      );
    }
  });

  return result;
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  /* =======================================================
     AUTHENTICATION STATE
  ======================================================= */

  const [isAuthenticated, setIsAuthenticated] =
    useState(
      () =>
        localStorage.getItem(
          "jobSkillExtractorAuth"
        ) === "true"
    );

  const [authMode, setAuthMode] =
    useState("login");

  /* =======================================================
     LOGIN FIELDS
  ======================================================= */

  const [loginEmail, setLoginEmail] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  /* =======================================================
     SIGNUP FIELDS
  ======================================================= */

  const [signupName, setSignupName] =
    useState("");

  const [signupEmail, setSignupEmail] =
    useState("");

  const [signupPassword, setSignupPassword] =
    useState("");

  const [
    signupConfirmPassword,
    setSignupConfirmPassword,
  ] = useState("");

  /* =======================================================
     AUTH ERROR / SUCCESS
  ======================================================= */

  const [authError, setAuthError] =
    useState("");

  const [authSuccess, setAuthSuccess] =
    useState("");

  /* =======================================================
     APP STATES
  ======================================================= */

  const [jobDescription, setJobDescription] =
    useState(SAMPLE_TEXT);

  const [skills, setSkills] = useState([]);

  const [darkMode, setDarkMode] =
    useState(false);

  const [activePage, setActivePage] =
    useState("extractor");

  const [loading, setLoading] =
    useState(false);

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleLogin = (e) => {
    e.preventDefault();

    setAuthError("");
    setAuthSuccess("");

    const email =
      loginEmail.trim().toLowerCase();

    if (!email || !loginPassword) {
      setAuthError(
        "Please enter your email and password."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setAuthError(
        "Please enter a valid email address."
      );
      return;
    }

    const storedUsers =
      JSON.parse(
        localStorage.getItem(
          "jobSkillExtractorUsers"
        )
      ) || [];

    const user = storedUsers.find(
      (item) =>
        item.email.toLowerCase() === email &&
        item.password === loginPassword
    );

    if (!user) {
      setAuthError(
        "Invalid email or password."
      );
      return;
    }

    localStorage.setItem(
      "jobSkillExtractorAuth",
      "true"
    );

    localStorage.setItem(
      "jobSkillExtractorCurrentUser",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    setIsAuthenticated(true);

    setLoginEmail("");
    setLoginPassword("");
    setAuthError("");
  };

  /* =======================================================
     SIGNUP
  ======================================================= */

  const handleSignup = (e) => {
    e.preventDefault();

    setAuthError("");
    setAuthSuccess("");

    const name = signupName.trim();

    const email =
      signupEmail.trim().toLowerCase();

    if (!name || !email || !signupPassword) {
      setAuthError(
        "Please fill in all required fields."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setAuthError(
        "Please enter a valid email address."
      );
      return;
    }

    if (signupPassword.length < 6) {
      setAuthError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      signupPassword !==
      signupConfirmPassword
    ) {
      setAuthError(
        "Passwords do not match."
      );
      return;
    }

    const storedUsers =
      JSON.parse(
        localStorage.getItem(
          "jobSkillExtractorUsers"
        )
      ) || [];

    const existingUser = storedUsers.find(
      (item) =>
        item.email.toLowerCase() === email
    );

    if (existingUser) {
      setAuthError(
        "An account with this email already exists."
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: signupPassword,
    };

    const updatedUsers = [
      ...storedUsers,
      newUser,
    ];

    localStorage.setItem(
      "jobSkillExtractorUsers",
      JSON.stringify(updatedUsers)
    );

    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");

    setAuthMode("login");

    setAuthSuccess(
      "Account created successfully. Please login."
    );
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "jobSkillExtractorAuth"
    );

    localStorage.removeItem(
      "jobSkillExtractorCurrentUser"
    );

    setIsAuthenticated(false);

    setLoginEmail("");
    setLoginPassword("");

    setAuthMode("login");
    setAuthError("");
    setAuthSuccess("");
  };

  /* =======================================================
     LOGIN / SIGNUP PAGE
  ======================================================= */

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="login-logo">
            🎯
          </div>

          <h1>
            Job Skill Extractor
          </h1>

          <p className="login-subtitle">
            NLP-Powered Skill Extraction &
            Classification
          </p>

          <div className="auth-tabs">

            <button
              type="button"
              className={
                authMode === "login"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
                setAuthSuccess("");
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={
                authMode === "signup"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() => {
                setAuthMode("signup");
                setAuthError("");
                setAuthSuccess("");
              }}
            >
              Sign Up
            </button>

          </div>

          {authError && (
            <div className="login-error">
              ⚠️ {authError}
            </div>
          )}

          {authSuccess && (
            <div className="login-success">
              ✅ {authSuccess}
            </div>
          )}

          {/* LOGIN FORM */}

          {authMode === "login" && (
            <form onSubmit={handleLogin}>

              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(
                    e.target.value
                  )
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="submit"
                className="login-button"
              >
                🔐 Login
              </button>

              <p className="auth-switch">
                Don't have an account?

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthError("");
                    setAuthSuccess("");
                  }}
                >
                  Create Account
                </button>
              </p>

            </form>
          )}

          {/* SIGNUP FORM */}

          {authMode === "signup" && (
            <form onSubmit={handleSignup}>

              <label htmlFor="signup-name">
                Full Name
              </label>

              <input
                id="signup-name"
                type="text"
                value={signupName}
                onChange={(e) =>
                  setSignupName(e.target.value)
                }
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />

              <label htmlFor="signup-email">
                Email Address
              </label>

              <input
                id="signup-email"
                type="email"
                value={signupEmail}
                onChange={(e) =>
                  setSignupEmail(
                    e.target.value
                  )
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

              <label htmlFor="signup-password">
                Password
              </label>

              <input
                id="signup-password"
                type="password"
                value={signupPassword}
                onChange={(e) =>
                  setSignupPassword(
                    e.target.value
                  )
                }
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                required
              />

              <label htmlFor="signup-confirm-password">
                Confirm Password
              </label>

              <input
                id="signup-confirm-password"
                type="password"
                value={
                  signupConfirmPassword
                }
                onChange={(e) =>
                  setSignupConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />

              <button
                type="submit"
                className="login-button"
              >
                🚀 Create Account
              </button>

              <p className="auth-switch">
                Already have an account?

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                    setAuthSuccess("");
                  }}
                >
                  Login
                </button>
              </p>

            </form>
          )}

        </div>
      </div>
    );
  }

  /* =======================================================
     EXTRACT
  ======================================================= */

  const handleExtract = () => {
    if (!jobDescription.trim()) {
      alert(
        "Please enter a job description or job title."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result =
        extractSkills(jobDescription);

      setSkills(result);
      setLoading(false);
    }, 500);
  };

  /* =======================================================
     CLEAR
  ======================================================= */

  const handleClear = () => {
    setJobDescription("");
    setSkills([]);
  };

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = [
    ...new Set(
      skills.map((skill) =>
        getCategory(skill)
      )
    ),
  ];

  /* =======================================================
     WORD COUNT
  ======================================================= */

  const wordCount =
    jobDescription.trim()
      ? jobDescription
          .trim()
          .split(/\s+/)
          .filter(Boolean).length
      : 0;

  /* =======================================================
     MATCH SCORE
  ======================================================= */

  const matchScore =
    skills.length === 0
      ? 0
      : Math.min(
          100,
          60 + skills.length * 5
        );

  /* =======================================================
     CATEGORY COUNT
  ======================================================= */

  const categoryCount = {};

  skills.forEach((skill) => {
    const category =
      getCategory(skill);

    categoryCount[category] =
      (categoryCount[category] || 0) + 1;
  });

  /* =======================================================
     CLASSIFICATION
  ======================================================= */

  const classification =
    getClassification(skills);

  /* =======================================================
     CURRENT USER
  ======================================================= */

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "jobSkillExtractorCurrentUser"
      )
    ) || {
      name: "User",
      email: "",
    };

  /* =======================================================
     DASHBOARD
  ======================================================= */

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            🎯
          </div>

          <div>
            <h2>Skills</h2>

            <span>
              Job Skill Extractor
            </span>
          </div>

        </div>

        <div className="nav">

          <button
            className={
              activePage === "extractor"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage(
                "extractor"
              )
            }
          >
            <span>🔍</span>
            Skill Extractor
          </button>

          <button
            className={
              activePage === "analytics"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage(
                "analytics"
              )
            }
          >
            <span>📊</span>
            Analytics
          </button>

          <button
            className={
              activePage === "about"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setActivePage(
                "about"
              )
            }
          >
            <span>ℹ️</span>
            About Project
          </button>

        </div>

        <div className="sidebar-bottom">

          <div className="dataset-status">

            <div className="status-dot"></div>

            <div>
              <strong>
                Dataset Connected
              </strong>

              <small>
                jobDescriptions.json
              </small>
            </div>

          </div>

          <button
            className="theme-button"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="main">

        {/* HEADER */}

        <header className="topbar">

          <div>

            <h1>
              Job Skill Extractor
            </h1>

            <p className="subtitle">
              Extract and categorize
              technical skills from job
              descriptions instantly.
            </p>

          </div>

          <div className="user-area">

            <div className="user-info">

              <div className="user-avatar">
                {currentUser.name
                  ? currentUser.name
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </div>

              <div className="user-details">

                <strong>
                  {currentUser.name}
                </strong>

                <small>
                  {currentUser.email}
                </small>

              </div>

            </div>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </header>

        {/* =================================================
            EXTRACTOR PAGE
        ================================================= */}

        {activePage === "extractor" && (
          <>

            <section className="card input-card">

              <div className="card-header">

                <div>

                  <h2>
                    Job Description
                  </h2>

                  <p>
                    Paste a job description
                    or enter a job title
                    to identify relevant
                    technical skills.
                  </p>

                </div>

              </div>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                placeholder="Example: Data Analyst"
              />

              <div className="input-footer">

                <span>
                  {wordCount} words
                </span>

                <div className="actions">

                  <button
                    className="secondary-button"
                    onClick={handleClear}
                  >
                    Clear
                  </button>

                  <button
                    className="primary-button"
                    onClick={handleExtract}
                  >
                    {loading
                      ? "Analyzing..."
                      : "🔍 Extract Skills"}
                  </button>

                </div>

              </div>

            </section>

            {/* KPI */}

            <section className="kpi-grid">

              <div className="kpi">

                <div className="kpi-icon blue">
                  🎯
                </div>

                <div>
                  <span>
                    Skills Detected
                  </span>

                  <strong>
                    {skills.length}
                  </strong>
                </div>

              </div>

              <div className="kpi">

                <div className="kpi-icon purple">
                  📂
                </div>

                <div>
                  <span>
                    Categories
                  </span>

                  <strong>
                    {categories.length}
                  </strong>
                </div>

              </div>

              <div className="kpi">

                <div className="kpi-icon green">
                  📝
                </div>

                <div>
                  <span>
                    Words Analyzed
                  </span>

                  <strong>
                    {wordCount}
                  </strong>
                </div>

              </div>

              <div className="kpi">

                <div className="kpi-icon orange">
                  ⚡
                </div>

                <div>
                  <span>
                    Match Score
                  </span>

                  <strong>
                    {matchScore}%
                  </strong>
                </div>

              </div>

            </section>

            {/* RESULT GRID */}

            <section className="result-grid">

              {/* DETECTED SKILLS */}

              <div className="card">

                <div className="card-header">

                  <div>

                    <h2>
                      Detected Skills
                    </h2>

                    <p>
                      Normalized skills
                      identified from the
                      job description or
                      job title.
                    </p>

                  </div>

                  <span className="count-badge">
                    {skills.length}
                  </span>

                </div>

                {skills.length === 0 ? (

                  <div className="empty">

                    <div className="empty-icon">
                      🔍
                    </div>

                    <h3>
                      No skills detected
                    </h3>

                    <p>
                      Enter a job title or
                      description and
                      click Extract Skills.
                    </p>

                  </div>

                ) : (

                  <div className="skills">

                    {skills.map((skill) => (

                      <div
                        className="skill"
                        key={skill}
                      >
                        ✓ {skill}
                      </div>

                    ))}

                  </div>

                )}

              </div>

              {/* CATEGORIES */}

              <div className="card">

                <div className="card-header">

                  <div>

                    <h2>
                      Skill Categories
                    </h2>

                    <p>
                      Technology
                      classification.
                    </p>

                  </div>

                </div>

                {skills.length === 0 ? (

                  <div className="empty small">

                    <div className="empty-icon">
                      📊
                    </div>

                    <p>
                      Category analysis
                      will appear here.
                    </p>

                  </div>

                ) : (

                  <div className="category-list">

                    {Object.entries(
                      categoryCount
                    ).map(
                      ([category, count]) => (

                        <div
                          className="category-row"
                          key={category}
                        >

                          <div className="category-name">

                            <span className="category-dot">
                              ●
                            </span>

                            {category}

                          </div>

                          <div className="category-count">
                            {count}
                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            </section>

            {/* CLASSIFICATION */}

            <section className="card">

              <div className="card-header">

                <div>

                  <h2>
                    Skill Classification
                  </h2>

                  <p>
                    Detected technologies
                    mapped to their
                    categories.
                  </p>

                </div>

              </div>

              {skills.length > 0 ? (

                <div className="table-wrapper">

                  <table>

                    <thead>

                      <tr>
                        <th>#</th>
                        <th>Skill</th>
                        <th>Category</th>
                        <th>Status</th>
                      </tr>

                    </thead>

                    <tbody>

                      {skills.map(
                        (skill, index) => (

                          <tr key={skill}>

                            <td>
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </td>

                            <td>
                              <strong>
                                {skill}
                              </strong>
                            </td>

                            <td>

                              <span className="category-tag">

                                {classification[
                                  skill
                                ] ||
                                  getCategory(
                                    skill
                                  )}

                              </span>

                            </td>

                            <td>

                              <span className="detected">
                                ✓ Detected
                              </span>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              ) : (

                <div className="table-empty">
                  Run skill extraction to
                  see results.
                </div>

              )}

            </section>

            {/* RECOMMENDATIONS */}

            {skills.length > 0 && (

              <section className="card recommendations">

                <div className="card-header">

                  <div>

                    <h2>
                      💡 Technology
                      Recommendations
                    </h2>

                    <p>
                      Technologies related
                      to the detected skill
                      set.
                    </p>

                  </div>

                </div>

                <div className="recommendation-grid">

                  {skills.includes("Python") && (

                    <div className="recommendation">

                      <span>🐍</span>

                      <div>

                        <strong>
                          Python Ecosystem
                        </strong>

                        <small>
                          Pandas • NumPy •
                          Matplotlib
                        </small>

                      </div>

                    </div>

                  )}

                  {skills.includes("SQL") && (

                    <div className="recommendation">

                      <span>🗄️</span>

                      <div>

                        <strong>
                          Database
                        </strong>

                        <small>
                          MySQL • PostgreSQL •
                          SQL Server
                        </small>

                      </div>

                    </div>

                  )}

                  {skills.includes("Power BI") && (

                    <div className="recommendation">

                      <span>📊</span>

                      <div>

                        <strong>
                          Power BI Stack
                        </strong>

                        <small>
                          DAX • Power Query •
                          Data Modeling
                        </small>

                      </div>

                    </div>

                  )}

                  {skills.includes(
                    "Machine Learning"
                  ) && (

                    <div className="recommendation">

                      <span>🤖</span>

                      <div>

                        <strong>
                          Machine Learning
                        </strong>

                        <small>
                          Scikit-learn •
                          Pandas • NumPy
                        </small>

                      </div>

                    </div>

                  )}

                  {skills.includes("Tableau") && (

                    <div className="recommendation">

                      <span>📈</span>

                      <div>

                        <strong>
                          Visualization
                        </strong>

                        <small>
                          Tableau • Dashboards •
                          Data Visualization
                        </small>

                      </div>

                    </div>

                  )}

                </div>

              </section>

            )}

          </>
        )}

        {/* =================================================
            ANALYTICS
        ================================================= */}

        {activePage === "analytics" && (

          <section>

            <div className="page-title">

              <p className="eyebrow">
                DATA INSIGHTS
              </p>

              <h2>
                Skill Analytics
              </h2>

              <p>
                Analyze the skills detected
                from the current job
                description or title.
              </p>

            </div>

            <div className="analytics-grid">

              {Object.entries(
                categoryCount
              ).map(
                ([category, count]) => {

                  const percentage =
                    skills.length
                      ? Math.round(
                          (count /
                            skills.length) *
                            100
                        )
                      : 0;

                  return (

                    <div
                      className="analytics-card"
                      key={category}
                    >

                      <div className="analytics-top">

                        <strong>
                          {category}
                        </strong>

                        <span>
                          {count} skills
                        </span>

                      </div>

                      <div className="progress">

                        <div
                          className="progress-bar"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>

                      </div>

                      <small>
                        {percentage}% of
                        detected skills
                      </small>

                    </div>

                  );
                }
              )}

            </div>

            {skills.length === 0 && (

              <div className="analytics-empty">

                <div>
                  📊
                </div>

                <h3>
                  No analytics available
                </h3>

                <p>
                  Extract skills first to
                  generate analytics.
                </p>

              </div>

            )}

          </section>

        )}

        {/* =================================================
            ABOUT
        ================================================= */}

        {activePage === "about" && (

          <section className="about">

            <div className="about-hero">

              <div className="about-icon">
                🎯
              </div>

              <h2>
                Job Skill Extraction
                using NLP
              </h2>

              <p>
                An NLP-based system designed
                to identify, normalize and
                categorize technical skills
                from job descriptions and
                infer relevant skills from
                recognized job titles.
              </p>

            </div>

            <div className="about-grid">

              <div className="about-card">

                <span>01</span>

                <h3>
                  Input
                </h3>

                <p>
                  User provides a job
                  description or job title.
                </p>

              </div>

              <div className="about-card">

                <span>02</span>

                <h3>
                  Preprocessing
                </h3>

                <p>
                  Text is cleaned and
                  normalized.
                </p>

              </div>

              <div className="about-card">

                <span>03</span>

                <h3>
                  Extraction
                </h3>

                <p>
                  Technical skills are
                  identified using the
                  JSON skill dictionary.
                </p>

              </div>

              <div className="about-card">

                <span>04</span>

                <h3>
                  Title Matching
                </h3>

                <p>
                  Recognized job titles are
                  mapped to relevant skills.
                </p>

              </div>

              <div className="about-card">

                <span>05</span>

                <h3>
                  Classification
                </h3>

                <p>
                  Skills are mapped to
                  categories.
                </p>

              </div>

            </div>

            <div className="technology-box">

              <h3>
                Technology Stack
              </h3>

              <div className="tech-list">

                <span>React.js</span>
                <span>JavaScript</span>
                <span>HTML5</span>
                <span>CSS3</span>
                <span>NLP</span>
                <span>Python</span>
                <span>Pandas</span>
                <span>Machine Learning</span>
                <span>JSON</span>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default App;
