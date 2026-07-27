import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import EmptyState from '../ui/EmptyState';
import Skeleton from '../ui/Skeleton';

/**
 * fields: [{ name, label, type: 'text'|'select', options?: [{label,value}] }]
 * columns: [{ key, label, render?: (item) => node }]
 */
const OrgResourceManager = ({
  title,
  description,
  fields,
  columns,
  schema,
  useListQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
  listArgs,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const { data: items, isLoading, isError } = useListQuery(listArgs);
  const [createItem, { isLoading: isCreating }] = useCreateMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const openCreate = () => {
    setEditing(null);
    reset({});
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const defaults = {};
    fields.forEach((f) => {
      defaults[f.name] = item[f.name]?._id || item[f.name] || '';
    });
    reset(defaults);
    setModalOpen(true);
  };

  const onSubmit = async (values) => {
    try {
      if (editing) {
        await updateItem({ id: editing._id, ...values }).unwrap();
        toast.success(`${title} updated`);
      } else {
        await createItem(values).unwrap();
        toast.success(`${title} created`);
      }
      setModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || error?.data?.errors?.[0]?.msg || `Could not save ${title.toLowerCase()}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(pendingDelete._id).unwrap();
      toast.success(`${title} deleted`);
      setPendingDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || `Could not delete ${title.toLowerCase()}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{title}</h3>
          <p className="text-xs text-[var(--text-muted)]">{description}</p>
        </div>
        <Button size="sm" icon={Plus} onClick={openCreate}>
          Add {title}
        </Button>
      </div>

      <Card className="!p-0 overflow-hidden">
        {isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-4">
            <EmptyState title={`Couldn't load ${title.toLowerCase()}s`} />
          </div>
        ) : !items || items.length === 0 ? (
          <div className="p-4">
            <EmptyState title={`No ${title.toLowerCase()}s yet`} description={`Add your first ${title.toLowerCase()} to continue.`} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border-glass)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="px-5 py-3 font-medium">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-glass)]">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-[var(--bg-surface-alt)]/60">
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-3 text-[var(--text-secondary)]">
                        {c.render ? c.render(item) : item[c.key] || '—'}
                      </td>
                    ))}
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-alt)] hover:text-primary">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setPendingDelete(item)} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-danger/10 hover:text-danger">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editing ? 'Edit' : 'Add'} ${title}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((f) =>
            f.type === 'select' ? (
              <Select key={f.name} label={f.label} options={f.options} {...register(f.name)} error={errors[f.name]?.message} />
            ) : (
              <Input key={f.name} label={f.label} type={f.type || 'text'} {...register(f.name)} error={errors[f.name]?.message} />
            ),
          )}
          <Button type="submit" className="w-full" isLoading={isCreating || isUpdating}>
            {editing ? 'Save changes' : `Create ${title}`}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title={`Delete ${title.toLowerCase()}?`}
        description="This action cannot be undone."
      />
    </div>
  );
};

export default OrgResourceManager;
