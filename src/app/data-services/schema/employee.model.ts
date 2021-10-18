import {RoleModel} from './role.model';
export class EmployeeModel {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public birthDate: string;
  public phone: string;
  public role: RoleModel = new RoleModel();

  public constructor(
    data?: EmployeeModel
  ) {
    const employee = data == null ? this : data;

    this.id = employee.id;
    this.name = employee.name;
    this.email = employee.email;
    this.password = employee.password;
    this.birthDate = employee.birthDate;
    this.phone = employee.phone;
    this.role = new RoleModel(employee.role);
  }
}
