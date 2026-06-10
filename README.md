# 🏏 Cricket Batting Order Optimization API

Developed a prototype backend engine that helps decide the optimized batting lineup in cricket—focusing on data analytics rather than just a gut feeling.

---

## 🧠 Core Algorithm Logic

Instead of relying strictly on flat lifetime statistics, this API dynamically weights and evaluates players using a multi-variable scoring model:

1. **The Pressure Index (`matchContext`):** Automatically senses the game's state. Early collapses trigger a high pressure index, while stable scores with wickets in hand yield a low pressure index.
2. **Dynamic Player Profiling:**
   * **Recent Form:** Heavily weights data from the last 5 matches.
   * **Pressure Resilience:** Tracks a player's historical capability to anchor when wickets are tumbling.
   * **Skill Archetypes:** Categorizes players into tactical roles like **Anchors** or **Finishers** to match the pressure situation.

---

## 🛠️ Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Language:** JavaScript

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine and MongoDb compass for the database.

