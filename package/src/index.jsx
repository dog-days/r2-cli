import r2JS from "r2-js";
import global from './common/global'
import routes from '../temp/routes';
import reducers from '../temp/reducers'

var render = r2JS(routes,reducers);

render();
if (module.hot) {
  module.hot.accept(
    '../temp/routes',
    () => render()
  );
}
if (module.hot) {
  module.hot.accept(
    '../temp/reducers',
    () => render()
  );
}
