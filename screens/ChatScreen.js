import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import firebase from "../firebase/firebase.utils";
import { connect } from "react-redux";
import ChatHeader from "../components/ChatHeader";
import ChatForm from "../components/ChatForm";
import Chat from "../components/Chat";
class ChatScreen extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channelRef: firebase.database().ref("channels"),
    messages: [],
    channelData: [],
    messagesLoading: true,
    progressBar: false,
    numUniqueUsers: "",
    searchTerm: "",
    searchLoading: false,
    searchResults: [],
    isPrivateChannel: this.props.isPrivateChannel,
    privateMessagesRef: firebase.database().ref("privateMessages"),
  };

  componentDidMount() {
    if (this.props.currentChannel && this.props.currentUser) {
      this.addListeners(this.props.currentChannel);
    }
    const channelData = [];
    this.state.channelRef
      .child(this.props.currentChannel)
      .on("child_added", (snap) => {
        channelData.push(snap.val());
        this.setState({ channelData: channelData[3] });
      });
  }

  addMessageListener = (channelId) => {
    let loadedmessages = [];
    const ref = this.getMessagesRef();

    ref.child(channelId).on("child_added", (snap) => {
      loadedmessages.push(snap.val());
      this.setState({ messages: loadedmessages, messagesLoading: false });
      this.countUniqueUsers(loadedmessages);
    });
  };

  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, isPrivateChannel } = this.state;

    return isPrivateChannel ? privateMessagesRef : messagesRef;
  };

  countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);

    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;

    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;

    this.setState({ numUniqueUsers });
  };

  handleSearchChange = (event) => {
    let searchTerm = event;

    this.setState({ searchTerm, searchLoading: true }, () =>
      this.handleSearchMessages()
    );
  };

  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");

    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);

    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  };

  addListeners = (channelId) => {
    this.addMessageListener(channelId);
  };

  isProgressBarVisible = (percent) => {
    if (percent > 0) {
      this.setState({ progressBar: true });
    }
  };

  render() {
    const {
      messagesRef,
      messages,
      progressBar,
      numUniqueUsers,
      searchTerm,
      searchResults,
      searchLoading,
      isPrivateChannel,
    } = this.state;
    const { currentUser, channel } = this.props;

    const { isProgressBarVisible, handleSearchChange, getMessagesRef } = this;

    const displayMessages = (messages) => {
      if (messages.length > 0) {
        return messages.map((message) => (
          <Chat key={message.timestamp} message={message} user={currentUser} />
        ));
      }

      return (
        <View
          style={{
            alignItems: "center",
            height: 300,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            No Message Yet
          </Text>
        </View>
      );
    };

    return (
      <View style={styles.messages_container}>
        <ChatHeader
          {...{
            numUniqueUsers,
            handleSearchChange,
            searchLoading,
            isPrivateChannel,
          }}
          searchTerm={this.state.searchTerm}
          channelName={this.state.channelData}
        />
        <ScrollView style={styles.message_container}>
          <View
            className={progressBar ? "messages__progress" : "messages__view"}
          >
            {searchTerm
              ? displayMessages(searchResults)
              : displayMessages(messages)}
          </View>
        </ScrollView>
        <ChatForm
          {...{
            messagesRef,
            isProgressBarVisible,
            isPrivateChannel,
            getMessagesRef,
          }}
          currentUser={currentUser}
          currentChannel={channel}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  messages_container: {
    height: "100%",
  },
  message_container: {
    paddingHorizontal: 20,
  },
  header: {},
  message: {},
  message__other__view: {},
});
const mapStateToProps = (state) => ({
  currentChannel: state.chat.currentChannel,
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(ChatScreen);
