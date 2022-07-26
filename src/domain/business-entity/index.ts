import { InvalidParamError } from "../../infra/http/errors"

interface ICreateBusinessEntity {
  name: string
  emissions: number | null
  parentPath?: number[] | null
}

interface IValidateFields {
  error: string | null
}

export default class BusinessEntity {
  public id?: number
  public name: string
  public path: number[]
  public emissions: number | null

  constructor({ name, path, emissions }: BusinessEntity) {
    this.name = name
    this.path = path
    this.emissions = emissions
  }

  static create(props: ICreateBusinessEntity) {
    const { name, emissions, parentPath } = props

    const { error } = this.validateField(props)

    if (error) {
      throw new InvalidParamError(error)
    }

    const path = parentPath || []
    
    return new BusinessEntity({ name, path, emissions })
  }

  static validateField({ name, emissions }: ICreateBusinessEntity): IValidateFields {
    let error = null

    if (!name) {
      error = 'The porperty name is missing.'
    }

    if (emissions && emissions < 0) {
      error = 'The porperty emissions should not be lower than 0.'
    }

    return { error }
  }
}
