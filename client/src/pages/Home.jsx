// import { useState, useEffect } from 'react';
// import { FileText, Download, Trash2, Plus, X, User, Mail, Phone, MapPin, DollarSign, Calendar, CheckCircle, AlertCircle, Heart } from 'lucide-react';
// import { api } from '../services/api';
// import SignaturePad from '../components/SignaturePad';
// import Navbar from '../components/Navbar';
// import './Home.css';

// function Home({ isAdmin: propIsAdmin, onLogout }) {
//   const [agreements, setAgreements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [activePage, setActivePage] = useState('new');
//   const [borrowerPhoto, setBorrowerPhoto] = useState(null);
//   const [digitalSignature, setDigitalSignature] = useState(null);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [downloading, setDownloading] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(propIsAdmin || false);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const loanTermOptions = [
//     "2 weeks", "3 weeks", "1 month", "1 month and one week",
//     "1 month and two weeks", "1 month and three weeks", "2 months", "3 months"
//   ];

//   // Hero Slider Images - Using local images from public/images/
//   const slides = [
//     {
//       image: "/images/slide1.jpg",
//       title: "Get Your Loan Today",
//       subtitle: "Fast approval, flexible terms, and competitive rates"
//     },
//     {
//       image: "/images/slide2.jpg",
//       title: "Quick Disbursement",
//       subtitle: "Receive funds within 24 hours of approval"
//     },
//     {
//       image: "/images/slide3.jpg",
//       title: "Flexible Repayment",
//       subtitle: "Choose terms that work for you"
//     }
//   ];

//   const [formData, setFormData] = useState({
//     borrower_name: '', borrower_email: '', borrower_phone: '', borrower_address: '',
//     principal_amount: '', repayment_amount: '', interest_rate: 0, loan_term: '1 month', notes: ''
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     checkAdminStatus();
//   }, []);

//   useEffect(() => {
//     if (isAdmin) loadAgreements();
//   }, [isAdmin]);

//   const checkAdminStatus = async () => {
//     // If admin status came from props, use it
//     if (propIsAdmin) {
//       setIsAdmin(true);
//       setActivePage('dashboard');
//       loadAgreements();
//       return;
//     }
    
//     // Check for manual logout flag
//     if (sessionStorage.getItem('manualLogout')) {
//       sessionStorage.removeItem('manualLogout');
//       setIsAdmin(false);
//       setActivePage('new');
//       return;
//     }
    
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
//         credentials: 'include'
//       });
//       if (response.status === 401) {
//         setIsAdmin(false);
//         setActivePage('new');
//         return;
//       }
//       const data = await response.json();
//       setIsAdmin(data.success === true);
//       setActivePage(data.success === true ? 'dashboard' : 'new');
//       if (data.success === true) loadAgreements();
//     } catch (error) {
//       console.error('Check admin status error:', error);
//       setIsAdmin(false);
//       setActivePage('new');
//     }
//   };

//   const loadAgreements = async () => {
//     if (!isAdmin) return;
//     const result = await api.getAgreements();
//     if (result.success) setAgreements(result.data);
//     setLoading(false);
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBorrowerPhoto(reader.result);
//         showMessage('✓ Photo uploaded!', 'success');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSignatureSave = (signatureData) => {
//     setDigitalSignature(signatureData);
//     showMessage('✓ Signature saved!', 'success');
//   };

//   const handleSignatureClear = () => setDigitalSignature(null);

//   const showMessage = (text, type) => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: '', type: '' }), 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!borrowerPhoto) return showMessage('❌ Please upload borrower photo', 'error');
//     if (!digitalSignature) return showMessage('❌ Please provide digital signature', 'error');
    
//     showMessage('Creating agreement...', 'info');
//     const agreementData = {
//       ...formData,
//       principal_amount: parseFloat(formData.principal_amount),
//       repayment_amount: parseFloat(formData.repayment_amount),
//       interest_rate: parseFloat(formData.interest_rate),
//       loan_term: formData.loan_term,
//       borrower_photo: borrowerPhoto,
//       digital_signature: digitalSignature,
//     };
    
