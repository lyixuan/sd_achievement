import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './renderItem.less';

const name = [
  {
    key: 1,
    name: '好推绩效',
    url: '/performance/goodpush',
  },
  {
    key: 2,
    name: '续报绩效',
    url: '/performance/renewal',
  },
  {
    key: 3,
    name: '成考专本套绩效',
    url: '/performance/exam',
  },
];

class RenderItem extends React.Component {
  goto = (key, id) => {
    const { newParams } = this.props;
    if (newParams && newParams.teacher) {
      this.props.history.push({
        pathname: newParams.teacher,
        search: `?groupId=${newParams.orgId}&userId=${id}`,
      });
      return;
    }
    if (!newParams) return;
    const { userType } = newParams;

    let pathname = '';
    name.map(item => {
      if (key === item.name) pathname = item.url;
      return pathname;
    });
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
    const { params } = this.props;
    const newName = params.className;
    const style = {
      background: params.backgroundContent ? params.backgroundContent : '#fff',
      display: 'flex',
      fontSize: params.fontSize ? params.fontSize : '0.28rem',
      textAlign: params.textAlign ? params.textAlign : 'center',
      borderBottom: params.isContentBorder ? '1px solid #EEEEEE' : 'none',
    };
    if (!rowData) return <div />;
    return (
      <tbody className={(styles.content, styles[newName])}>
        {rowData.map((item, index) => {
          const key = index * Math.random();
          return (
            <tr style={style} key={key} onClick={() => this.goto(item.itemKey, item.itemId, true)}>
              {columnsData.map(item2 => {
                // columns 每一项的name dataIndex
                const value = item2.dataIndex;
                if (value === '操作') {
                  return (
                    <td key={value}>
                      <Icon type="right" size="xs" color="#00ccc3" />
                    </td>
                  );
                }
                return <td key={value}>{item[value]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}
export default RenderItem;
