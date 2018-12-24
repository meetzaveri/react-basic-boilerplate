import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import { fetchUserAction } from "actions/user";
import ProfileComponent from "components/profile";
import ErrorBoundary from "wrappers/errorBoundary";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchProfileInProcess: false,
      userData: {},
      userUpdate: false,
      updateUserInProcess: false
    };
  }

  componentDidMount() {
    const cacheduserid = localStorage.getItem("userid");
    const parseQueryString = queryString.parse(this.props.location.search);
    const userid = parseQueryString.userid
      ? parseQueryString.userid
      : cacheduserid;
    const url = "dummyUrl";
    this.props.fetchUserAPI(url, { userid });
    this.setState({
      fetchProfileInProcess: true
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { fetchProfileInProcess } = state;

    if (
      props.fetchUser.fetchSuccess === true &&
      fetchProfileInProcess === true
    ) {
      return {
        fetchProfileInProcess: false,
        userData: props.fetchUser.response
      };
    }

    if (
      props.updateUser.updateUserSuccess === true &&
      fetchProfileInProcess === true
    ) {
      return {
        fetchProfileInProcess: false,
        userData: props.updateUserSuccess.updateUserSuccessm,
        userUpdate: true
      };
    }

    return null;
  }

  followUser = userid => {
    console.log("userid", userid);
    const cacheduserid = localStorage.getItem("userid");

    const url = "dummyUrl";
    const formData = {
      userid: cacheduserid,
      userToFollow: userid
    };
    this.props.followUserAPI(url, formData);
    this.setState({ updateUserInProcess: true });
  };

  render() {
    const { followUser } = this;
    const actions = { followUser };

    return (
      <ErrorBoundary>
        <>
          <h3>Profile</h3>
          <ProfileComponent localState={this.state} localActions={actions} />
        </>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchUser: state.fetch_user,
    updateUser: state.update_user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserAPI: (url, formData) => dispatch(fetchUserAction(url, formData)),
    followUserAPI: (url, formData) => dispatch(fetchUserAction(url, formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
