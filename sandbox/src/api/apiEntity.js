

const api = {
    async login(login,password) {
        const body = {
            login: login,
            password: password
        }

        return await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(body),
          })
          .then((res) => { 
                if ( !res.ok ) throw res;
                
                return res.json() ;
            })
    },

    me() {
        return fetch('/me', {
            method: 'GET',
          })
            .then((res) => res.json());
    },
}

export default api;