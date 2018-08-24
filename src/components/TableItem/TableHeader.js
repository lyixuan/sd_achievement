import React from 'react';
import styles from './TableHeader.less';

class RenderHeader extends React.Component {
  tableColums = v => {
    const columns = [
      {
        title: v.titleOne,
        dataIndex: 'titleOne',
        key: 'titleOne',
        clsName: 'dateCls',
      },
      {
        title: v.titleTwo,
        dataIndex: 'titleTwo',
        key: 'titleTwo',
        clsName: 'stuCls',
      },
      {
        title: v.titleThree,
        dataIndex: 'titleThree',
        key: 'titleThree',
        clsName: 'preValCls',
      },
    ];
    return columns;
  };

  render() {
    const { columnsData } = this.props;

    const columns = this.tableColums(columnsData);
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
