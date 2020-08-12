import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/Colors';
import { AuthContext } from '../../context/AuthContext';
import StudentCard from '../../components/studentCard/StudentCard';
import students from '../../mockData/students';
import SearchInput from '../../components/searchInput/SearchInput';

import styles from './styles';
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


export default HomeScreen;

