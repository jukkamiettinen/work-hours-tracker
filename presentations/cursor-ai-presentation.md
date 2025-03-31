---
marp: true
theme: default
paginate: true
header: "Cursor AI: Your AI Pair Programming Companion"
footer: "© 2024"
style: |
    section {
      background-color: #1e1e1e;
      color: #d4d4d4;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }
    h1 {
      color: #569cd6;
    }
    h2 {
      color: #4ec9b0;
    }
    ul, ol {
      color: #d4d4d4;
    }
    li {
      color: #d4d4d4;
    }
    strong {
      color: #ce9178;
    }
    code {
      background-color: #2d2d2d;
      color: #d4d4d4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }
    pre {
      background-color: #2d2d2d;
      color: #d4d4d4;
      padding: 1em;
      border-radius: 5px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

# Cursor AI: Your AI Pair Programming Companion

## Live Demo: Building a Work Hours Tracker
---

# Today's Challenge

Build a work hours tracking app with:
- Weekly view (7 days)
- Previous/Next week navigation
- Copy previous week's hours
- Cloud storage
- Finnish calendar (Monday first)

**All using natural language with AI!**

---

# Our Tech Stack

```typescript
// Frontend
React + TypeScript + Vite
Tailwind CSS
date-fns

// Backend
Firebase (Firestore)

// Time: 30 minutes
// Complexity: Medium
// AI Assistance: Maximum
```

---

# Live Demo Structure

1. **Project Setup** (5 min)
   - Create project with Vite
   - Configure Tailwind & Firebase

2. **Core Features** (15 min)
   - Weekly view component
   - Navigation & date handling
   - Hours input system

3. **Cloud Integration** (10 min)
   - Firebase setup
   - Data storage
   - Testing

---

# Key AI Interactions to Watch

1. **Natural Language**
   "Create a weekly view component..."

2. **Problem Solving**
   "How do I handle Finnish calendar..."

3. **Debugging**
   "Why is my useEffect looping..."

---

# Live Demo Starts!

Initial prompt:
```
Build a web UI for tracking work hours
with a weekly view, navigation between
weeks, and cloud storage...
```

[Starting live coding now...]

---

# Going Live with Vercel

1. **Quick Deploy**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Project Setup**
   - Skip "existing project" (Enter)
   - Name it "work-hours-tracker"
   - Select personal account
   - Current directory? Yes

*That's it! App is live and working! 🚀*

---

# Lessons Learned (1/3)

1. **AI Understanding**
   - Contextual awareness
     > Understood Finnish calendar needs
     > Remembered previous code decisions
     > Suggested fixes based on our stack
   
   - Natural language power
     > "Add a button to copy last week's hours"
     > "Fix the infinite loop in useEffect"
     > "Make dates show in Finnish format"

---

# Lessons Learned (2/3)

2. **Technical Precision**
   - Code quality
     > Proper React hooks usage
     > TypeScript type definitions
     > Firebase security rules

   - Rapid prototyping
     > Full weekly view in minutes
     > Firebase setup without docs
     > Instant Tailwind styling

---

# Lessons Learned (3/3)

3. **Development Flow**
   - Quick problem solving
     > useEffect dependency fixes
     > Date formatting solutions
     > State management patterns
   
   - Instant documentation
     > Explained each code decision
     > Suggested best practices
     > Provided usage examples

---

# Best Practices

1. **Clear Communication**

    - Be specific in requests
    - Provide context
    - Ask for explanations

2. **Verification**
    - Review generated code
    - Test thoroughly
    - Understand the solutions

---

# Best Practices (continued)

3. **Iterative Development**

    - Break down complex tasks
    - Build incrementally
    - Use AI for specific parts

4. **Learning Focus**
    - Ask for explanations
    - Understand the reasoning
    - Learn from AI's suggestions

---

# Q&A

## Thank you for watching!

Resources:
- Cursor AI: cursor.sh
- Demo code: [GitHub repo]
- Slides: [Link]
