import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma', // nome no enviroment
  async setup() {
    console.log('Setup')

    return {
      async teardown() {},
    }
  },
}
