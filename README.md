# Job Market Intelligence Agent

An AI-powered agent that researches the job market for any role and location, returning a structured report on in-demand skills, common requirements, and salary ranges — in seconds.

## What it does

You give it a job title and a location. The agent autonomously searches the web, decides what to look for, and synthesizes everything it finds into a clean, readable market report. No fixed steps — the agent reasons about what to search and when to stop.

## How it works

The agent follows a **ReAct loop** (Reason, Act, Observe, repeat):

1. It receives a goal — research the job market for a given role and location
2. It reasons about what to search
3. It calls the Tavily search tool and observes the results
4. It repeats until it has enough information
5. It generates a structured report and returns it

## Tech Stack

| Layer | Technology |
|---|---|
| Agent framework | LangGraph |
| LLM | OpenAI GPT (via LangChain) |
| Search tool | Tavily |
| Backend | FastAPI + Uvicorn |
| Frontend | React + Tailwind CSS |

## Project Structure

```
job-market-agent/
├── backend/
│   ├── agent.py          # LangGraph ReAct agent and Tavily tool
│   ├── main.py           # FastAPI server with /research endpoint
│   └── requirements.txt
└── frontend/
    └── src/
        └── App.jsx       # React UI with input form and markdown report display
```

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

## Example Output

**Input:** AI Engineer — Berlin

**Output:**
- 400+ active job listings on major platforms
- Top skills: Python, PyTorch, AWS, Docker, LangChain
- Common requirements: 2+ years experience, ML fundamentals, cloud deployment
- Salary range: €60,000 – €110,000 depending on seniority
