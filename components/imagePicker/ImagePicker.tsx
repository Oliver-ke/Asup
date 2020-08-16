import React, { FC, ReactElement, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View } from 'react-native';
import { Image, Button, Avatar } from 'react-native-elements';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {imagePickerProps} from './types';
import styles from './styles';

const CustomImagePicker: FC<imagePickerProps> = ({initialValue, onImageSelected}): ReactElement => {
	const [ image, setImage ] = useState<any>(initialValue || null);
	const getPermissionAsync = async () => {
		if (Constants?.platform?.ios) {
		    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		    if (status !== 'granted') {
		        alert('Sorry, we need camera roll permissions to make this work!');
		    }
		}
	};

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				base64: true,
				allowsEditing: false,
				aspect: [ 4, 3 ],
				quality: 1
			});
			if (!result.cancelled) {
                setImage(result.base64);
                onImageSelected(result.base64);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPermissionAsync();
	}, []);

	return (
		<View style={{ alignItems: 'center', justifyContent: 'center' }}>
			{image ? (
				<Avatar size={170} containerStyle={styles.avaterImg} rounded source={{ uri: 'data:image/jpeg;base64,' + image }} />
			) : (
				<View style={styles.imgContainer}>
					<Image
						resizeMode="contain"
						style={styles.imgStyle}
						source={require('../../assets/images/placeholder.png')}
					/>
				</View>
			)}
			<Button containerStyle={styles.pickBtn} title="Pick an Image" onPress={pickImage} />
		</View>
	);
};

// NOTE: image shows,
// please check the way things are rendered on scrollview

export default CustomImagePicker;
