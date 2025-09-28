import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { TimeRange, TimeRangeOption } from '@/types/chart';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TimeRangeDropdownProps {
  selectedOption: TimeRangeOption | undefined;
  dropdownVisible: boolean;
  timeRangeOptions: readonly TimeRangeOption[];
  selectedTimeRange: TimeRange;
  onOpenDropdown: () => void;
  onCloseDropdown: () => void;
  onSelectTimeRange: (range: TimeRange) => void;
}

export const TimeRangeDropdown = React.memo(function TimeRangeDropdown({
  selectedOption,
  dropdownVisible,
  timeRangeOptions,
  selectedTimeRange,
  onOpenDropdown,
  onCloseDropdown,
  onSelectTimeRange,
}: TimeRangeDropdownProps) {
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
            backgroundColor: theme === 'light' ? '#F9FAFB' : '#374151'
          }
        ]}
        onPress={onOpenDropdown}
      >
        <ThemedText style={styles.buttonText}>
          {selectedOption?.label}
        </ThemedText>
        <ThemedText style={[
          styles.arrow,
          { transform: [{ rotate: dropdownVisible ? '180deg' : '0deg' }] }
        ]}>
          ▼
        </ThemedText>
      </TouchableOpacity>

      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={onCloseDropdown}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onCloseDropdown}
        >
          <View style={[
            styles.menu,
            {
              backgroundColor: theme === 'light' ? 'white' : '#1F2937',
              borderColor: theme === 'light' ? '#E5E7EB' : '#374151'
            }
          ]}>
            {timeRangeOptions.map((option, index) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.item,
                  index === timeRangeOptions.length - 1 && { borderBottomWidth: 0 },
                  selectedTimeRange === option.value && {
                    backgroundColor: theme === 'light' ? '#EFF6FF' : '#1E40AF20'
                  }
                ]}
                onPress={() => onSelectTimeRange(option.value)}
              >
                <ThemedText style={[
                  styles.itemText,
                  selectedTimeRange === option.value && {
                    color: theme === 'light' ? Colors.light.tint : Colors.dark.tint,
                    fontWeight: '600'
                  }
                ]}>
                  {option.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minWidth: 80,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 80,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 12,
    marginLeft: 8,
    opacity: 0.7,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    borderRadius: 8,
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minWidth: 100,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  itemText: {
    fontSize: 14,
  },
});