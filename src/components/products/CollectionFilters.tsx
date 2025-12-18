import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

const filterGroups: FilterGroup[] = [
  {
    id: 'niche',
    title: 'Photography Niche',
    options: [
      { id: 'newborn', label: 'Newborn', count: 12 },
      { id: 'maternity', label: 'Maternity', count: 8 },
      { id: 'wedding', label: 'Wedding', count: 24 },
      { id: 'portrait', label: 'Portrait', count: 32 },
      { id: 'pets', label: 'Pets', count: 6 },
      { id: 'landscape', label: 'Landscape', count: 15 },
      { id: 'boudoir', label: 'Boudoir', count: 10 },
    ],
  },
  {
    id: 'software',
    title: 'Software',
    options: [
      { id: 'lightroom', label: 'Lightroom', count: 85 },
      { id: 'photoshop', label: 'Photoshop', count: 42 },
      { id: 'capture-one', label: 'Capture One', count: 18 },
    ],
  },
  {
    id: 'style',
    title: 'Style',
    options: [
      { id: 'moody', label: 'Moody & Dark', count: 22 },
      { id: 'bright', label: 'Light & Airy', count: 28 },
      { id: 'warm', label: 'Warm Tones', count: 19 },
      { id: 'cool', label: 'Cool Tones', count: 15 },
      { id: 'film', label: 'Film Look', count: 12 },
      { id: 'bw', label: 'Black & White', count: 8 },
    ],
  },
  {
    id: 'price',
    title: 'Price Range',
    options: [
      { id: 'under-25', label: 'Under $25', count: 14 },
      { id: '25-50', label: '$25 - $50', count: 38 },
      { id: '50-100', label: '$50 - $100', count: 25 },
      { id: 'over-100', label: 'Over $100', count: 8 },
    ],
  },
];

interface CollectionFiltersProps {
  onFilterChange?: (filters: Record<string, string[]>) => void;
  className?: string;
}

export function CollectionFilters({ onFilterChange, className }: CollectionFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    filterGroups.map((g) => g.id)
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleFilter = (groupId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const groupFilters = prev[groupId] || [];
      const updated = groupFilters.includes(optionId)
        ? groupFilters.filter((id) => id !== optionId)
        : [...groupFilters, optionId];
      
      const newFilters = { ...prev, [groupId]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
    onFilterChange?.({});
  };

  const totalSelected = Object.values(selectedFilters).flat().length;

  return (
    <aside className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-semibold">Filters</h3>
        {totalSelected > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-primary hover:underline"
          >
            Clear all ({totalSelected})
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        {filterGroups.map((group) => (
          <div key={group.id} className="border-b border-border pb-4">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-foreground">{group.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform',
                  expandedGroups.includes(group.id) && 'rotate-180'
                )}
              />
            </button>

            {expandedGroups.includes(group.id) && (
              <div className="mt-2 space-y-2">
                {group.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <Checkbox
                      id={`${group.id}-${option.id}`}
                      checked={(selectedFilters[group.id] || []).includes(option.id)}
                      onCheckedChange={() => toggleFilter(group.id, option.id)}
                    />
                    <span className="flex-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {option.label}
                    </span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
