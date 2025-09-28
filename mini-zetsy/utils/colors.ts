import { Colors } from '@/constants/theme';

export const getPLColor = (value: number, theme: 'light' | 'dark'): string => {
  if (value > 0) return '#10B981';
  if (value < 0) return '#EF4444';
  return theme === 'light' ? Colors.light.text : Colors.dark.text;
};
