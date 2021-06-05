import express, { Request, Response } from 'express'
import next from 'next'
import handler from './api/hello'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/api/hello', handler)

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server starting on port ${port}`)
    })
  })
  .catch((exception) => {
    console.error(exception.stack)
    process.exit(1)
  })

