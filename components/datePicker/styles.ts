import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%'
    },
    dateText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    label: {
        marginBottom: 7,
        color: 'rgba(45, 34, 84, 0.7)',
        fontFamily: 'lato',
        fontWeight: 'bold',
        fontSize: 17
    },
    picker: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 43,
        alignItems: 'center'
    }
})