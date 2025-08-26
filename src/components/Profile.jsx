import { useState, useEffect } from 'react';

export default function Profile({ token }) {
  const [profile, setProfile] = useState({ name: '', address: '', phone: '' });

  useEffect(() => {
    fetch('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProfile(data));
  }, [token]);

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleSave() {
    fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    }).then(res => {
      if (res.ok) alert('Profile updated');
    });
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-8 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
      <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
      <input name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
      <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
      <button onClick={handleSave} className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800">Save</button>
    </div>
  );
}
