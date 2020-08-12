import {StyleSheet} from 'react-native';
import constants from 'expo-constants';
import colors from '../../constants/Colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginTop: constants.statusBarHeight
	},
	header: {
		backgroundColor: colors.light.primaryColor,
		paddingVertical: 10,
		justifyContent: 'center',
		paddingHorizontal: 10,
		alignContent: 'center',
		flexDirection: 'row',
		height: 100,
		borderBottomLeftRadius: 7,
		borderBottomRightRadius: 7
	},
	formInput: {
		justifyContent: 'center',
		paddingHorizontal: 15,
		alignContent: 'center',
		height: '100%',
		backgroundColor: '#F7F7F7'
	}
});
