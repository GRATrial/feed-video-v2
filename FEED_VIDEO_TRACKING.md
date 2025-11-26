# Feed Video MongoDB Tracking Documentation

## Overview
The feed-video app tracks user interactions and video viewing behavior using two MongoDB collections:
1. **`ad_interactions`** - New logging system (primary)
2. **`feed_video_events`** - Legacy tracking system (secondary)

---

## Events Tracked in `ad_interactions` Collection

### 1. **`page_load`** 
**When:** Every time the page loads  
**Data Captured:**
- `pid` - Participant ID from URL
- `ip` - Client IP address
- `condition` - Always "feed_video"
- `event_type` - "page_load"
- `extra`:
  - `page_title` - Page title
  - `referrer` - Referring URL (usually Qualtrics)
  - `url` - Full page URL with query parameters
- `created_at` - Timestamp
- `user_agent` - Browser user agent

**Current Count:** 105 events

---

### 2. **`video_play`**
**When:** Video starts playing (YouTube API PLAYING state)  
**Data Captured:**
- `pid` - Participant ID
- `ip` - Client IP address
- `condition` - "feed_video"
- `event_type` - "video_play"
- `extra`:
  - `currentTime` - Current video time in seconds
  - `duration` - Total video duration (21 seconds)
- `created_at` - Timestamp
- `user_agent` - Browser user agent

**Current Count:** 63 events

---

### 3. **`video_pause`**
**When:** Video is paused (YouTube API PAUSED state)  
**Data Captured:**
- `pid` - Participant ID
- `ip` - Client IP address
- `condition` - "feed_video"
- `event_type` - "video_pause"
- `extra`:
  - `currentTime` - Current video time when paused
  - `totalWatchTime` - Accumulated watch time in seconds (⚠️ Currently showing 0 for most events)
- `created_at` - Timestamp
- `user_agent` - Browser user agent

**Current Count:** 28 events

**⚠️ Issue:** Most `totalWatchTime` values are 0, indicating the watch time calculation may not be working correctly.

---

### 4. **`video_progress`** (Expected but not currently in data)
**When:** Video reaches milestone percentages (25%, 50%, 75%, 100%)  
**Data Captured:**
- `pid` - Participant ID
- `ip` - Client IP address
- `condition` - "feed_video"
- `event_type` - "video_progress"
- `extra`:
  - `milestone` - Percentage reached (25, 50, 75, or 100)
  - `currentTime` - Current video time
  - `totalWatchTime` - Accumulated watch time

**Current Count:** 0 events (not being logged via new system)

---

### 5. **`video_ended`** (Expected but not currently in data)
**When:** Video finishes playing (YouTube API ENDED state)  
**Data Captured:**
- `pid` - Participant ID
- `ip` - Client IP address
- `condition` - "feed_video"
- `event_type` - "video_ended"
- `extra`:
  - `currentTime` - Final video time
  - `totalWatchTime` - Final accumulated watch time

**Current Count:** 0 events (not being logged via new system)

---

### 6. **`cta_click`**
**When:** User clicks action buttons (Like, Comment, Share, Save)  
**Data Captured:**
- `pid` - Participant ID
- `ip` - Client IP address
- `condition` - "feed_video"
- `event_type` - "cta_click"
- `extra`:
  - `cta_type` - Button type (like, comment, share, save)
  - `post_type` - "video"
  - `post_id` - "nyu_feed_video_ad"
  - `username` - "nyu_stern"
  - `content_type` - "sponsored_video"

**Current Count:** 0 events (no CTA clicks recorded yet)

---

## Events Tracked in `feed_video_events` Collection (Legacy System)

### 1. **`page_view`**
**When:** Page is viewed  
**Data:** Page title, referrer, URL

**Current Count:** 2 events

---

### 2. **`session_start`**
**When:** New session begins  
**Data:** Session ID

**Current Count:** 2 events

---

### 3. **`feed_video_start`**
**When:** Video starts playing for the first time  
**Data:**
- `video_duration` - 21 seconds
- `video_id` - "nyu_feed_video"
- `condition` - "feed_video"

**Current Count:** 2 events

---

### 4. **`feed_video_watch_time`**
**When:** Watch time is updated (periodic)  
**Data:**
- `watch_time_seconds` - Total seconds watched
- `watch_time_minutes` - Total minutes watched
- `condition` - "feed_video"

**Current Count:** 4 events

---

### 5. **`feed_video_progress`**
**When:** Video reaches milestone (25%, 50%, 75%, 100%)  
**Data:**
- `milestone` - Percentage reached
- `current_time` - Current video time
- `total_watch_time` - Accumulated watch time

**Current Count:** 0 events

---

### 6. **`feed_video_complete`**
**When:** Video finishes playing  
**Data:**
- `total_watch_time_seconds` - Final watch time
- `video_duration` - 21 seconds
- `completion_rate` - Percentage of video watched
- `play_count` - Number of times video was played
- `milestones_reached` - Array of milestones reached

**Current Count:** 0 events

---

### 7. **`feed_video_summary`**
**When:** Page unloads (final summary)  
**Data:**
- `total_watch_time_seconds` - Final watch time
- `completion_rate` - Percentage watched
- `milestones_reached` - Array of milestones
- `max_progress_reached` - Maximum time reached

**Current Count:** 1 event

---

## Summary Statistics

### New System (`ad_interactions`)
- **Total Events:** 196
- **Event Types:** 3 (page_load, video_play, video_pause)
- **Participants Tracked:** 8 unique PIDs

### Legacy System (`feed_video_events`)
- **Total Events:** 11
- **Event Types:** 5 (page_view, session_start, feed_video_start, feed_video_watch_time, feed_video_summary)
- **Less Active:** Only 2 participants have events

---

## Known Issues

1. **Watch Time Not Captured:** Most `video_pause` events show `totalWatchTime: 0`
2. **Missing Events:** `video_progress` and `video_ended` are not being logged via the new system
3. **Dual Tracking:** Both old and new systems are active, causing duplicate tracking

---

## Data Structure

### `ad_interactions` Document Example:
```json
{
  "_id": "ObjectId",
  "pid": "participant_id",
  "ip": "68.100.194.212",
  "condition": "feed_video",
  "event_type": "video_play",
  "extra": {
    "currentTime": 0.05,
    "duration": 21
  },
  "created_at": "2025-11-25T03:42:21.055Z",
  "timestamp": "2025-11-25T03:42:21.055Z",
  "user_agent": "Mozilla/5.0..."
}
```

---

## Recommendations

1. **Fix Watch Time Calculation:** Ensure `totalWatchTime` is properly calculated and passed to `video_pause` events
2. **Add Missing Events:** Log `video_progress` and `video_ended` via the new system
3. **Consolidate Tracking:** Consider migrating fully to the new `ad_interactions` system
4. **Add CTA Tracking:** Ensure CTA clicks are being captured

