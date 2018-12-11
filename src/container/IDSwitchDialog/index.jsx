/*
 * 必穿参数：switchIdFn，function
 * */
import React from 'react';
import { getItem } from 'utils/localStorage';
import { getCurrentAuthInfo } from 'utils/decorator';
import dict from 'utils/dict';
import Modal from '../../components/Modal/index';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import idSwitch from '../../assets/switch.svg';
import styles from './SwitchDialog.less';

@getCurrentAuthInfo
class SwitchDialog extends React.Component {
  constructor(props) {
    super(props);
    const selected = this.currentAuthInfo().id || '';
    this.state = {
      selected,
      modalflag: false,
      dataSource: [],
    };
  }
  getAuthList = () => {
    const authData = getItem('performanceUser').value || {};
    return authData.data || [];
  };
  selectGroup(item) {
    this.saveSelectedAuth(item.id);
    this.setState({
      selected: item.id,
    });
  }
  showModal = () => {
    const authAdta = this.getAuthList();
    const dataSource = this.handleGroupList(authAdta);
    this.setState({
      modalflag: true,
      dataSource,
    });
  };
  handleGroupList = (data = []) => {
    return data.map(item => {
      let buttonName = null;
      if (
        item.groupType === 'class' ||
        item.groupType === 'group' ||
        item.groupType === 'family' ||
        item.groupType === 'college'
      ) {
        buttonName = item.currentGroupName
          ? `${dict.groupTypeDict[item.groupType]} - ${item.currentGroupName}`
          : `${dict.groupTypeDict[item.groupType]}`;
      } else {
        buttonName = `${dict.groupTypeDict[item.groupType]}`;
      }
      return {
        id: item.id,
        name: buttonName,
      };
    });
  };
  hideModal = () => {
    this.setState({
      modalflag: false,
    });
  };
  sureSwitch = () => {
    this.hideModal();
  };
  saveSelectedAuth = id => {
    const currentId = this.currentAuthInfo().id;
    const authData = this.getAuthList() || [];
    const selectedAuth = authData.find(item => item.id === id);
    if (id !== currentId && selectedAuth) {
      if (this.props.toIndexPage) {
        this.props.toIndexPage(selectedAuth);
      }
    } else {
      console.warn('添加失败');
    }
    this.hideModal();
  };

  render() {
    const { modalflag, dataSource = [] } = this.state;
    const authData = this.getAuthList() || [];
    return authData.length <= 1 ? null : (
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
          <div className={styles.flexContainer}>
            <div className={styles.buttonDiv}>
              <ButtonGroup
                dataSource={{ data: dataSource }}
                dataReturnFun={item => {
                  this.selectGroup(item);
                }}
                id={this.state.selected}
                btnClass={styles.u_btnStyle}
                btnSelectedClass={`${styles.u_btnStyle} ${styles.u_btnSelected}`}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SwitchDialog;
