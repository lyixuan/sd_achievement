// 根据root节点的宽度进行动态设置字体的样式
import { fontSizeAuto } from 'utils/chartUtils';

export class ChartBase {
  // 数据源 [{name:'2018.08',val:10,isPredicted:0}}],   // 基类不可直接使用
  constructor(props) {
    this.chartData = props;
    this.baseBunber = 100000; // 基础定义类
  }
  chartTitle = text => {
    return {
      top: fontSizeAuto(20),
      left: fontSizeAuto(10),
      text: `${text}`, // 变动数据
      textStyle: {
        fontWeight: 400,
        color: '#444348',
        fontSize: fontSizeAuto(26),
      },
    };
  };
  chartGrid = () => {
    return {
      // 设置网格
      containLabel: true,
      top: fontSizeAuto(155),
      right: fontSizeAuto(30),
      bottom: fontSizeAuto(50),
      left: fontSizeAuto(30),
    };
  };
  tooltipNumUnit = () => {
    // 处理数据展示,如果大于10万按完展示,小于10万按千展示
    // const newNum=Number(num)||0;
    // if(newNum<1000){
    //   return newNum
    // }else if(newNum>=1000&&newNum<10000){
    //   return `${(newNum/1000).toFixed(2)}K`
    // }else{
    //   return `${(newNum/10000).toFixed(2)}W`
    // }
  };
  breakNumComma = num => {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  };
}
