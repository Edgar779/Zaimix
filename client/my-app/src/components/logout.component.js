import { useHistory } from "react-router";

export default function Logout() {

    const history = useHistory();

    localStorage.removeItem('AuthToken');

    history.push({
        pathname: "/"
    })

    return null;
    
}