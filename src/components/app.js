import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";

import { connect } from 'react-redux';
import { userActions } from '../redux/actions';

import Header from './pug/layout/header';
import ContentMixin from './pug/layout/content_mixin'
import Footer from './pug/layout/footer';
import Navbar from './pug/layout/navbar';

import About from './pug/content/about';
import Gallery from './pug/content/gallery';
import Composers from './pug/content/composers';
import Home from './pug/content/home';

import {LoginModal} from './login_modal';

// import '../../assets/sass/main.scss';

class WrappedApp extends React.Component { 
  
  constructor(props) {
    super(props);
  }

  render() {
    
    console.log("hello!");
    console.log(this.props);
    
    return <> 
    <Header
      content={<h1>Call for Scores</h1>}
      navLinks={<>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      { !this.props.loggedIn && <LoginModal /> }
      { this.props.loggedIn && <a href="" onClick={() => this.props.dispatch(userActions.logout())}>Logout</a> }
      </>} />

    <ContentMixin>
      <Switch> 
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </ContentMixin>

    <Footer>
      <p>by <a href="http://alexrupp.com/">Alex</a>, Jan 2020</p>
      <p className="mb-0">Using!</p>
      <ul>
        <li>react-bootstrap</li>
        <li>fontawesome</li>
        <li>google fonts</li>
        <li>subtlepatterns</li>
      </ul>
    </Footer>
  </>};
};

function mapStateToProps(state) {
  const { loggingIn, loggedIn } = state.authentication;
  return {
      loggingIn, loggedIn
  };
}

const appWithRouter = withRouter(WrappedApp);

const App = connect(mapStateToProps)(appWithRouter);

export default App;