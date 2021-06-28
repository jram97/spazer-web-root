import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LoginForm from './containers/loginForm';
import { login } from 'services/authService';
import './login-styles.css';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarState: false,
      messageToDisplay: ''
    };
  }

  onLogin = async data => {
    try {
      let result = await login(data);
      console.log('resultado', result);
      this.props.history.push('/branch-offices');
    } catch (error) {
      console.log(error);
      this.setState({ snackbarState: true, messageToDisplay: error.error });
    }
  };

  render() {
    return (
      <div className="container">
        <LoginForm onLogin={this.onLogin} />
        <div className="mask-container"></div>
        <Snackbar
          open={this.state.snackbarState}
          autoHideDuration={6000}
          onClose={() => this.setState({ snackbarState: false })}>
          <Alert
            onClose={() => this.setState({ snackbarState: false })}
            severity={'error'}>
            {this.state.messageToDisplay}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Login;
