/*
* params：
* dataList: 必传，展示的数据结构
* groupName: 每个模块的字段，要是只有一个列表，可以不传
* initialListSize: 每页展示多好条数据
*
* headerParam: 传给子组件 RenderHeader
* renderHeader：页头
* renderFooter：页脚 配合参数id使用
* customRenderHeader: 组件，展示表头，默认RenderHeader
* customRenderItem: 组件，展示数据，RenderItem
* otherCpmponent: 在listView中扩展
*
* */
import React, { Component } from 'react';
import { StickyContainer } from 'react-sticky';
import { ListView } from 'antd-mobile';
import classNames from 'classnames';
import styles from './listView.css';

class MultipHeaderList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
    };
  }

  // 组件头部
  renderHeader = () => {
    if (this.props.renderHeader) return this.props.renderHeader(this.props.collegeName);
  };
  // 组件底部
  renderFooter = (name, id) => {
    if (this.props.renderFooter) return this.props.renderFooter(name, id);
  };
  renderSectionWrapper = sectionID => {
    const { sectionClass = '' } = this.props;
    const newSectionClass = sectionClass
      ? classNames('sticky-container', styles.containCls, sectionClass)
      : classNames('sticky-container', styles.containCls);
    return <StickyContainer key={`s_${sectionID}_c`} className={newSectionClass} />;
  };
  renderSectionHeader = sectionData => {
    const { customRenderHeader } = this.props;
    if (customRenderHeader) {
      return customRenderHeader(sectionData);
    }
  };

  renderRow = (rowData, sectionID, rowID) => {
    const { customRenderItem } = this.props;
    if (customRenderItem) {
      return customRenderItem(rowData, sectionID, rowID);
    }
  };
  render() {
    const {
      dataList,
      groupName,
      collegeName,
      initialListSize,
      otherCpmponent,
      listViewCls,
    } = this.props;

    const dataSource =
      groupName || groupName === 0
        ? this.state.dataSource.cloneWithRows(dataList[groupName])
        : this.state.dataSource.cloneWithRows(dataList);
    const newListViewCls = listViewCls ? classNames(listViewCls) : classNames(styles.listViewCls);
    return (
      <div id={groupName} className={newListViewCls}>
        <ListView
          dataSource={dataSource}
          className="am-list sticky-list"
          useBodyScroll
          renderHeader={() => this.renderHeader()}
          renderFooter={() => this.renderFooter(collegeName, groupName)}
          renderSectionWrapper={sectionID => this.renderSectionWrapper(sectionID)}
          renderSectionHeader={sectionData => this.renderSectionHeader(sectionData)}
          renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
          pageSize={0}
          initialListSize={initialListSize || 500}
          scrollEventThrottle={200}
          onEndReachedThreshold={10}
        />
        {/* 小助手展示查看全部 */}
        {!otherCpmponent ? null : otherCpmponent}
      </div>
    );
  }
}

export default MultipHeaderList;
