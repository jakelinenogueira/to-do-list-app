import { ReactNode } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    children?: ReactNode;
}

export default function Modal({ message, onConfirm, onCancel, children }: ModalProps) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <p>{message}</p>
          {children && <div className={styles.modalContent}>{children}</div>}
          <div className={styles.buttons}>
            <button className={styles.confirm} onClick={onConfirm}>
              Confirm
            </button>
            <button className={styles.cancel} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }