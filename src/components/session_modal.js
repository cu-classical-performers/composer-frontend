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
            verifyPassword: '',
            submitted: false,
            show: false,
            sessionMode: this.SESSION_MODES.LOGIN
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.signedUp !== prevProps.signedUp || this.props.resetPwd !== prevProps.resetPwd) {
            if (this.props.signedUp || this.props.resetPwd) {
                this.setState({sessionMode: this.SESSION_MODES.LOGIN});
            }
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, sessionMode, verifyPassword } = this.state;
        const { dispatch } = this.props;
        
        const login = () => {
            if (username && password) {
                dispatch(userActions.login(username, password));
            }
        }
        
        const signup = () => {
            if (username && password && verifyPassword && (password === verifyPassword)) {
                dispatch(userActions.signup(username, password));
            }
        }

        const resetPwd = () => {
            if (username) {
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
        const { resettingPwd, resetPwd, signingUp, signedUp, loggingIn, loggedIn, alertType, alertMessage } = this.props;
        const { username, password, submitted, show, sessionMode, verifyPassword } = this.state;

        //const [show, setShow] = useState(false);
  
        const handleClose = () => this.setState({show: false});
        const handleShow = (e) => {
            e.preventDefault();
            if (!loggedIn) {
                this.setState({show: true});
            }
        };

        const swapSessionMode = (e, mode) => {
            e.preventDefault();
            this.setState({sessionMode: mode});
        }

        const checkStatusChange = () => {
            if (loggedIn) {
                console.log("closing out");
                handleClose();
            }
        }

        const titleFromSessionMode = () => {
            switch(sessionMode) {
                case this.SESSION_MODES.LOGIN:
                    return "Login";
                case this.SESSION_MODES.SIGNUP:
                    return "Sign up";
                case this.SESSION_MODES.RESET_PWD:
                    return "Forgot your password?";
            }
        }

        const actionFromSessionMode = () => {
            switch(sessionMode) {
                case this.SESSION_MODES.LOGIN:
                    return "Login";
                case this.SESSION_MODES.SIGNUP:
                    return "Sign up";
                case this.SESSION_MODES.RESET_PWD:
                    return "Reset password";
            }
        }

        checkStatusChange();

        return (
          <>
            <a href="" onClick={handleShow}>Login</a> 
            <Modal id="loginModal" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{titleFromSessionMode()}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {alertMessage && <div className={`alert ${alertType}`}>
                      {`${alertMessage}`}
                  </div>}
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    {sessionMode !== this.SESSION_MODES.RESET_PWD && 
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>}
                    {sessionMode == this.SESSION_MODES.SIGNUP &&
                    <div className={'form-group' + (submitted && (password !== verifyPassword) ? ' has-error' : '')}>
                        <label htmlFor="verifyPassword">Re-Enter Password</label>
                        <input type="password" className="form-control" name="verifyPassword" value={verifyPassword} onChange={this.handleChange} />
                        {password !== verifyPassword &&
                            <div className="help-block">Passwords must match</div>
                        }
                    </div>}
                </form>
              </Modal.Body>
              <Modal.Footer>
                {sessionMode !== this.SESSION_MODES.SIGNUP &&
                 <a href="" onClick={(e) => swapSessionMode(e, this.SESSION_MODES.SIGNUP)}>Sign up</a>}
                {sessionMode !== this.SESSION_MODES.RESET_PWD &&
                 <a href="" onClick={(e) => swapSessionMode(e, this.SESSION_MODES.RESET_PWD)}>Reset password</a>}
                {sessionMode !== this.SESSION_MODES.LOGIN &&
                 <a href="" onClick={(e) => swapSessionMode(e, this.SESSION_MODES.LOGIN)}>Login</a>}
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>{actionFromSessionMode()}</Button>
                {(loggingIn || resettingPwd || signingUp) &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
              </Modal.Footer>
            </Modal>
          </>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn, signedUp, signingUp, resetPwd, resettingPwd } = state.authentication;
    const alertType = state.alert.type;
    const alertMessage = state.alert.message;

    return {
        loggingIn, loggedIn,
        alertType, alertMessage,
        signingUp, signedUp,
        resetPwd, resettingPwd
    };
}

const connectedLoginModal = connect(mapStateToProps)(SessionModal);
export { connectedLoginModal as SessionModal }; 