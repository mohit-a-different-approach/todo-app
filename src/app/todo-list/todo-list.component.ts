// src/app/todo-list/todo-list.component.ts
import { Component } from '@angular/core';
import { TodoService, Todo } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  preserveWhitespaces: true
})
export class TodoListComponent {
  todos: Todo[] = [];
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }

  addOrUpdate(todoData: { title: string; description: string }): void {
    if (this.editingTodo) {
      this.todoService.updateTodo(this.editingTodo.id, todoData.title, todoData.description);
      this.editingTodo = null;
    } else {
      this.todoService.addTodo(todoData.title, todoData.description);
    }
    this.todos = this.todoService.getTodos();
  }

  edit(todo: Todo): void {
    this.editingTodo = todo;
  }

  toggleCompleted(todo: Todo): void {
    this.todoService.toggleTodoCompleted(todo.id);
    this.todos = this.todoService.getTodos();
  }

  delete(todo: Todo): void {
    this.todoService.deleteTodo(todo.id);
    this.todos = this.todoService.getTodos();
  }
}
