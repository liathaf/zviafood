import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addCountStepPrep'
})
export class AddCountStepPrepPipe implements PipeTransform {

  transform(preps: Array<any>, ...args: unknown[]): unknown {
    
      var countStep = 0;
      const prepsWithCountStep = preps.map(prep => {
  
        if (prep.title) return {
          title: prep.title,
          steps: prep.steps.map((step) => {
            countStep += 1;
            return {
              stepNum: countStep,
              step: step
  
            }
          })
        } 
        else {
          countStep += 1;
          return {
            stepNum: countStep,
            step: prep
          }
        }
      });
      
      return prepsWithCountStep;
  
      
    
    
  }

}

