import { rest } from 'msw'
import getUserFromDatabase from './userDatabase';

export const handlers = [
// ====================== logowanie 
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session

    const body = JSON.parse(req.body);
    if (!body.login || !body.password) {
      return res(
        ctx.status(400,'empty creditalias provided'),
      );
    }

    const userData = getUserFromDatabase(body.login);
    if (!userData || userData.password !== body.password) {
      return res(
        ctx.status(401,'wrong creditalias provided'),
      );
    }
    const token = Math.random();
    sessionStorage.setItem(userData.login, JSON.stringify(token));   
    
    //const cokkieBody = `login=${userData.login}; Expires= ${(new Date(Date.now()+(24*3600*1000))).toUTCString()};`;
    return res(
      ctx.status(200),
      ctx.json(userData)
    );
  }),

// =================== pobieranie informacji o danym uzytkowniku
  rest.post('/getUserInfo', (req, res, ctx) => {
    const body = JSON.parse(req.body);
    if (!body.login || !body.token) {
      return res(
        ctx.status(400,'empty creditalias provided'),
      );
    }

    const hasSession = sessionStorage.getItem(body.login);
    if (!hasSession || hasSession !== body.token) {
      return res(
        ctx.status(401,'wrong creditalias provided'),
      );
    }
    const userData = getUserFromDatabase(body.login);
    if (!userData) {
      return res(
        ctx.status(401,'wrong creditalias provided'),
      );
    }
    // If authenticated, return a mocked user details
    if (userData) {
      return res(
        ctx.status(200),
        ctx.json( JSON.stringify(userData)),
      )
    } else {
      return res(
        ctx.status(404,'User cannot be found'),
      )
    } 

  }),
  
// ============================= pobieranie translacji
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