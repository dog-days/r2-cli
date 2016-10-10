import React from 'react'
import Component from 'src/libs/ModuleComponent'
import { connect } from 'react-redux'
import Antd from 'antd'
import { Menu } from 'antd'
import { Link } from 'react-router'

require('css/base.scss')
require('css/main.scss')

class View extends Component {
  constructor(props){
    super(props); 
  }

  render() {
    super.render();
    return (
      <div className="r2-layout">
        <Menu onClick={this.handleClick} mode="horizontal" theme="dark">
          <Menu.Item key="demo">
            <Link to={`${ r2Common.prefixUrl }`}>
              { r2fn.t("R2框架") }
            </Link>
          </Menu.Item>
          <Menu.Item key="home">
            <Link to={`${ r2Common.prefixUrl }`}>
              { r2fn.t("主页") }
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to={`${ r2Common.prefixUrl }/about`}>
              { r2fn.t("关于") }
            </Link>
          </Menu.Item>
        </Menu>
        <div className="r2-breadcrumb">
          { this.breadcrumb || "" }
        </div>
        <div className="r2-contents">
          { this.props.children || "" }
        </div>
      </div>
    )  
  }
}
var ReduxView = connect((state)=>{
  return {
  };
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
  homeLink: {
    label:<Antd.Icon type="home"/>,
    link:'/',
  },
});
module.exports = ReduxView; 
