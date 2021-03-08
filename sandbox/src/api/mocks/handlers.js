import { rest } from 'msw'

export const handlers = [
    // Handles a POST /login request
    rest.post('/login', (req, res, ctx) => {
        // Persist user's authentication in the session
        const body = JSON.parse(req.body);

        if (body.login !== 'piotr') {
          return res(
            ctx.status(403,'wrong login provided'),
          );
        }

        const newObj = {
          login: body.login,
          token: Math.random().toString(),
          count: 0
        }
        let gathered = sessionStorage.getItem('authenticatedUser');
        if ( !gathered ) {
          sessionStorage.setItem('authenticatedUser', JSON.stringify(newObj));   
        } else {
          gathered = JSON.parse(gathered);
          newObj.count = ++gathered.count;
          sessionStorage.setItem('authenticatedUser', JSON.stringify(newObj));   
        }
        
        return res(
          ctx.status(200),
          ctx.json(newObj)
        );
      }),
  
    // Handles a GET /user request
    rest.get('/user', (req, res, ctx) => {
        const token = req.url.searchParams.get('token');
        console.log(token);
        const isAuthenticated = JSON.parse(sessionStorage.getItem('authenticatedUser'));
        console.log(isAuthenticated);
    
        if (!token || !isAuthenticated || token !== isAuthenticated.token) {
    
          return res(
            ctx.status(403,'Not authorized'),
          )
        }
    
        // If authenticated, return a mocked user details
        return res(
          ctx.status(200),
          ctx.json( JSON.stringify(isAuthenticated)),
        )
      }),
  
  ]