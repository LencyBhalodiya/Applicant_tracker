import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent {
  name: string = 'rahil';
  display = 'none';

  users: { name: string; email: string; status: string }[] = [
    { name: 'Rahil Acharya', email: 'abc@gmail.com', status: 'Active' },
    { name: 'rahil1', email: 'abcdefd@gmail.com', status: 'Inactive' },
    {
      name: 'dd',
      email: 'abcxyz@gmail.com',
      status: 'Active',
    },
    { name: 'Rahil12', email: 'abcxyz@gmail.com', status: 'Active' },
    { name: 'Rahil1277', email: 'abcxyz@gmail.com', status: 'Active' },
    { name: 'Rahil1277', email: 'abcxyz@gmail.com', status: 'Inactive' },
    { name: 'Rahil1277', email: 'abcxyz@gmail.com', status: 'Active' },
    { name: 'Rahil1277', email: 'abcxyz@gmail.com', status: 'Inactive' },
    { name: 'Rahil1277', email: 'abcxyz@gmail.com', status: 'Active' },
  ];

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  onAddUser() {
    this.display = 'block';
  }
}
