import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <div className={styles.container}>
                <h1>To-Do List</h1>
            </div>
        </header>
    );
}