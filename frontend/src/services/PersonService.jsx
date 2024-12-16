import connection from "../api/ApiConnection";

export class PersonService {
    async getList () {
        return await connection.get('/persons').then( res => res.data );
    }

    async saveData(data) {
        return await connection.post('/persons', data).then(res => res.data);
    }

    async updateData(data, id) {
        return await connection.put('/persons/' + id, data).then(res => res.data);
    }

    async deleteData(data) {
        return await connection.delete('/persons/' + data).then(res => res.data);
    }
}