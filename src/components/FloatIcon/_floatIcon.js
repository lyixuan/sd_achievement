/*
* groupType: 获得用户权限，控制搜索按钮是否展示
* */
import React from 'react';
import { assignUrlParams } from '../../utils/routerUtils';
import CollegeDialog from './CollegeDialog';
import top from '../../assets/top.svg';
import count from '../../assets/count.svg';
import dashboard from '../../assets/dashboard.svg';
import search from '../../assets/search.svg';
import styles from './_floatIcon.less';

class FloatIcon extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {}, groupType } = props;
    const initState = {
      modelflag: false,
      usercourseBtnIsShow: groupType !== 'boss' && groupType !== 'college',
      searchBtnShow: groupType === 'boss', // boss和college权限，该值为true，否则为false
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
    const backTop = document.getElementById('backTopBtn'); // 返回顶部模块

    if (backTop !== null) {
      backTop.style.display = t >= 200 ? 'block' : 'none';
    }
  };

  isShowSearchBtn = val => {
    if (val) {
      return (
        <div
          className={`${styles.floatIcon} ${styles.searchCls}`}
          onClick={() => {
            this.showModel(true);
          }}
        >
          <img src={search} className={styles.imgSearch} alt="搜索" />
        </div>
      );
    } else {
      return null;
    }
  };

  // 模态框显隐
  showModel(v) {
    this.setState({
      modelflag: v,
    });
  }

  render() {
    const { modelflag, searchBtnShow, usercourseBtnIsShow } = this.state;
    return (
      <div className={styles.m_floatIcon}>
        {/* *************** 回到顶部 *************** */}
        <div
          className={`${styles.floatIcon} ${styles.goTopCls}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          id="backTopBtn"
        >
          <img src={top} className={styles.imgTop} alt="回到顶部" />
        </div>
        {/* *************** 档位说明(boss和college权限无法查看) *************** */}
        {!usercourseBtnIsShow ? null : (
          <div
            className={`${styles.floatIcon} ${styles.dashBordCls}`}
            onClick={() => {
              this.props.setRouteUrlParams('/static/usercourse');
            }}
          >
            <img src={dashboard} className={styles.imgDash} alt="档位说明" />
          </div>
        )}

        {/* *************** 算法说明 *************** */}
        <div
          className={`${styles.floatIcon} ${styles.countCls}`}
          onClick={() => {
            this.props.setRouteUrlParams('/static/algorithmdescription');
          }}
        >
          <img src={count} className={styles.imgCount} alt="算法说明" />
        </div>

        {/* *************** 搜索按钮 *************** */}
        {this.isShowSearchBtn(searchBtnShow)}

        {/* *************** 搜索模态框 *************** */}
        <CollegeDialog
          modelflag={modelflag}
          showModel={v => {
            this.showModel(v);
          }}
          changeCollegeName={v => this.props.changeCollegeName(v)}
        />
      </div>
    );
  }
}
export default FloatIcon;
