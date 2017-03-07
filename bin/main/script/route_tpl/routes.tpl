import App from 'page/App'
var childRoutes = [
  <!--require_begin-->
  require('${path}').default,
  <!--require_end-->
  {
    path: '*',
    getComponent(location, cb) {
      require.ensure([], function(require){
        cb(null, require('page/nopage').default)
      },"nopage")
    }
  },

];
export default {
  path : "/",
  <!--index_begin-->
  indexRoute: require('${path}').default,
  <!--index_end-->
  component: App,
  childRoutes: childRoutes 
}
