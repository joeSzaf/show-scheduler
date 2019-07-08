import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import ShowContainer from '../containers/ShowContainer'
import NewShowFormContainer from '../containers/NewShowFormContainer'


export const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/shows' component={ShowContainer} />
        <Route path='/shows/new' component={NewShowFormContainer} />
      </Router>
    </div>
  )
}

export default App