//     const result = await api.createAgreement(agreementData);
//     if (result.success) {
//       showMessage('✅ Agreement created successfully!', 'success');
//       setFormData({
//         borrower_name: '', borrower_email: '', borrower_phone: '', borrower_address: '',
//         principal_amount: '', repayment_amount: '', interest_rate: 0, loan_term: '1 month', notes: ''
//       });
//       setBorrowerPhoto(null);
//       setDigitalSignature(null);
//       if (isAdmin) loadAgreements();
//     } else {
//       showMessage('❌ Error: ' + result.error, 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!isAdmin) return showMessage('❌ Admin login required', 'error');
//     if (window.confirm('Delete this agreement?')) {
//       const result = await api.deleteAgreement(id);
//       if (result.success) {
//         loadAgreements();
//         showMessage('✅ Agreement deleted', 'success');
//       } else {
//         showMessage('❌ ' + result.error, 'error');
//       }
//     }
//   };

//   const handleDownloadPDF = async (agreement) => {
//     if (!isAdmin) return showMessage('❌ Admin login required', 'error');
//     setDownloading(true);
//     showMessage('📄 Generating PDF...', 'info');
//     try {
//       const { generateAgreementPDF } = await import('../services/pdfGenerator');
//       const pdf = await generateAgreementPDF(agreement, agreement.borrower_photo, agreement.digital_signature);
//       pdf.save(`Loan_Agreement_${agreement.agreement_id}.pdf`);
//       showMessage('✅ PDF downloaded successfully!', 'success');
//     } catch (error) {
//       showMessage('❌ Error generating PDF', 'error');
//     }
//     setDownloading(false);
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
//         method: 'POST',
//         credentials: 'include'
//       });
//     } catch (error) {
//       console.error('Logout API error:', error);
//     }
    
//     // Clear all admin state
//     setIsAdmin(false);
//     setActivePage('new');
    
//     // Clear all storage
//     localStorage.removeItem('isAdmin');
//     localStorage.removeItem('adminUsername');
//     sessionStorage.setItem('manualLogout', 'true');
//     sessionStorage.clear();
    
//     showMessage('✅ Logged out successfully', 'success');
    
//     // Call the onLogout prop from App if it exists
//     if (onLogout) {
//       onLogout();
//     }
    
//     // Force reload to clear all state
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   };

//   const formatCurrency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
//   const getLoanTerm = (agreement) => agreement.loan_term || (agreement.loan_term_months ? agreement.loan_term_months + ' months' : 'Not specified');

//   const statistics = {
//     total: agreements.length,
//     totalAmount: agreements.reduce((sum, a) => sum + (a.principal_amount || 0), 0),
//     active: agreements.filter(a => a.status === 'active').length,
//   };

//   return (
//     <div className="app-container">
//       {message.text && (
//         <div className={`toast-message ${message.type}`}>
//           {message.type === 'success' && <CheckCircle size={20} />}
//           {message.type === 'error' && <AlertCircle size={20} />}
//           <span>{message.text}</span>
//         </div>
//       )}

//       <Navbar isAdmin={isAdmin} activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />

//       {isAdmin && (
//         <div className="admin-banner">
//           <CheckCircle size={16} />
//           <span>Admin Mode Active - You can manage all agreements</span>
//         </div>
//       )}

//       {!isAdmin && (
//         <div className="public-view">
//           <div className="hero-slider">
//             {slides.map((slide, index) => (
//               <div 
//                 key={index}
//                 className={`slide ${currentSlide === index ? 'active' : ''}`}
//                 style={{ 
//                   backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${slide.image})`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center'
//                 }}
//               >
//                 <div className="slide-content">
//                   <h1>{slide.title}</h1>
//                   <p>{slide.subtitle}</p>
//                 </div>
//               </div>
//             ))}
//             <div className="slide-dots">
//               {slides.map((_, index) => (
//                 <button key={index} className={`dot ${currentSlide === index ? 'active' : ''}`} onClick={() => setCurrentSlide(index)} />
//               ))}
//             </div>
//           </div>

