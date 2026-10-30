export const personalInfo = {
  name: "Shaik Sameer",
  firstName: "SAMEER",
  lastName: "SHAIK",
  role: "Python Full Stack Developer",
  headline: "Building Scalable Backend Systems & Intuitive Web Applications",
  careerObjective:
    "I want to build scalable web applications, reliable backend systems and user-friendly digital products that solve real-world problems.",
  description:
    "Python Full Stack Developer with hands-on expertise in FastAPI, Flask, Django, MySQL and React.js. Experienced in enterprise automation workflows, REST API architecture, and database optimization.",
  email: "sameernawab66@gmail.com",
  phone: "+91 8367078316",
  location: "Hyderabad, Telangana, India",
  college: "MLR Institute of Technology",
  degree: "B.Tech in Electronics and Communication Engineering",
  graduationYear: "2025",
  cgpa: "6.68",
  academics: {
    tenth: "87%",
    intermediate: "85% (MPC)",
    btechCgpa: "6.68 CGPA",
  },
  timeline: "2021 – 2025",
  linkedin: "https://www.linkedin.com/in/shaik-sameer-401953301/",
  github: "https://github.com/Shaik66-pro",
  resumeUrl: "/Shaik_Sameer_Resume.pdf",
  profileImage: "/sameer_studio.png",
  walkingImage: "/sameer_suit.png",
  primaryLanguage: "PYTHON",
  establishedYear: "2026",
};

export const skillsData = {
  programmingLanguages: [
    { name: "Python", category: "Core Backend & Scripting", primary: true },
    { name: "JavaScript", category: "Full-Stack Scripting", primary: false },
    { name: "SQL", category: "Relational Query Language", primary: false },
  ],
  backend: [
    { name: "FastAPI", category: "High-Performance Asynchronous APIs" },
    { name: "Flask", category: "Microservices & Web APIs" },
    { name: "Django", category: "Enterprise Full-Featured Framework" },
    { name: "REST APIs", category: "API Architecture & Design" },
  ],
  frontend: [
    { name: "HTML5", category: "Semantic Markup" },
    { name: "CSS3", category: "Modern Styling & Grid" },
    { name: "Bootstrap", category: "Rapid Component Styling" },
    { name: "React.js", category: "Component-Based UI Library" },
  ],
  database: [
    { name: "MySQL", category: "Relational Database Management" },
    { name: "SQLite", category: "Embedded Relational Engine" },
  ],
  tools: [
    { name: "Git", category: "Version Control" },
    { name: "GitHub", category: "Repository Collaboration" },
    { name: "VS Code", category: "Development Environment" },
    { name: "Postman", category: "API Testing & Debugging" },
    { name: "Swagger / OpenAPI", category: "API Documentation" },
  ],
  concepts: [
    { name: "OOP (Object-Oriented Programming)", desc: "Modular, reusable class design" },
    { name: "CRUD Operations", desc: "Robust data lifecycle handling" },
    { name: "Authentication & Authorization", desc: "Session & token security" },
    { name: "JWT (JSON Web Tokens)", desc: "Stateless security token lifecycle" },
    { name: "Database Integration", desc: "Normalized schemas & indexing" },
    { name: "Role-Based Access Control (RBAC)", desc: "Multi-tier privilege management" },
  ],
};

