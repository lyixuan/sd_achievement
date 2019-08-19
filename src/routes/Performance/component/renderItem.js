import React from 'react';
import OperationItem from './block/operationItem';
// import TeacherItem from './block/teacherItem';
// import AdminItem from './block/adminItem';

class RenderItem extends React.Component {
  render() {
    const { rowData } = this.props;
    if (!rowData) return <div>11</div>;
    return (
      <OperationItem list={rowData} />
      // <TeacherItem list={list} />
      // <AdminItem list={list} />
      // <tbody className={styles.content}>
      //   {list.length &&
      //     list.map((item, index) => {
      //       return (
      //         <tr style={{ display: 'flex' }}>
      //           <td>{item.itemId}</td>
      //           <td>{item.itemName}</td>
      //           <td>{item.itemType}</td>
      //           <td>{item.totalKpi}</td>
      //         </tr>
      //       );
      //     })}
      // </tbody>
    );
  }
}
export default RenderItem;
