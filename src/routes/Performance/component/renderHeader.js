import React from 'react';
import styles from './renderHeader.less';

class RenderHeader extends React.Component {
  render() {
    const columnsData = this.props;
    const { params } = this.props;
    console.log(params, 'params');
    const style = {
      background: params.background ? params.background : '#e5f9f9',
      color: params.color ? params.color : '#00ccc3',
    };
    return (
      <tbody style={{ width: '6.5rem' }}>
        <tr className={styles.header} style={style}>
          {columnsData.columnsData.length &&
            columnsData.columnsData.map(item => {
              return <th key={item.key}>{item.title}</th>;
            })}
        </tr>
      </tbody>
    );
  }
}
export default RenderHeader;
