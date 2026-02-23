import { useEffect, useState } from 'react';
import {
    Send,
    RotateCcw,
    CheckCircle2,
    UserCheck,
    FileEdit,
    MessageSquare
} from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { getDashboard } from '@/services/reports';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const dashboardData = await getDashboard();
                setData(dashboardData);
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = [
        {
            title: 'Jo’natilgan hisobotlar',
            count: data?.sent_reports || 0,
            icon: Send,
            iconColor: 'bg-amber-100 text-amber-500',
            badgeColor: 'bg-teal-500'
        },
        {
            title: 'Qaytarilgan hisobotlar',
            count: data?.returned_reports || 0,
            icon: RotateCcw,
            iconColor: 'bg-rose-100 text-rose-500',
            badgeColor: 'bg-teal-500'
        },
        {
            title: 'Qabul qilingan hisobotlar',
            count: data?.accepted_reports || 0,
            icon: CheckCircle2,
            iconColor: 'bg-indigo-100 text-indigo-500',
            badgeColor: 'bg-teal-500'
        },
        {
            title: 'Mas’ul vakillar',
            count: data?.responsible_users || 0,
            icon: UserCheck,
            iconColor: 'bg-slate-700 text-white',
            badgeColor: 'bg-teal-500'
        },
        {
            title: 'Qoralama',
            count: data?.draft_reports || 0,
            icon: FileEdit,
            iconColor: 'bg-teal-100 text-teal-600',
            badgeColor: 'bg-teal-500'
        },
        {
            title: 'Habarnomalar',
            // Swaggerda notif yo‘q, vaqtincha deadlineni qo‘yamiz
            count: data?.deadlines || 0,
            icon: MessageSquare,
            iconColor: 'bg-emerald-100 text-emerald-500',
            badgeColor: 'bg-teal-500'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Bosh sahifa</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-[140px] rounded-[32px]" />
                    ))
                ) : (
                    stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            count={stat.count}
                            icon={stat.icon}
                            iconColor={stat.iconColor}
                            badgeColor={stat.badgeColor}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
