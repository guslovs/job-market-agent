from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent import run_agent

# this creates the application
app = FastAPI()

# allowing React frontend to make requests to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ResearchRequest(BaseModel):
    job_title: str
    location: str
    
# gets the needed data for run_agent to work, after it finishes it returns an answer
@app.post("/research")
def research(body: ResearchRequest):
    answer = run_agent(body.job_title, body.location)
    return {"result": answer}