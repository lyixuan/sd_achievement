import React from 'react';
import styles from './_render.less';

class RenderDetails extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={`${styles.m_render} ${styles.m_detailRender}`}>
        <dl className={styles.distribute}>
          <dt>11</dt>
          <dd>22</dd>
        </dl>
      </div>
    );
  }
}
export default RenderDetails;
