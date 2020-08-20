import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import colors from '../../constants/Colors';
import { getItemsFromStorage } from '../../util/uploadHandler';
import { AuthContext } from '../../context/AuthContext';
import StudentCard from '../../components/studentCard/StudentCard';
import SearchInput from '../../components/searchInput/SearchInput';

import styles from './styles';
const HomeScreen = () => {
	const { state: { schoolCode } } = useContext(AuthContext);
	const [ successfulUploads, setSuccessfulUploads ] = useState<null | []>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				const uploadSuccess = await getItemsFromStorage('uploadComplete');
				setSuccessfulUploads(uploadSuccess);
				setLoading(false);
			} catch (error) {
				console.log(error);
				Alert.alert('Error', 'Ops! something went wrong');
			}
		})();
	}, []);

	if(loading && successfulUploads === null){
		return (
			<View style={styles.spinner}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

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
				{successfulUploads?.length === 0 ? (
					<View style={styles.emptyMssg}>
						<Text style={styles.emptyText}>You have no uploads yet</Text>
						<EvilIcons name="archive" size={35} color="black" />
					</View>
				) : (
					<FlatList
					data={successfulUploads}
					keyExtractor={(item: any) => item.uploadID}
					renderItem={({ item }) => <StudentCard student={item} />}
					contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1 }}
				/>
				)}
			</View>
		</View>
	);
};

export default HomeScreen;
