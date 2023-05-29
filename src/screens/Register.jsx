import { View, KeyboardAvoidingView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../../dbConfig";

const Register = ({ navigation }) => {
	const [nickname, setNickname] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [photo, setPhoto] = useState(null);

	const onHandlePickPic = async () => {
		let res = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!res.canceled) {
			setPhoto(res.assets[0].uri);
		}
	};

	const onHandleRegister = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: nickname,
					photoURL: photo || "https://picsum.photos/200",
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView className="flex-1 items-center justify-center p-[10px] bg-white gap-2">
			<Text
				h3
				className="mb-[50px] text-center">
				Create an account
			</Text>
			<View>
				<Input
					placeholder="Nickname"
					autoFocus
					containerStyle={{ width: 300 }}
					type="text"
					secureTextEntry={false}
					value={nickname}
					onChangeText={(text) => setNickname(text)}
				/>
				<Input
					placeholder="Email"
					type="email"
					keyboardType="email-address"
					containerStyle={{ width: 300 }}
					secureTextEntry={false}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					containerStyle={{ width: 300 }}
					type="password"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
					re
				/>

				{photo && (
					<Image
						source={{ uri: photo }}
						style={{ width: 50, height: 50, borderRadius: 50 }}
					/>
				)}
				<Button
					title="Pick an image"
					onPress={onHandlePickPic}
					className="w-[200px] self-center"
				/>
			</View>
			<View>
				<Button
					title="Register"
					className="w-[50%] self-center"
					onPress={() =>
						!password || !email || !nickname || !photo
							? alert("Devi riepire tutti i campi")
							: onHandleRegister()
					}
				/>
				<Button
					title="Already have an account? Click here to log in"
					className=" self-center"
					titleStyle={{ fontSize: 12 }}
					type="clear"
					onPress={() => navigation.navigate("Login")}
				/>
			</View>
			<View className="h-[100px]" />
		</KeyboardAvoidingView>
	);
};

export default Register;
