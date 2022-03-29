
import { inject, injectable } from "tsyringe";
import { IAuthorRepo } from "../database/repository.interfaces/author.repo.interface";
import { AuthorDomainModel } from "../domain.types/author/auther.domain.model";
import { AuthorDetailsDto } from "../domain.types/author/author.dto";
import { AuthorSearchFilters, AuthorSearchResults } from "../domain.types/author/author.search";


@injectable()
export class AuthorService {
    constructor(@inject('IAuthorRepo') private _authorRepo: IAuthorRepo) {}
    
    getById = async (authorId: string): Promise<AuthorDetailsDto> => {
        const authorDetailsDto: AuthorDetailsDto = await this._authorRepo.getById(authorId);
        return authorDetailsDto;
    };

    create = async (authorDetails: AuthorDomainModel): Promise<AuthorDetailsDto> => {
        const authorDetailsDto: AuthorDetailsDto = await this._authorRepo.createAuthor(authorDetails);
        return authorDetailsDto;
    };

    search = async (filters: AuthorSearchFilters): Promise<AuthorSearchResults> => {
        const items = [];
        const results = await this._authorRepo.search(filters);
        for await (const dto of results.Items) {
            items.push(dto);
        }
        results.Items = items;
        return results;
    };

    update = async (authorId: string, authorDomainModel: AuthorDomainModel):
    Promise<AuthorDetailsDto> => {
        return await this._authorRepo.update(authorId, authorDomainModel);
    };


    delete = async (authorId: string): Promise<boolean> => {
        return await this._authorRepo.delete(authorId);
    };
}
