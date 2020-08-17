import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	modalContent: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		backgroundColor: '#f4f4f4',
		borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerText: {
        fontSize: 19,
        fontWeight: 'normal'
    },
    extraText: {
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: "center",
        color: 'rgba(0,0,0,0.6)',
        marginTop: 10
    },
	controllers: {
		flexDirection: 'row',
		marginTop: 30,
		justifyContent: 'space-around',
		width: '100%'
	},
	loadingTxt: {
		marginTop: 10
	}
});
