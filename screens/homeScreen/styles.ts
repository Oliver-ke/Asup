import { StyleSheet } from 'react-native';
import constants from 'expo-constants';
import colors from '../../constants/Colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: constants.statusBarHeight
	},
	spinner: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	navBtnWrapper: {
		paddingHorizontal: 10,
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	mainText: {
		fontSize: 20,
		color: 'rgba(0,0,0,0.8)',
		fontFamily: 'lato',
		marginRight: 10,
		marginLeft: 10
	},
	emptyMssg: {
		width: '100%',
		alignItems: 'center',
		marginTop: '50%'
	},
	emptyText: {
		fontSize: 20,
		marginBottom: 10
	}
});
