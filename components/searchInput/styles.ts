import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        width: '100%',
        height: 42,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#392D60'
    },
    input: {
        height: '100%',
        width: '100%',
        marginLeft: 15,
        fontSize: 16,
        color: '#fff'
    }
})


// border on focus: #7F6FA9