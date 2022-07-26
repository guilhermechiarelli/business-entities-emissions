import { Client } from "pg"
import BusinessEntity from "../../../../domain/business-entity"
import { Postgres } from "../../postgres/connection"
import { IBusinessEntitiesRepository } from '../interfaces/IBusinessEntitiesRepository'

class BusinessEntitiesRepository implements IBusinessEntitiesRepository {
  private client: Client

  constructor() {
    this.client = Postgres.client
  }

  async totalEmissions(id: number): Promise<number> {
    const query = 'SELECT SUM(emissions) FROM business_entities WHERE $1=ANY(path)'
    const values = [id]

    const { rows } = await this.client.query(query, values)

    return Number(rows[0].sum)
  }

  async getAncestryNames(id: number): Promise<string[]> {
    const { rows: rows1 } = await this.client.query(
      'SELECT path FROM business_entities WHERE id = $1', 
      [id]
    )

    const ancestryIds = rows1[0].path

    const { rows } = await this.client.query(
      'SELECT name FROM business_entities WHERE id = ANY ($1)', 
      [ancestryIds]
    )

    return rows.map((el: any) => el.name)
  }

  async create({ name, path, emissions }: BusinessEntity): Promise<BusinessEntity> {
    const { rows } = await this.client.query(
      `INSERT INTO business_entities (name, path, emissions) VALUES ($1, $2, $3) RETURNING id`,
      [name, path, emissions]
    )

    await this.client.query(
      'UPDATE business_entities SET path = array_append(path, $1) WHERE ID = $1',
      [rows[0].id]
    )

    return rows[0]
  }

  async findById(id: number): Promise<BusinessEntity | null> {
    const { rows } = await this.client.query(
      'SELECT * FROM business_entities WHERE id = $1', 
      [id]
    )

    return rows[0]
  }

  async updateEmissions(id: number, emissions: number): Promise<BusinessEntity> {
    const { rows } = await this.client.query(
      'UPDATE business_entities SET emissions = $1 WHERE id = $2 RETURNING id',
      [emissions, id]
    ) 

    return rows[0]
  }
}

export { BusinessEntitiesRepository }
