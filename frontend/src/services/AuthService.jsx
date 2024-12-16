import connection from "../api/ApiConnection";

export class AuthService {
    async getLogin(data) {
        return await connection.post( 'login', data ).then( res => res.data ); 
    }

    async getLogout() {
        return await connection.post( 'logout' ).then( res => res.data );
    }

    async getCsrf() {
        return await connection.get('/sanctum/csrf-cookie').then( res => res.data );
    }
    
}