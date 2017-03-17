import Privileges from './Privileges'

describe('Privileges middleware', () => {
  const NOT_AUTHORIZED_MESSAGE = 'You are not authorized for this action.'
  const response = {
    status: jest.fn(() => response),
    send:   jest.fn(() => {}),
  }
  const next = jest.fn()
  const session = (privileges, id) => ({ session: { id, privileges } })

  beforeEach(() => {
    response.status.mockClear()
    response.send.mockClear()
    next.mockClear()
  })

  it('evaluates exact-match privileges correctly', () => {
    const privileges = ['read', 'write']
    const required = ['write']

    Privileges(required)(session(privileges, 1), response, next)

    expect(response.status).not.toBeCalled()
    expect(response.send).not.toBeCalled()
    expect(next).toBeCalled()
  })
  it('fails if no match is found', () => {
    const privileges = ['read', 'write']
    const required = ['edit']

    Privileges(required)(session(privileges, 1), response, next)

    expect(response.status).lastCalledWith(401)
    expect(response.send).lastCalledWith(NOT_AUTHORIZED_MESSAGE)
    expect(next).not.toBeCalled()
  })
  it('fails if no session.id is provided', () => {
    const privileges = ['read', 'write']
    const required = ['read']

    Privileges(required)(session(privileges, undefined), response, next)

    expect(response.status).lastCalledWith(401)
    expect(response.send).toBeCalled()
    expect(response.send).not.lastCalledWith(NOT_AUTHORIZED_MESSAGE)
    expect(next).not.toBeCalled()
  })
  it('always succeeds for admins', () => {
    const privileges = ['admin']
    const required = ['read', 'write']

    Privileges(required)(session(privileges, 1), response, next)

    expect(response.status).not.toBeCalled()
    expect(response.send).not.toBeCalled()
    expect(next).toBeCalled()
  })
})
