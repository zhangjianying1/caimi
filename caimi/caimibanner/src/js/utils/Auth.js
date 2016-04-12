import superagent from 'superagent';
import {search} from './location';

class Auth{
    setUserCode(){
        let userCode = search(location.href);
        localStorage.setItem('userCode', userCode.userCode);
    }
    getUserCode(){
        return localStorage.getItem('userCode');

    }
}
export default new Auth();