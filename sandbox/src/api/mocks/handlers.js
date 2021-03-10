import { rest } from 'msw'

export const handlers = [
  // logowanie 
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

  // pobieranie informacji o danym uzytkowniku
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

  // pobieranie translacji
  rest.get('/getTranslation/:ns/:lng.json',(req, res, ctx) =>{
    const { ns,lng } = req.params;

    return (
      async () => {
        let file;
        try {
          file = await import(`./translations/${ns}/${lng}.json`);
        } catch (error) {
          return res(
            ctx.status(404,'file not found'),
          )
        }

        return res(
          ctx.status(200),
          ctx.json( file.default),
        )

      }
    )();
      
  })

]