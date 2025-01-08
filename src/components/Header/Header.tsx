import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <div className={styles.container}>
                <Image src="/assets/images/list.png" alt="Lista" width={150} height={150} />
                <span>To-Do List</span>
            </div>
        </header>
    );
}