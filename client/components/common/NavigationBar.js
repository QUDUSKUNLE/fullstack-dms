import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';


class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <nav className="black-text" role="navigation">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">DMS</Link>
          <ul className="right hide-on-med-and-down" id="mobile-demo">
            <li><Link to="/">Home</Link></li>
            <li>
              {isAuthenticated
                ? <Link href="/profile" >Profile</Link>
                : <Link to="/login">Login</Link>
              }
            </li>
            <li>
              {isAuthenticated
                ? <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                : <Link to="/signup">Sign up</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
