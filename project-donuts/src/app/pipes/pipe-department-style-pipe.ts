import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeDepartmentStyle',
  standalone:true
})
export class PipeDepartmentStylePipe implements PipeTransform {

  transform(category: number): string {
    switch (category) {
      case 1: return 'deeppink';   // לדונאטס גדולים
      case 2: return 'orange';     //מארזים
      case 3: return 'purple';     // לוופלים
      case 4: return 'red'; 
      case 5: return 'brown';        // לפנקייקס
     case 6: return 'lightgreen'; // לסופגניות
      default: return 'gray';
    }
  }
}


