import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    // safety, if there is no job title or location, the function just exits and does nothing
    if (!jobTitle || !location) return;

    setLoading(true);
    setResult("");

    // fetching the HTTP request
    const response = await fetch("https://job-market-agent-6pjp.onrender.com/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_title: jobTitle, location: location }),
    });

    if (!response.ok) {
      const err = await response.json();
      setError(err.detail);
      setLoading(false);
      return;
    }
    setError("");

    const data = await response.json();

    // type out the result character by character to simulate streaming
    const text = data.result;
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 8));
      setResult(text.slice(0, i + 1));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col items-center">
      {/* header div */}
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Job Market Intelligence
          </h1>
          <p className="text-gray-400">
            Powered by AI — research any job market in seconds
          </p>
        </div>
        {error && (
          <div className="bg-red-900 text-red-300 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* input section */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg mb-6 border border-gray-800">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Job title (e.g. Frontend Developer)"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location (e.g. London)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? "Researching..." : "Research Market"}
            </button>
          </div>
        </div>

        {/*results section */}
        {result && (
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 !text-gray-400">
              Market Report
            </h2>
            <div className="text-gray-300 leading-relaxed prose prose-invert max-w-none prose-headings:text-center prose-p:text-left prose-li:text-left">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
