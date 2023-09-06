import Menu from './models/menu.js';
import User from './models/user.js';


const startOnlineBank = async () => {
    let user = await Menu.authMenu()

    if(user instanceof User && user.isAuth == true) {
        Menu.mainMenu(user)
    }
}

startOnlineBank()