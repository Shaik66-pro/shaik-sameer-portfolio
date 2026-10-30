export const personalInfo = {
  name: "Shaik Sameer",
  firstName: "SAMEER",
  lastName: "SHAIK",
  role: "Python Full Stack Developer",
  headline: "Building Digital Experiences That Solve Real-World Problems.",
  description:
    "I am a Python Full Stack Developer passionate about building scalable web applications, developing backend systems and creating intuitive user experiences.",
  email: "sameernawab66@gmail.com",
  phone: "+91 8367078316",
  location: "Hyderabad, Telangana, India",
  college: "MLR Institute of Technology, Hyderabad",
  degree: "B.Tech in Electronics and Communication Engineering",
  graduationYear: "2025",
  timeline: "2021 – 2025",
  linkedin: "https://www.linkedin.com/in/shaik-sameer-401953301/",
  github: "https://github.com/Shaik66-pro",
  resumeUrl: "/Shaik_Sameer_Resume.pdf",
  profileImage: "/sameer_profile.jpg",
  primaryLanguage: "PYTHON",
  establishedYear: "2026",
};

export const professionalInterests = [
  "Python Full Stack Development",
  "Backend Development",
  "REST API Development",
  "Database Management",
  "Frontend Development",
  "Web Application Development",
];

export const skillsData = {
  programmingLanguages: [
    { name: "Python", category: "Core", primary: true, level: "Advanced" },
    { name: "JavaScript", category: "Core", primary: false, level: "Proficient" },
    { name: "SQL", category: "Core", primary: false, level: "Proficient" },
  ],
  frontend: [
    { name: "HTML5", category: "Markup" },
    { name: "CSS3", category: "Styling" },
    { name: "JavaScript", category: "Core Scripting" },
    { name: "React.js", category: "UI Library" },
    { name: "Responsive Web Design", category: "UX" },
  ],
  backend: [
    { name: "Python", category: "Core Language" },
    { name: "FastAPI", category: "Modern High-Performance APIs" },
    { name: "Flask", category: "Microframework" },
    { name: "Django", category: "Full-Featured Framework" },
    { name: "REST API Development", category: "Architecture" },
    { name: "JWT Authentication", category: "Security" },
  ],
  database: [
    { name: "MySQL", category: "Relational RDBMS" },
    { name: "SQLite", category: "Embedded DB" },
    { name: "SQL Queries", category: "Data Manipulation" },
    { name: "Database Design", category: "Schema & Normalization" },
  ],
  tools: [
    { name: "Git", category: "Version Control" },
    { name: "GitHub", category: "Code Collaboration" },
    { name: "VS Code", category: "IDE" },
    { name: "Postman", category: "API Testing & Mocking" },
    { name: "Swagger / OpenAPI", category: "API Documentation" },
  ],
};

