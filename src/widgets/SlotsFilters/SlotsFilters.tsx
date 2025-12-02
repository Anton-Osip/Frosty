import { SearchInput, Dropdown } from '../../shared/ui/components';
import s from './SlotsFilters.module.css';
import { useProvidersStore } from '../../shared/stores';
import { useEffect } from 'react';

type Option = { label: string; value: string };

type SlotsFiltersProps = {
  providerFilter: string;
  popularFilter: string;
  searchQuery?: string;
  onProviderChange: (option: Option) => void;
  onPopularChange: (option: Option) => void;
  onSearchChange?: (value: string) => void;
};

const POPULAR_OPTIONS: Option[] = [
  { label: 'Новые', value: 'new' },
  { label: 'Популярные', value: 'popular' },
  { label: 'От А до Z', value: 'a_to_z' },
  { label: 'От Z до А', value: 'z_to_a' },
];

export const SlotsFilters = ({
  providerFilter,
  popularFilter,
  searchQuery,
  onProviderChange,
  onPopularChange,
  onSearchChange,
}: SlotsFiltersProps) => {
  const { data, fetchProviders } = useProvidersStore();

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const providerOptions: Option[] = [
    { label: 'Провайдеры', value: 'all' },
    ...(data?.map(provider => ({
      label: provider.label ?? provider.provider,
      value: provider.provider,
      number: provider.game_count,
    })) ?? []),
  ];

  return (
    <div className={s.filters}>
      <SearchInput value={searchQuery} onChange={onSearchChange} />
      <div className={s.dropdownList}>
        <Dropdown
          className={s.dropdown}
          scrollable
          options={providerOptions}
          value={providerFilter}
          onChange={onProviderChange}
          variant='default'
        />
        <Dropdown
          className={s.dropdown}
          options={POPULAR_OPTIONS}
          value={popularFilter}
          onChange={onPopularChange}
          variant='default'
        />
      </div>
    </div>
  );
};
