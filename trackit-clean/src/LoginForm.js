import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', result.token); // ✅ JWT token kaydedildi
        alert('✔️ Giriş başarılı');
        navigate('/dashboard');
      } else {
        alert('❌ Giriş başarısız: ' + result.message);
      }
    } catch (error) {
      alert('🛑 Bağlantı hatası: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>TrackIt Giriş Ekranı 🎯</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button type="submit">Giriş Yap</button>
    </form>
  );
}

export default LoginForm;
