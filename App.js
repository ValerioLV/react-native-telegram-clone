import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "./src/screens/Homepage";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import AddChat from "./src/screens/AddChat";
import { View, Text } from "react-native";

export default function App() {
	const Stack = createNativeStackNavigator();
	const glScreenOpts = {
		headerStyle: { backgroundColor: "#2C6BED" },
		headerTitleStyle: { color: "white" },
		headerTintColor: "white",
	};

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={glScreenOpts}>
				<Stack.Screen
					name="Login"
					component={Login}
				/>
				<Stack.Screen
					name="Register"
					component={Register}
				/>
				<Stack.Screen
					name="HomePage"
					component={Homepage}
				/>
				<Stack.Screen
					name="AddChat"
					component={AddChat}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
