# Backend Specification

## Overview
Backend will be built using Django with a custom admin panel (not Django default admin).
Database: SQLite (can scale later if needed).

---

## Core Responsibilities

1. User Authentication
- Fixed username and password system
- No signup
- Validate login credentials
- Handle wrong attempts with message:
  "You forgot already?"

---

2. Message System

### Short Messages (444 total)
- Store all short messages
- Track:
  - Which messages are seen
  - Which hearts are clicked

### Reward Messages
- Stored in ordered sequence
- Unlock after every 3 game wins
- Types:
  - Text
  - Voice (optional)
  - Image (optional)

---

3. Game Progress Tracking

Track:
- Total wins
- Total losses
- Current level
- Reward unlock progress

---

4. Heart Interaction Tracking

Track:
- Total hearts clicked
- Unique messages shown
- Prevent repetition of messages

---

5. Messaging System (User ↔ Admin)

User:
- Can send messages

Admin:
- Can view user messages
- Can reply

Store:
- message_id
- sender (user/admin)
- content
- timestamp

---

6. Admin Panel (Custom)

Dashboard:
- Total hearts clicked
- Messages unlocked
- Game stats

Features:
- View user progress
- View messages
- Reply to messages

---

7. API Endpoints (Suggested)

POST /login
GET /hearts/messages
POST /hearts/click
GET /reward-message
POST /game/result
GET /progress
POST /send-message
GET /messages

---

## Security
- Basic session authentication
- No public user system
- Data scoped to single user

---

## Future Scope
- Switch SQLite → PostgreSQL
- Add real-time chat (WebSockets)