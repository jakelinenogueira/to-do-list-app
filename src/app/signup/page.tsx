"use client";
import React, { useState } from 'react';
import styles from './Signup.module.scss'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

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

      router.push('/login');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const goBack = () => {
    router.push('/login');
  }

  return (
    <div className={styles.signup}>
          <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.content}>
            <h1>Cadastro</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nome *</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="age">Idade *</label>
                <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="profession">Profissão *</label>
                <input type="text" id="profession" value={profession} onChange={(e) => setProfession(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password">Senha *</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit">Cadastrar</button>
            </form>
            <button className={styles.btn_go_back} onClick={goBack}>
              <img src="/assets/icons/arrow.png" alt="seta para esquerda" />
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;

