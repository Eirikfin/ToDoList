import type { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalWrapper({ modal, setModal, children }: ModalProps) {
  if (!modal) return null;

  return (
    <div className="modal-overlay" onClick={() => setModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}