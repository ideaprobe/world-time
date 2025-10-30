import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function useTimezone(tz: string, timestamp: number | null): Dayjs | null {
    const [time, setTime] = useState<Dayjs | null>(null);

    useEffect(() => {
        const fn = () => {
            if (timestamp === null) {
                setTime(null);
                return;
            }

            setTime(dayjs(timestamp).tz(tz));
        };
        if (timestamp === null) {
            fn()
            return;
        }

        fn()
    }, [timestamp, tz]);

    return time;
}
