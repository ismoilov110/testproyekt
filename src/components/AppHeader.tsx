import {
    Search,
    PlayCircle,
    Bell,
    ChevronDown,
    Menu,
    TreePine,
    LogOut,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppSidebar } from './AppSidebar';

export const AppHeader = () => {
    return (
        <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-8">
                {/* Mobile Burger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-none w-fit">
                        <AppSidebar />
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                        <TreePine className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-800 uppercase">Stat-Urmon</span>
                </div>

                {/* Search */}
                <div className="hidden md:flex items-center relative w-72">
                    <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Qidiruv..."
                        className="pl-10 h-10 bg-gray-50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Video Tutorial */}
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-xl hidden sm:flex h-10 px-4">
                    <PlayCircle className="w-4 h-4" />
                    <span className="font-medium">Video ko‘rsatma</span>
                </Button>

                {/* Language Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 rounded-xl border-gray-200 h-10 px-4">
                            <span className="font-bold text-primary">UZ</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl mt-2 w-32">
                        <DropdownMenuItem className="font-medium cursor-pointer">O'zbek (UZ)</DropdownMenuItem>
                        <DropdownMenuItem className="font-medium cursor-pointer">Русский (RU)</DropdownMenuItem>
                        <DropdownMenuItem className="font-medium cursor-pointer">English (EN)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-primary rounded-xl h-10 w-10">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </Button>

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-1 rounded-xl hover:bg-gray-100 transition-colors gap-2">
                            <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <User className="w-5 h-5" />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mt-2">
                        <div className="p-3 border-b border-gray-50 mb-2">
                            <p className="font-bold text-gray-800">Odilxon Yuldoshxonov</p>
                            <p className="text-xs text-gray-500 truncate">adilkhon@urmon.uz</p>
                        </div>
                        <DropdownMenuItem className="rounded-xl gap-2 h-11 cursor-pointer">
                            <User className="w-4 h-4" /> Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl gap-2 h-11 text-red-500 cursor-pointer">
                            <LogOut className="w-4 h-4" /> Chiqish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};
