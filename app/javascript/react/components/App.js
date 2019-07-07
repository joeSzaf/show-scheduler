import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import ShowContainer from '../containers/ShowContainer'

export const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/shows' component={ShowContainer} />
      </Router>
    </div>
  )
}

export default App
