import { Building2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBranchContext } from '@/contexts/BranchContext';

const mockBranches = [
  { id: '1', name: 'Mumbai HQ', code: 'MUM' },
  { id: '2', name: 'Delhi', code: 'DEL' },
  { id: '3', name: 'Bangalore', code: 'BLR' },
  { id: '4', name: 'Kolkata', code: 'KOL' },
  { id: '5', name: 'Ahmedabad', code: 'AHM' },
];

export function BranchSelector() {
  const { currentBranchId, setCurrentBranch } = useBranchContext();

  return (
    <Select
      value={currentBranchId || 'all'}
      onValueChange={(value) => setCurrentBranch(value === 'all' ? null : value)}
    >
      <SelectTrigger className="w-[180px] h-9 bg-background/40 border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="All Branches" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Branches</SelectItem>
        {mockBranches.map((branch) => (
          <SelectItem key={branch.id} value={branch.id}>
            {branch.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