//           <div className="create-agreement-page">
//             <div className="page-header">
//               <h2>Apply for Loan Agreement</h2>
//               <p>Fill out the form below to apply for a loan</p>
//             </div>
//             <form onSubmit={handleSubmit} className="agreement-form">
//               <div className="form-section">
//                 <h3>Personal Information</h3>
//                 <div className="form-group">
//                   <label>Your Photo *</label>
//                   <input type="file" accept="image/*" onChange={handlePhotoUpload} required />
//                   {borrowerPhoto && <div className="photo-preview"><img src={borrowerPhoto} alt="Preview" /></div>}
//                 </div>
//                 <div className="form-group">
//                   <label>Full Name *</label>
//                   <input type="text" name="borrower_name" value={formData.borrower_name} onChange={handleChange} required />
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Email *</label>
//                     <input type="email" name="borrower_email" value={formData.borrower_email} onChange={handleChange} required />
//                   </div>
//                   <div className="form-group">
//                     <label>Phone *</label>
//                     <input type="tel" name="borrower_phone" value={formData.borrower_phone} onChange={handleChange} required />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Address</label>
//                   <input type="text" name="borrower_address" value={formData.borrower_address} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Loan Details (EUR €)</h3>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Principal Amount (€) *</label>
//                     <input type="number" name="principal_amount" value={formData.principal_amount} onChange={handleChange} required placeholder="1000" />
//                   </div>
//                   <div className="form-group">
//                     <label>Repayment Amount (€) *</label>
//                     <input type="number" name="repayment_amount" value={formData.repayment_amount} onChange={handleChange} required placeholder="1200" />
//                   </div>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Interest Rate (%)</label>
//                     <input type="number" name="interest_rate" value={formData.interest_rate} onChange={handleChange} step="0.5" placeholder="0" />
//                   </div>
//                   <div className="form-group">
//                     <label>Loan Term *</label>
//                     <select name="loan_term" value={formData.loan_term} onChange={handleChange} required>
//                       {loanTermOptions.map(term => <option key={term} value={term}>{term}</option>)}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Additional Notes</label>
//                   <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Any special conditions..." />
//                 </div>
//               </div>

//               <div className="form-section">
//                 <h3>Digital Signature *</h3>
//                 <SignaturePad onSave={handleSignatureSave} onClear={handleSignatureClear} />
//                 {digitalSignature && (
//                   <div className="signature-confirmation">
//                     <CheckCircle size={16} />
//                     <span>Signature captured successfully</span>
//                   </div>
//                 )}
//               </div>

//               <button type="submit" className="submit-btn">Submit Application</button>
//             </form>
//           </div>
//         </div>
//       )}

