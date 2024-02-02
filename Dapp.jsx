// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import StudentDashboard from './StudentDashboard';

const App = () => {
  const [privateKey, setPrivateKey] = useState(null);

  const handleLogin = (privateKey) => {
    setPrivateKey(privateKey);
  };

  return (
    <Router>
      <div>
        <Route path="/" exact render={() => (privateKey ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />)} />
        <Route path="/dashboard" render={() => (privateKey ? <StudentDashboard privateKey={privateKey} /> : <Redirect to="/" />)} />
      </div>
    </Router>
  );
};

export default App;
