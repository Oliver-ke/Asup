import React, { FC, ReactElement, useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { prepareRegAssets } from '../../util/storageUtil';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather, AntDesign } from '@expo/vector-icons';
import DetailField from '../../components/detailField/DetailField';
import { getItemFromStorage, removeItemFromStorage } from '../../util/uploadHandler';
import { DetailScreenNavigationProp } from '../../types';
import styles from './styles';

type detailScreenType = {
	navigation: DetailScreenNavigationProp;
	route: {
		params: {
			uploadID: string;
			uploaded: boolean;
		};
	};
};

const term = [
	{ label: 'First Term', value: 1 },
	{ label: 'Second Term', value: 2 },
	{ label: 'Third Term', value: 3 }
];

const DetailScreen: FC<detailScreenType> = ({ navigation, route }): ReactElement => {
	const { uploadID, uploaded } = route.params;
	const [ studentInfo, setStudentInfo ] = useState<any>(null);
	const [ loadingDetail, setLoadingDetail ] = useState(false);
	const [ regAssets, setRegAssets ] = useState({
		accademicSession: [],
		classes: [],
		states: [],
		localGov: []
	});
	const { state: { schoolID, authToken } } = useContext(AuthContext);

	const pickItemFromID = (id: string, items: any) => {
        console.log(id, items);
        return 'None';
		// const value = items.filter((item: any) => item.value === id)[0].label;
		// console.log(value);
		// return value;
	};

	const handleDeletePressed = () => {
		Alert.alert(
			'Delete Upload',
			'Are you sure you want to delete this upload',
			[
				{
					text: 'Cancel',
					onPress: () => {
						return true;
					},
					style: 'cancel'
				},
				{
					text: 'Delete',
					onPress: async () => {
						const key = uploaded ? 'uploadComplete' : 'uploadWaiting';
						await removeItemFromStorage(uploadID, key);
						navigation.navigate('Uploads');
					},
					style: 'destructive'
				}
			],
			{ cancelable: false }
		);
	};

	useEffect(() => {
		(async () => {
			setLoadingDetail(true);
			try {
				const key = uploaded ? 'uploadComplete' : 'uploadWaiting';
				const student = await getItemFromStorage(uploadID, key);
				if (student) {
					const assestsData = await prepareRegAssets(schoolID, authToken);
					if (assestsData) {
						setRegAssets(assestsData.assets);
						setLoadingDetail(false);
						return setStudentInfo(student);
					}
					Alert.alert('Loading Error', 'Could not load assets');
					return navigation.navigate('Uploads');
				}
				setLoadingDetail(false);
				Alert.alert('Student Error', 'No student with the given uploadID');
				return navigation.navigate('Uploads');
			} catch (error) {
				console.log(error);
				Alert.alert('Loading Error', 'Please ensure your have a working network connection');
				return navigation.navigate('Uploads');
			}
		})();
	}, []);

	if (loadingDetail || !studentInfo) {
		console.log('Spinning');
		return <ActivityIndicator size="large" />;
	}

	const {
		AdmissionDate,
		ClassAdmittedID,
		CurrentClassID,
		DateOfBirth,
		FirstName,
		Gender,
		GuardianAddress,
		GuardianEmailAddress,
		GuardianFirstName,
		GuardianGender,
		GuardianLastName,
		GuardianOtherName,
		GuardianPhoneNo,
		GuardianRelationship,
		LGAOfOriginID,
		LastName,
		OtherName,
		StateOfOriginID,
		TermAdmitted,
		YearOfAdmission,
		studentPix: { ImageData }
	} = studentInfo;

	return (
		<View style={{ ...styles.container }}>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				contentInset={{
					top: 50
				}}
			>
				<View style={styles.content}>
					<View style={styles.deleteWrapper}>
						<Button
							onPress={handleDeletePressed}
							buttonStyle={{ backgroundColor: '#ccc', borderRadius: 50 }}
							icon={{ name: 'delete', type: 'antdesign', size: 20 }}
						/>
					</View>
					<View style={styles.profileImage}>
						<Image style={{ width: 150, height: 150, resizeMode: 'cover' }} source={{ uri: ImageData }} />
					</View>
					<View style={styles.progileNameContainer}>
						<Text
							style={{ fontSize: 17, fontWeight: '700', color: '#333' }}
						>{`${LastName} ${FirstName} ${OtherName}`}</Text>
						<Text style={{ color: '#333' }}>
							Status:
							{uploaded ? (
								<Text style={{ color: 'green' }}>
									{' '}
									Uploaded <Feather name="check" size={12} color="green" />
								</Text>
							) : (
								<Text style={{ color: 'red' }}>
									{' '}
									Waiting <AntDesign name="retweet" size={12} color="red" />
								</Text>
							)}
						</Text>
					</View>
					<DetailField label="Gender" value={Gender} />
					<DetailField label="Class Admitted" value={pickItemFromID(ClassAdmittedID, regAssets.classes)} />
					<DetailField label="Term Admitted" value={pickItemFromID(TermAdmitted, term)} />
					<DetailField label="Current Class" value={pickItemFromID(CurrentClassID, regAssets.classes)} />
					<DetailField label="Admission Date" value={new Date(AdmissionDate).toLocaleDateString()} />
					<DetailField label="Year of Admission" value={YearOfAdmission} />
					<DetailField label="Date of Birth" value={new Date(DateOfBirth).toLocaleString()} />
					<DetailField label="State of Origin" value={pickItemFromID(StateOfOriginID, regAssets.states)} />
					<DetailField label="LGA of Origin" value={pickItemFromID(LGAOfOriginID, regAssets.localGov)} />
					<DetailField
						label="Guardian Name"
						value={`${GuardianLastName} ${GuardianFirstName} ${GuardianOtherName}`}
					/>
					<DetailField label="Guardian Gender" value={GuardianGender} />
					<DetailField label="Guardian Address" value={GuardianAddress} />
					<DetailField label="Guardian Phone number" value={GuardianPhoneNo} />
					<DetailField label="Guardian Relationship" value={GuardianRelationship} />
					<DetailField label="Guardian Email" value={GuardianEmailAddress || 'None'} />
				</View>
			</ScrollView>
		</View>
	);
};

export default DetailScreen;
