import React, { useEffect, useState } from 'react';
import { getStatements } from '@/services/reports';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Loader2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const Statements = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [lang, setLang] = useState('uz');
    const perPage = 10;

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getStatements({
                lang,
                page,
                per_page: perPage,
                search,
            });
            setData(response);
        } catch (error) {
            console.error('Error fetching statements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, lang]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchData();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Ma’lumotnoma olish</h1>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <form onSubmit={handleSearch} className="relative flex-1 md:w-80">
                        <Input
                            placeholder="Qidiruv..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </form>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Globe className="w-4 h-4" />
                                {lang.toUpperCase()}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setLang('uz')}>UZ</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLang('ru')}>RU</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nomi</TableHead>
                                    <TableHead>Sana</TableHead>
                                    <TableHead>Holati</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.results?.length > 0 ? (
                                    data.results.map((item: any) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name || 'Nomsiz'}</TableCell>
                                            <TableCell>{item.created_at || '-'}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {item.status || 'Kutilmoqda'}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                                            Ma'lumotlar topilmadi
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination placeholder */}
                        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Jami: {data?.count || 0} ta ma'lumot
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="font-medium">{page}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!data?.next}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Statements;
