export const portfolioData = {
  // Personal Information
  personal: {
    name: "JAYRAJ KAMALAKAR",
    title: "B.Tech CSE",
    initials: "JK",
    // Profile photo URL - easily editable
    // To change: Replace with your photo URL or set to null to use initials
    profilePhoto: null, // Example: "https://your-photo-url.com/photo.jpg"
    phone: "+91 90048-91569",
    email: "jayrajkamalakarjk@gmail.com",
    location: "Gujarat, India",
    fullAddress: "E/502 Shri Siddheshwar Plaza, Near Sakar Complex, New VIP Rd - Ajwa Rd, Vadodara, Gujarat 390019",
    objective: "My objective is to secure a challenging software development position that permits me to utilize my technical skills and creativity to create innovative software solutions. I am passionate about learning new technologies and contributing to meaningful projects that make a positive impact. I believe in continuous learning and staying updated with the latest industry trends to deliver high-quality solutions that exceed expectations.",
    // CV Download Link - easily editable
    cvDownloadUrl: "https://drive.google.com/file/d/your-cv-file-id/view?usp=sharing", // Replace with your actual CV download link
    socialLinks: {
      github: "https://github.com/JDKamalakar",
      linkedin: "https://in.linkedin.com/in/jayraj-kamalakar-7925741a1",
      twitter: "https://x.com/jayrajkamalakar"
    }
  },

  // About Section
  about: {
    highlights: [
      "Passionate about creating innovative solutions that solve real-world problems",
      "Strong technical foundation in software development with hands-on experience",
      "Committed to continuous learning and staying updated with latest technologies"
    ],
    languages: [
      "English",
      "Hindi", 
      "Marathi",
      "Gujarati",
      "French (Basic)",
      "Japanese (Beginner)"
    ],
    hobbies: [
      "Beta Testing Apps",
      "Reading Manga",
      "Swimming",
      "Watching Anime"
    ]
  },

  // Experience Section
  experience: [
    {
      company: "Hi Class",
      location: "West Africa",
      period: "2023 - 2024 (1 Year)",
      achievements: [
        "Trained new employees on software applications and standard procedures, improving team efficiency by 25%",
        "Managed daily warehouse operations, including inventory control and order fulfillment",
        "Implemented digital tracking systems that reduced inventory discrepancies by 40%",
        "Led cross-functional teams to optimize workflow processes",
        "Developed automated reporting systems for better decision making",
        "Coordinated with international suppliers to ensure timely deliveries"
      ]
    },
    {
      company: "Office Beacon",
      location: "Gujarat - India",
      period: "2023 - 2023 (6 Months)",
      achievements: [
        "Provided excellent customer service by addressing inquiries and resolving customer issues with 95% satisfaction rate",
        "Managed customer accounts and ensured accurate billing processes",
        "Developed automated reporting systems that reduced manual work by 30%",
        "Collaborated with technical teams to improve customer experience",
        "Implemented new customer onboarding processes",
        "Trained junior staff on customer service best practices"
      ]
    },
    {
      company: "Ward Wizard",
      location: "Gujarat - India",
      period: "2023 - 2023 (3 Months)",
      achievements: [
        "Oversaw and optimized production processes to meet quality and efficiency targets",
        "Troubleshooted equipment malfunctions and implemented solutions to maintain production flow",
        "Reduced production downtime by 20% through proactive maintenance scheduling",
        "Trained junior staff on safety protocols and quality standards",
        "Implemented quality control measures that improved product consistency",
        "Coordinated with different departments to streamline operations"
      ]
    }
  ],

  // Skills Section
  skills: {
    technical: [
      { name: "Design Process", level: 70 },
      { name: "Project Management", level: 76 },
      { name: "Android Development", level: 35 },
      { name: "Web Development", level: 76 },
      { name: "Python", level: 20 },
      { name: "C & Java", level: 40 },
      { name: "Hardware & Software", level: 85 }
    ],
    expertise: [
      "Management Skills",
      "Creativity",
      "Critical Thinking",
      "Leadership",
      "Linux - ChromeOS - Windows",
      "Office Tools"
    ]
  },

  // Education Section
  education: [
    {
      degree: "Bachelor in Technology - Computer Science & Engineering",
      institution: "Parul University",
      period: "2020 - 2023",
      grade: "CGPA: 7.41"
    },
    {
      degree: "Diploma in Mechanical Engineering",
      institution: "Parul University",
      period: "2015 - 2020",
      grade: "CGPA: 6.68"
    },
    {
      degree: "SSC - Sadhu Vaswani Vidya Mandir",
      institution: "Gujarat Board",
      period: "2014 - 2015",
      grade: "Percentage: 45%"
    }
  ],

  // Certifications Section
  certifications: [
    {
      title: "Mobile App Development Using Android",
      institution: "Parul University",
      year: "2021"
    },
    {
      title: "Programming in C &C++",
      year: "2017",
      grade: "Grade: A+"
    },
    {
      title: "Hardware & Networking",
      year: "2016",
      grade: "Grade: A"
    }
  ],

  // Projects Section
  projects: [
    {
      title: "Student Portal",
      subtitle: "Android App - Android Studio, XML, Java",
      period: "Jan 2022 - Feb 2023",
      description: "Developed a comprehensive student portal Android app to track academic progress, attendance, and timetables, featuring a secure login system with role-based access control. The app includes real-time notifications, offline data synchronization, and an intuitive user interface designed for students and faculty.",
      technologies: ["Android Studio", "XML", "Java", "SQLite", "Firebase"],
      githubUrl: "https://github.com/JDKamalakar/student-portal",
      demoUrl: "https://student-portal-demo.com"
    },
    {
      title: "Game Library Manager",
      subtitle: "Website - HTML, CSS, JS",
      period: "Feb 2022 - Apr 2022",
      description: "Created a responsive web application designed for managing a personal game library, enabling users to monitor their gaming progress, add games from various platforms, and track achievements. Features include search functionality, filtering options, and integration with popular gaming APIs for automatic game data retrieval.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage", "REST APIs"],
      githubUrl: "https://github.com/JDKamalakar/game-library-manager",
      demoUrl: "https://game-library-manager.netlify.app"
    }
  ],

  // GitHub Integration Settings
  github: {
    username: "JDKamalakar", // Your GitHub username
    // Set to true to fetch projects from GitHub automatically
    // Note: This requires additional implementation for API calls
    autoFetch: false,
    // Repositories to exclude from auto-fetch (if implemented)
    excludeRepos: ["JDKamalakar", "config-files", "dotfiles"]
  },

  // Theme Colors (Easy to customize)
  theme: {
    primary: "blue",
    secondary: "purple",
    accent: "indigo"
  }
};