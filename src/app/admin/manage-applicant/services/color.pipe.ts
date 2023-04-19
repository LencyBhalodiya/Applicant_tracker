import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {
  transform(value: string, ...args: any[]): unknown {
    switch (value.toLowerCase()) {
      case "pending":
        args[0].style.color = "orange";
        break;

      case "test cleared":
        args[0].style.color = "rgba(5, 94, 189, 0.941)";
        break

      case 'offered':
        args[0].style.color = "green";
        break;

      case "rejected":
        args[0].style.color = "red";
        break

      case "on hold":
        args[0].style.color = "brown";
        break

      case "backed-out":
        args[0].style.color = "grey";
        break
    
      default:
        break;
    }
    return value
  }

}
