import PropTypes from 'prop-types';
import { useState } from 'react';

const FormInput = ({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  pattern,
  min,
  max,
  step,
  autoComplete,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);
  
  const handleFocus = () => {
    setFocused(true);
  };
  
  return (
    <div className="form-group mb-3">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        pattern={pattern}
        min={min}
        max={max}
        step={step}
        autoComplete={autoComplete}
        className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
        onBlur={handleFocus}
        data-focused={focused.toString()}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  pattern: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autoComplete: PropTypes.string,
  className: PropTypes.string
};

export default FormInput; 