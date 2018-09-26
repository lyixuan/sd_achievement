// 根据root节点的宽度进行动态设置字体的样式
import { fontSizeAuto } from 'utils/chartUtils';
import { formatMoney } from 'utils/utils';

export class ChartBase {
  // 数据源 [{name:'2018.08',val:10,isPredicted:0}}],   // 基类不可直接使用
  constructor() {
    this.chartData = [];
    this.title = '';
    this.baseBunber = 100000; // 基础定义类
  }
  setData = dataSource => {
    this.chartData = dataSource.data || [];
    this.title = dataSource.title || '';
  };
  chartTitle = () => {
    return {
      top: fontSizeAuto(20),
      left: fontSizeAuto(10),
      text: `${this.title}`, // 变动数据
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
      bottom: fontSizeAuto(30),
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
  formaterNum = num => {
    const newNum = Number(num);
    if (isNaN(newNum)) {
      console.warn('为传入数字');
      return;
    }
    let handleValue = newNum;
    switch (true) {
      case newNum <= 1000:
        handleValue = this.breakNumComma(newNum);
        break;
      case newNum > 1000 && newNum <= 1000000:
        handleValue = `${this.breakNumComma((newNum / 1000).toFixed(2))}k`;
        break;
      case newNum > 1000000:
        handleValue = `${this.breakNumComma((newNum / 10000).toFixed(2))}w`;
        break;
      default:
        break;
    }
    return handleValue;
  };

  breakNumComma = num => {
    return formatMoney(num);
  };
}
