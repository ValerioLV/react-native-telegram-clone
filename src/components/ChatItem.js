import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import React from "react";
import { auth } from "../../dbConfig";

const ChatItem = ({ id, chatName, chatLog }) => {
	return (
		<ListItem>
			<Avatar
				rounded
				source={{
					uri:
						auth.currentUser?.photoURL ||
						"https://cencup.com/wp-content/uploads/2021/07/avatar-placeholder.png",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: "800" }}>Test</ListItem.Title>
				<ListItem.Subtitle
					numberOfLines={1}
					style={{ color: "grey" }}>
					TestingTestingTestingTestingTestingTestingTestingTestingTesting
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default ChatItem;
