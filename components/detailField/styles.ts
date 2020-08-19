import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';

export default StyleSheet.create({
	field: {
		width: '100%',
		justifyContent: 'center',
		paddingHorizontal: 10,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 5,
        borderWidth: 1,
		borderBottomWidth: 0.8,
		marginVertical: 3,
		alignItems: 'flex-start',
		fontFamily: 'Montserrat',
        paddingVertical: 7,
        backgroundColor: '#fff'
	},
	fieldText: {
		fontSize: 14,
		color: colors.light.primaryColor,
		opacity: 0.7
	},
	fieldValueText: {
		marginTop: 2,
		color: '#484848',
		opacity: 1,
		fontSize: 16,
		fontWeight: '600'
	}
});
