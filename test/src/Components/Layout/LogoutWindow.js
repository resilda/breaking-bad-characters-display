import React, { useContext } from 'react';
import firebase from '../../Config/Firebase';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthService';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../style.css'

const useStyles = makeStyles(() => ({
    buttonWrapper: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: '25px'
    },
	buttonLogOut: {
		width: '120px',
		height: '33px',
        border: 0,
		background: 'linear-gradient(45deg, #5C888B 20%, #71A8A1 80%)',
		borderRadius: 3,
		boxShadow: '0 2px 3px 2px #8ABAAC',
		color: 'white',
		fontSize: '13px',
        marginRight: '25px',
        cursor: 'pointer', 
	}, 
    buttonCancel: {
        width: '100px',
		height: '33px',
		color: 'black',
		fontSize: '15px', 
		fontWeight: 'bold',
        marginRight: '5px',
        cursor: 'pointer',
    },
    closeIcon: {
        content: 'x',
        cursor: 'pointer',
        position: 'fixed',
        right: 'calc(26% - 50px)',
        top: 'calc(120vh - 85vh - 33px)',
        background: '#F0F0F0',
        width: '25px',
        height: '25px',
        borderRadius: 3,
        lineHeight: '20px',
        textAlign: 'center',
        border: '1px solid #999',
        fontSize: '20px',
    }
}));

function LogoutWindow() {

    const history = useHistory();	
	const context = useContext(AuthContext);

    function handleLogOut() {
		firebase.auth().signOut().then(() => {
			context.logOut();
			history.push('/login');
		});
	}

    function cancelLogOut() {
        history.push('/main')
    }

	const classes = useStyles();

    return (
        <div className="popup-box">
            <section className="box">
                <section className="popup-warning">
                    <p>
                        Are you sure you want to log out from Movie Box Edition?
                    </p>
                    <p>
                        You will have to log in again to be part of the comments and details section.
                    </p>
                </section>
                <Button className={classes.closeIcon}>x</Button>
                <section className={classes.buttonWrapper}>
                    <Button className={classes.buttonCancel} onClick={cancelLogOut}>
                        No
                    </Button>
                    <Button className={classes.buttonLogOut} onClick={handleLogOut}>
                        Yes, I'm sure
                    </Button>
                </section>
            </section>
        </div>
    )
}

export default LogoutWindow;