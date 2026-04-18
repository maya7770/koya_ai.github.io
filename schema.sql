-- ============================================================
-- KOYA AI — PostgreSQL Database Schema
-- ============================================================

-- Users table
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,  -- store hashed (bcrypt)
    age_range   VARCHAR(10),
    status      VARCHAR(50),
    avatar      VARCHAR(50),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

-- User goals (many per user)
CREATE TABLE user_goals (
    id      SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    goal    VARCHAR(100) NOT NULL
);

-- User preferences from onboarding
CREATE TABLE user_preferences (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    enjoys          VARCHAR(100),
    goal_type       VARCHAR(100),
    personality     VARCHAR(100),
    improve_area    TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Tasks
CREATE TABLE tasks (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    task_time   TIME,
    priority    VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('high','medium','low')),
    done        BOOLEAN DEFAULT FALSE,
    task_date   DATE DEFAULT CURRENT_DATE,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Daily focus goals
CREATE TABLE daily_focus (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    focus_date  DATE DEFAULT CURRENT_DATE,
    goal_text   VARCHAR(255),
    target      INTEGER DEFAULT 3,
    completed   INTEGER DEFAULT 0,
    UNIQUE(user_id, focus_date)
);

-- Streaks
CREATE TABLE streaks (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    current_streak  INTEGER DEFAULT 0,
    longest_streak  INTEGER DEFAULT 0,
    last_active     DATE DEFAULT CURRENT_DATE
);

-- Chat messages
CREATE TABLE chat_messages (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role        VARCHAR(10) CHECK (role IN ('user','bot')),
    content     TEXT NOT NULL,
    sent_at     TIMESTAMP DEFAULT NOW()
);

-- Progress snapshots (daily)
CREATE TABLE progress_snapshots (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    snap_date       DATE DEFAULT CURRENT_DATE,
    tasks_total     INTEGER DEFAULT 0,
    tasks_done      INTEGER DEFAULT 0,
    completion_pct  NUMERIC(5,2),
    UNIQUE(user_id, snap_date)
);

-- ============================================================
-- Sample seed data
-- ============================================================

INSERT INTO users (name, email, password, age_range, status, avatar)
VALUES ('Alex Johnson', 'alex@example.com', '$2b$10$hashedpassword', '25-34', 'Working Professional', '🔥');

INSERT INTO user_goals (user_id, goal) VALUES
(1, 'Study & Learning'),
(1, 'Productivity');

INSERT INTO tasks (user_id, title, task_time, priority, done)
VALUES
(1, 'Review course material for midterm', '09:00', 'high', TRUE),
(1, 'Complete project proposal draft', '11:00', 'high', TRUE),
(1, 'Team meeting – discuss timeline', '14:00', 'medium', FALSE),
(1, 'Practice Spanish for 30 minutes', '16:00', 'low', FALSE),
(1, 'Evening workout session', '18:00', 'medium', FALSE);

INSERT INTO daily_focus (user_id, goal_text, target, completed)
VALUES (1, 'Complete 3 Tasks', 3, 2);

INSERT INTO streaks (user_id, current_streak, longest_streak)
VALUES (1, 7, 12);
