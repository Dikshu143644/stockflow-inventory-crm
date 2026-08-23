import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Building2, Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { useBranches, useCreateBranch, useUpdateBranch, useDeleteBranch } from '@/hooks/useBranches';
import type { Branch } from '@/types/database';

const branchSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  code: z.string().min(2, 'Code must be at least 2 characters').max(10, 'Code must be at most 10 characters'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  is_active: z.boolean(),
});

type BranchFormData = z.infer<typeof branchSchema>;

export default function BranchesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deletingBranch, setDeletingBranch] = useState<Branch | null>(null);

  const { data: branchesData } = useBranches();
  const createBranch = useCreateBranch();
  const updateBranch = useUpdateBranch();
  const deleteBranch = useDeleteBranch();

  const branches = branchesData?.data ?? [];

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: '',
      code: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      phone: '',
      is_active: true,
    },
  });

  const handleCreate = () => {
    setEditingBranch(null);
    form.reset({
      name: '',
      code: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      phone: '',
      is_active: true,
    });
    setDialogOpen(true);
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    form.reset({
      name: branch.name,
      code: branch.code,
      address: branch.address || '',
      city: branch.city || '',
      state: branch.state || '',
      country: branch.country || 'India',
      phone: branch.phone || '',
      is_active: branch.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = (branch: Branch) => {
    setDeletingBranch(branch);
    setDeleteDialogOpen(true);
  };

  const onSubmit = (data: BranchFormData) => {
    if (editingBranch) {
      updateBranch.mutate(
        { id: editingBranch.id, ...data },
        {
          onSuccess: () => {
            setDialogOpen(false);
            form.reset();
          },
          onError: () => {
            toast.error('Failed to update branch');
          },
        }
      );
    } else {
      createBranch.mutate(
        {
          name: data.name,
          code: data.code,
          address: data.address || null,
          city: data.city || null,
          state: data.state || null,
          country: data.country || null,
          phone: data.phone || null,
          is_active: data.is_active,
        },
        {
          onSuccess: () => {
            setDialogOpen(false);
            form.reset();
          },
          onError: () => {
            toast.error('Failed to create branch');
          },
        }
      );
    }
  };

  const confirmDelete = () => {
    if (!deletingBranch) return;
    deleteBranch.mutate(deletingBranch.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setDeletingBranch(null);
      },
      onError: () => {
        toast.error('Failed to delete branch');
      },
    });
  };

  const columns = [
    {
      key: 'name',
      title: 'Branch',
      render: (row: Record<string, unknown>) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary/10">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{row.name as string}</p>
            <p className="text-xs text-muted-foreground">{row.code as string}</p>
          </div>
        </div>
      ),
    },
    { key: 'city', title: 'City' },
    { key: 'state', title: 'State' },
    { key: 'phone', title: 'Phone' },
    {
      key: 'is_active',
      title: 'Status',
      render: (row: Record<string, unknown>) => (
        <Badge variant={row.is_active ? 'default' : 'secondary'}>
          {row.is_active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row: Record<string, unknown>) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleEdit(row as unknown as Branch)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => handleDelete(row as unknown as Branch)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Branches"
        description="Manage your organization branches and locations"
        actions={
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> Add Branch
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={branches as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search branches..."
      />

      {/* Create/Edit Branch Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              {editingBranch ? 'Edit Branch' : 'Add Branch'}
            </DialogTitle>
            <DialogDescription>
              {editingBranch
                ? 'Update the branch details below.'
                : 'Fill in the details to create a new branch.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Branch Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Mumbai HQ"
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Branch Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g. MUM"
                  {...form.register('code')}
                />
                {form.formState.errors.code && (
                  <p className="text-xs text-destructive">{form.formState.errors.code.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street address"
                {...form.register('address')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  {...form.register('city')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="State"
                  {...form.register('state')}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Country"
                  {...form.register('country')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+91 XX XXXX XXXX"
                  {...form.register('phone')}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="is_active"
                checked={form.watch('is_active')}
                onCheckedChange={(checked) => form.setValue('is_active', checked)}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createBranch.isPending || updateBranch.isPending}
              >
                {editingBranch ? 'Update Branch' : 'Create Branch'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Branch</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingBranch?.name}&quot;? This action cannot
              be undone. Associated records will have their branch reference set to null.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteBranch.isPending}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
