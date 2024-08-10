import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import RaceFilters from '../../src/components/RaceFilters.vue';

describe('RaceFilters', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RaceFilters);
  });

  it('Number of filter option', () => {
    const filterCheckboxes = wrapper.findAll('input[type="checkbox"]');
    expect(filterCheckboxes.length).toBe(3);
  });

  it('Wording of each filter option', () => {
    const filterLabels = wrapper.findAll('label span');
    expect(filterLabels[0].text()).toBe('greyhound');
    expect(filterLabels[1].text()).toBe('harness');
    expect(filterLabels[2].text()).toBe('horse');
  });

  it('Verify default status of filters', () => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      expect(checkbox.element.checked).toBe(true);
    });
  });

  it('Filter emittion when deselecting a checkboxes', async () => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    // Uncheck the first option (greyhound)
    await checkboxes[0].setValue(false);

    // Verify the emit
    const emitted = wrapper.emitted('filterBy');

    // Position [0] is already slotted by the default selection
    expect(emitted[1]).toEqual([
      [
        '161d9be2-e909-4326-8c2c-35ed71fb460b', // harness
        '4a2788f8-e825-4d36-9894-efd4baf1cfae', // horse
      ],
    ]);
  });

  it('Filter emittion when selecting a checkboxes', async () => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    // uncheck and re-check greyhound filter
    await checkboxes[0].setValue(false);
    await checkboxes[0].setValue(true);

    // Verify the emit
    const emitted = wrapper.emitted('filterBy');

    // Position [0] is already slotted by the default selection
    expect(emitted[2]).toEqual([
      [
        '161d9be2-e909-4326-8c2c-35ed71fb460b', // harness
        '4a2788f8-e825-4d36-9894-efd4baf1cfae', // horse
        '9daef0d7-bf3c-4f50-921d-8e818c60fe61', // greyhound
      ],
    ]);
  });
});
