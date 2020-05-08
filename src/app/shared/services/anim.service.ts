import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AnimService {
  constructor() {}
  toast (message: string, background: string = 'black') {
    if(window.screen.width < 768) {
      const firstElement: HTMLElement = document.createElement('div');
      const pElement: HTMLElement = document.createElement('p');
      document.body.appendChild(firstElement).appendChild(pElement);
      pElement.style.lineHeight = 20 + 'px';
      pElement.style.padding = 5 + 'px';
      pElement.innerHTML = message;
      pElement.style.color = 'white';
      pElement.className = 'textToast';
      pElement.style.textAlign = 'center';
      firstElement.className = 'toast';
      firstElement.style.width = 300 + 'px';
      firstElement.style.height = 80 + 'px';
      firstElement.style.backgroundColor = background;
      firstElement.style.borderRadius = 10 + 'px';
      firstElement.style.position = 'fixed';
      firstElement.style.left = '35%' + 'px';
      firstElement.style.top = 250 + 'px';
      console.log(firstElement);
      console.log(pElement);
      setTimeout( () => document.body.removeChild(firstElement).removeChild(pElement), 1000  )

    }
    else {
      const firstElement: HTMLElement = document.createElement('div');
      const pElement: HTMLElement = document.createElement('p');
      document.body.appendChild(firstElement).appendChild(pElement);
      pElement.style.lineHeight = 20 + 'px';
      pElement.style.padding = 5 + 'px';
      pElement.innerHTML = message;
      pElement.style.color = 'white';
      pElement.className = 'textToast';
      pElement.style.textAlign = 'center';
      firstElement.className = 'toast';
      firstElement.style.width = 300 + 'px';
      firstElement.style.height = 80 + 'px';
      firstElement.style.backgroundColor = background;
      firstElement.style.borderRadius = 10 + 'px';
      firstElement.style.position = 'fixed';
      firstElement.style.left = '1000' + 'px';
      firstElement.style.top = 150 + 'px';
      setTimeout( () => document.body.removeChild(firstElement).removeChild(pElement), 1000  )
    }
  }
}
