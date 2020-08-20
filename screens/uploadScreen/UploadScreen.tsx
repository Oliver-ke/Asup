import React, { FC, useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SectionList, ActivityIndicator } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import colors from '../../constants/Colors';
import { StudentContext } from '../../context/StudentContext';
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
	const [ awaitingUploads, setAwaitingUpload ] = useState<any>([]);
	const [ successfulUploads, setSuccessfulUploads ] = useState<any>([]);
	const [ loading, setLoading ] = useState(true);
	const { studentDispatch } = useContext(StudentContext);
	// focus event to clear form
	useEffect(
		() => {
			const unsubscribe = navigation.addListener('focus', () => {
				studentDispatch({ type: 'RESET_DATA' });
				(async () => {
					try {
						// this was moved from on mount
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
			});
			return unsubscribe;
		},
		[ navigation ]
	);

	if (loading && (awaitingUploads.length === 0 || successfulUploads.length === 0)) {
		return (
			<View style={styles.spinner}>
				<ActivityIndicator size="large" />
			</View>
		);
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
				{Data[0].data.length === 0 && Data[1].data.length === 0 && !loading ? (
					<View style={styles.emptyMssg}>
						<Text style={styles.emptyText}>You have no uploads yet</Text>
						<EvilIcons name="archive" size={35} color="black" />
					</View>
				) : (
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
				)}
			</View>
		</View>
	);
};

export default UploadScreen;
