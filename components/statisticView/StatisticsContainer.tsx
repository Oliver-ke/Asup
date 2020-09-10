import React, { FC, ReactElement } from 'react';
import styles from './styles';
import { View, Text } from 'react-native';
import StatCard from '../statCard/StatCard';
import {statisticProps} from './types';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const cardColors2 = {
	background: '#D55672',
	iconBackground: '#B42D4A',
	titleColor: '#F3CED6',
	valueColor: '#f9f9f9f9  | #fff',
	iconColor: '#33C5FF'
};

const cardColors1 = {
	background: '#0075A2',
	iconBackground: '#0084B8',
	titleColor: '#ADF5FF',
	valueColor: '#f9f9f9f9 | #fff',
	iconColor: '#E79CAD'
};

const cardColors3 = {
	background: '#6A994E',
	iconBackground: '#7AAC5D',
	valueColor: '#fff',
	titleColor: '#D3E3C9',
	iconColor: '#D3E3C9'
};

const StatisticsContainer: FC<statisticProps> = ({awaitingUploads, totalUploads, completedUploads}): ReactElement => {
	return (
		<View style={styles.container}>
			<StatCard
				iconContainerColor="#0084B8"
				icon={<FontAwesome name="cloud" size={30} color="#33C5FF" />}
				value={totalUploads}
				title="Total Uploads"
				titleColor="#ADF5FF"
				cardBackground="#0075A2"
			/>
            <StatCard
				iconContainerColor="#7AAC5D"
				icon={<Ionicons name="md-cloud-done" size={30} color="#D3E3C9" />}
				value={completedUploads}
				title="Successful Uploads"
				titleColor="#D3E3C9"
				cardBackground="#6A994E"
			/>
             
            <StatCard
				iconContainerColor="#B42D4A"
				icon={<MaterialCommunityIcons name="cloud-alert" size={30} color="#E79CAD" />}
				value={awaitingUploads}
				title="Awaiting Uploads"
				titleColor="#F3CED6"
				cardBackground="#D55672"
			/>
		</View>
	);
};
export default StatisticsContainer;
