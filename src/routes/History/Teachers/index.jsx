import React from 'react';
import { connect } from 'dva';
import { getCurrentAuthInfo } from 'utils/decorator';
import styles from './index.less';
import common from '../index.less';
import SurePer from '../../../assets/surePer.png';

@getCurrentAuthInfo
class HistoryTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeVal: '2018.07',
      permenMoney: null, // || '2,000',
      flag: 2,
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const { userId, collegeId, groupType } = this.currentAuthInfo;
    const { month } = this.state;
    this.props.dispatch({
      type: 'historyhome/findIndividualHistoryKPI',
      payload: { userId, collegeId, groupType, month },
    });
  };
  render() {
    const { timeVal, permenMoney, flag } = this.state;
    const aa = timeVal.split('.');
    return (
      <div>
        <div className={common.historyBanner} />
        {flag === 1 ? (
          <div className={styles.m_wrapcontener}>
            <div className={styles.m_imgDiv}>
              <img src={SurePer} alt="logo" className={styles.u_imgCls} />
            </div>
            <div className={styles.m_wordContent}>
              <p>亲爱的甘文斌</p>
              <p>辛苦啦，感谢您在{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份努力的付出！</p>
              <p className={styles.u_timeCls}>
                您{aa[0]}年{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份确定绩效为
              </p>
              <p className={styles.u_resultlCls}>核算中...</p>
            </div>
          </div>
        ) : (
          <div className={styles.m_wrapcontener}>
            <div className={styles.m_imgDiv}>
              <img src={SurePer} alt="logo" className={styles.u_imgCls} />
            </div>
            <div className={styles.m_wordContent}>
              <p>亲爱的甘文斌</p>
              <p>辛苦啦，感谢您在{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份努力的付出！</p>
              <p className={styles.u_timeCls}>
                您{aa[0]}年{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份确定绩效为
              </p>
              <p className={styles.u_resultlCls}>{!permenMoney ? '1,000' : permenMoney}</p>
              <div style={{ height: '0.54rem' }} />
              <div
                style={{
                  width: '6.5rem',
                  margin: 'auto',
                  background: ' #F8FAFB',
                  borderRadius: '0.08rem',
                }}
              >
                <p
                  style={{
                    textAlign: 'left',
                    fontSize: '0.26rem',
                    color: '#333',
                    margin: ' auto 0.3rem',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                  }}
                >
                  实发合计中包含以下数据
                </p>

                <div
                  style={{ height: '0.02rem', width: '6rem', background: '#eee', margin: 'auto' }}
                />
                <p
                  style={{
                    textAlign: 'left',
                    fontSize: '0.26rem',
                    color: '#6D6D75',
                    margin: '0.1rem 0.3rem',
                  }}
                >
                  <span style={{ textAlign: 'left', width: '2.9rem', display: 'inline-block' }}>
                    虚报绩效考核金额
                  </span>
                  <span style={{ textAlign: 'right', width: '2.8rem', display: 'inline-block' }}>
                    10,000元
                  </span>
                </p>
                <p
                  style={{
                    textAlign: 'left',
                    fontSize: '0.26rem',
                    color: '#6D6D75',
                    margin: '0.1rem  0.3rem',
                  }}
                >
                  <span style={{ textAlign: 'left', width: '2.9rem', display: 'inline-block' }}>
                    免费学绩效金额
                  </span>
                  <span style={{ textAlign: 'right', width: '2.8rem', display: 'inline-block' }}>
                    20,000元
                  </span>
                </p>
                <p
                  style={{
                    textAlign: 'left',
                    fontSize: '0.26rem',
                    color: '#6D6D75',
                    margin: '0.1rem 0.3rem',
                  }}
                >
                  <span style={{ textAlign: 'left', width: '2.9rem', display: 'inline-block' }}>
                    其他绩效
                  </span>
                  <span style={{ textAlign: 'right', width: '2.8rem', display: 'inline-block' }}>
                    500元
                  </span>
                </p>
                <div style={{ height: '0.5rem' }} />
              </div>
              <div style={{ height: '0.4rem' }} />
            </div>
          </div>
        )}

        <div className={styles.m_innercontener}>
          <span className={styles.u_spanWorld}>* 实发金额以财务部税后实发为准</span>
        </div>
      </div>
    );
  }
}
export default connect(({ loading, historyhome }) => ({
  loading: loading.models.historyhome,
  historyhome,
}))(HistoryTeacher);
