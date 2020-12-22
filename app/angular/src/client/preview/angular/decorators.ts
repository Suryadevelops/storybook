/* eslint-disable no-param-reassign */
import { Type } from '@angular/core';
import { DecoratorFunction } from '@storybook/addons';
import { computesTemplateFromComponent } from '../angular-beta/ComputesTemplateFromComponent';
import { NgModuleMetadata, StoryFnAngularReturnType } from '../types';

export const moduleMetadata = (metadata: Partial<NgModuleMetadata>) => (storyFn: () => any) => {
  const story = storyFn();
  const storyMetadata = story.moduleMetadata || {};
  metadata = metadata || {};

  return {
    ...story,
    moduleMetadata: {
      declarations: [...(metadata.declarations || []), ...(storyMetadata.declarations || [])],
      entryComponents: [
        ...(metadata.entryComponents || []),
        ...(storyMetadata.entryComponents || []),
      ],
      imports: [...(metadata.imports || []), ...(storyMetadata.imports || [])],
      schemas: [...(metadata.schemas || []), ...(storyMetadata.schemas || [])],
      providers: [...(metadata.providers || []), ...(storyMetadata.providers || [])],
    },
  };
};

export const componentDecorator = (
  component: Type<unknown>
): DecoratorFunction<StoryFnAngularReturnType> => (storyFn) => {
  const story = storyFn();
  const template = computesTemplateFromComponent(component, {}, story.template);

  return { ...story, template };
};

export const templateDecorator = (
  template: (story: string) => string
): DecoratorFunction<StoryFnAngularReturnType> => (storyFn) => {
  const story = storyFn();

  return { ...story, template: template(story.template) };
};
