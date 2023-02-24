import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-original-title', '');
  }

}
