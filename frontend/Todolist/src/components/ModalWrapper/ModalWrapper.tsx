import type { PropsWithChildren } from "react";
import styles from "./ModalWrapper.module.scss"

interface ModalProps extends PropsWithChildren {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalWrapper({ modal, setModal, children }: ModalProps) {
  if (!modal) return null;

  return (
    <div className={styles.modal_overlay} onClick={() => setModal(false)}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>

  );
}