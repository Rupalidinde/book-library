import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserService {
    create = async (userDetails: UserDomainModel) => {
        const servicceResponse = {
            name: 'rupali dinde',
            designation: 'software dev',
        };

        return servicceResponse;
    };
}
