import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		alignItems: 'flex-start',
		marginTop: 20
    },
    deleteWrapper: {
        marginBottom: -30,
        width: '100%',
        paddingRight: 8,
        alignItems: 'flex-end'
    },
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: colors.light.primaryColor,
		overflow: 'hidden',
		borderWidth: 1.5,
		borderColor: '#c4c4c4',
		alignSelf: 'center',
		marginBottom: 10
	},
	progileNameContainer: {
		width: '100%',
		paddingHorizontal: 10,
		alignItems: 'center',
		marginBottom: 10
	},
	scrollContainer: {
		paddingHorizontal: 10,
        minHeight: '100%',
	},
	footer: {
		height: '90%',
		backgroundColor: '#E6E7E9',
		paddingHorizontal: 10
	}
});