export const sevenProjects = [
  // 1. Existing Full Stack Project (Completed)
  {
    id: "proj-01",
    number: "01",
    title: "Insurance Policy & Claims Management System",
    category: "Full Stack Architecture",
    type: "fullstack",
    status: "Completed",
    technologies: ["Python", "Flask", "MySQL", "HTML", "CSS", "Bootstrap", "REST APIs", "JWT"],
    problem:
      "Insurance providers struggle with slow paper claims processing, document loss, and lack of transparency between policyholders, field agents, and approval officers.",
    solution:
      "A complete role-based enterprise insurance system streamlining customer policy purchase, document verification, multi-stage claim evaluation, and automated claim status tracking.",
    features: [
      "User authentication with JWT session protection",
      "Role-based access control for Admin, Customer, Agent, and Claims Officer",
      "Policy catalog browsing, policy purchase, and renewal management",
      "Digital claim submission with secure supporting document uploads",
      "Officer claim review, approval/rejection workflows, and audit notes",
      "Real-time claim status tracking timeline for policyholders",
      "Comprehensive dashboards for tracking active claims and processing metrics",
    ],
    technicalChallenges: [
      "Designed normalized relational schemas in MySQL linking policies, claims, documents, and audit logs.",
      "Implemented strict RBAC isolating sensitive financial claims from unauthorized user roles.",
      "Ensured atomic database transactions during claim status transitions to prevent race conditions.",
    ],
    github: "https://github.com/Shaik66-pro",
  },

  // 2. Existing Full Stack Project (Completed)
  {
    id: "proj-02",
    number: "02",
    title: "Smart Cart – E-Commerce Application",
    category: "Full Stack Web Application",
    type: "fullstack",
    status: "Completed",
    technologies: ["Python", "Flask", "MySQL", "HTML", "CSS", "Bootstrap", "REST APIs", "JWT"],
    problem:
      "Online retail platforms need high-performance catalog management, rapid cart operations, and session persistence without server-side memory leaks.",
    solution:
      "An end-to-end e-commerce web platform providing responsive product discovery, instant cart updates, wishlist synchronization, and centralized administrative controls.",
    features: [
      "Secure user registration, credential hashing, and login authentication",
      "Dynamic product catalog with category classification and image mapping",
      "Persistent shopping cart with dynamic quantity increment/decrement",
      "Customer wishlist management with one-click transfer to cart",
      "Order placement workflow with structured order history archiving",
      "Admin dashboard for product creation, category updates, and user supervision",
      "Server-side form validation, exception handling, and optimized SQL queries",
    ],
    technicalChallenges: [
      "Maintained consistent cart state across sessions using session-based authentication.",
      "Prevented negative inventory counts during concurrent multi-item checkout operations.",
      "Optimized MySQL JOIN queries for category filtering and real-time product searches.",
    ],
    github: "https://github.com/Shaik66-pro",
  },

  // 3. New Full Stack Project (In Progress)
  {
    id: "proj-03",
    number: "03",
    title: "Smart Inventory & Warehouse Management System",
    category: "Enterprise Full Stack",
    type: "fullstack",
    status: "In Progress",
    technologies: ["FastAPI", "React", "MySQL", "SQLAlchemy", "JWT", "REST APIs"],
    problem:
      "Businesses often face incorrect stock counts, duplicate inventory entries, delayed stock updates, and difficulty identifying products that urgently require replenishment.",
    solution:
      "An asynchronous inventory control platform managing warehouse bin tracking, automated low-stock warnings, inward/outward movement audits, and supplier purchase orders.",
    features: [
      "Stateless JWT authentication and role-based permissions (Admin, Manager, Clerk)",
      "Product and SKU catalog management with barcode identification",
      "Real-time stock-in and stock-out operations across storage zones",
      "Historical inventory movement logs with immutable audit records",
      "Automated low-stock alerts triggered when inventory drops below safety thresholds",
      "Reorder threshold configuration and supplier purchase order automation",
      "Full-text search, multi-field filtering, and cursor-based pagination",
      "Executive dashboard visualizing turnover ratios and stock valuation",
    ],
    technicalChallenges: [
      "Prevent negative stock through atomic database transactions and row-level locks.",
      "Eliminate duplicate or conflicting stock updates during concurrent warehouse scans.",
      "Handle high-frequency inventory movements safely with structured database rollbacks.",
    ],
    github: "https://github.com/Shaik66-pro",
  },

  // 4. New Full Stack Project (In Progress)
  {
    id: "proj-04",
    number: "04",
    title: "Logistics & Shipment Tracking System",
    category: "Supply Chain Backend & UI",
    type: "fullstack",
    status: "In Progress",
    technologies: ["FastAPI", "React", "MySQL", "REST APIs", "JWT"],
    problem:
      "Customers cannot easily track parcel milestones, delivery drivers receive delayed route updates, and dispatch supervisors struggle to identify delayed consignments.",
    solution:
      "A synchronized logistics dispatch and tracking engine that generates unique waybill tracking IDs, records milestone events, and provides public shipment tracking.",
    features: [
      "User authentication for logistics operators, dispatchers, and drivers",
      "Automated consignment creation and unique shipment ID generation",
      "State-machine driven shipment status lifecycle (Order Received -> In Transit -> Out for Delivery -> Delivered)",
      "Public tracking timeline for recipients with live milestone checkpoints",
      "Driver and vehicle assignment with estimated delivery calculation",
      "Automated delayed shipment flagging and dispatch notifications",
      "Operations admin dashboard with real-time transit status metrics",
    ],
    technicalChallenges: [
      "Enforce strict chronological milestone event logging to prevent out-of-order state transitions.",
      "Safely handle edge cases such as missing, corrupted, or duplicate shipment identifiers.",
      "Build high-throughput REST endpoints designed for mobile courier scanner handoffs.",
    ],
    github: "https://github.com/Shaik66-pro",
  },

  // 5. Frontend Project (In Progress - Simulated)
  {
    id: "proj-05",
    number: "05",
    title: "Business Analytics Dashboard",
    category: "Frontend UI Architecture",
    type: "frontend",
    status: "In Progress",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Chart.js"],
    problem:
      "Businesses struggle to visualize large datasets smoothly without experiencing slow dashboard rendering, complicated filter interactions, or layout freezes.",
    solution:
      "A high-performance interactive analytics dashboard featuring modular KPI cards, responsive Chart.js visualizers, date-range filters, and skeleton loading states.",
    features: [
      "Executive KPI metrics (Monthly Revenue, Active Users, Conversion Rate, Churn)",
      "Interactive sales trends line charts and quarterly revenue bar comparisons",
      "Dynamic date range picker and category-specific data filtering",
      "Multi-column sorting, search filters, and responsive data tables",
      "Custom loading skeletons preventing layout shifts during data ingestion",
      "Graceful error boundaries and informative empty states for filtered queries",
    ],
    technicalChallenges: [
      "Optimized Chart.js rendering to prevent canvas redraw lags on large datasets.",
      "Implemented responsive SVG cards with clean flexbox/grid adaptation.",
      "Built client-side pagination and debounce filters for instant table responsiveness.",
    ],
    github: "https://github.com/Shaik66-pro",
  },

  // 6. Frontend Project (In Progress - Simulated)
  {
    id: "proj-06",
    number: "06",
    title: "Job Application & Recruitment Portal UI",
    category: "Frontend User Experience",
    type: "frontend",
    status: "In Progress",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Mock JSON Data"],
    problem:
      "Job seekers experience high frustration with tedious multi-step application forms, accidental loss of entered data on refresh, and confusing application status trackers.",
    solution:
      "A streamlined job recruitment interface with instant multi-parameter filtering, autosaved application form drafts, and transparent application stage tracking.",
    features: [
      "Job listings with role badges, salary estimations, and location indicators",
      "Search filters for job type (Full-time, Remote, Contract) and experience level",
      "Comprehensive job detail view with role breakdown and requirements",
      "Step-by-step application modal with real-time field validation",
      "Automatic draft persistence to localStorage preventing data loss",
      "Visual candidate application tracker displaying review, interview, and offer milestones",
    ],
    technicalChallenges: [
      "Created a robust multi-step form state machine with step validation guards.",
      "Integrated localStorage draft auto-save and restoration.",
      "Maintained full keyboard accessibility and responsive mobile touch navigation.",
    ],
    github: "https://github.com/Shaik66-pro",
  },

  // 7. Frontend Project (In Progress - Simulated)
  {
    id: "proj-07",
    number: "07",
    title: "Smart Food Ordering Platform",
    category: "Frontend E-Commerce UX",
    type: "frontend",
    status: "In Progress",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Mock JSON Data"],
    problem:
      "Food ordering interfaces often suffer from sluggish cart quantity updates, confusing menu category navigation, and inaccurate cart total price calculations.",
    solution:
      "An intuitive digital menu and ordering experience featuring real-time cart state management, category fast-scrolling, and responsive checkout summaries.",
    features: [
      "Curated restaurant cards with star ratings, delivery time, and cuisine tags",
      "Instant menu search and horizontal category pill filtering",
      "Item detail modal with portion sizes, add-on selections, and special notes",
      "Real-time floating cart with instant quantity increments, decrements, and removals",
      "Accurate tax, delivery charge, and discount coupon computations",
      "Multi-step checkout modal with order confirmation milestone animation",
    ],
    technicalChallenges: [
      "Designed a centralized React context/state for atomic cart item quantity operations.",
      "Ensured mobile-first drawer ergonomics for thumb-friendly shopping cart interactions.",
      "Handled dynamic delivery fee calculation algorithms based on mock cart volume.",
    ],
    github: "https://github.com/Shaik66-pro",
  },
];

