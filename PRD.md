# Product Requirements Document (PRD)

## Project Title
444 — A Love You Played Through

---

## 1. Overview

This project is an interactive romantic web experience designed as a **story-driven game**.

It combines:
- Mini-games
- Message unlocking system
- Emotional storytelling

The goal is to create a deeply engaging experience where the user feels:
- Obsessed
- Emotionally connected

---

## 2. Objective

To transform a long-distance relationship into an **interactive digital experience** where:

- The user unlocks 444 short messages through interaction
- Plays games to unlock deeper emotional messages
- Progresses through a hidden story

---

## 3. Core Experience

The product should feel like:
- A story + a game combined

Key principles:
- No repetition of messages
- Emotional progression
- Interactive engagement
- Smooth and modern UI

---

## 4. User Persona

Primary User:
- Girlfriend (single user system)

Behavior:
- Curious
- Emotion-driven
- Engages with interactive content

---

## 5. User Flow

### 5.1 Home Page

Features:
- 444 floating hearts
- Hearts slightly follow cursor
- Glow animation
- Black + Purple theme

Interaction:
- Clicking a heart:
  - Shows a unique short message
  - Heart disappears with animation
  - Displays overlay:
    "Happy Birthday Gudiyaaa, I love youuuu"

Rules:
- Each heart → one unique message
- No repetition

---

### 5.2 Entry Flow

Button:
"Enter if you dare..."

Then:
- Intro animation shows:
  "Happy birthday gudiyaaa, I love you the mostttt."

Redirect → Login Page

---

### 5.3 Login System

- Fixed username & password
- No signup

On wrong attempt:
"You forgot already?"

On success:
→ Redirect to Game Screen

---

### 5.4 Game System

Structure:
- 2–3 mini-game variations
- Easy difficulty

Logic:
- After 3 wins → unlock reward message

On loss:
- Immediate retry

---

### 5.5 Reward System

Reward Messages:
- Unlock in order
- Emotional, longer messages

Content Types:
- Text
- Optional voice notes
- Optional images

---

### 5.6 Messaging System

User:
- Can send messages

Admin:
- Can view and reply

Applies to:
- Short message context
- Reward message context

---

### 5.7 Progress System

User:
- Progress hidden

Admin:
- Full visibility:
  - Hearts clicked
  - Messages unlocked
  - Game stats

---

### 5.8 Ending

After all reward messages unlocked:
- Final emotional sequence
- Full message reveal
- Emotional conclusion
- Purple theme significance revealed

---

## 6. Message System

### 6.1 Short Messages

- Total: 444
- Tone: Poetic, human, emotional
- Length: 3–5 lines
- Display: Whisper-style near cursor
- No repetition allowed

---

### 6.2 Reward Messages

- Unlock after game progression
- Delivered in order
- Deeper emotional content

---

## 7. Hidden Features

- Rare hearts (special messages)
- Secret clickable areas
- Hidden emotional content

---

## 8. Design Requirements

Theme:
- Black + Purple

Style:
- Romantic, modern, animated

Fonts:
- Handwritten style

Effects:
- Glow
- Smooth animations

---

## 9. Audio Requirements

- Background music:
  - Piano (romantic tone)
- Starts only after user interaction

Sound Effects:
- Heart click
- Message reveal

---

## 10. Technical Requirements

Frontend:
- HTML
- CSS
- JavaScript
- Three.js

Backend:
- Django (custom admin panel)

Database:
- SQLite

---

## 11. Admin Panel

Custom-built (not Django default)

Features:
- Dashboard:
  - User progress
  - Game stats
- Messaging system:
  - View user messages
  - Reply functionality

---

## 12. Responsiveness

- Fully responsive design
- Works on:
  - Mobile
  - Tablet
  - Desktop

---

## 13. Performance

- Smooth animations
- Optimized rendering
- Fast load time

---

## 14. Constraints

- Single user system
- No authentication complexity
- Must handle 444 unique messages without repetition

---

## 15. Timeline

Deadline:
14 December

Development Approach:
- Antigravity-assisted development

---

## 16. Personalization

- Uses nickname: "Gudiyaaa"
- Personalized emotional content
- Language: English

---

## 17. Success Criteria

- User engages fully with experience
- Emotional impact achieved
- All messages unlocked
- User revisits the experience

---

## 18. Future Scope

- Real-time chat
- Multiplayer memory sharing
- Cloud database upgrade
- Progressive Web App (PWA)

---

END OF DOCUMENT