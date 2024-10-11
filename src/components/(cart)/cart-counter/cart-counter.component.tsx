import type { MotionValue } from 'framer-motion';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

interface CounterProps {
  value: number;
}

export function CartCounter({ value }: CounterProps) {
  return (
    <div className='flex overflow-hidden text-secondary-100'>
      {value
        .toString()
        .split('')
        .map((_, index) => (
          <Digit key={index} place={Math.pow(10, index)} value={value} />
        ))}
    </div>
  );
}

interface DigitProps {
  place: number;
  value: number;
}

export function Digit({ place, value }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className='relative w-[1ch] tabular-nums'>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <Number key={i} mv={animatedValue} number={i} />
        ))}
    </div>
  );
}

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
}

export function Number({ mv, number }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    return (offset > 5 ? offset - 10 : offset) * height;
  });

  return (
    <motion.span
      style={{ y }}
      className='absolute inset-0 flex items-center justify-center'
    >
      {number}
    </motion.span>
  );
}
