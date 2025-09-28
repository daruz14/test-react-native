import { useState } from 'react';
import { TimeRange, TimeRangeOption } from '@/types/chart';

const timeRangeOptions = [
  { value: 'today' as TimeRange, label: 'Today' },
  { value: '1w' as TimeRange, label: '1W' },
  { value: '1m' as TimeRange, label: '1M' },
  { value: '2m' as TimeRange, label: '2M' },
] as const;

export function useTimeRange(initialRange: TimeRange = '1m') {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(initialRange);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selectedOption = timeRangeOptions.find(option => option.value === selectedTimeRange);

  const openDropdown = () => setDropdownVisible(true);
  const closeDropdown = () => setDropdownVisible(false);

  const selectTimeRange = (range: TimeRange) => {
    setSelectedTimeRange(range);
    closeDropdown();
  };

  return {
    selectedTimeRange,
    selectedOption,
    dropdownVisible,
    timeRangeOptions,
    openDropdown,
    closeDropdown,
    selectTimeRange,
  };
}