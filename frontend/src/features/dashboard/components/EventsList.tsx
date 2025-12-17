import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types';

interface EventsListProps {
    events: CalendarEvent[];
}

export function EventsList({ events }: EventsListProps) {
    // Helper to get color classes
    const getEventStyle = (index: number) => {
        const styles = [
            'bg-[#EBA355] text-white',
            'bg-[#EBA355] text-white/90',
            'bg-[#EBA355] text-white/80'
        ];
        return styles[index % styles.length]; // Using orange theme from image
    };

    return (
        <div className="card-base h-full !bg-[#EFE5DC] overflow-hidden border border-white">
            <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-sm font-bold text-[#2D3436]">Eventos</h3>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar pr-1 ">
                {events.map((evt, i) => (
                    <div key={evt.id} className="p-3 rounded-2xl flex items-center gap-3 bg-white/90 border border-white/60 shadow-sm shrink-0">
                        {/* The image shows colored cards inside. Let's try to match the "Orange" look from the uploaded image 1 */}
                        <div className={cn("flex flex-col items-center justify-center p-2 rounded-xl min-w-[50px] aspect-square",
                            i === 0 ? "bg-[#EBA355] text-white" :
                                i === 1 ? "bg-[#EBA355]/90 text-white" : "bg-[#EBA355]/80 text-white"
                        )}>
                            <span className="font-bold text-lg leading-none">{evt.day}</span>
                            <span className="text-[9px] uppercase font-medium">{evt.weekday}</span>
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-sm font-bold text-[#2D3436] truncate">{evt.title}</h4>
                            <small className="text-[10px] text-gray-500 block truncate">{evt.client}</small>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10px] text-gray-400">{evt.timeRange}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
