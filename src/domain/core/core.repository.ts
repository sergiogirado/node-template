
export interface IReadRepository<T extends { id?: string }> {
  get(): Promise<T[]>;
  getByQuery(settings: IQuerySettings, where?: T): Promise<IQueryResult<T>>;
  getById(id: string): Promise<T>;
}

export interface IWriteRepository<T> {
  create(data: T): Promise<T>;
  update(data: T): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IQuerySettings {
  skip?: number;
  take?: number;
  filterText?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface IQueryResult<T> {
  totalLength: number;
  filteredLength: number;
  items: T[];
}
