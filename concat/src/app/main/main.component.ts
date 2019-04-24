import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

type EndOption = 'hyphened' | 'keeped';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild('container') containerDiv: ElementRef<HTMLDivElement>;
  @ViewChild('left') leftTextarea: ElementRef<HTMLTextAreaElement>;
  @ViewChild('right') rightTextarea: ElementRef<HTMLTextAreaElement>;
  @ViewChild('endOption') endOption: ElementRef<HTMLSelectElement>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.containerDiv.nativeElement.style.height = window.innerHeight + 'px';
  }

  onInput() {
    const mode = this.endOption.nativeElement.value as EndOption;
    this.rightTextarea.nativeElement.value = this.concat(this.leftTextarea.nativeElement.value, mode);
  }

  concat(text: string, mode: EndOption) {
    const paras = text.split('\n\n');
    if (mode === 'keeped') {
      return paras.map(para => para.split('\n').map(s => s.trim()).join(' ')).join('\n\n');
    } else if (mode === 'hyphened') {
      return paras.map(para => {
        const segments = [];
        para.split('\n').map(s => s.trim()).forEach(s => {
          if (s.endsWith('-')) {
            segments.push(s.slice(0, -1));
          } else {
            segments.push(s + ' ');
          }
        });
        return segments.join('').trim();
      }).join('\n\n');
    }
  }

}
