import { useEffect } from 'react';
import { GameClock } from './types';

interface Options {
  clock: GameClock;
  onTick: () => void;
}

export const useGameClock = ({ clock, onTick }: Options) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onTick();
    }, clock.tickRate * 1000);

    return () => clearInterval(interval);
  }, [clock.tickRate, onTick]);
};
