import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Map from './Map';
import type { City, Offer } from '../../types/offer';
import { createMockCity, createMockOffer } from '../../test-utils/mocks';

vi.mock('leaflet', () => {
  const addTo = vi.fn();
  const setView = vi.fn();

  const mapInstance = {
    setView,
    removeLayer: vi.fn()
  };

  const L = {
    map: vi.fn(() => mapInstance),
    marker: vi.fn(() => ({ addTo })),
    tileLayer: vi.fn(() => ({ addTo })),
    layerGroup: vi.fn(() => ({
      addTo,
      remove: vi.fn()
    }))
  };

  return {
    __esModule: true,
    default: L,
    Icon: vi.fn(),
    LayerGroup: vi.fn(),
    Map: vi.fn(),
    marker: L.marker,
    layerGroup: L.layerGroup,
    tileLayer: L.tileLayer
  };
});

describe('Map component', () => {
  it('should render container element', () => {
    const city: City = createMockCity();
    const offers: Offer[] = [createMockOffer({ id: '1', city })];

    const { container } = render(
      <Map city={city} offers={offers} activeOfferId={null} />
    );

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});
