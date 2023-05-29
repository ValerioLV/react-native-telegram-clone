import { View, Text, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../dbConfig";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace("HomePage");
			}
		});
		return unsubscribe;
	}, []);

	const login = () => {
		auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err));
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			className="flex-1 items-center justify-center bg-white p-10px">
			<StatusBar style="light" />
			<View>
				<Text>Insert Email and Password</Text>
				<Input
					containerStyle={{ width: 300 }}
					placeholder="Email"
					autoFocus
					keyboardType="email-address"
					secureTextEntry={false}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					containerStyle={{ width: 300 }}
					placeholder="Password"
					secureTextEntry={true}
					type="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>
			<Button
				className="w-52 mt-[10px]"
				title="Login"
				onPress={() =>
					!email || !password ? alert("Devi riempire tutti i campi") : login()
				}
			/>
			<Button
				className="w-52 mt-[10px]"
				title="Register"
				type="clear"
				onPress={() => navigation.navigate("Register")}
			/>
			<View className="h-100px" />
		</KeyboardAvoidingView>
	);
};

export default Login;
