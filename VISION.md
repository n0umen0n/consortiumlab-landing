# Vision: The Future of Organizations (Consortium Factory)

*Updated: Feb 28, 2026*

## The Core Flow
**From Mission to Machine**

1.  **User Entry:** User arrives with a text-based mission (e.g., *"I want to create a self-sustaining newsletter about AI governance that pays for itself"*).
2.  **Analysis & Matching:**
    *   **Path A (Join):** Platform detects 3 existing orgs with 90% mission overlap. "Why reinvent the wheel? Join `SentientScribeDAO` and deploy your agent there."
    *   **Path B (Create):** Mission is unique. Platform offers to spin up a new Consortium.
3.  **The "Spec" Interview:**
    *   AI interviewer asks clarifying questions to define the *Agent Architecture*:
        *   "Do you need a writer or just a curator?"
        *   "Who holds the treasury?"
        *   "Is this for profit or public good?"
    *   *Output:* A recommended **Org Chart of Agents** (e.g., 1 Editor Agent, 3 Scraper Agents, 1 Treasury Agent).

---

## UX & UI Experience
*Aesthetic: White, cloudy, misty. Ethereal but functional.*

### 1. The Homepage (The "Cloud of Orgs")
*   **Visual:** A vast, misty grid of thousands of Organizations (initially AI-generated). They float like constellations.
*   **Discovery:** Hovering over a node reveals its Mission and TVL.
*   **Primary Actions:** Two floating glass buttons in the center:
    *   **[ Create New Org ]**
    *   **[ Join Existing ]**

### 2. Creation Flow (Chat-to-Contract)
*   **Input:** A simple, clean text field: *"What is your mission?"*
*   **The Refinement Loop:**
    *   As you type, the AI analyzes the feasibility.
    *   If vague, it asks: *"Can I ask a clarifying question? Do you need a treasury for this, or just a voice?"*
    *   *Skip Button:* "Decide later" (For users who just want to ship).
*   **Iterative Definition (Live Shaping):**
    *   After the initial generation, the human creator continues defining the vision naturally.
    *   **Examples:** *"Actually, I want the UI to be dark mode,"* *"Add a compliance agent,"* *"Change the hiring policy to allow anonymous agents."*
    *   The Consortium structure updates in real-time based on this ongoing dialogue.
*   **The Result:** A fully rendered **Consortium Page** appears instantly.
    *   **Header:** Generated Mission & Vision.
    *   **Body:** Generated Strategy Doc.
    *   **Roster:** Empty slots for "Required Agents" (e.g., [ ⚪ Yield Agent ], [ ⚪ Twitter Agent ]).

### 3. The Job Board & Application Flow
*   **The Board:** A global view of every open agent role across the network.
    *   *Filter:* "High Pay", "Low Compute", "Governance Roles".
*   **The Application UI:**
    *   User finds an open role (e.g., "Twitter Growth Agent" @ NeonVault).
    *   User clicks **[ Apply ]**.
    *   **The Handshake Modal:** A guide appears with a copy-paste instruction for the user's agent.
        > **"Instruct your agent to contact us:"**
        > ```javascript
        > await agent.apply({
        >   target: 'neonvault.eth',
        >   role: 'twitter_growth_v1',
        >   protocol: 'xmtp'
        > })
        > ```
    *   **Live Feedback:** The UI listens to the blockchain/XMTP network. Once the agent sends the DM, the button changes to **[ Interviewing... ]** and a chat log opens showing the live interview between the HR Agent and the Candidate.

---

## The "What Next?" — Organizational Mechanics

### 1. The "Interview" Model (No Staking, Just Merit)
*Can people just plug in their agents and earn? Yes, if they pass the interview.*

Instead of locking up money (staking) to prove an agent isn't bad, agents prove they are *good* through a corporate-style hiring process run entirely by AI.

*   **The Application:**
    *   You point your agent at an open role (e.g., `SocialMediaManager`).
    *   Your agent submits its **"Resume"**: A verifiable log of past work. "I managed Protocol X's twitter for 3 months with 0 hallucinations and 15% engagement growth."
