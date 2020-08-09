import React, { useContext } from 'react';
import constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';
import StudentCard from '../components/studentCard/StudentCard';
import students from '../mockData/students';
import SearchInput from '../components/searchInput/SearchInput';

const HomeScreen = () => {
	const { state: { schoolCode } } = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={colors.light.primaryColor} style="inverted" />
			<View style={styles.header}>
				<Text h4Style={styles.welcomeTxt} h4>
					Welcome, School <Text style={styles.welcomeTxtBold}>{schoolCode}</Text>
				</Text>
				<SearchInput />
			</View>
			<View style={{ flex: 1 }}>
				<View style={styles.mainTitlWrapper}>
					<Text h4Style={styles.mainText} h4>
						Successful Uploads
					</Text>
					<MaterialCommunityIcons name="upload-outline" size={24} color={colors.light.secondaryColor} />
				</View>
				<FlatList
					data={students}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <StudentCard student={item} />}
					contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1 }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: constants.statusBarHeight
	},
	header: {
		backgroundColor: colors.light.primaryColor,
		height: 95,
		width: '100%',
		paddingHorizontal: 10,
		justifyContent: 'center'
	},
	welcomeTxt: {
		fontSize: 16,
		color: '#ccc',
		fontWeight: 'normal',
		marginBottom: 10
	},
	welcomeTxtBold: {
		color: colors.light.secondaryColor
	},
	mainTitlWrapper: {
		flexDirection: 'row',
		marginTop: 10,
		paddingVertical: 10
	},
	mainText: {
		fontSize: 20,
		color: 'rgba(0,0,0,0.8)',
		fontFamily: 'lato',
		marginRight: 10,
		marginLeft: 10
	}
});
export default HomeScreen;

