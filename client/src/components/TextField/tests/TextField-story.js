import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import TextField from 'components/TextField/TextField';
import ValueTracker from 'stories/ValueTracker';

const props = {
  name: 'MyField',
  title: 'Field title',
  value: 'Default value',
  placeholder: 'Placeholder text',
};

storiesOf('Admin/TextField', module)
  .addDecorator((storyFn) => (
    <ValueTracker>{storyFn()}</ValueTracker>
  ))
  .add('Textbox', () => (
    <TextField
      {...props}
    />
  ))
  .add('All titles', () => (
    <TextField
      {...props}
      rightTitle="Right title"
      description="My description"
      data={{ prefix: 'prefix', suffix: 'suffix' }}
    />
  ))
  .add('Validation failed', () => (
    <TextField
      {...props}
      description="Field description"
      message={{ value: 'Validation message' }}
    />
  ));