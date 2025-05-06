import PocketBase from 'pocketbase';
import { serverIP } from './store';
// ! VERY IMPORTANT
// ! make 100% sure that the production version has the right ip address here
// ! the app wont work otherwise
//const pocket = new PocketBase('http://73.173.154.154:8090');
const pocket = new PocketBase(serverIP)
export default pocket;