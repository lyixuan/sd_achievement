import React from 'react';
import styles from './TableHeader.less';

class RenderHeader extends React.Component {
  render() {
    const columns = this.props.columnsData || [];
    return (
      <div className={styles.normal}>
        {Object.keys(columns).map((key, i) => {
          const { title, clsName } = columns[i];
          return (
            <div key={key} className={styles[clsName]}>
              {title}
            </div>
          );
        })}
      </div>
    );
  }
}
export default RenderHeader;
