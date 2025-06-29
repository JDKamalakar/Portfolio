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
  profilePhoto: "https://your-photo-url.com/photo.jpg", // or null for initials
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

#### Profile Photo Options
1. **Use a Photo URL**: Set `profilePhoto: "https://your-photo-url.com/photo.jpg"`
2. **Use Initials**: Set `profilePhoto: null` to display initials instead
3. **Upload Feature**: Hover over the profile photo to see upload option (requires backend implementation)

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
      "Another achievement",
      "Add as many as you want - expandable sections will handle them"
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
    institution: "University Name", // Shows when expanded
    period: "2020 - 2024", 
    grade: "GPA: 3.8"
  }
],
certifications: [
  {
    title: "Certification Name",
    institution: "Issuing Organization", // Shows when expanded
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

### 3. GitHub Integration (Future Feature)
```typescript
github: {
  username: "yourusername",
  autoFetch: false, // Set to true when implemented
  excludeRepos: ["private-repo", "config-files"]
}
```

### 4. Customizing Colors
```typescript
theme: {
  primary: "blue",    // blue, red, green, purple, etc.
  secondary: "purple", 
  accent: "indigo"
}
```

## 🎨 New Features

### Smart Content Indication
- **Read More/Show More**: Buttons now show "..." indicator when there's more content
- **Expandable Sections**: Education and certifications show institution names when expanded
- **Preview Mode**: Experience shows first 2 achievements, then expands to show all

### Enhanced Navigation
- **Light Mode Visibility**: Fixed navigation visibility in light mode
- **Android 16 QPR1 Style**: Modern translucent blur effects
- **Better Contrast**: Improved readability across all themes

### Profile Photo Management
- **Easy Upload**: Hover over photo to see upload option
- **URL or Initials**: Choose between photo URL or initials display
- **Edit Instructions**: Helpful tooltips for easy editing

### Theme System
- **System Integration**: Automatically follows OS dark/light preference
- **Manual Override**: Choose specific theme (Light/Dark/System)
- **Smooth Transitions**: Beautiful 500ms transitions between themes

## 🚀 Quick Start Editing
1. Open `src/data/portfolioData.ts`
2. Replace sample data with your information
3. Set `profilePhoto` to your photo URL or `null` for initials
4. Update social links with your actual profiles
5. Save the file - website updates automatically!

## 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Smooth animations on all devices

## 🔧 Technical Features
- **Direct Email**: Contact form opens email client
- **Google Maps**: Location opens in Google Maps
- **Social Links**: Direct links to your profiles
- **Scroll Management**: Smart scroll-to-top button
- **Theme Persistence**: Remembers your theme choice

---

**Need help?** All data is in `src/data/portfolioData.ts` - just replace with your information!