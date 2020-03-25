import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: []
})
export class PlanningWorkdayItemComponent implements OnChanges {
  
  @Input('workday') workday ;  
  @Output() workdayRemoved = new EventEmitter<string>();
 
  ngOnChanges(val) {
    const value = val.workday.currentValue;

    if ('Lundi' === value.dueDate) {
      this.workday.dueDate += ' (Aujourd\'hui)';
    }

    if (value.remainingTasks == 0)
      this.workday.remainingTasks = 'Rien à faire aujourd\'hui';

    if (value.doneTasks == 0)
      this.workday.doneTasks = 'Aucune tâche terminée';
  }

  removeWorkday(dueDate: string) {
    this.workdayRemoved.emit(dueDate);
   }

}

