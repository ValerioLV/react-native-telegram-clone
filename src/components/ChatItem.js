import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import React from "react";
import { auth, db } from "../../dbConfig";

const ChatItem = ({ id, chatName, users, enterChat }) => {
	const curUser = users.filter((otherUser) => otherUser.nickname !== chatName);

	return (
		<ListItem
			onPress={() => enterChat(id, chatName)}
			key={id}
			bottomDivider>
			<Avatar
				rounded
				source={{
					uri:
						curUser?.photoURL ||
						"https://cencup.com/wp-content/uploads/2021/07/avatar-placeholder.png",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: "800" }}>
					{chatName}
				</ListItem.Title>
				<ListItem.Subtitle
					numberOfLines={1}
					style={{ color: "grey" }}></ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default ChatItem;
