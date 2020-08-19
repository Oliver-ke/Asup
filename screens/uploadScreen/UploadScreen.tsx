import React, { FC, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SectionList, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/Colors';
import StudentCard from '../../components/studentCard/StudentCard';
import SearchInput from '../../components/searchInput/SearchInput';
import ActionButton from '../../components/actionButton/ActionButton';
import { UploadScreenNavigationProp } from '../../types';
import { getItemsFromStorage } from '../../util/uploadHandler';
import styles from './styles';

type UploadScreenProp = {
	navigation: UploadScreenNavigationProp;
};

const UploadScreen: FC<UploadScreenProp> = ({ navigation }) => {
	const [ awaitingUploads, setAwaitingUpload ] = useState<any>(null);
	const [ successfulUploads, setSuccessfulUploads ] = useState<any>([]);
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				const uploadsWaiting = await getItemsFromStorage('uploadWaiting');
				const uploadSuccess = await getItemsFromStorage('uploadComplete');
				setAwaitingUpload(uploadsWaiting);
				setSuccessfulUploads(uploadSuccess);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		})();
	}, []);

	if(loading && (!awaitingUploads || !successfulUploads)){
		return (
			<View style={styles.spinner}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	const Data = [
		{ title: 'Awaiting Uploads', type: 'AWAITING', data: awaitingUploads },
		{ title: 'Successful Uploads', type: 'UPLOADED', data: successfulUploads }
	];

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
					keyExtractor={(item: any) => item.uploadID}
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

export default UploadScreen;
