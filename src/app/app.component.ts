import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todoList: TodoItem[] = [];

  newTask: string = '';

  // Tracking id
  editingTaskId: number | null = null;
  editingTaskValue: string = '';

  // Add task function
  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false,
      };

      this.todoList.push(newTodoItem);
      this.newTask = '';
    }
  }

  // Complete task
  toggleCompleted(index: number): void {
    console.log(index);

    this.todoList[index].completed = !this.todoList[index].completed;
    console.log(this.todoList);
  }

  // Delete task
  deleteTask(id: number): void {
    this.todoList = this.todoList.filter((item) => item.id !== id);
    console.log(this.todoList);
  }

  // Edit task
  editTask(id: number): void {
    const taskToEdit = this.todoList.find((item) => item.id === id);
    if (taskToEdit) {
      this.editingTaskId = id;
      this.editingTaskValue = taskToEdit.task;
    }
  }

  // Save edited task
  saveTask(id: number): void {
    const taskToEdit = this.todoList.find((item) => item.id === id);
    if (taskToEdit) {
      taskToEdit.task = this.editingTaskValue;
      this.editingTaskId = null;
      this.editingTaskValue = ''
    }
  }

  // Cancel editing
  cancelEdit(): void{
    this.editingTaskId = null
    this.editingTaskValue = ''
  }
}
