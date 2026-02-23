import { NavLink } from 'react-router-dom';
import {
    Home,
    BarChart2,
    Users,
    Wallet,
    TreePine,
    Map,
    PlusCircle,
    ShieldCheck,
    Leaf,
    FileText,
    HelpCircle,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/services/auth';

const menuItems = [
    { icon: Home, label: 'Bosh sahifa', path: '/' },
    { icon: BarChart2, label: 'Axborot-tahlil, ijro intizomi', path: '/analytics' },
    { icon: Users, label: 'Inson resurslarini boshqarish', path: '/hr', hasSub: true },
    { icon: Wallet, label: 'Moliya-iqtisod va buxgalteriya', path: '/finance', hasSub: true },
    { icon: TreePine, label: 'O‘rmon barpo qilish', path: '/forest-creation' },
    { icon: Map, label: 'O‘rmon kadastri, ijara', path: '/forest-cadastre', hasSub: true },
    { icon: PlusCircle, label: 'O‘rmonlardan qo‘shimcha...', path: '/forest-additional', hasSub: true },
    { icon: ShieldCheck, label: 'O‘rmonlarni muhofaza qilish', path: '/forest-protection' },
    { icon: Leaf, label: 'Yashil hududlarni rivojlantirish', path: '/green-development' },
    { icon: FileText, label: 'Ma’lumotnoma olish', path: '/certificates' },
    { icon: HelpCircle, label: 'Yordam va ma’lumot', path: '/help' },
];

export const AppSidebar = ({ onClose }: { onClose?: () => void }) => {
    return (
        <div className="w-[300px] h-full flex flex-col bg-white border-r border-gray-100 p-4 gap-6 overflow-y-auto custom-scrollbar">
            {/* User Card */}
            <div className="bg-primary rounded-3xl p-6 text-white flex flex-col items-center gap-3 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <Avatar className="w-20 h-20 border-4 border-white/20 shadow-xl">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-white text-primary text-2xl font-bold">
                        <Users className="w-10 h-10" />
                    </AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h3 className="font-bold text-lg leading-tight uppercase">Odilxon Yuldoshxonov</h3>
                    <p className="text-white/80 text-sm mt-1">User number: <span className="font-mono">123654</span></p>
                    <p className="text-white/80 text-sm">Tashkilot: <span className="font-semibold italic">Urmontexnoservis</span></p>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                            isActive
                                ? "bg-primary text-white shadow-md shadow-primary/20 font-medium"
                                : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                        )}
                    >
                        {(navProps: any) => (
                            <>
                                <item.icon className={cn("w-5 h-5", navProps.isActive ? "text-white" : "group-hover:text-primary")} />
                                <span className="flex-1 text-[15px]">{item.label}</span>
                                {item.hasSub && <ChevronRight className={cn("w-4 h-4", navProps.isActive ? "text-white/70" : "text-gray-300")} />}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout at bottom */}
            <button
                onClick={logout}
                className="mt-auto flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors w-full text-left"
            >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Chiqish</span>
            </button>
        </div>
    );
};
