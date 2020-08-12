import React, { FC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SectionList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/Colors';
import StudentCard from '../../components/studentCard/StudentCard';
import students from '../../mockData/students';
import SearchInput from '../../components/searchInput/SearchInput';
import ActionButton from '../../components/actionButton/ActionButton';
import { UploadScreenNavigationProp } from '../../types';
import styles from './styles';

const Data = [
	{ title: 'Awaiting Uploads', type: 'AWAITING', data: students },
	{ title: 'Successful Uploads', type: 'UPLOADED', data: students }
];

type UploadScreenProp = {
	navigation: UploadScreenNavigationProp;
};

const UploadScreen: FC<UploadScreenProp> = ({ navigation }) => {
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


export default UploadScreen;