export const fullstackProjects = sevenProjects.filter((p) => p.type === 'fullstack');
export const frontendProjects = sevenProjects.filter((p) => p.type === 'frontend');

export const professionalInterests = [
  "Python Full Stack Development",
  "Backend Development",
  "REST API Development",
  "Database Management",
  "Frontend Development",
  "Web Application Development",
];

export const experienceData = [
  {
    company: "Polmon Instruments Pvt. Ltd.",
    department: "Automation",
    role: "Application Development Associate / Trainee",
    type: "Industrial Automation & Software Development",
    location: "Hyderabad, India",
    highlights: [
      "Worked with ProLeiT Plant iT MES/HMI software for automated pharmaceutical and process plant applications.",
      "Engineered and maintained process logic, system validations, alarm management, and application workflows.",
      "Developed and debugged MySQL queries, JavaScript automation logic, and PLC Structured Text (ST) sequences.",
      "Participated actively in system testing, troubleshooting, exception tracking, and root-cause analysis.",
      "Led a four-member engineering team during a critical on-site live deployment, ensuring successful commissioning.",
    ],
    tags: ["Plant iT MES/HMI", "Process Logic", "MySQL", "JavaScript", "PLC Structured Text", "Validations & Alarms", "Root-Cause Analysis", "Team Leadership"],
  },
];

