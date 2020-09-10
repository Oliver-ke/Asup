import React, { useContext, useEffect, useState, FC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import colors from '../../constants/Colors';
import { getUploadStatistics } from '../../util/uploadHandler';
import { AuthContext } from '../../context/AuthContext';
import HomeNavButton from '../../components/HomeNavBtn/HomeNavButton';
import SearchInput from '../../components/searchInput/SearchInput';
import SearchResult from '../../components/searchResult/SearchResult';
import StatisticsContainer from '../../components/statisticView/StatisticsContainer';
import { HomeScreenProps, statistics } from './types';
import styles from './styles';

const HomeScreen: FC<HomeScreenProps> = ({ navigateParent }) => {
	const { state: { schoolCode } } = useContext(AuthContext);
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ loading, setLoading ] = useState(true);
	const [ statistics, setStatistics ] = useState<statistics | null>(null);
	const navigation = useNavigation();
	useEffect(() => {
		const clearListener = navigation.addListener('focus', async () => {
			const statisticsPayload: any = await getUploadStatistics();
			setStatistics(statisticsPayload);
			setLoading(false);
		})
		return clearListener;
	}, [navigation]);
	
	useEffect(() => {
		(async () => {
			const statisticsPayload: any = await getUploadStatistics();
			setStatistics(statisticsPayload);
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<View style={styles.spinner}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={colors.light.primaryColor} style="inverted" />
			<View style={styles.header}>
				<Text h4Style={styles.welcomeTxt} h4>
					Welcome, School <Text style={styles.welcomeTxtBold}>{schoolCode}</Text>
				</Text>
				<SearchInput onSubmit={(txt) => setSearchQuery(txt)} />
			</View>
			{searchQuery && searchQuery !== '' ? (
				<SearchResult query={searchQuery} />
			) : (
				<View style={{ flex: 1 }}>
					<View style={styles.navBtnWrapper}>
						<HomeNavButton
							color="#6B2A6D"
							icon={{ name: 'md-person-add', type: 'ionicon', color: '#fff' }}
							text="Register Student"
							clickHandler={() => navigateParent('Uploads', 'AddStudent')}
						/>
						<HomeNavButton
							color="#0068A2"
							text="Student Uploads"
							icon={{ name: 'upload', type: 'antdesign', color: '#fff' }}
							clickHandler={() => navigateParent('Uploads', 'Uploads')}
						/>
					</View>
					<View style={styles.lineWrapper}>
						<View style={styles.line} />
						<View style={styles.dot} />
						<View style={styles.line} />
					</View>
					<View>
						{statistics && (
							<StatisticsContainer
								totalUploads={statistics.totalUploads}
								awaitingUploads={statistics.awaitingUploads}
								completedUploads={statistics.completedUploads}
							/>
						)}
					</View>
				</View>
			)}
		</View>
	);
};

export default HomeScreen;
