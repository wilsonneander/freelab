import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types';

interface EventsListProps {
    events: CalendarEvent[];
}

export function EventsList({ events }: EventsListProps) {
    // Helper to get color classes based on event type/props (simplified mapping)
    const getEventStyle = (index: number) => {
        // Just cycling styles for demo purposes, in real app would depend on type
        const styles = [
            'bg-[#FFE8D6] border-l-4 border-[#FF9F43]',
            'bg-[#FFF8E1] border-l-4 border-[#FFC107]',
            'bg-white border-l-4 border-gray-200'
        ];
        return styles[index % styles.length];
    };

    return (
        <div className="flex flex-col">
            <h3 className="text-sm font-medium text-[#2D3436] mb-4">Eventos</h3>
            <div className="flex flex-col gap-3 mb-6">
                {events.map((evt, i) => (
                    <div key={evt.id} className={cn("p-3 rounded-2xl flex items-center gap-3", getEventStyle(i))}>
                        <div className="flex flex-col items-center justify-center bg-white/50 p-2 rounded-xl min-w-[45px]">
                            <span className="font-bold text-base text-[#2D3436]">{evt.day}</span>
                            <span className="text-[10px] uppercase text-gray-500">{evt.weekday}</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold m-0">{evt.title}</h4>
                            <small className="text-[10px] text-gray-500 block">{evt.timeRange}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
