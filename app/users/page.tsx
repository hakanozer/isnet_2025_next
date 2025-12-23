'use client';

import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Kullanıcıları çek
  const { data: users, isLoading } = trpc.user.getAll.useQuery();
  
  // Mutation (yeni kullanıcı ekle)
  const utils = trpc.useUtils();
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
      setName('');
      setEmail('');
    },
    onError: (error) => {
      alert('Kullanıcı eklenirken hata oluştu:');
    },
  });

  // update user
  const updateUser = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
    },
    onError: (error) => {
      alert('Kullanıcı güncellenirken hata oluştu:');
    },
  });

  if (isLoading) return <div>Yükleniyor...</div>;

  return (
    <div className="p-8">
      <h1>Kullanıcı Listesi</h1>
      
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <div>
        <h2>Yeni Kullanıcı Ekle</h2>
        <input
          type="text"
          placeholder="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => createUser.mutate({ name, email })}>
          Ekle
        </button>
        <button onClick={() => updateUser.mutate({ id: 1, name, email })}>
          Güncelle
        </button>
      </div>
    </div>
  );
}