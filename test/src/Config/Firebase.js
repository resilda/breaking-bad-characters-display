import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyA8FW4GHHpxXjPEUTASFLUOnHZSvwCZE1o',
	authDomain: 'movie-box-4a7ce.firebaseapp.com',
	projectId: 'movie-box-4a7ce',
	storageBucket: 'movie-box-4a7ce.appspot.com',
	messagingSenderId: '850952764763',
	appId: '1:850952764763:web:ac2b3d471d85792145ae7e'
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
