import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component ({
    templateUrl: 'manage-quiz.html'
})

export class ManageQuizComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }
}
