import React from 'react';
import {connect} from 'react-redux';
import styles from './pages.module.scss';
import {userSignUp} from '../actions/index';
import Utility from '../common/Utility';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  handleChange(field, source) {
    this.state.info[field] = source.target.value;
  }

  async handleSignUp() {
    const {email} = this.state.info;
    if (email) {
      if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email)) {
        Utility.Alert('email Incorrect format');
        return;
      }
    }
    await this.props.userSignUp(this.state.info);
    alert('Register success');
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div className={`${styles.pageBody} ${styles.gCenter}`}>
        <div className={styles.signup}>
          <div className={`row align-center ${styles.singupRow} `}>
            <div className={styles.signupLabel}>Username:</div>
            <div className={styles.col}>
              <input placeholder="Please enter username" onChange={this.handleChange.bind(this, 'username')} maxLength="30" />
            </div>
          </div>
          <div className={`row align-center ${styles.singupRow} `}>
            <div className={styles.signupLabel}>Email:</div>
            <div className={styles.col}>
              <input placeholder="Please enter email" onChange={this.handleChange.bind(this, 'email')} maxLength="80"/>
            </div>
          </div>
          <div className={`row align-center ${styles.singupRow} `}>
            <div className={styles.signupLabel}>Password:</div>
            <div className={styles.col}>
              <input type="password" placeholder="Please enter password" onChange={this.handleChange.bind(this, 'password')} maxLength="30"/>
            </div>
          </div>
          <div className={`row align-center ${styles.singupRow} `}>
            <div className={styles.signupLabel}>Confirm Password:</div>
            <div className={styles.col}>
              <input type="password" placeholder="Please enter confirm password" onChange={this.handleChange.bind(this, 'confirmPwd')} maxLength="30"/>
            </div>
          </div>
          <div className={`row align-center ${styles.singupRow} `}>
            <div className={styles.signupLabel}>Mobile:</div>
            <div className={styles.col}>
              <input placeholder="Please enter mobile" onChange={this.handleChange.bind(this, 'mobile')} type="number" maxLength="15" />
            </div>
          </div>

          <div className={`row align-center ${styles.singupRow} `}>
            <div className={styles.signupLabel}></div>
            <div className={styles.col}>
              <button onClick={this.handleSignUp.bind(this)}>SignUp</button>
              <button onClick={() => this.props.history.push('/signin')}>SignIn</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {state: state};
};

export default connect(mapStateToProps, {userSignUp})(SignUp);
