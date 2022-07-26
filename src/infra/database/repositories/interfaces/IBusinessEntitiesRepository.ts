import BusinessEntity from "../../../../domain/business-entity"

export interface IBusinessEntitiesRepository {
  create(data: BusinessEntity): Promise<BusinessEntity>
  findById(id: number): Promise<BusinessEntity | null>
  totalEmissions(id: number): Promise<number>
  getAncestryNames(id: number): Promise<string[]>
  updateEmissions(id: number, emissions: number): Promise<BusinessEntity>
}
