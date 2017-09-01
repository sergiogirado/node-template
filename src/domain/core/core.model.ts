export interface IDomainException<T> {
  message: string;
  details?: T;
}
export class DomainException implements IDomainException<any> {
  message: string;
  details: string;
}