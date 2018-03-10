import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-iconsfont',
    templateUrl: './iconsfont.component.html'
})
export class IconsFontComponent implements OnInit {
    data = [];

    constructor(
        private msg: NzMessageService,
        @Inject(DOCUMENT) private dom: Document, private _el: ElementRef) { }

    ngOnInit(): void {
        // this.http.get('./assets/iconsfont.json').subscribe((res: any) => this.data = res);
        return abp.ajax({
            url: '/assets/iconsfont.json',
            method: 'GET',
        }).done(result => {
            this.data = result;
        });
    }

    copy(group: any, item: any) {
        let copyTextArea = null as HTMLTextAreaElement;
        try {
            copyTextArea = this.dom.createElement('textarea');
            copyTextArea.style.height = '0px';
            copyTextArea.style.opacity = '0';
            copyTextArea.style.width = '0px';
            this.dom.body.appendChild(copyTextArea);
            copyTextArea.value = group.tpl.replace(`{0}`, item.k);
            copyTextArea.select();
            this.dom.execCommand('copy');
            this.msg.success(`Copied Success!`);
        } finally {
            if (copyTextArea && copyTextArea.parentNode) {
                copyTextArea.parentNode.removeChild(copyTextArea);
            }
        }
    }
}
