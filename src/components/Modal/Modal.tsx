import { ReactNode } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    message: string;
    children?: ReactNode;
    onConfirm: (newText: string) => void;
    onCancel: () => void;
}

export default function Modal({ message, children, onConfirm, onCancel  }: ModalProps) {
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