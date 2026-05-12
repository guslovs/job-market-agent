# Job Market Intelligence Agent

An AI-powered agent that researches the job market for any role and location, returning a structured report on in-demand skills, common requirements, and salary ranges — in seconds.

**Live demo: [job-market-agent-zeta.vercel.app](https://job-market-agent-zeta.vercel.app)**

---

## What It Does

You give it a job title and a location. The agent autonomously searches the web, decides what to look for, and synthesizes everything it finds into a clean, readable market report. No fixed steps — the agent reasons about what to search and when to stop.

---

## How It Works

The agent follows a **ReAct loop** (Reason, Act, Observe, repeat):

1. It receives a goal — research the job market for a given role and location
2. It reasons about what to search
3. It calls the Tavily search tool and observes the results
4. It repeats until it has enough information
5. It generates a structured report and streams it back to the frontend

The report types itself out word by word on the frontend, giving immediate feedback instead of a blank wait followed by a wall of text.

---

## Features

- Autonomous web research — the agent decides what to search and when it has enough
- Structured markdown report covering skills, requirements, and salary ranges
- Typing animation effect on the frontend for a responsive feel
- Error handling on both the backend and frontend
- Deployed on Render (backend) and Vercel (frontend)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Agent framework | LangGraph |
| LLM | OpenAI GPT (via LangChain) |
| Search tool | Tavily |
| Backend | FastAPI + Uvicorn |
| Frontend | React + Tailwind CSS |
| Deployment | Render (API) + Vercel (UI) |

---

## Project Structure

```
job-market-agent/
├── backend/
│   ├── agent.py          # LangGraph ReAct agent and Tavily tool
│   ├── main.py           # FastAPI server with /research endpoint and error handling
│   └── requirements.txt
└── frontend/
    └── src/
        └── App.jsx       # React UI with input form, markdown report display, typing animation
```

---

## Running Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- OpenAI API key
- Tavily API key (free tier at tavily.com)

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
```

Start the server:

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## Example Output

**Input:** AI Engineer — Berlin

**Output:**
- 400+ active job listings on major platforms
- Top skills: Python, PyTorch, AWS, Docker, LangChain
- Common requirements: 2+ years experience, ML fundamentals, cloud deployment
- Salary range: €60,000 – €110,000 depending on seniority

---

## Key Concepts

**ReAct (Reason + Act)** — an agent pattern where the LLM alternates between reasoning about what to do next and taking actions (tool calls), observing the results before deciding the next step. This allows the agent to adapt its search strategy based on what it finds rather than following a fixed script.

**LangGraph** — a framework for building stateful, multi-step agent workflows as graphs. Used here to implement the ReAct loop with a prebuilt `create_react_agent` that manages the tool call cycle automatically.

**Tavily** — a search API designed for LLM agents, returning clean, structured results without the noise of a raw web scrape.
