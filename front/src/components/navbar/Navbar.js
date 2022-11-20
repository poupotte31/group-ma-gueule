import './navbar.scss';
import Logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Person2Icon from '@mui/icons-material/Person2';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

	
export default function Navbar() {

	const {currentUser} = useContext(AuthContext);

    const profilePicture = "http://localhost:8080/images/" + currentUser.imageProfile.split('/images/')[1];

    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleLogout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

    const navigate = useNavigate();

    const homePage = () => {
        setToggle(false);
    };

    const profilePage = () => {
        setToggle(!toggle);
    };

    const handleDelete = () => {
    };

	return (
        <header>
            <nav className='navbar'>
                <div className='navbar_left'>
                    <h1>
                        <Link role={'link'} to={`/`}><img onClick={homePage} src={Logo} alt="Groupomania - réseau social"/></Link>  
                    </h1>
                    <input aria-label='search bar' type="text" id='search' placeholder='Rechercher...'/>
                </div>
                <div className="navbar_user">
                    <button type='button' onClick={handleToggle}>
                        <img aria-haspopup='menu' src={profilePicture} alt="avatar de l'utilisateur" />
                    </button>
                    <ul className={toggle ? 'menu_table visible' : 'menu_table'}>
                        <li >
                            <Link role={'link'} onClick={profilePage} className="menu_table_item" to={`/profile/${currentUser.userId}`}><Person2Icon/>Profil</Link>
                        </li>
                        <li>
                            <Link role={'link'} onClick={handleLogout} className="menu_table_item"><ExitToAppIcon/> Se déconnecter</Link>    
                        </li>
                        <li>
                            <Link onClick={handleDelete} className="menu_table_item"><DeleteForeverIcon/>Supprimer mon compte</Link>
                        </li>
                    </ul>
                    <span>{currentUser.lastname} {currentUser.firstname}</span>	
                </div>
            </nav>
        </header>
	)
};
