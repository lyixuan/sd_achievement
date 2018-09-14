import React from 'react';
import Dialog from '../../components/Dialog/index';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import styles from './CollegeDialog.less';

class CollegeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }
  setListItem = () => {
    const res = {
      data: [
        {
          name: '全部学院',
          id: '',
        },
        {
          name: '皓博',
          id: '111',
        },
        {
          name: '狐逻',
          id: '103',
        },
        {
          name: '派学院',
          id: '118',
        },
        {
          name: '睿博',
          id: '112',
        },
        {
          name: '泰罗',
          id: '108',
        },
        {
          name: '芝士',
          id: '104',
        },
        {
          name: '自变量',
          id: '100',
        },
      ],
    };
    return (
      <div className={styles.buttonDiv}>
        <ButtonGroup
          dataSource={res}
          dataReturnFun={item => {
            this.selectGroup(item);
          }}
          id={this.state.selected}
          btnClass={styles.u_btnStyle}
          btnSelectedClass={`${styles.u_btnStyle} ${styles.u_btnSelected}`}
        />
      </div>
    );
  };

  selectGroup(item) {
    this.setState({
      selected: item.id,
    });

    this.props.changeCollegeName(item);
    this.props.showModel(false);

    // todo 接口请求
  }

  render() {
    const { modelflag } = this.props;

    return (
      <Dialog
        modelClass={styles.m_dialogWrap}
        visible={modelflag}
        showModel={val => {
          this.props.showModel(val);
        }}
        title="请选择想要查看的学院"
      >
        <div className={styles.flexContainer}>{this.setListItem()}</div>
      </Dialog>
    );
  }
}

export default CollegeDialog;
