import { getCookie, getCsrfOfDjango, getJwtToken } from './components/Helper';

const csrftoken = getCsrfOfDjango();

const fetchLogin = async e => {

    const target = e.target;
  
    const postData = {
      "username": target.username.value,
      "password": target.password.value,
    }

    const data = await getJwtToken(postData);
}

const Login = () => {
    return (
        <div>
          
        </div>
    )
}