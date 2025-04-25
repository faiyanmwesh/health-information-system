// src/app/programs/program-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program.model';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css'],
})
export class ProgramListComponent {
  programs: Program[] = [];
  paged: Program[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  // Modal state & form models
  showAdd = false;
  showView = false;
  showEdit = false;
  showDelete = false;

  formModel: Partial<Program> = {};
  selected?: Program;

  constructor(private svc: ProgramService) {
    this.load();
  }

  private load() {
    this.programs = this.svc.getAll().sort((a,b)=>b.id - a.id);
    this.totalPages = Math.ceil(this.programs.length / this.pageSize) || 1;
    this.setPage(this.currentPage);
  }

  private setPage(page: number) {
    this.currentPage = Math.min(Math.max(1, page), this.totalPages);
    const start = (this.currentPage - 1) * this.pageSize;
    this.paged = this.programs.slice(start, start + this.pageSize);
  }

  // Pagination click
  go(page: number) {
    this.setPage(page);
  }

  // Add
  openAdd() {
    this.formModel = {};
    this.showAdd = true;
  }
  add() {
    if (this.formModel.name) {
      this.svc.add({ name: this.formModel.name, description: this.formModel.description || '' });
      this.closeAll(); this.load();
    }
  }

  // View
  openView(p: Program) {
    this.selected = p; this.showView = true;
  }

  // Edit
  openEdit(p: Program) {
    this.selected = { ...p };
    this.formModel = { ...p };
    this.showEdit = true;
  }
  saveEdit() {
    if (this.selected && this.formModel.name) {
      const upd: Program = {
        id: this.selected.id,
        createdAt: this.selected.createdAt,
        name: this.formModel.name!,
        description: this.formModel.description || ''
      };
      this.svc.update(upd);
      this.closeAll(); this.load();
    }
  }

  // Delete
  openDelete(p: Program) {
    this.selected = p; this.showDelete = true;
  }
  confirmDelete() {
    if (this.selected) {
      this.svc.delete(this.selected.id);
      this.closeAll(); this.load();
    }
  }

  closeAll() {
    this.showAdd = this.showView = this.showEdit = this.showDelete = false;
    this.selected = undefined;
  }
}