//       {isAdmin && (
//         <>
//           {activePage === 'dashboard' && (
//             <div className="dashboard">
//               <div className="stats-grid">
//                 <div className="stat-card"><div className="stat-icon blue">📋</div><div className="stat-info"><h3>Total Agreements</h3><p className="stat-number">{statistics.total}</p></div></div>
//                 <div className="stat-card"><div className="stat-icon green">€</div><div className="stat-info"><h3>Total Disbursed</h3><p className="stat-number">{formatCurrency(statistics.totalAmount)}</p></div></div>
//                 <div className="stat-card"><div className="stat-icon orange">✅</div><div className="stat-info"><h3>Active Loans</h3><p className="stat-number">{statistics.active}</p></div></div>
//               </div>
//               <div className="recent-agreements">
//                 <h2>Recent Agreements</h2>
//                 <div className="agreements-list">
//                   {agreements.slice(0, 5).map((agreement) => (
//                     <div key={agreement._id} className="agreement-item">
//                       <div className="agreement-avatar">{agreement.borrower_photo ? <img src={agreement.borrower_photo} alt="" /> : <User size={24} />}</div>
//                       <div className="agreement-info"><h4>{agreement.borrower_name}</h4><p>{agreement.borrower_email}</p><span className="amount">{formatCurrency(agreement.principal_amount)}</span></div>
//                       <div className="agreement-status"><span className={`status-badge ${agreement.status || 'draft'}`}>{agreement.status || 'draft'}</span></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activePage === 'agreements' && (
//             <div className="agreements-page">
//               <div className="page-header"><h2>All Loan Agreements</h2><p>{agreements.length} total agreements</p></div>
//               <div className="agreements-grid">
//                 {loading ? <div className="loading">Loading...</div> : agreements.length === 0 ? <div className="empty-state"><FileText size={64} /><h3>No Agreements Yet</h3></div> : agreements.map((agreement) => (
//                   <div key={agreement._id} className="agreement-card">
//                     <div className="card-header">
//                       <div className="borrower-photo">{agreement.borrower_photo ? <img src={agreement.borrower_photo} alt="" /> : <User size={32} />}</div>
//                       <div className="borrower-details"><h3>{agreement.borrower_name}</h3><p className="agreement-id">ID: {agreement.agreement_id}</p></div>
//                       <span className={`status-badge ${agreement.status || 'draft'}`}>{agreement.status || 'draft'}</span>
//                     </div>
//                     <div className="card-body">
//                       <div className="detail-row"><Mail size={16} /><span>{agreement.borrower_email}</span></div>
//                       <div className="detail-row"><Phone size={16} /><span>{agreement.borrower_phone || 'Not provided'}</span></div>
//                       {agreement.borrower_address && <div className="detail-row"><MapPin size={16} /><span>{agreement.borrower_address}</span></div>}
//                       <div className="amount-row"><div className="amount-item"><span className="label">Principal</span><span className="value">{formatCurrency(agreement.principal_amount)}</span></div><div className="amount-item"><span className="label">Repayment</span><span className="value">{formatCurrency(agreement.repayment_amount)}</span></div></div>
//                       <div className="detail-row"><Calendar size={16} /><span>Term: {getLoanTerm(agreement)}</span></div>
//                     </div>
//                     <div className="card-footer">
//                       <button className="btn-download" onClick={() => handleDownloadPDF(agreement)} disabled={downloading}><Download size={18} /><span>PDF</span></button>
//                       <button className="btn-delete" onClick={() => handleDelete(agreement._id)}><Trash2 size={18} /><span>Delete</span></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activePage === 'new' && (
//             <div className="create-agreement-page">
//               <div className="page-header"><button className="back-btn" onClick={() => setActivePage('dashboard')}><X size={20} /></button><h2>Create New Agreement</h2></div>
//               <form onSubmit={handleSubmit} className="agreement-form">
//                 <div className="form-section"><h3>Borrower Information</h3>
//                   <div className="form-group"><label>Borrower Photo *</label><input type="file" accept="image/*" onChange={handlePhotoUpload} required />{borrowerPhoto && <div className="photo-preview"><img src={borrowerPhoto} alt="Preview" /></div>}</div>
//                   <div className="form-group"><label>Full Name *</label><input type="text" name="borrower_name" value={formData.borrower_name} onChange={handleChange} required /></div>
//                   <div className="form-row"><div className="form-group"><label>Email *</label><input type="email" name="borrower_email" value={formData.borrower_email} onChange={handleChange} required /></div><div className="form-group"><label>Phone *</label><input type="tel" name="borrower_phone" value={formData.borrower_phone} onChange={handleChange} required /></div></div>
//                   <div className="form-group"><label>Address</label><input type="text" name="borrower_address" value={formData.borrower_address} onChange={handleChange} /></div>
//                 </div>
//                 <div className="form-section"><h3>Loan Details (EUR €)</h3>
//                   <div className="form-row"><div className="form-group"><label>Principal Amount (€) *</label><input type="number" name="principal_amount" value={formData.principal_amount} onChange={handleChange} required placeholder="1000" /></div><div className="form-group"><label>Repayment Amount (€) *</label><input type="number" name="repayment_amount" value={formData.repayment_amount} onChange={handleChange} required placeholder="1200" /></div></div>
//                   <div className="form-row"><div className="form-group"><label>Interest Rate (%)</label><input type="number" name="interest_rate" value={formData.interest_rate} onChange={handleChange} step="0.5" placeholder="0" /></div><div className="form-group"><label>Loan Term *</label><select name="loan_term" value={formData.loan_term} onChange={handleChange} required>{loanTermOptions.map(term => <option key={term} value={term}>{term}</option>)}</select></div></div>
//                   <div className="form-group"><label>Additional Notes</label><textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Any special conditions..." /></div>
//                 </div>
//                 <div className="form-section"><h3>Digital Signature *</h3><SignaturePad onSave={handleSignatureSave} onClear={handleSignatureClear} />{digitalSignature && <div className="signature-confirmation"><CheckCircle size={16} /><span>Signature captured successfully</span></div>}</div>
//                 <button type="submit" className="submit-btn">Create Agreement</button>
//               </form>
//             </div>
//           )}
//         </>
//       )}

