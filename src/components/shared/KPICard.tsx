import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  bgImage?: string;
}

export function KPICard({ label, value, icon: Icon, trend, description, className }: KPICardProps) {
  return (
    <Card className={cn('relative overflow-hidden group border border-[#E7E5E4] hover:border-[#FF7A00]/40 transition-all bg-white', className)}>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#667085]">{label}</p>
            <p className="text-2xl font-bold text-[#101828] tracking-tight">{value}</p>
            {trend && (
              <div className="flex items-center gap-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-[#12B76A]" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-[#F04438]" />
                )}
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend.isPositive ? 'text-[#12B76A]' : 'text-[#F04438]'
                  )}
                >
                  {trend.isPositive ? '+' : ''}
                  {trend.value}%
                </span>
                {description && (
                  <span className="text-xs text-[#667085] ml-1">{description}</span>
                )}
              </div>
            )}
            {!trend && description && (
              <p className="text-xs text-[#667085]">{description}</p>
            )}
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#FFF1E6] border border-[#FF7A00]/20 group-hover:border-[#FF7A00]/50 shadow-sm transition-colors">
            <Icon className="h-5 w-5 text-[#FF7A00]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
