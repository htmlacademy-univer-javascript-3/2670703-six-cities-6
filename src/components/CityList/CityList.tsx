import type React from 'react';

type CityListProps = {
  cities: readonly string[];
  activeCity: string;
  onCityChange: (city: string) => void;
};

function CityList({ cities, activeCity, onCityChange }: CityListProps) {
  const handleCityClick = (city: string, evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (city !== activeCity) {
      onCityChange(city);
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => {
          const isActive = city === activeCity;
          const linkClassName = `locations__item-link tabs__item${isActive ? ' tabs__item--active' : ''}`;

          return (
            <li className="locations__item" key={city}>
              <a
                className={linkClassName}
                href="#"
                onClick={(evt) => handleCityClick(city, evt)}
              >
                <span>{city}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CityList;
