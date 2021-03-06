import React from 'react';
import { connect } from 'react-redux';
import validateInput from '../../../server/shared/validations/signup';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.context.router.push('/');
        },
        ({ data }) => this.setState({ errors: data })
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <SignupForm
        onChange={this.onChange}
        userProps={this.state}
        onSubmit={this.onSubmit}
        errors={errors}
      />
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

SignupPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { userSignupRequest })(SignupPage);
