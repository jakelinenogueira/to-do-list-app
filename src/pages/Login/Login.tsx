'use client';
import React from 'react';
import styles from './Login.module.scss'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className={styles.content}>
                        <h1>To-Do List</h1>
                        <form action="" id="form" method="post">
                            <div className={styles.background_img}>
                                <img src="/assets/images/person.png" alt="usuário" />
                            </div>
                            <div className={styles.form_group}>
                                <img src="/assets/icons/conecte.png" alt="celular" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div className={styles.form_group}>
                                <img src="/assets/icons/cadeado.png" alt="cadeado" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Senha"
                                />
                            </div>
                        </form>
                        <button type="submit" form="form">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;