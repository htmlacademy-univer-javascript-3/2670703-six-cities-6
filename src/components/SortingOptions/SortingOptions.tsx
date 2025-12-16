import { useState } from 'react';
import { SortingType } from '../../const';

type SortingOptionsProps = {
  currentSortingType: SortingType;
  onSortingTypeChange: (sortingType: SortingType) => void;
};

const sortingOptions: SortingType[] = [
  SortingType.Popular,
  SortingType.PriceLowToHigh,
  SortingType.PriceHighToLow,
  SortingType.TopRatedFirst,
];

function SortingOptions({ currentSortingType, onSortingTypeChange }: SortingOptionsProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggleClick = () => {
    setIsOpened((prevState) => !prevState);
  };

  const handleOptionClick = (sortingType: SortingType) => {
    onSortingTypeChange(sortingType);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggleClick}>
        {currentSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {sortingOptions.map((sortingType) => (
          <li
            key={sortingType}
            className={`places__option ${sortingType === currentSortingType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(sortingType)}
          >
            {sortingType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;


