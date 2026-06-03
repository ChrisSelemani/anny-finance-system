import { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, FileText, PlusCircle, User, LogOut, Shield, Home } from 'lucide-react';
import './Navbar.css';

function Navbar({ isAdmin, activePage, setActivePage, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = isAdmin ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agreements', label: 'Agreements', icon: FileText },
    { id: 'new', label: 'New Loan', icon: PlusCircle },
  ] : [
    { id: 'new', label: 'Apply for Loan', icon: PlusCircle },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo" onClick={() => handleNavClick('dashboard')}>
          <div className="logo-icon">💰</div>
          <div className="logo-text">
            <span className="logo-title">Anny Finance</span>
            <span className="logo-subtitle">Smart Loans, Better Future</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Admin/User Section */}
        <div className="nav-user">
          {!isAdmin ? (
            <a href="/admin" className="login-btn">
              <User size={18} />
              <span>Admin Login</span>
            </a>
          ) : (
            <div className="admin-info">
              <div className="admin-avatar">
                <Shield size={16} />
              </div>
              <div className="admin-details">
                <span className="admin-name">Admin</span>
                <span className="admin-role">Lender</span>
              </div>
              <button onClick={onLogout} className="logout-btn" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          {!isAdmin && (
            <a href="/admin" className="mobile-login-link" onClick={() => setIsMenuOpen(false)}>
              <User size={20} />
              <span>Admin Login</span>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;