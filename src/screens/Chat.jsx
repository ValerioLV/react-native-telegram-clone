import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db } from "../../dbConfig";
import firebase from "firebase/compat";
import { auth } from "../../dbConfig";

const Chat = ({ navigation, route }) => {
	const [messageInput, setMessageInput] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMsg = () => {
		setMessageInput("");
		Keyboard.dismiss();
		db.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				message: messageInput,
				sentBy: {
					name: auth.currentUser.displayName,
					email: auth.currentUser.email,
					photoURL: auth.currentUser.photoURL,
				},
			});
	};

	useEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setMessageList(
					snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
				),
			);
		setMessageInput("");

		return unsubscribe;
	}, [route]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View>
					<Text className="font-bold text-lg text-center">
						{route.params.data}
					</Text>
				</View>
			),
			headerLeft: () => (
				<View className="flex-row items-center">
					<Entypo
						name="chevron-left"
						size={24}
						color="black"
						onPress={() => navigation.goBack()}
					/>
					<Avatar
						size={24}
						source={{
							uri: "https://cencup.com/wp-content/uploads/2021/07/avatar-placeholder.png",
						}}
						rounded
					/>
				</View>
			),
		});
	});

	console.log(messageList.map(({ data }) => data.sentBy.name));

	return (
		<View className="flex-1 bg-white">
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={90}
				className="flex-1">
				<ScrollView className="top-0">
					{messageList.map(({ id, data }) =>
						data.sentBy.name === auth.currentUser.displayName ? (
							<View
								key={id}
								className="p-[15px] bg-green-400 self-end rounded-[20px] m-[15px] max-w-[80%] relative">
								<Avatar
									position="absolute"
									bottom={-20}
									right={-5}
									rounded
									size={30}
									source={{ uri: data.sentBy.photoURL }}
								/>
								<Text className="">{data.message}</Text>
							</View>
						) : (
							<View
								key={id}
								className=" p-[15px] bg-gray-400 self-start rounded-[20px] m-[15px] max-w-[80%] relative">
								<Text className="">{data.message}</Text>
								<Avatar
									position="absolute"
									bottom={-20}
									left={-5}
									rounded
									size={30}
									source={{ uri: data.sentBy.photoURL }}
								/>
							</View>
						),
					)}
				</ScrollView>
				<View className="flex-row items-center p-[15px]">
					<TextInput
						value={messageInput}
						onChangeText={(text) => setMessageInput(text)}
						placeholder="Enter message"
						className=" h-10 flex-grow mr-[15px] p-[10px] bg-slate-200 border-transparent rounded-[30px]"
					/>
					<TouchableOpacity
						onPress={sendMsg}
						activeOpacity={0.5}>
						<Ionicons
							name="send"
							size={24}
							color="blue"
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Chat;
