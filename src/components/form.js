import React from "react";
import classNames from "classnames";

function Labeled(name, Component) {
  return (props) => {
    const {id, label, reverse = false, ...pass} = props;
    if (reverse) {
      return (
        <div className={classNames("field", `field-${name}`)}>
          <Component {...pass} />
          <label htmlFor={id}>{label}</label>
        </div>
      );
    }
    return (
      <div className={classNames("field", `field-${name}`)}>
        <label htmlFor={id}>{label}</label>
        <Component {...pass} />
      </div>
    );
  };
}

function Group(Header) {
  if (typeof Header === "string") {
    const s = Header;
    Header = ({className}) => <h2 className={className}>{s}</h2>;
  }
  return (props) => {
    const {children, columns = 1, className, ...pass} = props;
    return (
      <div {...pass} className={classNames("group", `col-${columns}`, className)}>
        <Header className="group-header" />
        {children}
      </div>
    );
  };
}

const Input = Labeled("input", (props) => {
  const {value = "", onChange = () => {}, type = "text", ...pass} = props;
  return (
    <input {...pass} value={value} onChange={(e) => onChange(e.target.value)} type={type} />
  );
});
const Select = Labeled("select", (props) => {
  const {value = "", onChange = () => {}, options = {}, ...pass} = props;
  return (
    <select {...pass} value={value} onChange={(e) => onChange(e.target.value)}>
      {Object.keys(options).map((k, i) => <option value={k} key={i}>{options[k]}</option>)}
    </select>
  );
});
const TextArea = Labeled("textarea", (props) => {
  const {value = "", onChange = () => {}, rows = 3, ...pass} = props;
  return (
    <textarea {...pass} value={value} rows={rows} onChange={(e) => onChange(e.target.value)} />
  );
});

export {Group, Input, Select, TextArea};
