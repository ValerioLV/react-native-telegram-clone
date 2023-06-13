import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { auth, db } from "../../dbConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const AddChat = ({ navigation }) => {
	const [user] = useAuthState(auth);
	const [input, setInput] = useState("");
	const userList = db.collection("users");
	const chatsList = db
		.collection("chats")
		.where("users", "array-contains", user.displayName);
	const [chatSnapshot] = useCollection(chatsList);
	const [usersSnapshot] = useCollection(userList);

	const chatAndUserExist = (neededUsername) => {
		if (
			chatSnapshot?.docs.includes(
				(chat) =>
					chat.data().users.find((user) => user === neededUsername)?.length > 0,
			) &&
			usersSnapshot?.docs.map((user) => user.data().nickname === neededUsername)
		) {
			alert("no");
		} else {
			return true;
		}
	};

	const createChat = () => {
		if (!input) {
			return null;
		} else {
			if (input !== user.displayName && chatAndUserExist(input)) {
				db.collection("chats").add({
					users: [user.displayName, input],
					chatName: input,
				});
				navigation.goBack();
			}
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a new chat",
			headerBackTitle: "Go back",
		});
	}, [navigation]);

	return (
		<View>
			<Input
				placeholder="Start a new chat with an user"
				value={input}
				onChangeText={(text) => {
					setInput(text);
				}}
				leftIcon={
					<Entypo
						name="chat"
						size={24}
						color="black"
					/>
				}
			/>
			<Button
				title="Add new chat"
				onPress={createChat}
			/>
		</View>
	);
};

export default AddChat;
