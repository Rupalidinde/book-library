import { ApiError } from 'common/api.error';
import { Logger } from 'common/logger';
import { IRolePrivilegeRepo } from 'database/repository.interfaces/role.privilege.repo.interface';
import { RolePrivilegeDto } from 'domain.types/role/role.privilege.dto';
import { Op } from 'sequelize';
import RolePrivilege from '../models/role.privilege.model';

export class RolePrivilegeRepo implements IRolePrivilegeRepo {

    getByRoleAndPrivilage = async (roleid: string, privilege: string): Promise<RolePrivilegeDto> => {
        try {
            
            const rolePrivilege = await RolePrivilege.findOne({
                where:{  
                    RoleId: roleid,
                    Privilege: privilege,
                }
            });

            if (rolePrivilege === null){
                return null;
            }

            const dto: RolePrivilegeDto = {
                id: rolePrivilege.id,
                RoleId: rolePrivilege.RoleId,
                Privilege: rolePrivilege.Privilege,
            };
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    create = async (object: any): Promise<RolePrivilegeDto> => {
        try {
            const entity = {
                RoleId: object.RoleId,
                Privilege: object.Privilege,
            };
            const rolePrivilege = await RolePrivilege.create(entity);
            const dto: RolePrivilegeDto = {
                id: rolePrivilege.id,
                RoleId: rolePrivilege.RoleId,
                Privilege: rolePrivilege.Privilege,
            };
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<RolePrivilegeDto> => {
        try {
            const rolePrivilege = await RolePrivilege.findByPk(id);
            const dto: RolePrivilegeDto = {
                id: rolePrivilege.id,
                RoleId: rolePrivilege.RoleId,
                Privilege: rolePrivilege.Privilege,
            };
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (): Promise<RolePrivilegeDto[]> => {
        try {
            const rolePrivileges = await RolePrivilege.findAll();
            const dtos: RolePrivilegeDto[] = [];
            for (let i = 0; i < rolePrivileges.length; i++) {
                const rp = rolePrivileges[i];
                const dto: RolePrivilegeDto = {
                    id: rp.id,
                    RoleId: rp.RoleId,
                    Privilege: rp.Privilege,
                };
                dtos.push(dto);
            }
            return dtos;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getPrivilegesForRole = async (roleId: string): Promise<RolePrivilegeDto[]> => {
        try {
            const rolePrivileges = await RolePrivilege.findAll({
                where: {
                    RoleId: roleId,
                },
            });
            const dtos: RolePrivilegeDto[] = [];
            for (let i = 0; i < rolePrivileges.length; i++) {
                const rp = rolePrivileges[i];
                const dto: RolePrivilegeDto = {
                    id: rp.id,
                    RoleId: rp.RoleId,
                    Privilege: rp.Privilege,
                };
                dtos.push(dto);
            }
            return dtos;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    hasPrivilegeForRole = async (roleId: string, privilege: string): Promise<boolean> => {
        try {
            const rolePrivileges = await RolePrivilege.findAll({
                where: {
                    RoleId: roleId,
                    Privilege: { [Op.like]: '%' + privilege + '%' },
                },
            });
            return rolePrivileges.length > 0;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            await RolePrivilege.destroy({ where: { id: id } });
            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };
}
