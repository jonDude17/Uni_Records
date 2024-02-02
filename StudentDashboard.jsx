// StudentDashboard.jsx
import React from 'react';

const StudentDashboard = ({ privateKey }) => {
  const [studentData, setStudentData] = React.useState(null);

  const fetchData = () => {
    // Fetch student data from the blockchain using the private key
    // Replace with actual logic to fetch data from the blockchain
    // For simplicity, using a mock API call here
    fetch('/api/studentData', {
      headers: {
        Authorization: `Bearer ${privateKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStudentData(data))
      .catch((error) => console.error('Error fetching student data:', error));
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {studentData ? (
        <div>
          <p>Welcome, {studentData.name}!</p>
          <p>Student ID: {studentData.id}</p>
          <p>Grade: {studentData.grade}</p>
        </div>
      ) : (
        <p>Loading student data...</p>
      )}
      <button onClick={fetchData}>Fetch Student Data</button>
    </div>
  );
};

export default StudentDashboard;
