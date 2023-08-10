
import { User } from "@src/domain/User";
import { UserProps } from "@src/domain/User/user-props";

class Collection<
  T extends {
    id: string;
    updateProp: (props: Partial<Props>) => T;
    getProps: () => Props;
  },
  Props
> {
  private data: T[] = [];
  // eslint-disable-next-line no-unused-vars
  //private updateFn: <U>(item: T, PropsToUpdate: Partial<U>) => T;

  // eslint-disable-next-line no-unused-vars
  constructor() {}

  insert(entity: T): T {
		// User.create(entity.getProps())
    this.data.push(entity);
    return entity as T;
  }


  findAll() {
    return this.data;
  }
}

export class InMemoryDatabase {
  users: Collection<User, UserProps> = new Collection();
}
