import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({ open, onClose, onConfirm, title = 'Are you sure?', description, isLoading }) => (
  <Modal open={open} onClose={onClose} title={title} size="sm">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-2xl bg-danger/10 p-3 text-danger">
        <AlertTriangle size={22} />
      </div>
      {description && <p className="text-sm text-[var(--text-secondary)]">{description}</p>}
      <div className="mt-2 flex w-full gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" className="flex-1" isLoading={isLoading} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
