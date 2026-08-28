import { motion } from 'motion/react';
import {
  Handshake,
  Plus, ArrowRight, TrendingUp, Users, BarChart3,
  UserPlus, CalendarClock, Activity, Filter,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/components/shared/KPICard';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { format, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { useHotLeads } from '@/hooks/useLeadPipeline';
import { usePipelineValue } from '@/hooks/useDealPipeline';
import { useOverdueFollowUps } from '@/hooks/useFollowUps';
import { useDeals } from '@/hooks/useDeals';

// NOTE: This dashboard is intentionally CRM-focused. ERP widgets (inventory
// valuation, total orders, stock movements, top-selling products, warehouse
// telemetry, category distribution) were removed because the ERP sections are
// hidden in the deployed app. Every link below points to a visible CRM/Reports/AI
// route so there are no broken links to hidden pages.

const pipelineTrendData = Array.from({ length: 12 }, (_, i) => {
  const date = subMonths(new Date(), 11 - i);
  return {
    month: format(date, 'MMM'),
    pipeline: Math.floor(180000 + Math.random() * 120000),
    won: Math.floor(60000 + Math.random() * 90000),
  };
});

const recentActivity = [
  { type: 'deal', message: 'Deal "Enterprise License" moved to Negotiation', time: '42 min ago', icon: Handshake },
  { type: 'lead', message: 'New lead captured: TechVentures Inc.', time: '1 hr ago', icon: UserPlus },
  { type: 'customer', message: 'Customer profile updated: GlobalTech Solutions', time: '2 hrs ago', icon: Users },
  { type: 'followup', message: 'Follow-up scheduled with MicroChip Supplies', time: '3 hrs ago', icon: CalendarClock },
  { type: 'activity', message: 'Call logged with Northwind Traders', time: '4 hrs ago', icon: Activity },
];

const dealPipeline = [
  { stage: 'Qualification', count: 18, value: 245000 },
  { stage: 'Needs Analysis', count: 12, value: 380000 },
  { stage: 'Proposal', count: 8, value: 520000 },
  { stage: 'Negotiation', count: 6, value: 680000 },
  { stage: 'Closed Won', count: 4, value: 420000 },
];

const quickActions = [
  { label: 'New Customer', icon: Users, href: '/crm/customers' },
  { label: 'New Lead', icon: UserPlus, href: '/crm/leads' },
  { label: 'New Deal', icon: Handshake, href: '/crm/deals' },
  { label: 'Log Activity', icon: Activity, href: '/crm/activities' },
  { label: 'View Funnel', icon: Filter, href: '/crm/funnel' },
  { label: 'Generate Report', icon: BarChart3, href: '/reports/export' },
];

const topDeals = [
  { name: 'Enterprise License - Acme Corp', revenue: 68000 },
  { name: 'Annual Support - GlobalTech', revenue: 52000 },
  { name: 'Platform Rollout - Northwind', revenue: 45000 },
  { name: 'Onboarding - TechVentures', revenue: 38000 },
  { name: 'Renewal - MicroChip', revenue: 31000 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-[12px] px-3 py-2 text-xs">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-muted-foreground">
            {p.dataKey}: ${(p.value / 1000).toFixed(0)}K
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  useDocumentTitle('Dashboard');
  // CRM hooks for live data
  const { data: hotLeads } = useHotLeads();
  const { data: pipelineValue } = usePipelineValue();
  const { data: overdueFollowUps } = useOverdueFollowUps();
  const { data: dealsData } = useDeals({ pageSize: 100 });

  // Calculate deals closing this week
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const dealsClosingThisWeek = (dealsData?.data ?? []).filter((deal) => {
    if (!deal.expected_close_date) return false;
    const closeDate = new Date(deal.expected_close_date);
    return closeDate >= weekStart && closeDate <= weekEnd;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner in White/Orange landing style */}
      <div className="relative overflow-hidden rounded-[24px] border border-slate-200/90 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              Good morning, Admin 👋
            </h1>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Here's what's happening across your customer relationships today.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" asChild className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold">
              <Link to="/reports/export">
                <BarChart3 className="mr-2 h-4 w-4 text-orange-500" /> Export Report
              </Link>
            </Button>
            <Button size="sm" asChild className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20">
              <Link to="/crm/customers">
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CRM KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <KPICard
          label="Active Customers"
          value="856"
          icon={Users}
          trend={{ value: 8.6, isPositive: true }}
          description="verified accounts"
          bgImage="/images/cards/card-crm-bg.jpg"
        />
        <KPICard
          label="Hot Leads"
          value={hotLeads?.length ?? 0}
          icon={UserPlus}
          description="score > 70"
          bgImage="/images/cards/card-crm-bg.jpg"
        />
        <KPICard
          label="Pipeline Value"
          value={`$${((pipelineValue?.weighted_value ?? 0) / 1000).toFixed(0)}K`}
          icon={TrendingUp}
          description="weighted total"
          bgImage="/images/cards/card-pipeline-bg.jpg"
        />
        <KPICard
          label="Deals Closing This Week"
          value={dealsClosingThisWeek.length}
          icon={Handshake}
          description="this week"
          bgImage="/images/cards/card-crm-bg.jpg"
        />
      </motion.div>

      {/* Secondary CRM Widgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <KPICard
          label="Overdue Follow-ups"
          value={overdueFollowUps?.length ?? 0}
          icon={CalendarClock}
          description="need attention"
          className={(overdueFollowUps?.length ?? 0) > 5 ? 'border-amber-500/20' : undefined}
          bgImage="/images/cards/card-analytics-bg.jpg"
        />
        <KPICard
          label="Open Deals"
          value={dealsData?.count ?? 0}
          icon={Handshake}
          description="in pipeline"
          bgImage="/images/cards/card-pipeline-bg.jpg"
        />
        <KPICard
          label="New Leads (30d)"
          value="124"
          icon={UserPlus}
          trend={{ value: 11.3, isPositive: true }}
          description="vs previous period"
          bgImage="/images/cards/card-crm-bg.jpg"
        />
        <KPICard
          label="Win Rate"
          value="32%"
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
          description="last 90 days"
          bgImage="/images/cards/card-analytics-bg.jpg"
        />
      </motion.div>

      {/* Pipeline Trend Chart + Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pipeline & Won Deals</span>
              <span className="text-sm font-normal text-muted-foreground">Last 12 months</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pipelineTrendData}>
                  <defs>
                    <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="pipeline"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#pipelineGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="won"
                    stroke="#f97316"
                    strokeWidth={2}
                    fillOpacity={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  asChild
                  className="h-auto flex-col gap-2 py-4 text-xs"
                >
                  <Link to={action.href}>
                    <action.icon className="h-5 w-5 text-primary" />
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity + Deals Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <Link to="/crm/activities">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Deals Pipeline</span>
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <Link to="/crm/deals">
                  <Plus className="mr-1 h-3 w-3" /> New Deal
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dealPipeline.map((stage) => (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{stage.stage}</span>
                    <span className="text-foreground font-medium">
                      {stage.count} deals &middot; ${(stage.value / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(stage.value / 680000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="text-muted-foreground">Total Pipeline Value</span>
                <span className="font-bold text-primary">$2,245,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Deals by Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Top Deals by Value</span>
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <Link to="/crm/deals">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topDeals} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
                  <YAxis type="category" dataKey="name" stroke="#71717a" fontSize={11} width={180} />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="glass rounded-[12px] px-3 py-2 text-xs">
                          <p className="text-foreground">${payload[0].value?.toLocaleString()}</p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
