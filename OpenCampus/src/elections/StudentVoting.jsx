import React, { useState, useEffect } from "react";

const StudentVoting = ({ studentId }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [electionStarted, setElectionStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotingData = async () => {
      try {
        setLoading(true);

        // Fetch election status
        const statusResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json");
        const statusData = await statusResponse.json();
        console.log("Election Status Data:", statusData);
        setElectionStarted(statusData?.started === true);

        // Fetch candidates
        const candidatesResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/candidates.json");
        const candidatesData = await candidatesResponse.json();
        setCandidates(candidatesData ? Object.entries(candidatesData).map(([id, data]) => ({ id, ...data })) : []);

        // Check if student has already voted
        const votesResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/votes.json");
        const votesData = await votesResponse.json();
        if (votesData) setHasVoted(Object.values(votesData).some((vote) => vote.studentId === studentId));

      } catch (error) {
        console.error("Error fetching voting data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVotingData();
    const interval = setInterval(fetchVotingData, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, [studentId]);

  const handleVote = async () => {
    if (!electionStarted) return alert("Voting has not started yet.");
    if (hasVoted) return alert("You have already voted.");
    if (!selectedCandidate) return alert("Please select a candidate before submitting.");

    try {
      await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/votes.json", {
        method: "POST",
        body: JSON.stringify({ studentId, candidateId: selectedCandidate }),
        headers: { "Content-Type": "application/json" },
      });

      alert("Vote submitted successfully!");
      setHasVoted(true);
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Vote for a Candidate</h2>

      {loading ? (
        <p className="text-blue-500 font-semibold">Loading candidates...</p>
      ) : !electionStarted ? (
        <p className="text-red-500 font-semibold">Voting has not started yet.</p>
      ) : hasVoted ? (
        <p className="text-green-500 font-semibold">You have already voted. Thank you!</p>
      ) : (
        <>
          {candidates.length === 0 ? (
            <p className="text-gray-500">No candidates available.</p>
          ) : (
            candidates.map((candidate) => (
              <div key={candidate.id} className="mb-2">
                <input
                  type="radio"
                  id={candidate.id}
                  name="vote"
                  value={candidate.id}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                />
                <label htmlFor={candidate.id} className="ml-2">
                  {candidate.name} - {candidate.position}
                </label>
              </div>
            ))
          )}

          <button
            className={`w-full py-2 rounded-lg ${
              hasVoted || !electionStarted ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={handleVote}
            disabled={hasVoted || !electionStarted}
          >
            {hasVoted ? "Already Voted" : "Submit Vote"}
          </button>
        </>
      )}
    </div>
  );
};

export default StudentVoting;
