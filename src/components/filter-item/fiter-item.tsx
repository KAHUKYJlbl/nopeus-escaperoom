import { Filters, QuestLevel, QuestType } from '../../const';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { changeCurrentLevelFilter, changeCurrentTypeFilter } from '../../store/app/app-slice';
import { getCurrentLevelFilter, getCurrentTypeFilter } from '../../store/app/selectors';

type FilterItemProps = {
  filter: QuestType | QuestLevel;
  filterType: Filters;
  filterName: string;
};

const QuestFilterIconWidth: Record<QuestType | QuestLevel, string> = {
  [QuestType.All]: '26',
  [QuestType.Adventures]: '36',
  [QuestType.Horror]: '30',
  [QuestType.Mystic]: '30',
  [QuestType.Detective]: '40',
  [QuestType.SciFi]: '28',
  [QuestLevel.Any]: '0',
  [QuestLevel.Easy]: '0',
  [QuestLevel.Medium]: '0',
  [QuestLevel.Hard]: '0',
};

export default function FilterItem ({filter, filterType, filterName}: FilterItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentLevelFilter = useAppSelector(getCurrentLevelFilter);
  const currentTypeFilter = useAppSelector(getCurrentTypeFilter);

  const handleRadioChange = () => {
    if (filterType === Filters.Type) {
      dispatch(changeCurrentTypeFilter(filter as QuestType));
    } else if (filterType === Filters.Level) {
      dispatch(changeCurrentLevelFilter(filter as QuestLevel));
    }
  };

  return (
    <li className="filter__item">
      <input
        type="radio"
        name={filterType}
        id={filter}
        checked={filter === currentLevelFilter || filter === currentTypeFilter}
        onChange={handleRadioChange}
      />
      <label className="filter__label" htmlFor={filter}>
        {
          filterType === Filters.Type &&
          <svg className="filter__icon" width={QuestFilterIconWidth[filter]} height="30" aria-hidden="true">
            <image href={`/img/sprite/icon-${filter}.svg`} />
          </svg>
        }
        <span className="filter__label-text">{filterName}</span>
      </label>
    </li>
  );
}
