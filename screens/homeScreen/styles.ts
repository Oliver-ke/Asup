import { StyleSheet } from 'react-native';
import constants from 'expo-constants';
import colors from '../../constants/Colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: constants.statusBarHeight
	},
	header: {
		backgroundColor: colors.light.primaryColor,
		height: 95,
		width: '100%',
		paddingHorizontal: 10,
		justifyContent: 'center'
	},
	welcomeTxt: {
		fontSize: 16,
		color: '#ccc',
		fontWeight: 'normal',
		marginBottom: 10
	},
	welcomeTxtBold: {
		color: colors.light.secondaryColor
	},
	mainTitlWrapper: {
		flexDirection: 'row',
		marginTop: 10,
		paddingVertical: 10
	},
	mainText: {
		fontSize: 20,
		color: 'rgba(0,0,0,0.8)',
		fontFamily: 'lato',
		marginRight: 10,
		marginLeft: 10
	}
});
