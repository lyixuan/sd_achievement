import React from 'react';
import { formatMoney } from '../../../utils/utils';
import arrowDown from '../../../assets/down.svg';
import RenderDetails from './_details';
import styles from './_render.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: this.props.rowData.isCheck || false,
    };
  }
  componentDidMount() {}
  toggleClick = () => {
    const { isShowDetail } = this.state;
    this.setState({ isShowDetail: !isShowDetail });
  };
  render() {
    const { paramsObj, rowData, groupType } = this.props;
    const { isShowDetail } = this.state;
    return (
      <div className={styles.marBottom}>
        <div
          className={`${styles.m_render}  ${styles.m_itemRender}`}
          onClick={() => this.toggleClick()}
        >
          <span className={styles.familyName}>{rowData.name}</span>
          <div className={styles.performance}>
            <span>{formatMoney(rowData.total)} 元</span>
            <img
              src={arrowDown}
              alt=""
              className={isShowDetail ? styles.arrowUpCls : styles.arrowCls}
            />
          </div>
        </div>
        {!isShowDetail ? null : (
          <RenderDetails paramsObj={paramsObj} rowData={rowData.personKpis} groupType={groupType} />
        )}
      </div>
    );
  }
}
export default RenderItem;
