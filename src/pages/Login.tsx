import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import {
    Key,
    User,
    Eye,
    EyeOff,
    TreePine,
    PlayCircle,
    ChevronDown,
    Info,
    AlertCircle,
    Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { login } from '@/services/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const loginSchema = z.object({
    email: z.string().email('Noto‘g‘ri elektron pochta manzili'),
    password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak'),
    remember: z.boolean().default(false),
});

const keySchema = z.object({
    searchKey: z.string().min(3, 'Kamida 3 ta belgi kiriting'),
    remember: z.boolean().default(false),
});

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema) as any,
        defaultValues: { email: '', password: '', remember: false },
    });

    const keyForm = useForm<z.infer<typeof keySchema>>({
        resolver: zodResolver(keySchema) as any,
        defaultValues: { searchKey: '', remember: false },
    });

    const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        setError(null);
        try {
            await login(values.email, values.password);
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);

            // API'dan keladigan xatolik xabarini aniqlash
            const data = err.response?.data;
            let errorMessage = 'Email yoki parol noto‘g‘ri';

            if (data) {
                if (Array.isArray(data) && data.length > 0) {
                    errorMessage = data[0];
                } else if (typeof data === 'string') {
                    errorMessage = data;
                } else if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.message) {
                    errorMessage = data.message;
                }
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const onKeySubmit = (values: z.infer<typeof keySchema>) => {
        console.log('Key values:', values);
        // Hozircha faqat email login ishlaydi
        setError('Hozircha faqat Login orqali kirish imkoniyati mavjud');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Small Header */}
            <header className="p-6 md:p-10 flex items-center justify-between max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <TreePine className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-bold text-2xl tracking-tighter text-gray-800 uppercase">Stat-Urmon</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-primary font-semibold gap-2">
                        <PlayCircle className="w-5 h-5" />
                        <span className="hidden sm:inline">Video ko‘rsatma</span>
                    </Button>
                    <div className="flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
                        <span className="font-bold text-primary">UZ</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </header>

            {/* Login Card */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[500px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Tizimga kirish</h1>
                        <p className="text-gray-500 font-medium tracking-wide">Urmon xo‘jaligi hisobini yuritish axborot tizimi</p>
                    </div>

                    {error && (
                        <Alert variant="destructive" className="bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Xatolik</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Card className="border-none shadow-[0_20px_50px_rgba(34,197,94,0.1)] rounded-[32px] overflow-hidden bg-white">
                        <CardContent className="p-8 md:p-10">
                            <Tabs defaultValue="login" className="w-full">
                                <TabsList className="mb-8 grid grid-cols-2 p-1.5 bg-gray-100 rounded-2xl h-14">
                                    <TabsTrigger value="key" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary font-bold">
                                        <Key className="w-4 h-4" />
                                        Kalit orqali
                                    </TabsTrigger>
                                    <TabsTrigger value="login" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold">
                                        <User className="w-4 h-4" />
                                        Login orqali
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="key" className="space-y-6">
                                    <Form {...keyForm}>
                                        <form onSubmit={keyForm.handleSubmit(onKeySubmit)} className="space-y-6">
                                            <FormField
                                                control={keyForm.control}
                                                name="searchKey"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold mb-2 block">Kalitni tanlang</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    placeholder="STIR yoki F.I.SH qidiruv"
                                                                    className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all text-lg"
                                                                    {...field}
                                                                />
                                                                <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Mock Certificate Card */}
                                            <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 space-y-3">
                                                <div className="flex items-center gap-2 text-primary font-bold mb-1">
                                                    <Info className="w-5 h-5" />
                                                    <span>MUXIDINOV ERKIN MADORBECKOVICH</span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 text-sm text-gray-500 font-medium">
                                                    <div className="flex justify-between"><span>№ Sertifikat:</span> <span className="text-gray-900">78199CC</span></div>
                                                    <div className="flex justify-between"><span>STIR:</span> <span className="text-gray-900">12445312</span></div>
                                                    <div className="flex justify-between"><span>Tashkilot:</span> <span className="text-gray-900">12445312</span></div>
                                                    <div className="flex justify-between"><span>Amal qilish muddati:</span> <span className="text-gray-900">12445312</span></div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <FormField
                                                    control={keyForm.control}
                                                    name="remember"
                                                    render={({ field }) => (
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id="remember-key"
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                            <label htmlFor="remember-key" className="text-sm font-medium text-gray-500 cursor-pointer">
                                                                Meni eslab qol
                                                            </label>
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <Button type="submit" disabled={isLoading} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                                                {isLoading ? <Loader2 className="animate-spin" /> : "KIRISH"}
                                            </Button>
                                        </form>
                                    </Form>
                                </TabsContent>

                                <TabsContent value="login" className="space-y-6">
                                    <Form {...loginForm}>
                                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                                            <FormField
                                                control={loginForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-600 font-semibold mb-2 block">Elektron pochta manzili</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Elektron pochta"
                                                                className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all text-lg"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={loginForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <FormLabel className="text-gray-600 font-semibold">Maxfiy kod</FormLabel>
                                                        </div>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    placeholder="Maxfiy kod"
                                                                    className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all text-lg"
                                                                    {...field}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                                                >
                                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                                </button>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="flex items-center justify-between">
                                                <FormField
                                                    control={loginForm.control}
                                                    name="remember"
                                                    render={({ field }) => (
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id="remember-login"
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                            <label htmlFor="remember-login" className="text-sm font-medium text-gray-500 cursor-pointer">
                                                                Meni eslab qol
                                                            </label>
                                                        </div>
                                                    )}
                                                />
                                                <button type="button" className="text-sm font-bold text-primary hover:underline">
                                                    Parolni unutdingizmi?
                                                </button>
                                            </div>

                                            <Button type="submit" disabled={isLoading} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                                                {isLoading ? <Loader2 className="animate-spin" /> : "KIRISH"}
                                            </Button>
                                        </form>
                                    </Form>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-8 text-center text-gray-400 text-sm font-medium">
                © 2025 "Urmontexnoservis" DUK, Texnik qo‘llab-quvvatlash: <span className="text-primary font-bold">+998 95 195 99 29</span>
            </footer>
        </div>
    );
};

export default Login;
