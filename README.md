# Portfolio Website - Easy Editing Guide

This portfolio website is designed to be extremely easy to edit. All your personal information, experience, skills, and projects are stored in a single configuration file.

## 🎯 How to Edit Your Information

### 1. Main Data File
All your information is stored in: `src/data/portfolioData.ts`

### 2. What You Can Edit

#### Personal Information
```typescript
personal: {
  name: "YOUR NAME HERE",
  title: "YOUR TITLE HERE", 
  initials: "YI", // Your initials for the profile circle
  phone: "+1 234-567-8900",
  email: "your.email@example.com",
  location: "Your City, Country",
  fullAddress: "Your full address here",
  objective: "Your career objective here...",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername", 
    twitter: "https://twitter.com/yourusername"
  }
}
```

#### About Section
```typescript
about: {
  highlights: [
    "Your first highlight",
    "Your second highlight", 
    "Your third highlight"
  ],
  languages: ["English", "Spanish", "French"],
  hobbies: ["Coding", "Reading", "Gaming"]
}
```

#### Experience
```typescript
experience: [
  {
    company: "Company Name",
    location: "City, Country", 
    period: "2023 - Present",
    achievements: [
      "What you accomplished",
      "Another achievement"
    ]
  }
  // Add more experiences...
]
```

#### Skills
```typescript
skills: {
  technical: [
    { name: "JavaScript", level: 85 }, // Level from 0-100
    { name: "React", level: 90 }
  ],
  expertise: [
    "Leadership",
    "Project Management"
  ]
}
```

#### Education & Certifications
```typescript
education: [
  {
    degree: "Your Degree",
    institution: "University Name",
    period: "2020 - 2024", 
    grade: "GPA: 3.8"
  }
],
certifications: [
  {
    title: "Certification Name",
    institution: "Issuing Organization",
    year: "2023",
    grade: "Grade: A+" // Optional
  }
]
```

#### Projects
```typescript
projects: [
  {
    title: "Project Name",
    subtitle: "Technology Stack",
    period: "Jan 2023 - Mar 2023",
    description: "What the project does...",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/project",
    demoUrl: "https://yourproject.com"
  }
]
```

### 3. Customizing Colors
You can change the color scheme by modifying the theme section:
```typescript
theme: {
  primary: "blue",    // blue, red, green, purple, etc.
  secondary: "purple", 
  accent: "indigo"
}
```

### 4. Adding New Sections
To add new sections:
1. Add the data to `portfolioData.ts`
2. Create a new component in `src/components/`
3. Import and use the data from `portfolioData`
4. Add the component to `src/App.tsx`

### 5. Quick Start Editing
1. Open `src/data/portfolioData.ts`
2. Replace all the sample data with your information
3. Save the file
4. The website will automatically update!

## 🎨 Design Features
- Modern glassmorphism design with blur effects
- Smooth animations and hover effects  
- Fully responsive (mobile, tablet, desktop)
- Beautiful gradient backgrounds
- Interactive skill progress bars
- Professional contact form

## 🚀 Deployment Ready
The website is production-ready and can be deployed to:
- Netlify
- Vercel  
- GitHub Pages
- Any static hosting service

Just run `npm run build` to create the production files.

---

**Need help?** All the data is clearly organized in `src/data/portfolioData.ts` - just replace the sample information with your own!