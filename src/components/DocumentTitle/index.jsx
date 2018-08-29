import React from 'react';
import PropTypes from 'prop-types';

export default class DocumentTitle extends React.Component {
  // 类型限制（必须），静态属性名称固定
  static childContextTypes = {
    setTitle: PropTypes.func.isRequired,
  };
  // 传递给孙子组件的数据
  getChildContext() {
    return {
      setTitle: this.setTitle,
    };
  }
  componentDidMount() {
    const { title } = this.props;
    this.setTitle(title);
  }
  componentDidUpdate() {
    const { title } = this.props;
    this.setTitle(title);
  }
  setTitle = title => {
    if (typeof title === 'string') {
      document.title = title;
    } else if (typeof title === 'function') {
      document.title = title();
    }
  };

  render() {
    const children = React.Children.only(this.props.children);
    return { ...children };
  }
}
