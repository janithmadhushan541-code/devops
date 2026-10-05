import React from 'react';
import { useState } from 'react';
import {
  ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Shirt, Sparkles,
  ShieldCheck, ShoppingBag, UserRound, CheckCircle2
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const looks = [
  { name: 'Campus Core Tee', type: 'Classic cotton', price: 'LKR 2,490', className: 'tee navy' },
  { name: 'Varsity Hoodie', type: 'Premium fleece', price: 'LKR 5,990', className: 'hoodie cream' },
  { name: 'Club Oversized Tee', type: 'Heavyweight fit', price: 'LKR 3,190', className: 'tee sand' }
];

function App() {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setNotice('');

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : form;

      const response = await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      localStorage.setItem('campusToken', data.token);
      localStorage.setItem('campusUser', JSON.stringify(data.user));
      setNotice(mode === 'login'
        ? `Welcome back, ${data.user.full_name.split(' ')[0]}! ${data.user.role === 'ADMIN' ? 'Admin access granted.' : 'Your campus space is ready.'}`
        : 'Account created successfully. You are now signed in.'
      );
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="shell">
        <aside className="showcase">
          <div className="topbar">
            <div className="brand">
              <div className="brand-icon"><Shirt size={21} strokeWidth={2.5} /></div>
              <div>
                <strong>Campus Apparel</strong>
                <span>HUB</span>
              </div>
            </div>
            <div className="secure"><ShieldCheck size={15}/> Secure access</div>
          </div>

          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14}/> YOUR CAMPUS. YOUR STYLE.</span>
            <h1>Make your<br/><em>campus</em> look good.</h1>
            <p>Custom apparel for university teams, faculties and clubs. Design it, order it, wear it.</p>
          </div>

          <div className="mini-shop">
            <div className="shop-head">
              <div>
                <span>Popular right now</span>
                <h3>Campus fits</h3>
              </div>
              <ShoppingBag size={20}/>
            </div>
            <div className="products">
              {looks.map(item => (
                <div className="product" key={item.name}>
                  <div className={`garment ${item.className}`}>
                    <div className="garment-neck"/>
                    <div className="logo-print">CA</div>
                  </div>
                  <div className="product-info">
                    <strong>{item.name}</strong>
                    <small>{item.type}</small>
                    <b>{item.price}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase-footer">
            <div className="avatars"><i>R</i><i>M</i><i>A</i><i>+</i></div>
            <span>Made for campus communities</span>
          </div>
        </aside>

        <section className="auth">
          <div className="auth-inner">
            <div className="mobile-brand">
              <div className="brand-icon"><Shirt size={19}/></div><strong>Campus Apparel HUB</strong>
            </div>

            <div className="auth-heading">
              <div className="user-icon">{mode === 'login' ? <UserRound size={20}/> : <Sparkles size={20}/>}</div>
              <span>{mode === 'login' ? 'WELCOME BACK' : 'JOIN THE HUB'}</span>
              <h2>{mode === 'login' ? 'Sign in to your space.' : 'Create your campus account.'}</h2>
              <p>{mode === 'login' ? 'Pick up where you left off and keep your campus style moving.' : 'Start creating custom looks for your team, faculty or club.'}</p>
            </div>

            <div className="tabs">
              <button className={mode === 'login' ? 'active' : ''} onClick={() => {setMode('login');setNotice('')}}>Sign in</button>
              <button className={mode === 'register' ? 'active' : ''} onClick={() => {setMode('register');setNotice('')}}>Create account</button>
            </div>

            <form onSubmit={submit}>
              {mode === 'register' && (
                <label>
                  Full name
                  <div className="input-box"><UserRound size={17}/><input value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Your full name" required /></div>
                </label>
              )}

              <label>
                University email
                <div className="input-box"><Mail size={17}/><input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@university.edu" required /></div>
              </label>

              <label>
                Password
                <div className="input-box">
                  <LockKeyhole size={17}/>
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} placeholder={mode === 'register' ? 'At least 8 characters' : 'Enter your password'} minLength={mode === 'register' ? 8 : undefined} required />
                  <button className="eye" type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button>
                </div>
              </label>

              {mode === 'login' && (
                <div className="form-options">
                  <label className="check"><input type="checkbox"/> <span>Remember me</span></label>
                  <button type="button" className="link" onClick={() => setNotice('Connect this to your forgot-password flow.')}>Forgot password?</button>
                </div>
              )}

              <button className="submit" disabled={loading}>
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign in to Campus Apparel' : 'Create my account'}
                {!loading && <ArrowRight size={18}/>}
              </button>
            </form>

            {notice && (
              <div className={`notice ${notice.toLowerCase().includes('successful') || notice.toLowerCase().includes('welcome') ? 'success' : ''}`}>
                <CheckCircle2 size={17}/><span>{notice}</span>
              </div>
            )}

            <div className="auth-foot">
              <span>By continuing, you agree to the campus hub terms.</span>
              <span className="role-note">USER &nbsp;•&nbsp; ADMIN</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
