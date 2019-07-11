import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import ShowContainer from '../containers/ShowContainer'
import NewShowFormContainer from '../containers/NewShowFormContainer'
import ShowShowContainer from '../containers/ShowShowContainer'


export const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/shows' component={ShowContainer} />
        <Route path='/shows/new' component={NewShowFormContainer} />
        <Route path='/shows/:id' component={ShowShowContainer} />
      </Router>
    </div>
  )
}

export default App
