import { Building2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBranchContext } from '@/contexts/BranchContext';
import { useBranches } from '@/hooks/useBranches';

export function BranchSelector() {
  const { currentBranchId, setCurrentBranch } = useBranchContext();
  const { data: branchesData, isLoading } = useBranches({ is_active: true, pageSize: 100 });

  const branches = branchesData?.data ?? [];

  return (
    <Select
      value={currentBranchId || 'all'}
      onValueChange={(value) => setCurrentBranch(value === 'all' ? null : value)}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[180px] h-9 bg-background/40 border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="All Branches" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Branches</SelectItem>
        {branches.map((branch) => (
          <SelectItem key={branch.id} value={branch.id}>
            {branch.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
