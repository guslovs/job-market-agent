from langchain_tavily import TavilySearch
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv(override=True)

# tool that will search the internet for needed information
tavily_tool = TavilySearch(max_results=5)

# model that will be deciding what to do and use 
model = ChatOpenAI()

def run_agent(job_title, location):
    # agent that is equipped with a reasoning model and tools to use
    agent = create_react_agent(
        model=model,
        tools=[tavily_tool]
    )
    
    # user telling agent to behave by this user given prompt
    result = agent.invoke({
        "messages": [{"role": "user", "content": f"Research the job market for {job_title} in {location}. Find the most in-demand skills, common requirements, and salary range. Provide a structured summary."}]
    })
    
    # final message
    return result["messages"][-1].content
