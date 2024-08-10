import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import RaceItem from '../../src/components/RaceItem.vue';
import { racesMockData } from '../mocks/racesMockData';

describe('RaceItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RaceItem, {
      props: { race: racesMockData[0] },
    });
  });

  it('Race column data is proper', async () => {
    // Verifying that meeting_name and race_number are rendered
    expect(wrapper.text()).toContain('Towcester Bags');
    expect(wrapper.text()).toContain('11');
    const countdown = wrapper.find('td:last-child').text();
    expect(countdown).toBe('2m 10s'); // After 1 second, countdown should be 2m 9s
  });

  it('Display the correct race type icon', async () => {
    // Check if the correct icon is displayed based on raceType
    const icon = wrapper.find('svg use').attributes('href'); // Strange behaviour: attribute should be xlink:href but won't work

    // Checking for a substring as 'toBe' might return failure due to how the assets are served
    expect(icon).toContain('greyhound-racing');
  });

  it('Race started less than 60 secs ago', async () => {
    // Swapping prop with a different mock
    wrapper = mount(RaceItem, {
      props: { race: racesMockData[4] },
    });
    await wrapper.vm.$nextTick(); // Wait for next tick
    const countdown = wrapper.find('td:last-child').text();
    expect(countdown).toBe('Closing in 30s');
  });

  it('Race older than 60 secs ago', async () => {
    // Swapping prop with a different mock
    wrapper = mount(RaceItem, {
      props: { race: racesMockData[3] },
    });
    await wrapper.vm.$nextTick(); // Wait for next tick
    const countdown = wrapper.find('td:last-child').text();
    expect(countdown).toBe('Closed');
  });

  it('Countdown decreases as time passes', async () => {
    // Forcing the test to wait for 1000 milliseconds
    await new Promise((r) => setTimeout(r, 1000));
    const countdown = wrapper.find('td:last-child').text();
    expect(countdown).toBe('2m 9s'); // After 1 second, countdown should be 2m 9s
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
