// src/app/todo-form/todo-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  @Input() todo: Todo | null = null;
  @Output() save = new EventEmitter<{ title: string; description: string }>();
  title = '';
  description = '';

  ngOnChanges(): void {
    if (this.todo) {
      this.title = this.todo.title;
      this.description = this.todo.description;
    }
  }

  onSave(): void {
    if (!this.title.trim()) {
      alert('Title cannot be empty');
      return;
    }
    this.save.emit({ title: this.title, description: this.description });
    this.title = '';
    this.description = '';
  }
}
