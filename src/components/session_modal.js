import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../redux/actions';

import {
    Button,
    Modal
} from "react-bootstrap";

class SessionModal extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.SESSION_MODES = Object.freeze({ 
            LOGIN: "LOGIN",
            SIGNUP: "SIGNUP",
            RESET_PWD: "RESET_PWD"
        });

        this.state = {
            username: '',
            password: '',
            submitted: false,
            show: false,
            sessionMode: this.SESSION_MODES.LOGIN
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, sessionMode } = this.state;
        const { dispatch } = this.props;
        
        const login = () => {
            if (username && password) {
                dispatch(userActions.login(username, password));
            }
        }
        
        const signup = () => {
            if (username && password) {
                dispatch(userActions.signup(username, password));
            }
        }

        const resetPwd = () => {
            if (username && password) {
                dispatch(userActions.resetPwd(username, password));
            }
        }

        switch(sessionMode) {
            case this.SESSION_MODES.LOGIN:
                login();
                break;
            case this.SESSION_MODES.SIGNUP:
                signup();
                break;
            case this.SESSION_MODES.RESET_PWD:
                resetPwd();
                break;
        }
        
    }

    render() {
        const { loggingIn, loggedIn, alertType, alertMessage } = this.props;
        const { username, password, submitted, show } = this.state;

        //const [show, setShow] = useState(false);
  
        const handleClose = () => this.setState({show: false});
        const handleShow = (e) => {
            e.preventDefault();
            if (!loggedIn) {
                this.setState({show: true});
            }
        };

        if (loggedIn) {
            console.log("closing out");
            handleClose();
        }

        return (
          <>
            <a href="" onClick={handleShow}>Login</a> 
            <Modal id="loginModal" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <div className={`alert ${alertType}`}>
                      {`${alertMessage}`}
                  </div>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        
                    </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>Login</Button>
                {loggingIn &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
              </Modal.Footer>
            </Modal>
          </>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    const alertType = state.alert.type;
    const alertMessage = state.alert.message;

    return {
        loggingIn, loggedIn,
        alertType, alertMessage
    };
}

const connectedLoginModal = connect(mapStateToProps)(SessionModal);
export { connectedLoginModal as SessionModal }; 