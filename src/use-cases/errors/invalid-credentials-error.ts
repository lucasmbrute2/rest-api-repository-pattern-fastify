// Evitar usar errors diferentes no processo de autenticação
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
  }
}
