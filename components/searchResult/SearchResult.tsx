import React, { FC, ReactElement, useState, useEffect, Fragment } from 'react';
import StudentCard from '../studentCard/StudentCard';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { searchStorage } from '../../util/uploadHandler';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './style';

type searchProps = {
	query: string;
};

const SearchResult: FC<searchProps> = ({ query }): ReactElement => {
	const [ searchResults, setSearchResults ] = useState<any>([]);
	const [ loading, setLoading ] = useState(false);
	useEffect(
		() => {
			(async () => {
				setLoading(true);
				const res = await searchStorage(query);
				setSearchResults(res);
				setLoading(false);
			})();
		},
		[ query ]
	);
	return (
		<View style={styles.container}>
			{searchResults &&
			searchResults.length > 0 && (
				<Fragment>
					<Text style={[ styles.text, styles.textResult ]}>Search Results</Text>
					<FlatList
						data={searchResults || []}
						keyExtractor={(item: any) => item.uploadID}
						renderItem={({ item }) => <StudentCard student={item} />}
						contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1 }}
					/>
				</Fragment>
			)}
			{searchResults.length === 0 &&
			!loading && (
				<View style={styles.textWrapper}>
					<Text style={styles.text}>No Student with the given name</Text>
					<FontAwesome5 name="binoculars" size={24} color="black" />
				</View>
			)}
			{loading && <ActivityIndicator size="large" />}
		</View>
	);
};

export default SearchResult;
