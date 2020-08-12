import {StyleSheet} from 'react-native';
import constants from 'expo-constants';
import colors from '../../constants/Colors';

export default  StyleSheet.create({
	container: {
		flex: 1,
		marginTop: constants.statusBarHeight
	},
	header: {
		padding: 20,
		backgroundColor: colors.light.primaryColor,
		justifyContent: 'center',
		flex: 1
	},
	headerText: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center'
	},
	iconWrapper: {
		backgroundColor: '#F7F7F7',
		justifyContent: 'center',
		flexDirection: 'row',
		marginBottom: 30
	},
	fieldContainer: {
		marginBottom: 5,
		backgroundColor: '#F7F7F7',
		flex: 9,
		justifyContent: 'center',
		paddingHorizontal: 20
	},
	formContainer: {
		backgroundColor: '#fff',
		paddingHorizontal: 15,
		paddingVertical: 25,
		borderRadius: 10
	},
	fieldWrapper: {
		flexDirection: 'row',
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		paddingVertical: 20,
		paddingHorizontal: 10
	},
	text: {
		fontSize: 18,
		fontFamily: 'lato',
		color: 'rgba(0,0,0,0.6)'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
});