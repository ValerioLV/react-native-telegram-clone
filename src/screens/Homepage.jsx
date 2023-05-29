import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { Avatar, Button } from "react-native-elements";
import { auth, db } from "../../dbConfig";
import firebase from "firebase/compat";
import { useAuthState } from "react-firebase-hooks/auth";
import { ScrollView } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import ChatItem from "../components/ChatItem";

const Homepage = ({ navigation }) => {
	const signOut = () => {
		auth.signOut().then(() => {
			navigation.replace("Login");
		});
	};

	const [user] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			db.collection("users").doc(user.displayName).set(
				{
					email: user.email,
					nickname: user.displayName,
					lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
					photoURL: user.photoURL,
				},
				{
					merge: true,
				},
			);
		}
	}, [user]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerStyle: { backgroundColor: "white" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<View className="ml-5 flex-row items-center gap-2">
					<TouchableOpacity>
						<Avatar
							rounded
							source={{ uri: auth?.currentUser?.photoURL }}
							onPress={signOut}
						/>
					</TouchableOpacity>
					<Text>{user.displayName} </Text>
				</View>
			),
			headerRight: () => (
				<View className="flex-row justify-between w-[80px] mr-5">
					<TouchableOpacity>
						<AntDesign
							name="camerao"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<SimpleLineIcons
							name="pencil"
							size={24}
							color="black"
							onPress={() => navigation.navigate("AddChat")}
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<SafeAreaView>
			<ScrollView>
				<ChatItem />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Homepage;
