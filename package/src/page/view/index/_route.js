'use strict';

let route_config = {
  layout: "main",
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require("./index").default)
    },"index")
  },
}

if(module.hot) {
  route_config.component = require("./index").default;
}
export default route_config;
