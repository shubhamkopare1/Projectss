// import React, { useState, useEffect } from "react";

// const AdminElectionDashboard = () => {
//   const [electionDate, setElectionDate] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const [electionStarted, setElectionStarted] = useState(false);
//   const [electionEnded, setElectionEnded] = useState(false);
//   const [results, setResults] = useState({});

//   useEffect(() => {
//     const fetchElectionData = async () => {
//       try {
//         const statusResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json");
//         const statusData = await statusResponse.json();

//         if (statusData) {
//           setElectionStarted(statusData.started || false);
//           setElectionEnded(statusData.ended || false);
//           if (statusData.ended) {
//             await calculateResults();
//           }
//         }

//         const candidatesResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/candidates.json");
//         const candidatesData = await candidatesResponse.json();
//         if (candidatesData) {
//           setCandidates(Object.entries(candidatesData).map(([id, data]) => ({ id, ...data })));
//         }
//       } catch (error) {
//         console.error("Error fetching election data:", error);
//       }
//     };

//     fetchElectionData();
//     const interval = setInterval(fetchElectionData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleStartElection = async () => {
//     try {
//       await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json", {
//         method: "PATCH",
//         body: JSON.stringify({ started: true, ended: false }),
//         headers: { "Content-Type": "application/json" },
//       });

//       alert("Election started!");
//       setElectionStarted(true);
//     } catch (error) {
//       console.error("Error starting election:", error);
//     }
//   };

//   const handleEndElection = async () => {
//     try {
//       await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json", {
//         method: "PATCH",
//         body: JSON.stringify({ ended: true }),
//         headers: { "Content-Type": "application/json" },
//       });

//       setElectionEnded(true);
//       await calculateResults();
//       alert("Election has ended! Results are now visible.");
//     } catch (error) {
//       console.error("Error ending election:", error);
//     }
//   };

//   const calculateResults = async () => {
//     try {
//       const votesResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/votes.json");
//       const votesData = await votesResponse.json();
//       const voteCounts = {};

//       if (votesData) {
//         Object.values(votesData).forEach((vote) => {
//           if (vote.candidateId) {
//             voteCounts[vote.candidateId] = (voteCounts[vote.candidateId] || 0) + 1;
//           }
//         });
//       }

//       setResults(voteCounts);
//     } catch (error) {
//       console.error("Error fetching votes:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-2xl mx-auto transition-all duration-300">
//       <h2 className="text-2xl font-bold mb-4">Admin Election Dashboard</h2>

//       <div className="mb-4">
//         <label className="block text-lg font-semibold mb-2">Set Election Date:</label>
//         <input
//           type="date"
//           className="p-2 w-full border rounded-md disabled:bg-gray-300"
//           value={electionDate}
//           onChange={(e) => setElectionDate(e.target.value)}
//           disabled={electionStarted}
//         />
//       </div>

//       {!electionStarted ? (
//         <button
//           className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
//           onClick={handleStartElection}
//         >
//           Start Election
//         </button>
//       ) : (
//         <p className="text-green-600 font-semibold text-center">Election is Live!</p>
//       )}

//       <h3 className="text-xl font-bold mt-4 mb-3">Registered Candidates</h3>
//       <ul className="bg-white p-4 rounded-md shadow-md">
//         {candidates.length > 0 ? (
//           candidates.map((candidate) => (
//             <li key={candidate.id} className="border-b py-2">
//               <strong>{candidate.name}</strong> - {candidate.position}
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No candidates registered.</p>
//         )}
//       </ul>

//       {!electionEnded ? (
//         <button
//           className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
//           onClick={handleEndElection}
//         >
//           End Election & Show Results
//         </button>
//       ) : (
//         <div className="mt-4 p-4 bg-white rounded-md shadow-md">
//           <h3 className="text-xl font-bold mb-3">Election Results</h3>
//           <ul>
//             {candidates.map((candidate) => (
//               <li key={candidate.id} className="border-b py-2">
//                 <strong>{candidate.name}</strong> - {results[candidate.id] || 0} votes
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminElectionDashboard;


import React, { useState, useEffect } from "react";

const AdminElectionDashboard = () => {
  const [electionDate, setElectionDate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [electionStarted, setElectionStarted] = useState(false);
  const [electionEnded, setElectionEnded] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        // Fetch election status
        const statusResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json");
        const statusData = await statusResponse.json();

        if (statusData) {
          setElectionStarted(statusData.started || false);
          setElectionEnded(statusData.ended || false);
          if (statusData.ended) {
            await calculateResults();
          }
        }

        // Fetch candidates
        const candidatesResponse = await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/candidates.json");
        const candidatesData = await candidatesResponse.json();
        if (candidatesData) {
          setCandidates(Object.entries(candidatesData).map(([id, data]) => ({ id, ...data })));
        }
      } catch (error) {
        console.error("Error fetching election data:", error);
      }
    };

    fetchElectionData();
    const interval = setInterval(fetchElectionData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartElection = async () => {
    try {
      await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json", {
        method: "PATCH",
        body: JSON.stringify({ started: true, ended: false }),
        headers: { "Content-Type": "application/json" },
      });

      setElectionStarted(true);
      setElectionEnded(false); // Ensure it's not marked as ended
      alert("Election started!");
    } catch (error) {
      console.error("Error starting election:", error);
    }
  };

  const handleEndElection = async () => {
    try {
      await fetch("https://voting-69b4e-default-rtdb.firebaseio.com/status.json", {
        method: "PATCH",
        body: JSON.stringify({ started: false, ended: true }), // Ensure started is false
        headers: { "Content-Type": "application/json" },
      });

      setElectionStarted(false); // Update UI state immediately
      setElectionEnded(true);
      await calculateResults();
      alert("Election has ended! Results are now visible.");
    } catch (error) {
      console.error("Error ending election:", error);
    }
  };

  const calculateResults = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-2xl mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4">Admin Election Dashboard</h2>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Set Election Date:</label>
        <input
          type="date"
          className="p-2 w-full border rounded-md disabled:bg-gray-300"
          value={electionDate}
          onChange={(e) => setElectionDate(e.target.value)}
          disabled={electionStarted}
        />
      </div>

      {!electionStarted && !electionEnded ? (
        <button
          className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
          onClick={handleStartElection}
        >
          Start Election
        </button>
      ) : electionStarted && !electionEnded ? (
        <p className="text-green-600 font-semibold text-center">Election is Live!</p>
      ) : (
        <p className="text-red-600 font-semibold text-center">Election has ended!</p>
      )}

      <h3 className="text-xl font-bold mt-4 mb-3">Registered Candidates</h3>
      <ul className="bg-white p-4 rounded-md shadow-md">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <li key={candidate.id} className="border-b py-2">
              <strong>{candidate.name}</strong> - {candidate.position}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No candidates registered.</p>
        )}
      </ul>

      {!electionEnded ? (
        <button
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          onClick={handleEndElection}
        >
          End Election & Show Results
        </button>
      ) : (
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-3">Election Results</h3>
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id} className="border-b py-2">
                <strong>{candidate.name}</strong> - {results[candidate.id] || 0} votes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminElectionDashboard;
