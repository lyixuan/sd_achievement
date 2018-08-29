/*
 * 必穿参数：switchIdFn，function
 * */
import React from 'react';
import Modal from '../../components/Modal/index';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import idSwitch from '../../assets/switch.svg';
import styles from './SwitchDialog.less';

class SwitchDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      modalflag: false,
    };
  }
  setListItem = () => {
    const res = {
      data: [
        {
          name: '家族 - 皓博',
          id: '2',
        },
        {
          name: '家族 - 狐逻',
          id: '3',
        },
        {
          name: '家族 - 派学院',
          id: '4',
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
      val: item.name,
    });
  }
  showModal = () => {
    this.setState({
      modalflag: true,
    });
  };
  hideModal = () => {
    this.setState({
      modalflag: false,
    });
  };
  sureSwitch = () => {
    this.props.switchIdFn(this.state.val);
    this.hideModal();
  };
  render() {
    const { modalflag } = this.state;

    return (
      <div className={styles.m_floatDialog}>
        <div className={styles.u_iconWrap} onClick={this.showModal}>
          <img src={idSwitch} alt="身份切换" className={styles.imgIcon} />
        </div>
        <Modal
          visible={modalflag}
          modelClass={styles.m_dialogWrap}
          footer={[
            { text: '取消', onPress: this.hideModal },
            { text: '确定', onPress: this.sureSwitch },
          ]}
        >
          <p className={styles.dialogTitle}>请选择想要查看的绩效</p>
          <div className={styles.flexContainer}>{this.setListItem()}</div>
        </Modal>
      </div>
    );
  }
}

export default SwitchDialog;