export const educationData = [
  {
    institution: "MLR Institute of Technology",
    degree: "B.Tech in Electronics and Communication Engineering",
    location: "Hyderabad, Telangana",
    year: "2021 – 2025",
    score: "CGPA: 6.68",
    status: "Graduating 2025",
  },
  {
    institution: "Intermediate (MPC)",
    degree: "Higher Secondary Certificate",
    location: "Telangana, India",
    year: "2019 – 2021",
    score: "85%",
    status: "Completed",
  },
  {
    institution: "Secondary School Certificate (10th)",
    degree: "High School Education",
    location: "Telangana, India",
    year: "2019",
    score: "87%",
    status: "Completed",
  },
];

export const achievementsData = [
  {
    id: "ach-1",
    stat: "1ST",
    title: "1st Place — National-Level Robotics Competition",
    organization: "Srinidhi Institute of Technology (SNIST)",
    description:
      "Secured First Place across nationwide engineering teams by programming an autonomous robotic system with Python-based logic and precision sensor integration.",
    highlight: true,
  },
  {
    id: "ach-2",
    stat: "1ST",
    title: "1st Place — Robotics Competition",
    organization: "International Business School (IBS)",
    description:
      "Achieved first place distinction in competitive robotics design and rapid problem-solving challenges.",
    highlight: true,
  },
  {
    id: "ach-3",
    stat: "85+",
    title: "Department Coordinator & Technical Lead",
    organization: "MLR Institute of Technology",
    description:
      "Served as department coordinator leading more than 85 student members, organizing campus technical events, hackathons, and cross-department collaboration.",
    highlight: true,
  },
];

export const certificationsData = [
  {
    id: "cert-1",
    title: "Python Basics",
    issuer: "Infosys Springboard",
    year: "2023",
    category: "Python",
    description: "Certified in Python programming fundamentals, object-oriented concepts, and application logic.",
    tag: "INFOSYS",
  },
  {
    id: "cert-2",
    title: "Plant iT MES Certification",
    issuer: "ProLeiT",
    year: "Industrial",
    category: "Industrial MES",
    description: "Professional training in Manufacturing Execution Systems, process automation recipes, and HMI workflows.",
    tag: "PROLEIT",
  },
  {
    id: "cert-3",
    title: "Robotics Workshop",
    issuer: "Srinidhi Institute of Technology (SNIT)",
    year: "Robotics",
    category: "Robotics",
    description: "Hands-on certification in microcontrollers, sensor integration, and autonomous robotics programming.",
    tag: "SNIT",
  },
  {
    id: "cert-4",
    title: "Robotics Participation Certificate",
    issuer: "International Business School (IBS)",
    year: "Robotics",
    category: "Robotics",
    description: "Recognized for competitive robotics problem-solving and rapid prototype development.",
    tag: "IBS",
  },
];
