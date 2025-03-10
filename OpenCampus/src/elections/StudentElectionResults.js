import React, { useState, useEffect } from "react";

const StudentElectionResults = () => {
  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState({});
  const [electionEnded, setElectionEnded] = useState(false);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        // Fetch election status
        const statusResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json");
        const statusData = await statusResponse.json();

        if (statusData && statusData.ended) {
          setElectionEnded(true);

          // Fetch candidates
          const candidatesResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/candidates.json");
          const candidatesData = await candidatesResponse.json();

          if (candidatesData) {
            setCandidates(Object.entries(candidatesData).map(([id, data]) => ({ id, ...data })));
          }

          // Fetch votes and calculate results
          const votesResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/votes.json");
          const votesData = await votesResponse.json();
          const voteCounts = {};

          if (votesData) {
            Object.values(votesData).forEach((vote) => {
              if (vote.candidateId) {
                voteCounts[vote.candidateId] = (voteCounts[vote.candidateId] || 0) + 1;
              }
            });
          }

          setResults(voteCounts);
        }
      } catch (error) {
        console.error("Error fetching election results:", error);
      }
    };

    fetchElectionData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-2xl mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center">Election Results</h2>

      {electionEnded ? (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-3">Final Results</h3>
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id} className="border-b py-2 flex justify-between">
                <span className="font-semibold">{candidate.name} ({candidate.position})</span>
                <span className="text-blue-600 font-bold">{results[candidate.id] || 0} votes</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 font-semibold">Election results will be available after voting ends.</p>
      )}
    </div>
  );
};

export default StudentElectionResults;
