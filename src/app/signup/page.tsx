"use client";
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salva os dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        profession,
        age,
        email,
      });

      // Redireciona para a página de login
      window.location.href = '/login';
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cadastro</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        {/* Campos de entrada */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="profession" className="form-label">Profissão</label>
          <input type="text" className="form-control" id="profession" value={profession} onChange={(e) => setProfession(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Idade</label>
          <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
      </form>
    </div>
  );
};

export default Signup;

