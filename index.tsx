import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- MOCK DATA ---
const mockData = {
  kpis: [
    { title: 'Overall Farm Health', value: '98%', trend: 'up' },
    { title: 'Soil Moisture', value: '65%', trend: 'stable' },
    { title: 'Harvest Forecast', value: '1.2M tons', trend: 'up' },
    { title: 'Active Sprayers', value: '12', trend: 'down' },
  ],
  farms: [
    { name: 'Green Valley Fields', location: 'Central Valley, CA' },
    { name: 'Sunrise Acres', location: 'Plains, GA' },
    { name: 'Northern Ridge', location: 'Willamette Valley, OR' },
    { name: 'Evergreen Pastures', location: 'Lancaster, PA'},
  ],
  crops: [
    { name: 'Corn (Maize)', status: 'Growing', health: '99%' },
    { name: 'Soybeans', status: 'Flowering', health: '97%' },
    { name: 'Wheat', status: 'Harvest Ready', health: '95%' },
    { name: 'Canola', status: 'Vegetative', health: '98%' },
  ],
};

// --- Sign In Form Component ---
const SignInForm = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    setError('');
    // Simulate login and fetch company name
    onLoginSuccess('AgriFuture Inc.'); 
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Welcome Back to PrecisionAg</h1>
        <p>Sign in to access your dashboard and manage your operations.</p>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            aria-label="Email Address"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            aria-label="Password"
          />
        </div>
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
      <div className="form-footer">
        <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToRegister(); }}>Create one</a></p>
      </div>
    </div>
  );
};


// --- Registration Form Component ---
const RegistrationForm = ({ onRegisterSuccess, onNavigateToSignIn }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { companyName, fullName, email, password, confirmPassword } = formData;
    if (!companyName || !fullName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // In a real app, you'd have more robust validation.
    setError('');
    console.log('Form submitted:', formData);
    onRegisterSuccess(formData.companyName);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Create Your PrecisionAg Account</h1>
        <p>Join the future of farming. Gain access to real-time data and analytics for your fields.</p>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g., AgriFuture Inc."
            required
            aria-label="Company Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g., Jane Doe"
            required
            aria-label="Full Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            aria-label="Email Address"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            aria-label="Password"
          />
        </div>
         <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            aria-label="Confirm Password"
          />
        </div>
        <button type="submit" className="submit-btn">Create Account</button>
      </form>
      <div className="form-footer">
        <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToSignIn(); }}>Sign In</a></p>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
const Dashboard = ({ companyName, onLogout }) => {
  return (
    <div className="dashboard-container">
       <header className="dashboard-header">
         <h1>{companyName} Dashboard</h1>
         <button onClick={onLogout} className="logout-btn">Log Out</button>
       </header>

       <section className="kpi-grid" aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
        {mockData.kpis.map(kpi => (
          <div key={kpi.title} className="kpi-card">
            <h3>{kpi.title}</h3>
            <p>{kpi.value}</p>
          </div>
        ))}
       </section>
      
       <div className="dashboard-content">
         <section className="data-section" aria-labelledby="farms-heading">
           <h2 id="farms-heading">My Farms</h2>
           <ul className="data-list">
             {mockData.farms.map(farm => (
               <li key={farm.name}>
                 <strong>{farm.name}</strong>
                 <span>{farm.location}</span>
               </li>
             ))}
           </ul>
         </section>
         <section className="data-section" aria-labelledby="crops-heading">
           <h2 id="crops-heading">Active Crops</h2>
           <ul className="data-list">
              {mockData.crops.map(crop => (
                <li key={crop.name}>
                  <strong>{crop.name}</strong>
                  <span>{crop.status} - {crop.health} Health</span>
                </li>
              ))}
           </ul>
         </section>
       </div>
    </div>
  );
};


// --- Main App Component ---
const App = () => {
  const [view, setView] = useState('signIn'); // 'signIn', 'register', 'dashboard'
  const [companyName, setCompanyName] = useState('');

  const handleLoginSuccess = (name) => {
    setCompanyName(name);
    setView('dashboard');
  };
  
  const handleRegisterSuccess = (name) => {
    setCompanyName(name);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCompanyName('');
    setView('signIn');
  };

  const navigateToRegister = () => setView('register');
  const navigateToSignIn = () => setView('signIn');

  const renderView = () => {
    switch(view) {
      case 'dashboard':
        return <Dashboard companyName={companyName} onLogout={handleLogout} />;
      case 'register':
        return <RegistrationForm onRegisterSuccess={handleRegisterSuccess} onNavigateToSignIn={navigateToSignIn} />;
      case 'signIn':
      default:
        return <SignInForm onLoginSuccess={handleLoginSuccess} onNavigateToRegister={navigateToRegister} />;
    }
  };

  return (
    <main className="container">
      {renderView()}
    </main>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);