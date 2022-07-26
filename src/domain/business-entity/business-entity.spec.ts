import { InvalidParamError } from '../../infra/http/errors'
import BusinessEntity from './index'

describe('Business entity domain', () => {
  it('should create a new business entity without a parent path', async () => {
    const businessEntity = {
      name: 'fake',
      emissions: 100
    }

    const result = BusinessEntity.create(businessEntity)

    expect(result.name).toBe(businessEntity.name)
    expect(result.emissions).toBe(businessEntity.emissions)
    expect(result.path.length).toBe(0)
  })

  it('should create a new business entity with a parent path', async () => {
    const businessEntity = {
      name: 'fake',
      emissions: 100,
      parentPath: [1, 2]
    }

    const result = BusinessEntity.create(businessEntity)

    expect(result.name).toBe(businessEntity.name)
    expect(result.emissions).toBe(businessEntity.emissions)
    expect(result.path.length).toBe(2)
  })

  it('should not create a business entity if the name is not provided', async () => {
    const businessEntity = {
      name: '',
      emissions: 100
    }

    try {
      BusinessEntity.create(businessEntity)
    } catch (error: any) {
      expect(error.message).toBe('The porperty name is missing.')
    }
  })

  it('should not create a business entity if the emissions is lower than 0', async () => {
    const businessEntity = {
      name: 'fake',
      emissions: -100
    }

    try {
      BusinessEntity.create(businessEntity)
    } catch (error: any) {
      expect(error.message).toBe('The porperty emissions should not be lower than 0.')
    }
  })
})