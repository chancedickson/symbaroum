import Preact from "preact";
import classNames from "classnames";

function New({label, onClick}) {
  return (
    <div className="block-list-new" onClick={onClick}>
      <i className="fa fa-plus" />
      <p>{label}</p>
    </div>
  );
}

function Delete({onClick}) {
  return (
    <div className="block-list-delete">
      <i onClick={onClick} className="fa fa-times" />
    </div>
  );
}

export function SimpleBlockList(Component, defaultElement, opts = {}) {
  const SimpleComponent = ({value, className, onChange, deleteItem}) => (
    <div className="simple-block-list-component">
      <Component onChange={onChange} value={value} className={className} />
      <Delete onClick={deleteItem} />
    </div>
  );
  const List = BlockList(SimpleComponent, opts);
  return (props) => {
    const {
      list,
      onClick = () => {},
      onChange = () => {},
      ...pass
    } = props;
    return (
      <List {...pass} onChange={(i, v) => onChange(list.set(i, v))}
        onClickNew={() => onChange(list.push(defaultElement))}
        onClickDelete={(i) => onChange(list.delete(i))}
        onClickItem={onClick} list={list} />
    );
  };
}

export function BlockList(Component, opts = {}) {
  const {limit = Infinity, addLabel = "Add Item", className: optsClassName} = opts;
  return (props) => {
    const {
      list,
      className,
      itemClass,
      onChange = () => {},
      onClickItem = () => {},
      onClickDelete = () => {},
      onClickNew = () => {},
      ...pass
    } = props;
    const elements = list.map((e, i) =>
      <div onClick={() => onClickItem(i)} key={i} className={classNames("block-list-item", itemClass)}>
        <Component {...pass} value={e} className="block-list-component"
          index={i}
          onChange={(v) => onChange(i, v)}
          deleteItem={() => onClickDelete(i)} />
      </div>);
    return (
      <div className={classNames("block-list", className, optsClassName)}>
        {elements.toArray()}
        {list.size < limit && <New label={addLabel} onClick={() => onClickNew()} />}
      </div>
    );
  };
}
