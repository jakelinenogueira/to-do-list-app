'use client';
import React, { useState } from 'react';
import styles from './Login.module.scss'
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';



const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('Usuário logado:', userCredential.user);
    
          router.push('/tasks'); 
        } catch (err) {
          setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
          console.error(err);
        }
    };
    
    const createRegistration = () => {
        router.push('/signup'); 
    }; 

    return (
        <div className={styles.login}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles.content}>
                            <form id="form" onSubmit={handleSubmit}>
                                <div className={styles.background_img}>
                                    <img src="/assets/images/person.png" alt="usuário" />
                                </div>
                                <div className={styles.form_group}>
                                    <img src="/assets/icons/conecte.png" alt="celular" />
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Digite seu email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles.form_group}>
                                    <img src="/assets/icons/cadeado.png" alt="cadeado" />
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className={styles.btn_enter}>Entrar</button>
                            </form>
                            <button className={styles.btn_registration} onClick={createRegistration}>Cadastrar-se</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;