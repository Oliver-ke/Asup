import React, { useEffect, useContext, FC } from 'react';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { prepareRegAssets } from '../util/storageUtil';
import constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { View, SectionList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import StudentCard from '../components/studentCard/StudentCard';
import students from '../mockData/students';
import SearchInput from '../components/searchInput/SearchInput';
import ActionButton from '../components/actionButton/ActionButton';
import { UploadScreenNavigationProp } from '../types';

const Data = [
	{ title: 'Awaiting Uploads', type: 'AWAITING', data: students },
	{ title: 'Successful Uploads', type: 'UPLOADED', data: students }
];

type UploadScreenProp = {
	navigation: UploadScreenNavigationProp;
};

const UploadScreen: FC<UploadScreenProp> = ({ navigation }) => {
	const { state: { schoolID, authToken } } = useContext(AuthContext);
	useEffect(() => {
		(async () => {
			const { assets } = await prepareRegAssets(schoolID, authToken);
			console.log(assets);
		})();
	}, []);
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={colors.light.primaryColor} style="inverted" />
			<View style={styles.header}>
				<SearchInput />
			</View>
			<ActionButton
				onPress={() => navigation.navigate('AddStudent')}
				icon={<Icon name="add" type="material" color={colors.light.secondaryColor} />}
			/>
			<View style={{ flex: 1 }}>
				<SectionList
					sections={Data}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <StudentCard student={item} />}
					renderSectionHeader={({ section: { title, type } }) => (
						<View style={styles.mainTitlWrapper}>
							<Text h4Style={styles.mainText} h4>
								{title}
							</Text>
							{type === 'UPLOADED' && (
								<MaterialCommunityIcons
									name="upload-outline"
									size={24}
									color={colors.light.secondaryColor}
								/>
							)}
							{type === 'AWAITING' && (
								<MaterialCommunityIcons name="upload-network" size={24} color="#AF3800" />
							)}
						</View>
					)}
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
		height: 70,
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
		marginRight: 10
	}
});

export default UploadScreen;
