import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier fitness tracking with React, TypeScript, and MongoDB.</p>
      <Link to="/about" className="btn btn-primary">About</Link>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h1>About</h1>
      <p>Use this app to track workouts, activity, teams, and leaderboards.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
