import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './renderItem.less';

class RenderItem extends React.Component {
  goto = (key, id) => {
    const { newParams } = this.props;
    if (newParams.teacher) {
      this.props.history.push({
        pathname: newParams.teacher,
        search: `?groupId=${newParams.orgId}&userId=${id}`,
      });
      return;
    }
    const { userType } = newParams;
    const pathname = key === '续报绩效' ? '/performance/renewal' : '/performance/goodpush';
    switch (userType) {
      case 21: // 21	人员-家族长
        this.props.history.push({
          pathname,
          search: `?familyId=${newParams.orgId}&userId=${newParams.userId}&userType=${
            newParams.userType
          }`,
        });
        break;
      case 22: // 22	人员-运营长
        this.props.history.push({
          pathname,
          search: `?groupId=${newParams.orgId}&userId=${newParams.userId}&userType=${
            newParams.userType
          }`,
        });
        break;
      case 23: // 21	人员-班主任
        this.props.history.push({
          pathname,
          search: `?groupId=${newParams.orgId}&userId=${newParams.userId}&userType=${
            newParams.userType
          }`,
        });
        break;
      default:
        this.props.history.push({
          pathname: '/performance/teacher',
          search: `?groupId=${newParams.orgId}&userId=${newParams.userId}&userType=${
            newParams.userType
          }`,
        });
        break;
    }
  };
  render() {
    const { rowData, columnsData } = this.props;
    if (!rowData) return <div />;
    return (
      <tbody className={styles.content}>
        {rowData.map((item, index) => {
          const key = index * Math.random();
          return (
            <tr style={{ display: 'flex' }} key={key}>
              {columnsData.map(item2 => {
                // columns 每一项的name dataIndex
                const name = item2.dataIndex;
                if (name === '操作') {
                  return (
                    <td key={name}>
                      <Icon
                        type="right"
                        size="xs"
                        color="#00ccc3"
                        onClick={() => this.goto(item.itemKey, item.itemId)}
                      />
                    </td>
                  );
                }
                return <td key={name}>{item[name]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}
export default RenderItem;
