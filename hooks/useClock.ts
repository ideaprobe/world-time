import { useState, useEffect } from 'react';

export function useClock(interval = 1000) {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    // 使用 setTimeout 递归而不是 setInterval
    const tick = () => {
      setTime(Date.now());
      timeoutId = setTimeout(tick, interval);
    };

    // 首次调用
    let timeoutId = setTimeout(tick, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [interval]);

  return time;
}
