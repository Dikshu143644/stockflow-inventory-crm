import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  bannerImage?: string;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#101828]">{title}</h1>
        {description && <p className="text-sm text-[#667085] mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 mt-3 sm:mt-0">{actions}</div>}
    </div>
  );
}
