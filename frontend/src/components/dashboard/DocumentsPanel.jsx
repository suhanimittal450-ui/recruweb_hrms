import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Check, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import {
  useGetEmployeeDocumentsQuery,
  useUploadEmployeeDocumentMutation,
  useVerifyEmployeeDocumentMutation,
} from '../../redux/api/employeeApi';

const DOC_TYPES = ['Resume', 'Aadhaar', 'PAN', 'OfferLetter', 'JoiningLetter', 'ExperienceLetter', 'Other'].map((v) => ({
  label: v,
  value: v,
}));

const DocumentsPanel = ({ employeeId, canVerify = false, canUpload = true }) => {
  const { data: documents, isLoading } = useGetEmployeeDocumentsQuery(employeeId, { skip: !employeeId });
  const [uploadDocument, { isLoading: isUploading }] = useUploadEmployeeDocumentMutation();
  const [verifyDocument] = useVerifyEmployeeDocumentMutation();
  const [docType, setDocType] = useState('Resume');
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error('Choose a file first');
      return;
    }
    const formData = new FormData();
    formData.append('type', docType);
    formData.append('file', file);

    try {
      await uploadDocument({ employeeId, formData }).unwrap();
      toast.success('Document uploaded — pending verification');
      if (fileRef.current) fileRef.current.value = '';
    } catch (error) {
      toast.error(error?.data?.message || 'Upload failed');
    }
  };

  const handleVerify = async (documentId, status) => {
    try {
      await verifyDocument({ employeeId, documentId, status }).unwrap();
      toast.success(`Document ${status.toLowerCase()}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Could not update document');
    }
  };

  return (
    <Card>
      <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-[var(--text-primary)]">
        <FileText size={16} className="text-primary" /> Documents
      </h3>

      {canUpload && (
        <form onSubmit={handleUpload} className="mb-5 flex flex-col gap-2 sm:flex-row">
          <Select options={DOC_TYPES} value={docType} onChange={(e) => setDocType(e.target.value)} className="sm:w-40" />
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            className="flex-1 rounded-xl border border-[var(--border-glass)] bg-[var(--bg-surface-alt)] px-3 py-2 text-xs text-[var(--text-secondary)] file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary"
          />
          <Button type="submit" size="sm" icon={Upload} isLoading={isUploading}>
            Upload
          </Button>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !documents || documents.length === 0 ? (
        <EmptyState icon={FileText} title="No documents yet" description="Uploaded documents will show up here for review." />
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <motion.li
              key={doc._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--bg-surface-alt)] px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <FileText size={16} className="text-[var(--text-muted)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{doc.type}</p>
                  <p className="text-xs text-[var(--text-muted)]">{doc.originalName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={doc.status === 'Verified' ? 'success' : doc.status === 'Rejected' ? 'danger' : 'warning'}>
                  {doc.status}
                </Badge>
                <a
                  href={`${import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'}${doc.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-primary"
                >
                  <ExternalLink size={14} />
                </a>
                {canVerify && doc.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleVerify(doc._id, 'Verified')}
                      className="rounded-lg p-1.5 text-success hover:bg-success/10"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => handleVerify(doc._id, 'Rejected')}
                      className="rounded-lg p-1.5 text-danger hover:bg-danger/10"
                    >
                      <X size={14} />
                    </button>
                  </>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default DocumentsPanel;
