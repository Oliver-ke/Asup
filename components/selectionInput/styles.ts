import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		marginVertical: 15,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		color: 'black'
	},
	label: {
		marginBottom: 10,
		color: 'rgba(0,0,0,0.6)',
		fontSize: 16
	},
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16
    },
    iconStyle: {
        top: -10,
        right: 4,
    }
});
