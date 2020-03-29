import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: []
})
export class WorkdayFormTasksComponent implements OnInit {

  @Input() workdayForm: FormGroup;
  @Input() tasks: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  onAddedTask() {
    this.createTaskForm();
  }
  createTaskForm() {
    const taskGroup = this.fb.group(
      {
        'title': ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(150)
        ]],
        'todo': [1,[
          Validators.required,
          Validators.max(5),
          Validators.min(1)
        ]],
        'done': 0
      }
    );
    this.tasks.push(taskGroup);
  }

  onRemovedTask(index) {
    this.tasks.removeAt(index);
  }
}
