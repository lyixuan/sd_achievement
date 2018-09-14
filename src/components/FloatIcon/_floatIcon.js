import React from 'react';
import { assignUrlParams } from '../../utils/routerUtils';
import CollegeDialog from './CollegeDialog';
import top from '../../assets/top.svg';
import search from '../../assets/search.svg';
import styles from './_floatIcon.less';

class FloatIcon extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        dateTime: '2018年7月',
        groupType: 1,
        familyType: 2,
        hh: urlParams.hh,
      },
      modelflag: false,
      searchBtnShow: true, // boss和college权限，该值为true，否则为false
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
    const { modelflag, searchBtnShow } = this.state;
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
