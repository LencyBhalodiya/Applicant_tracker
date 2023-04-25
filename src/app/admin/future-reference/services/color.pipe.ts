import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {
  transform(value: string, ...args: any[]): unknown {
    switch (value) {
      case "Pending":
        args[0].style.color = "orange";
        break;

      case "Test Cleared":
        args[0].style.color = "rgba(5, 94, 189, 0.941)";
        break

      case 'Offered':
        args[0].style.color = "green";
        break;

      case "Rejected":
        args[0].style.color = "red";
        break

      case "On Hold":
        args[0].style.color = "brown";
        break

      case "BackedOut":
        args[0].style.color = "grey";
        break
    
      default:
        break;
    }
    return value
  }

}
