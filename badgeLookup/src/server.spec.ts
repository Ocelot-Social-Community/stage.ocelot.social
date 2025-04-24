import { env } from './env'
import { createServer } from './server'

const server = createServer(env)

env.SECRET_REQUEST = 'CORRECT-SECRET'

describe('HTTP Server', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('GET / should return 404', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(404)
  })

  describe('POST to /badges', () => {
    test('without body should return 400', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges',
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ success: false })
    })

    test('with correct body, but wrong secret should return 400', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges',
        body: {
          secret: 'WRONG-SECRET',
          hash: 'aaaaAAAA1111bbbbCCCC00007777FFFFaaaaAAAA1111bbbbCCCC00007777FFFF',
        },
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ success: false })
    })

    test('with correct body, but wrong hash length should return 400', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges',
        body: {
          secret: 'CORRECT-SECRET',
          hash: 'aaaaAAAA1111bbbbCCCC00007777FFFF',
        },
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ success: false })
    })

    test('with correct body should return 200 with badges', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges',
        body: {
          secret: 'CORRECT-SECRET',
          hash: 'aaaaAAAA1111bbbbCCCC00007777FFFFaaaaAAAA1111bbbbCCCC00007777FFFF',
        },
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body)).toEqual({
        success: true,
        badges: ['badge1', 'badge2', 'badge3'],
      })
    })
  })

  describe('POST to /badges/submit', () => {
    test('without body should return 400', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges/submit',
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ success: false })
    })

    test('with correct body, but wrong secret should return 400', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges/submit',
        body: {
          secret: 'WRONG-SECRET',
          hash: 'aaaaAAAA1111bbbbCCCC00007777FFFFaaaaAAAA1111bbbbCCCC00007777FFFF',
          badge: 'badge-test',
        },
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ success: false })
    })

    test('with correct body, but wrong hash length should return 400', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges/submit',
        body: {
          secret: 'CORRECT-SECRET',
          hash: 'aaaaAAAA1111bbbbCCCC00007777FFFF',
          badge: 'badge-test',
        },
      })

      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ success: false })
    })

    test('POST with correct body should return 200 with badges including the newly submitted one', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/badges/submit',
        body: {
          secret: 'CORRECT-SECRET',
          hash: 'aaaaAAAA1111bbbbCCCC00007777FFFFaaaaAAAA1111bbbbCCCC00007777FFFF',
          badge: 'badge-test',
        },
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body)).toEqual({
        success: true,
        badges: ['badge1', 'badge2', 'badge3', 'badge-test'],
      })
    })
  })
})
