import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, FileSignature, Check, X, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { useGetOffersQuery, useCreateOfferMutation, useUpdateOfferStatusMutation } from '../../redux/api/offerApi';
import { useGetCandidatesQuery } from '../../redux/api/candidateApi';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const OffersManager = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: offers, isLoading } = useGetOffersQuery();
  const { data: candidates } = useGetCandidatesQuery();
  const [createOffer, { isLoading: isCreating }] = useCreateOfferMutation();
  const [updateStatus] = useUpdateOfferStatusMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    try {
      await createOffer(values).unwrap();
      toast.success('Offer created and letter generated');
      reset();
      setModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || 'Could not create offer');
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Offer ${status.toLowerCase()}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Could not update offer');
    }
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-[var(--text-primary)]">
          <FileSignature size={16} className="text-primary" /> Offer Letters
        </h3>
        <Button size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          New Offer
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : !offers || offers.length === 0 ? (
        <EmptyState icon={FileSignature} title="No offers yet" description="Create an offer for a candidate to generate a letter." />
      ) : (
        <ul className="space-y-2">
          {offers.map((offer) => (
            <li key={offer._id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--bg-surface-alt)] px-3.5 py-2.5">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {offer.candidate?.firstName} {offer.candidate?.lastName}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {offer.salary ? `₹${Number(offer.salary).toLocaleString('en-IN')}` : 'Salary TBD'}
                  {offer.joiningDate ? ` · Joins ${new Date(offer.joiningDate).toLocaleDateString()}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={offer.status === 'Accepted' ? 'success' : offer.status === 'Rejected' ? 'danger' : 'warning'}>
                  {offer.status}
                </Badge>
                {offer.offerLetter && (
                  <a href={`${SOCKET_URL}${offer.offerLetter}`} target="_blank" rel="noreferrer" className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-primary">
                    <Download size={14} />
                  </a>
                )}
                {offer.status === 'Pending' && (
                  <>
                    <button onClick={() => handleStatus(offer._id, 'Accepted')} className="rounded-lg p-1.5 text-success hover:bg-success/10">
                      <Check size={14} />
                    </button>
                    <button onClick={() => handleStatus(offer._id, 'Rejected')} className="rounded-lg p-1.5 text-danger hover:bg-danger/10">
                      <X size={14} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Offer">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Candidate"
            options={(candidates || []).map((c) => ({ label: `${c.firstName} ${c.lastName || ''}`, value: c._id }))}
            {...register('candidate', { required: true })}
          />
          <Input label="Salary" type="number" {...register('salary')} />
          <Input label="Joining date" type="date" {...register('joiningDate')} />
          <Button type="submit" className="w-full" isLoading={isCreating}>
            Create Offer &amp; Generate Letter
          </Button>
        </form>
      </Modal>
    </Card>
  );
};

export default OffersManager;