export const frontendProjects = [
  {
    id: "fe-01",
    number: "01",
    title: "Business Analytics Dashboard",
    category: "FRONTEND SYSTEM — ANALYTICS",
    problem:
      "Businesses need a clear and interactive way to understand sales, customer behavior and revenue trends without complex spreadsheets.",
    features: [
      "Interactive analytics dashboard with dynamic key metrics",
      "Real-time revenue charts and conversion visualizers",
      "Detailed sales breakdown reports by category & timeline",
      "Multi-parameter search, date range and category filtering",
      "Responsive, touch-friendly dark/light compatible UI",
    ],
    technologies: ["React.js", "JavaScript", "CSS3", "Chart.js"],
    status: "In Progress",
    accentColor: "#E4FF1A",
    demoNote: "Under active frontend development and optimization.",
  },
  {
    id: "fe-02",
    number: "02",
    title: "Smart Food Ordering Platform",
    category: "FRONTEND SYSTEM — E-COMMERCE",
    problem:
      "Customers need an effortless way to discover local restaurants, browse digital menus, customize items and track delivery orders in real time.",
    features: [
      "Dynamic restaurant listings with rating and distance indicators",
      "Interactive cuisine categories and instant search filtering",
      "Real-time shopping cart with item customizations & notes",
      "Streamlined multi-step checkout and order summary",
      "Interactive live order tracking interface with milestone stages",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
    status: "In Progress",
    accentColor: "#FF5733",
    demoNote: "Interactive UI layout and state management in active refinement.",
  },
  {
    id: "fe-03",
    number: "03",
    title: "Job Recruitment Portal UI",
    category: "FRONTEND SYSTEM — PRODUCTIVITY",
    problem:
      "Job seekers need an accessible, transparent platform to search curated job openings, evaluate role matches, and seamlessly track application stages.",
    features: [
      "Fast keyword, location and role-type job search",
      "Refined filters for salary ranges, experience, and remote status",
      "Comprehensive candidate dashboard with applied jobs overview",
      "Drag-and-drop resume upload interface with format verification",
      "Real-time application status tracker with review stages",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
    status: "In Progress",
    accentColor: "#38BDF8",
    demoNote: "User interface workflow & candidate dashboard being finalized.",
  },
];

export const fullstackProjects = [
  {
    id: "fs-01",
    number: "01",
    title: "Smart Inventory & Warehouse Management System",
    category: "ENTERPRISE BACKEND + UI",
    backend: "Python + FastAPI",
    frontend: "React.js",
    database: "MySQL",
    architecture: "High-throughput asynchronous REST API with JWT security and relational indexing.",
    problem:
      "Warehouses struggle with stock discrepancies, manual reordering delays, and lack of visibility into inventory movement across supplier channels.",
    features: [
      "Secure user authentication with JWT token lifecycle",
      "Granular role-based access control (Admin, Warehouse Manager, Clerk)",
      "Centralized product catalog management with SKU generation",
      "Real-time multi-bin inventory tracking across storage locations",
      "Automatic low-stock threshold triggers and supplier restock alerts",
      "Complete supplier management and purchase order processing",
      "Detailed audit logs for every inward/outward stock movement",
      "Executive dashboard analytics visualizing inventory turnover",
      "Comprehensive REST API integration with OpenAPI documentation",
    ],
    technologies: ["Python", "FastAPI", "MySQL", "React.js", "REST APIs", "JWT"],
    status: "In Progress",
    accentColor: "#E4FF1A",
  },
  {
    id: "fs-02",
    number: "02",
    title: "Healthcare Appointment & Patient Management System",
    category: "HEALTHCARE ARCHITECTURE",
    backend: "Python + Django",
    frontend: "React.js",
    database: "MySQL",
    architecture: "Relational healthcare model with atomic database transactions and strict doctor-patient data partitioning.",
    problem:
      "Clinics face scheduling overlaps, high patient no-show rates, and fragmented medical record keeping across paper charts.",
    features: [
      "Streamlined digital patient registration and profile management",
      "Doctor specialty profiles, consultation fees, and schedule setup",
      "Interactive appointment booking with clash-free time slot selector",
      "Doctor availability management with holiday/shift controls",
      "Self-service patient appointment cancellation and rescheduling",
      "Encrypted patient medical records and visit consultation notes",
      "Role-based authentication isolating patient records from unverified staff",
      "Comprehensive hospital admin dashboard for appointments and metrics",
    ],
    technologies: ["Python", "Django", "MySQL", "React.js", "REST APIs"],
    status: "In Progress",
    accentColor: "#10B981",
  },
  {
    id: "fs-03",
    number: "03",
    title: "Logistics & Shipment Tracking System",
    category: "SUPPLY CHAIN BACKEND",
    backend: "Python + Flask",
    frontend: "React.js",
    database: "MySQL",
    architecture: "Event-driven shipment status state machine with relational dispatch logging and REST dispatch endpoints.",
    problem:
      "Logistics coordinators lack unified status tracking across dispatch hubs, leading to lost packages and delayed delivery updates.",
    features: [
      "Instant shipment consignment creation with barcode/waybill assignment",
      "Dynamic driver and vehicle allocation based on route optimization",
      "Real-time delivery status updates across transit hubs",
      "Public shipment tracking portal for recipients with milestone stages",
      "Archived historical delivery log with timestamps and signatures",
      "Comprehensive operations admin dashboard for fleet supervision",
      "Clean REST API integration designed for mobile courier scanner handoffs",
    ],
    technologies: ["Python", "Flask", "MySQL", "React.js", "REST APIs"],
    status: "In Progress",
    accentColor: "#F59E0B",
  },
];

export const experienceData = [
  {
    company: "Polmon Instruments Pvt. Ltd.",
    department: "Automation",
    role: "Application Development Associate / Trainee",
    period: "2024 – 2025",
    type: "Industry Internship & Industrial Automation",
    location: "Hyderabad, India",
    highlights: [
      "Worked extensively with ProLeiT Plant iT MES/HMI systems for pharmaceutical and process industries.",
      "Engineered process design workflows and automated control sequences for industrial automation.",
      "Integrated and queried MySQL relational databases for production batch logging and historical parameter tracking.",
      "Developed and debugged JavaScript logic and PLC Structured Text (ST) logic for machine sequencing.",
      "Performed rigorous system validations, unit testing, and software verification protocols.",
      "Diagnosed alarm limits, system exceptions, and hardware/software communication troubleshooting.",
      "Participated actively in live on-site industrial plant deployment activities and commissioning runs.",
      "Collaborated smoothly within an agile 4-member cross-functional engineering team.",
    ],
    tags: ["Plant iT MES", "Process Design", "MySQL", "JavaScript", "PLC Structured Text", "Testing", "Commissioning"],
  },
];

export const achievementsData = [
  {
    id: "ach-1",
    stat: "1ST",
    title: "1st Place — National-Level Robotics Competition",
    organization: "Srinidhi Institute of Technology (SNIST)",
    description:
      "Secured First Place among dozens of competing national teams by designing and programming an autonomous robotic system with Python-based logic and precision sensor integration.",
    highlight: true,
  },
  {
    id: "ach-2",
    stat: "IBS",
    title: "Robotics Competition Distinction",
    organization: "ICFAI Business School (IBS)",
    description:
      "Demonstrated excellence in competitive robotics engineering and technical problem solving under time-constrained competition parameters.",
    highlight: false,
  },
  {
    id: "ach-3",
    stat: "85+",
    title: "Department Coordinator & Technical Lead",
    organization: "Student Technical Club / MLRIT",
    description:
      "Spearheaded leadership for an 85+ member student team, organizing campus-wide engineering symposiums, coding hackathons, and cross-department technical workshops.",
    highlight: true,
  },
];

export const certificationsData = [
  {
    id: "cert-1",
    title: "Python Programming Fundamentals",
    issuer: "Infosys Springboard",
    category: "Python",
    verified: true,
    description:
      "Comprehensive certification covering Python syntax, object-oriented programming (OOP), data structures, algorithms, and core application design principles.",
    tag: "INFOSYS",
  },
  {
    id: "cert-2",
    title: "National Robotics Workshop & Competition",
    issuer: "Srinidhi Institute of Technology (SNIT)",
    category: "Robotics",
    verified: true,
    description:
      "Hands-on certification in microcontrollers, sensor interfacing, actuator control algorithms, and Python-embedded hardware workflows.",
    tag: "SNIT",
  },
  {
    id: "cert-3",
    title: "Competitive Robotics Participation",
    issuer: "ICFAI Business School (IBS)",
    category: "Robotics",
    verified: true,
    description:
      "Recognition of active participation and technical deployment in inter-college competitive robotics challenges.",
    tag: "IBS",
  },
  {
    id: "cert-4",
    title: "Plant iT MES Training & Certification",
    issuer: "ProLeiT by Schneider Electric",
    category: "Industrial MES",
    verified: true,
    description:
      "Specialized industrial automation certification covering Manufacturing Execution Systems (MES), process recipes, HMI design, and batch data logging.",
    tag: "PROLEIT",
  },
];
