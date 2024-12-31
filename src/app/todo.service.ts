// src/app/todo.service.ts
import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  constructor() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
      this.nextId = Math.max(...this.todos.map(t => t.id)) + 1;
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string, description: string): void {
    if (!title.trim()) {
      throw new Error('Title cannot be empty');
    }
    this.todos.push({ id: this.nextId++, title, description, completed: false });
    this.saveToLocalStorage();
  }

  updateTodo(id: number, title: string, description: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = title;
      todo.description = description;
      this.saveToLocalStorage();
    }
  }

  toggleTodoCompleted(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
