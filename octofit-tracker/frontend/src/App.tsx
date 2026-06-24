import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier fitness tracking with React, TypeScript, and MongoDB.</p>
      <p>
        This UI consumes the backend API using <code>VITE_CODESPACE_NAME</code> to build the correct Codespaces URL.
      </p>
      <p className="text-muted">
        If <code>VITE_CODESPACE_NAME</code> is unset, the app falls back to <code>http://localhost:8000/api</code>.
      </p>
      <p className="text-muted">
        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when running inside GitHub Codespaces.
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="container py-5">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="container py-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mb-4">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {navItems.map((item) => (
                  <li key={item.path} className="nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
