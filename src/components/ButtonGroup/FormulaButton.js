/* FormulaButton组件参数介绍:一共7个参数，两个必传参数
*
* dataSource{必传 Obj}:数据源，对象结构:{id:xx,name"'xx',score:'1000',...},对象内的数据key值为id和name，父组件需要处理好传入。
* dataReturnFun{必传 Funciton}:父组件需要传入点击对应button返回时触发接受数据的function，返回数据为（dataSource）
* id{必传 Number}:传入选中button的id值
* spanFunction{非必传 Function}:传入该属性，则父组件确定button里面文字展示内容，没有则默认button里面的文字只显示name和score,
* btnClass{非必传 Obj}:未被选中button样式，对象格式
* btnSelectedClass{非必传 Obj}:被选中button样式，对象格式
*
* */

import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import classNames from 'classnames';
import styles from './ButtonGroup.less';

class FormulaButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  selectButton(dataSource) {
    if (!this.props.dataReturnFun || typeof this.props.dataReturnFun !== 'function') {
      console.warn('未传入dataReturnFun方法或传入的非function');
    } else {
      this.props.dataReturnFun(dataSource);
    }
  }

  spanFun = (dataSource, selectId) => {
    const { spanFunction } = this.props;
    if (spanFunction && typeof spanFunction === 'function') {
      return this.props.spanFunction(dataSource);
    } else {
      return (
        <div className={styles.m_formulaContener}>
          <div className={styles.m_formulaButton}>
            <span
              className={dataSource.id === selectId ? styles.u_nameSelectClass : styles.u_nameClass}
            >
              {dataSource.name}
            </span>
            <br />
            <span
              className={
                dataSource.id === selectId ? styles.u_scoreSelectClass : styles.u_scoreClass
              }
            >
              {dataSource.score}
            </span>
          </div>
        </div>
      );
    }
  };

  buttonListItem = (
    dataSource = null,
    id = null,
    newBtnClass = null,
    newBtnSelectedClass = null
  ) => {
    const self = this;
    const selectId = id;
    return (
      <Button
        className={dataSource.id === selectId ? newBtnSelectedClass : newBtnClass}
        key={dataSource.id}
        onClick={self.selectButton.bind(self, dataSource)}
      >
        {this.spanFun(dataSource, selectId)}
      </Button>
    );
  };

  render() {
    const { dataSource = null, id = null, btnClass = null, btnSelectedClass = null } = this.props;
    // 获取父组件传入button选中和未选中样式,未传入则使用默认样式，传入补充到提前定义好接收的样式里面
    const newBtnClass = !btnClass
      ? classNames(styles.btnStyle, btnClass)
      : classNames(styles.newBtnClass, btnClass);
    const newBtnSelectedClass = !btnSelectedClass
      ? classNames(styles.btnSelected, btnSelectedClass)
      : classNames(styles.newBtnSelectedClass, btnSelectedClass);
    return <div>{this.buttonListItem(dataSource, id, newBtnClass, newBtnSelectedClass)}</div>;
  }
}

export default FormulaButton;
