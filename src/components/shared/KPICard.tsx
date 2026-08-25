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
  size?: 'default' | 'wide' | 'tall';
}

const sizeClasses: Record<NonNullable<KPICardProps['size']>, string> = {
  default: '',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
};

export function KPICard({ label, value, icon: Icon, trend, description, className, bgImage, size = 'default' }: KPICardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden group border border-white/60 shadow-lg hover:shadow-xl hover:border-orange-400/80 transition-all rounded-[22px]',
        'backdrop-blur-xl bg-white/40',
        sizeClasses[size],
        className
      )}
    >
      {/* Background Image with Glassmorphism */}
      {bgImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover opacity-60 filter saturate-125 group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent" />
        </div>
      )}

      <CardContent className={cn('p-6 relative z-10', size === 'tall' && 'flex flex-col justify-between h-full')}>
        <div className="flex items-start justify-between rounded-xl bg-white/40 backdrop-blur-sm p-3 -m-3">
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700" style={{ textShadow: '0 1px 3px rgb(255 255 255 / 80%)' }}>{label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight" style={{ textShadow: '0 1px 3px rgb(255 255 255 / 80%)' }}>{value}</p>
            {trend && (
              <div className="flex items-center gap-1 pt-0.5">
                {trend.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
                )}
                <span
                  className={cn(
                    'text-xs font-bold',
                    trend.isPositive ? 'text-emerald-600' : 'text-rose-500'
                  )}
                >
                  {trend.isPositive ? '+' : ''}
                  {trend.value}%
                </span>
                {description && (
                  <span className="text-xs text-slate-600 ml-1" style={{ textShadow: '0 1px 3px rgb(255 255 255 / 80%)' }}>{description}</span>
                )}
              </div>
            )}
            {!trend && description && (
              <p className="text-xs text-slate-600" style={{ textShadow: '0 1px 3px rgb(255 255 255 / 80%)' }}>{description}</p>
            )}
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-orange-50/80 border border-orange-200/80 group-hover:border-orange-400 shadow-sm backdrop-blur-sm transition-colors">
            <Icon className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
