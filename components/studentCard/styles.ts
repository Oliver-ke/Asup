import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';
export default StyleSheet.create({
	card: {
		backgroundColor: '#f4f4f4f4',
		paddingHorizontal: 10,
		paddingVertical: 10,
		flexDirection: 'row',
		//justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		minHeight: 70,
		marginVertical: 4,
		elevation: 2,
	},
	cardImg: {
		width: 60,
		height: 60,
		borderRadius: 60,
		backgroundColor: colors.light.primaryColor,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: colors.light.primaryColor,
		marginRight: 10
	},
	name: {
		fontSize: 15,
		fontWeight: '700',
		color: colors.light.primaryColor
	},
	detail: {
		flex: 2
	},
	class: {
		fontSize: 13,
		color: 'rgba(0,0,0,0.6)'
	},
	property: {
		flex: 1
	},
	nextBtn: {
		textAlign: 'right'
	},
	textProperty: {
		textAlign: 'right',
		fontSize: 10,
		color: 'gray'
	},
	status: {
		fontSize: 12,
		fontWeight: 'bold',
		marginTop: 2
	}
});
