import React from 'react'
import Component from 'src/libs/ModuleComponent'
import { connect } from 'react-redux'
import * as Antd from 'antd'
import * as actionCreator from './action'

class View extends Component {
  constructor(props){
    super(props); 
  }
  
  render() {
    super.render();
    var _this = this;
    let { targetProps } = this.props;
    return (
      <div className="about" >
        <Antd.Alert message={r2fn.t("这是一个关于页面！")} type="info" showIcon />
      </div>
    )  
  }
}

var ReduxView = connect((state)=>{
  return {
    targetProps : state.about,
  };
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
  title: r2fn.t("关于"),
  breadcrumb:[
    {
      label: r2fn.t("关于"),
    },
  ],
});
module.exports = ReduxView; 
