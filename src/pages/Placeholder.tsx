import { Construction } from 'lucide-react';

const Placeholder = ({ title }: { title?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="bg-primary/10 p-6 rounded-full">
                <Construction className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{title || 'Bo‘lim nomi'}</h1>
            <p className="text-gray-500 max-w-md">
                Ushbu bo‘lim hozirda ishlab chiqilmoqda. Tez orada barcha funksiyalar foydalanishga topshiriladi.
            </p>
        </div>
    );
};

export default Placeholder;
