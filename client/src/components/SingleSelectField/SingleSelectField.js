import React, { Component } from 'react';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import i18n from 'i18n';
import { Input } from 'reactstrap';

class SingleSelectField extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Builds the select field in readonly mode with current props
   *
   * @returns {object}
   */
  getReadonlyField() {
    let label = this.props.source
      && this.props.source.find((item) => item.value === this.props.value);

    label = typeof label === 'string'
      ? label
      : (this.props.value || '');

    return <Input plaintext {...this.getInputProps()}>{label}</Input>;
  }

  /**
   * Builds the select field with current props
   *
   * @returns {object}
   */
  getSelectField() {
    // .slice() to copy the array, because we could modify it with an empty item
    const options = (this.props.source)
      ? this.props.source.slice()
      : [];

    if (this.props.data.hasEmptyDefault && !options.find((item) => !item.value)) {
      options.unshift({
        value: '',
        title: this.props.data.emptyString,
        disabled: false,
      });
    }

    return (
      <Input type="select" {...this.getInputProps()}>
        { options.map((item, index) => {
          const key = `${this.props.name}-${item.value || `empty${index}`}`;

          return (
            <option key={key} value={item.value} disabled={item.disabled}>
              {item.title}
            </option>
          );
        }) }
      </Input>
    );
  }

  /**
   * Fetches the properties for the select field
   *
   * @returns {object} properties
   */
  getInputProps() {
    const props = {
      // @TODO Prevent entwine chosen applying chosen
      className: `${this.props.className} ${this.props.extraClass} no-chosen`,
      id: this.props.id,
      name: this.props.name,
      disabled: this.props.disabled,
    };

    if (!this.props.readOnly) {
      Object.assign(props, {
        onChange: this.handleChange,
        value: this.props.value,
      });
    }

    return props;
  }

  /**
   * Handles changes to the select field's value.
   *
   * @param {Event} event
   */
  handleChange(event) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, { id: this.props.id, value: event.target.value });
    }
  }

  render() {
    let field = null;
    if (this.props.readOnly) {
      field = this.getReadonlyField();
    } else {
      field = this.getSelectField();
    }

    return field;
  }
}

SingleSelectField.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  readOnly: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  source: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    disabled: React.PropTypes.bool,
  })),
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.shape({
      hasEmptyDefault: React.PropTypes.bool,
      emptyString: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    }),
  ]),
};

SingleSelectField.defaultProps = {
  source: [],
  extraClass: '',
  className: '',
  data: {
    emptyString: i18n._t('Boolean.ANY', 'Any'),
  },
};

export { SingleSelectField as Component };

export default fieldHolder(SingleSelectField);
