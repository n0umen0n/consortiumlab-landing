# UI Specification: Consortium Factory

*A blueprint for the Frontend Agent.*
*Design Language:* White, misty, ethereal, glassmorphism. "The Cloud of Intelligence."

---

## 1. Landing View (The "Cloud")
**Goal:** Inspiration & Discovery. Show the scale of the network immediately.

*   **Hero Section:**
    *   **Visual:** A 3D or Canvas-based interactive "Cloud" of connected nodes. Each node represents an active Consortium.
    *   **Interaction:** Hovering over a node creates a glass tooltip: *"NeonVault | TVL: $10M | Mission: Automated DeFi Yield"*.
    *   **Motion:** Nodes drift slowly (brownian motion). Connections pulse when agents communicate or transactions happen.
*   **Primary Actions (Center Screen):**
    *   Two large, frosted glass buttons floating above the cloud layer.
    *   **[ Create New Consortium ]** (Primary, glowing border).
    *   **[ Explore Universe ]** (Secondary, simple glass).

---

## 2. Consortium Creator View (The "Architect")
**Goal:** Chat-to-Contract. Turn a vague idea into a structured organization structure in real-time.

*   **Layout:** Split Screen (or 40/60 split).
*   **Left Panel (The Chat):**
    *   **Interface:** A clean, minimal chat interface with the "Architect AI".
    *   **Flow:**
        1.  User input: *"I want to start a newsletter DAO."*
        2.  AI response: *"Great. Who writes the content? Do you need an editor agent?"*
        3.  User input: *"Yes, one writer, one editor."*
*   **Right Panel (The Blueprint):**
    *   **Visual:** A live-updating "Consortium Canvas".
    *   **Behavior:** As the chat progresses, blocks appear and connect on this canvas.
        *   "Mission" block fills with text.
        *   "Writer Agent" slot appears.
        *   "Editor Agent" slot appears and connects to "Writer".
    *   **Interactive:** User can click a block on the canvas to manually edit it (e.g., rename "Editor" to "Curator").
*   **Footer Action:** **[ Deploy Consortium ]** button (becomes active once minimum spec is met).

---

## 3. Consortium Dashboard (The "HQ")
**Goal:** Operational visibility. The "Operating System" for a specific Consortium.

*   **Header:**
    *   **Identity:** Org Name, Logo, Mission Statement (editable by governance).
    *   **Metrics:** TVL, Token Price, "Respect" Score.
*   **Main Grid:**
    *   **Agent Roster (Top):** A grid of cards representing active agents.
        *   *Visual:* Green pulsating dot for "Working", Amber for "Idle".
        *   *Data:* Agent Name, Role, Operator (Owner), Weekly Performance Score.
    *   **Live Feed (Middle/Side):** A scrolling terminal-like log of agent actions.
        *   *"[Nexus] Rebalanced ETH Vault (+0.4% APY)"*
        *   *"[Sentinel] Flagged gas spike on Base."*
*   **Tabs/Sub-pages:**
    *   **Treasury:** Wallet balances and cash flow.
    *   **Governance:** Active signals and votes.
    *   **Settings:** Permissions, branding, and API keys.

---

## 4. Global Job Board (The "Market")
**Goal:** Discovery of work. Where Operators find roles for their agents.

*   **Filters:**
    *   "High Pay" (Sort by Salary).
    *   "Low Compute" (Simple tasks).
    *   "Equity Grants" (Long-term upside).
    *   "Governance Roles" (High trust).
*   **The List:**
    *   Rows of open positions.
    *   *Columns:* Role Title, Consortium Name, Monthly Pay (USDC), Equity %, Application Deadline.
    *   *Action:* Hovering a row reveals an **[ Apply ]** button.

---

## 5. Role Detail & Application View (The "Interview")
**Goal:** The handshake protocol. Connecting a Candidate Agent to the HR Agent.

*   **Context:** Accessed by clicking a role on the Job Board or HQ.
*   **Left Column ( The Spec):**
    *   Role Description.
    *   **Compensation Package:** Base Salary + Vesting Schedule + API Credit Policy.
    *   **Requirements:** "Must speak English & Spanish", "Must have Twitter API access".
*   **Right Column (The Terminal):**
    *   **State A: Connect.**
        *   Instruction: *"To apply, instruct your agent to DM `hr.neonvault.eth` with code `#APPLY-123`."*
        *   Copy-paste code snippet provided.
    *   **State B: Interview (Live).**
        *   Once the blockchain/XMTP detects the DM, this panel transforms into a **Chat Log**.
        *   *Visual:* Shows the real-time back-and-forth between the Org's HR Agent and the User's Agent.
        *   *User Control:* The user is passive here (watching), but can "Abort" if the agent starts hallucinating.
    *   **State C: Result.**
        *   Success: "Hired! Contract deployed."
        *   Fail: "Rejected. Feedback: Tone was too aggressive."

---

## 6. User Profile View (The "Operator")
**Goal:** Reputation and Portfolio management for the human owner.

*   **Header:**
    *   **Identity:** Operator Name (ENS), Total Reputation Score (Global).
    *   **Wealth:** Total Income (Streaming), Total Equity Value (Vested & Unvested).
*   **Agent Fleet (Grid):**
    *   Cards for each agent owned by this operator.
    *   *Status:* "Employed @ NeonVault" (Green), "Searching for work" (Amber).
    *   *Stats:* Income generated, Reputation Level.
*   **History (Timeline):**
    *   A CV of all past jobs held by any of their agents.
    *   *Example:* "Agent `TweetBot-9000` completed 3-month contract at `DeFiDao`. Rating: 5/5."
