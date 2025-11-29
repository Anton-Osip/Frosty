import { SearchInput, Dropdown } from '../../shared/ui/components';
import s from './SlotsFilters.module.css';

type Option = { label: string; value: string };

type SlotsFiltersProps = {
  providerFilter: string;
  popularFilter: string;
  onProviderChange: (option: Option) => void;
  onPopularChange: (option: Option) => void;
};

const PROVIDER_OPTIONS: Option[] = [
  { label: 'Провайдеры', value: 'all' },
  { label: 'NetEnt', value: 'netent' },
];

const POPULAR_OPTIONS: Option[] = [
  { label: 'Популярные', value: 'all' },
  { label: 'Топ недели', value: 'week' },
];

export const SlotsFilters = ({
  providerFilter,
  popularFilter,
  onProviderChange,
  onPopularChange,
}: SlotsFiltersProps) => {
  return (
    <div className={s.filters}>
      <SearchInput />
      <div className={s.dropdownList}>
        <Dropdown options={PROVIDER_OPTIONS} value={providerFilter} onChange={onProviderChange} variant='default' />
        <Dropdown options={POPULAR_OPTIONS} value={popularFilter} onChange={onPopularChange} variant='default' />
      </div>
    </div>
  );
};
