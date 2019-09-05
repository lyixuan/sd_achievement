import React from 'react';
import styles from './renderHeader.less';

class RenderHeader extends React.Component {
  render() {
    const columnsData = this.props;
    const { params } = this.props;
    const name = params.className;
    const style = {
      background: params.backgroundHeader ? params.backgroundHeader : '#F7F9FD',
      color: params.color ? params.color : '#00ccc3',
      textAlign: params.textAlign ? params.textAlign : 'center',
      fontSize: params.fontSize ? params.fontSize : '0.28rem',
    };
    return (
      <tbody style={{ width: '6.5rem' }} className={styles[name]}>
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
