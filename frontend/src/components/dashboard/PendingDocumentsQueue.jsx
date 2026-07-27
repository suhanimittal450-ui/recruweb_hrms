import { motion } from 'framer-motion';
import { ShieldCheck, Check, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { useGetPendingDocumentsQuery, useVerifyEmployeeDocumentMutation } from '../../redux/api/employeeApi';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const PendingDocumentsQueue = () => {
  const { data: pending, isLoading } = useGetPendingDocumentsQuery();
  const [verifyDocument] = useVerifyEmployeeDocumentMutation();

  const handleVerify = async (item, status) => {
    try {
      await verifyDocument({ employeeId: item.employeeId, documentId: item.documentId, status }).unwrap();
      toast.success(`${item.type} ${status.toLowerCase()}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Could not update document');
    }
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-[var(--text-primary)]">
          <ShieldCheck size={16} className="text-primary" /> Pending Document Verifications
        </h3>
        {pending?.length > 0 && (
          <span className="rounded-full bg-warning/15 px-2.5 py-1 text-xs font-medium text-warning">{pending.length} pending</span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : !pending || pending.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="All caught up" description="No documents waiting on verification." />
      ) : (
        <ul className="space-y-2">
          {pending.map((item) => (
            <motion.li
              key={item.documentId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--bg-surface-alt)] px-3.5 py-2.5"
            >
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{item.employeeName || item.employeeCode}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {item.type} · {item.originalName}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={`${SOCKET_URL}${item.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-primary"
                >
                  <ExternalLink size={14} />
                </a>
                <button onClick={() => handleVerify(item, 'Verified')} className="rounded-lg p-1.5 text-success hover:bg-success/10">
                  <Check size={14} />
                </button>
                <button onClick={() => handleVerify(item, 'Rejected')} className="rounded-lg p-1.5 text-danger hover:bg-danger/10">
                  <X size={14} />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default PendingDocumentsQueue;
