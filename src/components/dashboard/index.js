import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Routes from "config/routes";

const DisplayCards = props => {
  console.log("props.localState.tweets", props.localState.tweets);
  const renderCards = props.localState.tweets.map((item, index) => (
    <React.Fragment key={index}>
      <div className="card-body">
        <div className="card-header db">
          <div className="dib user-name ph1">
            <NavLink to={Routes.profile + "?userid=" + item.user_id}>
              {item.user_name.toLowerCase()}
            </NavLink>
          </div>
          <div className="dib seperator-dot"> </div>
          <div className="dib tweet-date ph1">
            {moment(item.timestamp).format("LT") +
              " " +
              moment(item.timestamp).format("LL")}
          </div>
        </div>
        <div className="card-break-ruler mv3" />
        <div className="card-content">{item.tweet_body}</div>
      </div>
    </React.Fragment>
  ));

  return renderCards;
};

const NewTweetInput = props => {
  return (
    <>
      <div>
        {" "}
        <textarea
          name="newTweetInput"
          onClick={props.localActions.enableInputTweetBox}
          onChange={props.localActions.onChangeTextInput}
          // onBlur={props.localActions.disableInputTweetBox}
          className="tweet-input-box"
          placeholder="Write a tweet"
          value={props.localState.newTweetInput}
        />
        {props.localState.toggleTweetInput && (
          <button
            className="tweet-btn"
            onClick={props.localActions.onSubmitTweet}
          >
            Tweet
          </button>
        )}
      </div>
    </>
  );
};

const Dashboard = props => {
  return (
    <>
      <div className="dashboard-container">
        <NewTweetInput {...props} />
        <DisplayCards {...props} />
      </div>
    </>
  );
};

export default Dashboard;
