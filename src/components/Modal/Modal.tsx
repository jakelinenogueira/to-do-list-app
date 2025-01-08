import styles from './Modal.module.scss';

interface ModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
}

export default function Modal({ onConfirm, onCancel, message }: ModalProps) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <p>{message}</p>
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