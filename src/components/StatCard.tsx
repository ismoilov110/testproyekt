import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    count: number;
    icon: LucideIcon;
    iconColor: string;
    badgeColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    count,
    icon: Icon,
    iconColor,
    badgeColor = "bg-primary"
}) => {
    return (
        <Card className="hover:shadow-md transition-all cursor-pointer group rounded-3xl border-none shadow-sm h-32 flex items-center">
            <CardContent className="p-6 flex items-center justify-between w-full h-full">
                <div className="flex items-center gap-4">
                    <div className={cn("p-2.5 rounded-xl", iconColor)}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-gray-700 text-lg">{title}</span>
                </div>
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm self-start -mt-3 -mr-3",
                    badgeColor
                )}>
                    {count}
                </div>
            </CardContent>
        </Card>
    );
};
