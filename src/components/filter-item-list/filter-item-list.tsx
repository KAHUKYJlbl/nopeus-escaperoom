import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Filters, QuestLevel, QuestFilterNames, QuestType } from '../../const';
import { changeCurrentLevelFilter, changeCurrentTypeFilter } from '../../store/app/app-slice';
import FilterItem from '../filter-item/fiter-item';

type FilterItemListProps = {
  filterBy: keyof typeof filterTypes;
};

type FilterType = {
  filterItems: typeof QuestType | typeof QuestLevel;
  filterItemsMap: typeof QuestFilterNames;
}

const filterTypes: Record<Filters, FilterType> = {
  type: {
    filterItems: QuestType,
    filterItemsMap: QuestFilterNames,
  },
  level: {
    filterItems: QuestLevel,
    filterItemsMap: QuestFilterNames,
  }
};

export default function FilterItemList ({filterBy}: FilterItemListProps): JSX.Element {
  return (
    <ul className="filter__list">
      {Object.values(filterTypes[filterBy].filterItems).map((filterItem: QuestType | QuestLevel) =>
        <FilterItem
          key={filterItem}
          filter={filterItem}
          filterType={filterBy}
          filterName={filterTypes[filterBy].filterItemsMap[filterItem]}
        />
      )}
    </ul>
  );
}
