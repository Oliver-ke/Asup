import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    statisticsCard: {
        width: '100%',
        height: 100,
        backgroundColor: '#6A994E',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        elevation: 4,
        marginBottom: 10
    },
    iconWrapper: {
        width: '30%',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
        padding: 10
    },
    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#7AAC5D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 10,
    },
    title:{
        color: '#D3E3C9',
        fontSize: 18,
        marginBottom: 5
    },
    value: {
        fontSize: 30,
        fontWeight: '500',
        color: '#fff'
    }
})