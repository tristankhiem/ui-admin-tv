import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseSearchModel} from '../../data-services/search/base-search.model';
import {EmployeeModel} from '../../data-services/schema/employee.model';
import {AppAlert, AppLoading, AppModals} from '../../utils';
import {ResponseModel} from '../../data-services/response.model';
import {HTTP_CODE_CONSTANT} from '../../constants/http-code.constant';
import {EmployeeService} from '../../services/store/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  constructor(
    private root: ElementRef,
    private employeeService: EmployeeService,
    private loading: AppLoading,
    private alert: AppAlert,
    private modal: AppModals
  ){}

  @ViewChild('dataTableEmployee', {read: ElementRef}) dataTableEmployee: ElementRef;

  public search: EmployeeModel[] = [];

  ngOnInit(): void {
    this.getEmployees();
  }

  public onChangeDataEvent(search?: EmployeeModel[]): void {
    window.location.reload();
    if (search) {
      this.search = search;
    }

    this.getEmployees(this.dataTableEmployee.nativeElement);
  }

  public openDeleteModal(employee: EmployeeModel, event: Event): void {
    event.preventDefault();
    this.modal.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${employee.name}?`, 'Xóa tài khoản thành viên', true)
      .subscribe(res => this.confirmDeleteEmployee(res, employee));
  }

  private getEmployees(targetLoading?: ElementRef): void {
    this.loading.show(targetLoading);
    this.employeeService.findAll().subscribe( res =>  this.getEmployeesCompleted(res, targetLoading));
  }

  private getEmployeesCompleted(res: EmployeeModel[], targetLoading: ElementRef): void {
    this.loading.hide(targetLoading);
    this.search = res;
  }

  private confirmDeleteEmployee(state: boolean, employee: EmployeeModel): void {
    if (!state) {
      return;
    }

    this.loading.show();
    this.employeeService.deleteEmployee(employee.id).subscribe(res => this.deleteEmployeeCompleted(res));
  }

  private deleteEmployeeCompleted(res: any): void {
    this.loading.hide();
    this.onChangeDataEvent();
  }

}
