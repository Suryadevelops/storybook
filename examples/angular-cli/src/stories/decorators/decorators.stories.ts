// your-component.stories.ts

import { componentDecorator, Meta, moduleMetadata, templateDecorator } from '@storybook/angular';
import ChildComponent from './child.component';
import ParentComponent from './parent.component';

export default {
  title: 'Core / Decorators',
  component: ChildComponent,
  decorators: [
    templateDecorator(
      (story) => `Grandparent<br><div style="margin: 3em; border:solid;">${story}</div>`
    ),
  ],
  args: { childText: 'Child text', childPrivateText: 'Child private text' },
} as Meta;

export const WithTemplate = (args) => ({
  template: `Child Template`,
  props: {
    ...args,
  },
});

export const WithComponent = (args) => ({
  props: {
    ...args,
  },
});

export const WithLegacyComponent = (args) => ({
  component: ChildComponent,
  props: {
    ...args,
  },
});

export const WithComponentDecorator = (args) => ({
  component: ChildComponent,
  props: {
    ...args,
  },
});
WithComponentDecorator.decorators = [
  moduleMetadata({ declarations: [ParentComponent] }),
  componentDecorator(ParentComponent),
];

export const WithCustomDecorator = (args) => ({
  template: `Child Template`,
  props: {
    ...args,
  },
});
WithCustomDecorator.decorators = [
  (storyFunc) => {
    const story = storyFunc();

    return {
      ...story,
      template: `Custom Decorator <div style="margin: 3em">${story.template}</div>`,
    };
  },
];

export const AngularLegacyRendering = (args) => ({
  template: `Child Template`,
  props: {
    ...args,
  },
});
AngularLegacyRendering.parameters = { angularLegacyRendering: true };
AngularLegacyRendering.decorators = [
  (storyFunc) => {
    const story = storyFunc();

    return {
      ...story,
      template: `Custom Decorator <div style="margin: 3em">${story.template}</div>`,
    };
  },
];
