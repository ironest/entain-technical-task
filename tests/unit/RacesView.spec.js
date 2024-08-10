import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import RacesView from '../../src/views/RacesView.vue';
import RaceList from '../../src/components/RaceList.vue';
import RaceFilters from '../../src/components/RaceFilters.vue';
import { fetchMockData } from '../mocks/fetchMockData';

// Mock fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(fetchMockData),
  }),
);

describe('RacesView', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(RacesView);
    await wrapper.vm.$nextTick(); // Wait for next tick to allow data fetching to complete
    await new Promise((resolve) => setTimeout(resolve, 0)); // Workaround | Letting any async operations to complete
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it('View has expected title', () => {
    const pageTitle = wrapper.find('h1');
    expect(pageTitle.text()).toEqual('Entain Technical Task');
  });

  it('performs a fetch on mount', async () => {
    expect(fetch).toHaveBeenCalledWith('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=20');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Rendering one child RaceFilters component', () => {
    expect(wrapper.findComponent(RaceFilters).exists()).toBe(true);
    expect(wrapper.findAllComponents(RaceFilters).length).toBe(1);
  });

  it('Rendering one child RaceList component', () => {
    expect(wrapper.findComponent(RaceList).exists()).toBe(true);
    expect(wrapper.findAllComponents(RaceList).length).toBe(1);
  });

  it('Race is older than 60 seconds', async () => {
    // The mock data has a race started 60 seconds in the past
    // Once older than 1 minutes - the app should refetch a fresh set of races
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // More than 1 means more times after onMounted()
    expect(fetch.mock.calls.length).toBeGreaterThan(1);
  });

  it('Should clear the interval on unmount', () => {
    // Mocking the clearInterval function
    global.clearInterval = vi.fn();

    // Forcing RaceItem component to unmount
    wrapper.unmount();

    // Check if clearInterval was called
    expect(clearInterval).toHaveBeenCalled();
  });
});