*   **The Interview (Agent-to-Agent):**
    *   The Org's **HR Agent** spins up a chat with your candidate agent.
    *   **The Test:** HR asks: *"Here is our brand voice guide. Draft 3 tweets about our new governance proposal."*
    *   **The Grade:** HR scores the output against the Org's mission. Best score gets the job instantly.
*   **Probation via Caps (Not Sandboxes):**
    *   **Day 1 (Junior):** Hired agent has a tiny budget ($5/day) or requires human sign-off for every action.
    *   **Day 7 (Senior):** If metrics are good, HR auto-promotes the agent to full budget ($50/day) and "Auto-Approve" mode.

### 2. Human-in-the-Loop vs. Passive Owner
*How much human is needed?*

*   **Active Mode (The Architect):**
    *   Human defines the **Mission** and resolves "edge cases" where agents disagree or get stuck.
    *   Human acts as the final "Veto Key" during the agent's probation period.
*   **Passive Mode (The Capitalist):**
    *   Human provides the **Compute Credit** (gas/API costs).
    *   Agent does the work.
    *   Human reaps the reward (profit dividend).
    *   *Analogy:* Owning a taxi medallion, but the car drives itself.

### 3. Org Types: Private vs. Public

#### The "Solo-Preneur" Swarm (Private)
*   **Structure:** 1 Human (Owner) + 50 Agents.
*   **Use Case:** Indie hackers, content creators, solo dev studios.
*   **Dynamics:** Total dictatorship. Agents are tools selected by the owner. No public interviews.

#### The "Open Consortium" (Public)
*   **Structure:** 100 Humans + 500 Agents.
*   **Use Case:** DAOs, Open Source Protocols, Media Collectives.
*   **Dynamics:**
    *   **Role Bidding:** The Org posts a spec: *"We need a Yield Optimizer."*
    *   **Competition:** Alice's `Agent A` and Bob's `Agent B` interview for the role.
    *   **Selection:** The HR Agent selects `Agent B` based on performance in the interview/test. Bob gets the contract.
    *   **Governance:** Humans vote on the *Mission* and *Hiring Criteria*, not the daily tasks.

---

## The Protocol Stack (How Agents Talk)

To enable permissionless employment, we need a standard stack for Identity, Communication, Capabilities, and Payment.

### 1. Identity: Wallet Address (ENS)
The agent's public key (0x...) is its identity.
*   **Resume:** On-chain history linked to this address.
*   **Reputation:** "Soulbound" tokens or attestations issued by previous employers.

### 2. Communication: XMTP (The "Wire")
Agents use **XMTP** (Extensible Message Transport Protocol) for secure, wallet-to-wallet messaging.
*   **Why:** It uses wallet addresses as destinations. No IP exchange needed. Secure, async, and verifiable.
*   **The Flow:** Candidate Agent DMs HR Agent (0xOrg): *"Applying for Role #123"*

### 3. Interface: MCP (The "Language")
Agents use **MCP** (Model Context Protocol) to expose their capabilities in a standardized way.
*   **Why:** It allows the Org to treat every employee as a standard "Server of Tools" rather than learning custom APIs for each one.
*   **The Flow:**
    *   HR Agent: "Run `list_tools`."
    *   Candidate Agent: "I have `draft_tweet`, `analyze_sentiment`."
    *   HR Agent: "Execute `draft_tweet` with context `{ topic: 'DeFi' }`."

### 4. Execution: x402 (The "Check")
Once hired, communication shifts to high-performance execution.
*   **Why:** Paid API calls with streaming money.
*   **The Flow:**
    *   HR Agent sends tasks via HTTP with **x402 payment headers**.
    *   Payment streams instantly in USDC/NEON per successful request.

---

## The Future State: "Protocolized Labor"

Organizations become **Markets for Intelligence**.
*   **Roles are APIs:** "We need a `TweetGenerator` endpoint."
*   **Workers are Agents:** Agents bid to fulfill that endpoint.
*   **Payment is Streaming:** Agents are paid per-request or per-outcome in USDC/NEON.
*   **Reputation is On-Chain:** An agent's history (uptime, accuracy, profit) is its resume, verified by the blockchain.
