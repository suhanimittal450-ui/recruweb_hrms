import { FileSignature, Download } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import Skeleton from '../ui/Skeleton';
import { useGetOffersQuery } from '../../redux/api/offerApi';

const OfferLetterCard = ({ candidateId }) => {
  // The backend has no "get offer by candidate" filter, so we fetch the
  // (typically small) offers list and match client-side.
  const { data: offers, isLoading } = useGetOffersQuery(undefined, { skip: !candidateId });
  const offer = offers?.find((o) => o.candidate?._id === candidateId || o.candidate === candidateId);

  return (
    <Card>
      <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-[var(--text-primary)]">
        <FileSignature size={16} className="text-primary" /> Offer Letter
      </h3>

      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : !candidateId || !offer ? (
        <EmptyState
          icon={FileSignature}
          title="No offer on file"
          description="This shows up if you were hired through the recruitment pipeline."
        />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-secondary)]">Status</p>
            <Badge tone={offer.status === 'Accepted' ? 'success' : offer.status === 'Rejected' ? 'danger' : 'warning'}>
              {offer.status}
            </Badge>
          </div>
          {offer.salary && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">Offered salary</p>
              <p className="text-sm font-medium text-[var(--text-primary)]">₹{Number(offer.salary).toLocaleString('en-IN')}</p>
            </div>
          )}
          {offer.joiningDate && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">Joining date</p>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {new Date(offer.joiningDate).toDateString()}
              </p>
            </div>
          )}
          {offer.offerLetter && (
            <a
              href={`${import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'}${offer.offerLetter}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--bg-surface-alt)] py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <Download size={15} /> Download offer letter
            </a>
          )}
        </div>
      )}
    </Card>
  );
};

export default OfferLetterCard;
