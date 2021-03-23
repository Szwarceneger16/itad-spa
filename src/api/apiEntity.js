

const api = {
    async login(login,password,rememberMe = false) {
        const body = {
            login: login,
            password: password,
            remember: rememberMe
        }

        return await fetch('/login', {
            method: 'POST',
            credentials: 'include',
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