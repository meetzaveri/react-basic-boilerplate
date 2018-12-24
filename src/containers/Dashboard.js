import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import ErrorBoundary from "wrappers/errorBoundary";
import { fetchTweets, postTweet } from "actions/tweets";
import DashboardComponent from "components/dashboard";
import Routes from "config/routes";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTweetInput: "",
      tweets: [],
      fetchTweetsInProcess: false,
      toggleTweetInput: false,
      userid: null,
      postingTweetInProcess: false
    };
  }

  componentDidMount() {
    const cacheduserid = "";
    const parseQueryString = queryString.parse(this.props.location.search);
    const userid = parseQueryString.userid
      ? parseQueryString.userid
      : cacheduserid;
    const url = "dummyUrl";
    this.setState({ fetchTweetsInProcess: true, userid });
    this.props.fetchTweetsAPI(url, { userid });
  }

  static getDerivedStateFromProps(props, state) {
    const { fetchTweetsInProcess, postingTweetInProcess, tweets } = state;

    if (
      props.getTweets.fetchSuccess === true &&
      fetchTweetsInProcess === true
    ) {
      return { fetchTweetsInProcess: false, tweets: props.getTweets.response };
    }

    if (
      props.postTweet.publishTweet === true &&
      postingTweetInProcess === true
    ) {
      return {
        postingTweetInProcess: false,
        tweets: props.postTweet.response
      };
    }

    return null;
  }

  enableInputTweetBox = () => {
    this.setState({ toggleTweetInput: true });
  };

  disableInputTweetBox = () => {
    this.setState({ toggleTweetInput: false });
  };

  onChangeTextInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onSubmitTweet = text => {
    console.log("on submit tweet");
    const { userid, newTweetInput } = this.state;
    const username = localStorage.getItem("username");
    const url = "Dummyurl";
    const formData = { userid, content: newTweetInput, username };
    this.props.publishTweet(url, formData);
    this.setState({ postingTweetInProcess: true });
  };

  render() {
    const {
      enableInputTweetBox,
      disableInputTweetBox,
      onChangeTextInput,
      onSubmitTweet
    } = this;
    const actions = {
      enableInputTweetBox,
      disableInputTweetBox,
      onChangeTextInput,
      onSubmitTweet
    };

    const username = localStorage.getItem("username");

    return (
      <ErrorBoundary>
        <>
          <h2 className="text-center">
            Welcome,{" "}
            <span style={{ textDecoration: "underline", color: "#000" }}>
              {username}
            </span>
          </h2>
          <DashboardComponent localActions={actions} localState={this.state} />
        </>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    getTweets: state.get_tweets,
    postTweet: state.post_tweet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTweetsAPI: (url, id) => dispatch(fetchTweets(url, id)),
    publishTweet: (url, formData) => dispatch(postTweet(url, formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
