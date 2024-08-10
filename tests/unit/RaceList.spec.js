import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import RaceList from '../../src/components/RaceList.vue';
import RaceItem from '../../src/components/RaceItem.vue';
import { racesMockData } from '../mocks/racesMockData';

describe('RaceList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RaceList, {
      props: { races: racesMockData },
    });
  });

  it('Renders a table with the correct headers', () => {
    const headers = wrapper.findAll('th').map((th) => th.text());
    expect(headers).toEqual(['Location', 'Type', 'Race #', 'Time']);
  });

  it('Renders a RaceItem component for each race', () => {
    const raceItems = wrapper.findAllComponents(RaceItem);
    expect(raceItems.length).toBe(5);
  });
});