//       <footer className="footer">
//         <div className="footer-content">
//           <div className="footer-section">
//             <div className="footer-logo">
//               <div className="logo-icon">💰</div>
//               <div>
//                 <h3>Anny Finance</h3>
//                 <p>Smart Loans, Better Future</p>
//               </div>
//             </div>
//             <p className="footer-description">
//               Providing fast, flexible, and affordable loan solutions to help you achieve your financial goals.
//             </p>
//             <div className="social-links">
//               <a href="#" className="social-link">📘</a>
//               <a href="#" className="social-link">🐦</a>
//               <a href="#" className="social-link">🔗</a>
//               <a href="#" className="social-link">📷</a>
//             </div>
//           </div>

//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><a href="#">About Us</a></li>
//               <li><a href="#">How It Works</a></li>
//               <li><a href="#">Loan Calculator</a></li>
//               <li><a href="#">FAQs</a></li>
//             </ul>
//           </div>

//           <div className="footer-section">
//             <h4>Loan Types</h4>
//             <ul>
//               <li><a href="#">Personal Loans</a></li>
//               <li><a href="#">Business Loans</a></li>
//               <li><a href="#">Emergency Loans</a></li>
//               <li><a href="#">Education Loans</a></li>
//             </ul>
//           </div>

//           <div className="footer-section">
//             <h4>Contact Info</h4>
//             <ul>
//               <li>📍 Haavikatu 8A9, Mikeli, Finland</li>
//               <li>✉️ officiallytshali@gmail.com</li>
//               <li>✉️ info@annyfinance.com</li>
//               <li>🕒 Mon-Fri: 9am - 5pm</li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="footer-bottom">
//           <p>&copy; 2024 Anny Finance. All rights reserved.</p>
//           <div className="footer-bottom-links">
//             <a href="#">Privacy Policy</a>
//             <a href="#">Terms of Service</a>
//             <a href="#">Cookie Policy</a>
//           </div>
//         </div>
        
//         <div className="footer-credit">
//           <p>Made with <Heart size={14} color="#ff6b6b" fill="#ff6b6b" /> by lighttech.243@gmail.com</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;









import { useState, useEffect } from 'react';
import { FileText, Download, Trash2, Plus, X, User, Mail, Phone, MapPin, DollarSign, Calendar, CheckCircle, AlertCircle, Heart } from 'lucide-react';
import { api } from '../services/api';
import SignaturePad from '../components/SignaturePad';
import Navbar from '../components/Navbar';
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Home({ isAdmin: propIsAdmin, onLogout }) {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activePage, setActivePage] = useState('new');
  const [borrowerPhoto, setBorrowerPhoto] = useState(null);
  const [digitalSignature, setDigitalSignature] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [downloading, setDownloading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(propIsAdmin || false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const loanTermOptions = [
    "2 weeks", "3 weeks", "1 month", "1 month and one week",
    "1 month and two weeks", "1 month and three weeks", "2 months", "3 months"
  ];

  // Hero Slider Images - Using local images from public/images/
  const slides = [
    {
      image: "/images/slide1.jpg",
      title: "Get Your Loan Today",
      subtitle: "Fast approval, flexible terms, and competitive rates"
    },
    {
      image: "/images/slide2.jpg",
      title: "Quick Disbursement",
      subtitle: "Receive funds within 24 hours of approval"
    },
    {
      image: "/images/slide3.jpg",
      title: "Flexible Repayment",
      subtitle: "Choose terms that work for you"
    }
  ];

  const [formData, setFormData] = useState({
    borrower_name: '', borrower_email: '', borrower_phone: '', borrower_address: '',
    principal_amount: '', repayment_amount: '', interest_rate: 0, loan_term: '1 month', notes: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) loadAgreements();
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    // If admin status came from props, use it
    if (propIsAdmin) {
      setIsAdmin(true);
      setActivePage('dashboard');
      loadAgreements();
      return;
    }
    
    // Check for manual logout flag
    if (sessionStorage.getItem('manualLogout')) {
      sessionStorage.removeItem('manualLogout');
      setIsAdmin(false);
      setActivePage('new');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include'
      });
      if (response.status === 401) {
        setIsAdmin(false);
        setActivePage('new');
        return;
      }
      const data = await response.json();
      setIsAdmin(data.success === true);
      setActivePage(data.success === true ? 'dashboard' : 'new');
      if (data.success === true) loadAgreements();
    } catch (error) {
      console.error('Check admin status error:', error);
      setIsAdmin(false);
      setActivePage('new');
    }
  };

  const loadAgreements = async () => {
    if (!isAdmin) return;
    const result = await api.getAgreements();
    if (result.success) setAgreements(result.data);
    setLoading(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBorrowerPhoto(reader.result);
        showMessage('✓ Photo uploaded!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureSave = (signatureData) => {
    setDigitalSignature(signatureData);
    showMessage('✓ Signature saved!', 'success');
  };

  const handleSignatureClear = () => setDigitalSignature(null);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!borrowerPhoto) return showMessage('❌ Please upload borrower photo', 'error');
    if (!digitalSignature) return showMessage('❌ Please provide digital signature', 'error');
    
    showMessage('Creating agreement...', 'info');
    const agreementData = {
      ...formData,
      principal_amount: parseFloat(formData.principal_amount),
      repayment_amount: parseFloat(formData.repayment_amount),
      interest_rate: parseFloat(formData.interest_rate),
      loan_term: formData.loan_term,
      borrower_photo: borrowerPhoto,
      digital_signature: digitalSignature,
    };
    
    const result = await api.createAgreement(agreementData);
    if (result.success) {
      showMessage('✅ Agreement created successfully!', 'success');
      setFormData({
        borrower_name: '', borrower_email: '', borrower_phone: '', borrower_address: '',
        principal_amount: '', repayment_amount: '', interest_rate: 0, loan_term: '1 month', notes: ''
      });
      setBorrowerPhoto(null);
      setDigitalSignature(null);
      if (isAdmin) loadAgreements();
    } else {
      showMessage('❌ Error: ' + result.error, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return showMessage('❌ Admin login required', 'error');
    if (window.confirm('Delete this agreement?')) {
      const result = await api.deleteAgreement(id);
      if (result.success) {
        loadAgreements();
        showMessage('✅ Agreement deleted', 'success');
      } else {
        showMessage('❌ ' + result.error, 'error');
      }
    }
  };

  const handleDownloadPDF = async (agreement) => {
    if (!isAdmin) return showMessage('❌ Admin login required', 'error');
    setDownloading(true);
    showMessage('📄 Generating PDF...', 'info');
    try {
      const { generateAgreementPDF } = await import('../services/pdfGenerator');
      const pdf = await generateAgreementPDF(agreement, agreement.borrower_photo, agreement.digital_signature);
      pdf.save(`Loan_Agreement_${agreement.agreement_id}.pdf`);
      showMessage('✅ PDF downloaded successfully!', 'success');
    } catch (error) {
      showMessage('❌ Error generating PDF', 'error');
    }
    setDownloading(false);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Clear all admin state
    setIsAdmin(false);
    setActivePage('new');
    
    // Clear all storage
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUsername');
    sessionStorage.setItem('manualLogout', 'true');
    sessionStorage.clear();
    
    showMessage('✅ Logged out successfully', 'success');
    
    // Call the onLogout prop from App if it exists
    if (onLogout) {
      onLogout();
    }
    
    // Force reload to clear all state
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  const getLoanTerm = (agreement) => agreement.loan_term || (agreement.loan_term_months ? agreement.loan_term_months + ' months' : 'Not specified');

  const statistics = {
    total: agreements.length,
    totalAmount: agreements.reduce((sum, a) => sum + (a.principal_amount || 0), 0),
    active: agreements.filter(a => a.status === 'active').length,
  };

  return (
    <div className="app-container">
      {message.text && (
        <div className={`toast-message ${message.type}`}>
          {message.type === 'success' && <CheckCircle size={20} />}
          {message.type === 'error' && <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <Navbar isAdmin={isAdmin} activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />

      {isAdmin && (
        <div className="admin-banner">
          <CheckCircle size={16} />
          <span>Admin Mode Active - You can manage all agreements</span>
        </div>
      )}

      {!isAdmin && (
        <div className="public-view">
          <div className="hero-slider">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`slide ${currentSlide === index ? 'active' : ''}`}
                style={{ 
                  backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="slide-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            ))}
            <div className="slide-dots">
              {slides.map((_, index) => (
                <button key={index} className={`dot ${currentSlide === index ? 'active' : ''}`} onClick={() => setCurrentSlide(index)} />
              ))}
            </div>
          </div>

          <div className="create-agreement-page">
            <div className="page-header">
              <h2>Apply for Loan Agreement</h2>
              <p>Fill out the form below to apply for a loan</p>
            </div>
            <form onSubmit={handleSubmit} className="agreement-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-group">
                  <label>Your Photo *</label>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} required />
                  {borrowerPhoto && <div className="photo-preview"><img src={borrowerPhoto} alt="Preview" /></div>}
                </div>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="borrower_name" value={formData.borrower_name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="borrower_email" value={formData.borrower_email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" name="borrower_phone" value={formData.borrower_phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="borrower_address" value={formData.borrower_address} onChange={handleChange} />
                </div>
              </div>

              <div className="form-section">
                <h3>Loan Details (EUR €)</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Principal Amount (€) *</label>
                    <input type="number" name="principal_amount" value={formData.principal_amount} onChange={handleChange} required placeholder="1000" />
                  </div>
                  <div className="form-group">
                    <label>Repayment Amount (€) *</label>
                    <input type="number" name="repayment_amount" value={formData.repayment_amount} onChange={handleChange} required placeholder="1200" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Interest Rate (%)</label>
                    <input type="number" name="interest_rate" value={formData.interest_rate} onChange={handleChange} step="0.5" placeholder="0" />
                  </div>
                  <div className="form-group">
                    <label>Loan Term *</label>
                    <select name="loan_term" value={formData.loan_term} onChange={handleChange} required>
                      {loanTermOptions.map(term => <option key={term} value={term}>{term}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Any special conditions..." />
                </div>
              </div>

              <div className="form-section">
                <h3>Digital Signature *</h3>
                <SignaturePad onSave={handleSignatureSave} onClear={handleSignatureClear} />
                {digitalSignature && (
                  <div className="signature-confirmation">
                    <CheckCircle size={16} />
                    <span>Signature captured successfully</span>
                  </div>
                )}
              </div>

              <button type="submit" className="submit-btn">Submit Application</button>
            </form>
          </div>
        </div>
      )}

      {isAdmin && (
        <>
          {activePage === 'dashboard' && (
            <div className="dashboard">
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-icon blue">📋</div><div className="stat-info"><h3>Total Agreements</h3><p className="stat-number">{statistics.total}</p></div></div>
                <div className="stat-card"><div className="stat-icon green">€</div><div className="stat-info"><h3>Total Disbursed</h3><p className="stat-number">{formatCurrency(statistics.totalAmount)}</p></div></div>
                <div className="stat-card"><div className="stat-icon orange">✅</div><div className="stat-info"><h3>Active Loans</h3><p className="stat-number">{statistics.active}</p></div></div>
              </div>
              <div className="recent-agreements">
                <h2>Recent Agreements</h2>
                <div className="agreements-list">
                  {agreements.slice(0, 5).map((agreement) => (
                    <div key={agreement._id} className="agreement-item">
                      <div className="agreement-avatar">{agreement.borrower_photo ? <img src={agreement.borrower_photo} alt="" /> : <User size={24} />}</div>
                      <div className="agreement-info"><h4>{agreement.borrower_name}</h4><p>{agreement.borrower_email}</p><span className="amount">{formatCurrency(agreement.principal_amount)}</span></div>
                      <div className="agreement-status"><span className={`status-badge ${agreement.status || 'draft'}`}>{agreement.status || 'draft'}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePage === 'agreements' && (
            <div className="agreements-page">
              <div className="page-header"><h2>All Loan Agreements</h2><p>{agreements.length} total agreements</p></div>
              <div className="agreements-grid">
                {loading ? <div className="loading">Loading...</div> : agreements.length === 0 ? <div className="empty-state"><FileText size={64} /><h3>No Agreements Yet</h3></div> : agreements.map((agreement) => (
                  <div key={agreement._id} className="agreement-card">
                    <div className="card-header">
                      <div className="borrower-photo">{agreement.borrower_photo ? <img src={agreement.borrower_photo} alt="" /> : <User size={32} />}</div>
                      <div className="borrower-details"><h3>{agreement.borrower_name}</h3><p className="agreement-id">ID: {agreement.agreement_id}</p></div>
                      <span className={`status-badge ${agreement.status || 'draft'}`}>{agreement.status || 'draft'}</span>
                    </div>
                    <div className="card-body">
                      <div className="detail-row"><Mail size={16} /><span>{agreement.borrower_email}</span></div>
                      <div className="detail-row"><Phone size={16} /><span>{agreement.borrower_phone || 'Not provided'}</span></div>
                      {agreement.borrower_address && <div className="detail-row"><MapPin size={16} /><span>{agreement.borrower_address}</span></div>}
                      <div className="amount-row"><div className="amount-item"><span className="label">Principal</span><span className="value">{formatCurrency(agreement.principal_amount)}</span></div><div className="amount-item"><span className="label">Repayment</span><span className="value">{formatCurrency(agreement.repayment_amount)}</span></div></div>
                      <div className="detail-row"><Calendar size={16} /><span>Term: {getLoanTerm(agreement)}</span></div>
                    </div>
                    <div className="card-footer">
                      <button className="btn-download" onClick={() => handleDownloadPDF(agreement)} disabled={downloading}><Download size={18} /><span>PDF</span></button>
                      <button className="btn-delete" onClick={() => handleDelete(agreement._id)}><Trash2 size={18} /><span>Delete</span></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === 'new' && (
            <div className="create-agreement-page">
              <div className="page-header"><button className="back-btn" onClick={() => setActivePage('dashboard')}><X size={20} /></button><h2>Create New Agreement</h2></div>
              <form onSubmit={handleSubmit} className="agreement-form">
                <div className="form-section"><h3>Borrower Information</h3>
                  <div className="form-group"><label>Borrower Photo *</label><input type="file" accept="image/*" onChange={handlePhotoUpload} required />{borrowerPhoto && <div className="photo-preview"><img src={borrowerPhoto} alt="Preview" /></div>}</div>
                  <div className="form-group"><label>Full Name *</label><input type="text" name="borrower_name" value={formData.borrower_name} onChange={handleChange} required /></div>
                  <div className="form-row"><div className="form-group"><label>Email *</label><input type="email" name="borrower_email" value={formData.borrower_email} onChange={handleChange} required /></div><div className="form-group"><label>Phone *</label><input type="tel" name="borrower_phone" value={formData.borrower_phone} onChange={handleChange} required /></div></div>
                  <div className="form-group"><label>Address</label><input type="text" name="borrower_address" value={formData.borrower_address} onChange={handleChange} /></div>
                </div>
                <div className="form-section"><h3>Loan Details (EUR €)</h3>
                  <div className="form-row"><div className="form-group"><label>Principal Amount (€) *</label><input type="number" name="principal_amount" value={formData.principal_amount} onChange={handleChange} required placeholder="1000" /></div><div className="form-group"><label>Repayment Amount (€) *</label><input type="number" name="repayment_amount" value={formData.repayment_amount} onChange={handleChange} required placeholder="1200" /></div></div>
                  <div className="form-row"><div className="form-group"><label>Interest Rate (%)</label><input type="number" name="interest_rate" value={formData.interest_rate} onChange={handleChange} step="0.5" placeholder="0" /></div><div className="form-group"><label>Loan Term *</label><select name="loan_term" value={formData.loan_term} onChange={handleChange} required>{loanTermOptions.map(term => <option key={term} value={term}>{term}</option>)}</select></div></div>
                  <div className="form-group"><label>Additional Notes</label><textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Any special conditions..." /></div>
                </div>
                <div className="form-section"><h3>Digital Signature *</h3><SignaturePad onSave={handleSignatureSave} onClear={handleSignatureClear} />{digitalSignature && <div className="signature-confirmation"><CheckCircle size={16} /><span>Signature captured successfully</span></div>}</div>
                <button type="submit" className="submit-btn">Create Agreement</button>
              </form>
            </div>
          )}
        </>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">💰</div>
              <div>
                <h3>Anny Finance</h3>
                <p>Smart Loans, Better Future</p>
              </div>
            </div>
            <p className="footer-description">
              Providing fast, flexible, and affordable loan solutions to help you achieve your financial goals.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">🔗</a>
              <a href="#" className="social-link">📷</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Loan Calculator</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Loan Types</h4>
            <ul>
              <li><a href="#">Personal Loans</a></li>
              <li><a href="#">Business Loans</a></li>
              <li><a href="#">Emergency Loans</a></li>
              <li><a href="#">Education Loans</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>📍 Haavikatu 8A9, Mikeli, Finland</li>
              <li>✉️ officiallytshali@gmail.com</li>
              <li>✉️ info@annyfinance.com</li>
              <li>🕒 Mon-Fri: 9am - 5pm</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Anny Finance. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
        
        <div className="footer-credit">
          <p>Made with <Heart size={14} color="#ff6b6b" fill="#ff6b6b" /> by lighttech.243@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;