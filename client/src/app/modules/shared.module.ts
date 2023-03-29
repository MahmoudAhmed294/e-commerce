import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgxSpinnerModule.forRoot({
            type: 'line-scale-party'
        }),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
        }),
        BsDropdownModule.forRoot(),
        PaginationModule.forRoot(),
        RatingModule.forRoot(),
        NgxGalleryModule,
        ProgressbarModule.forRoot()
    ],
    exports: [
        NgxSpinnerModule,
        ToastrModule,
        BsDropdownModule,
        PaginationModule,
        RatingModule,
        NgxGalleryModule,
        ProgressbarModule
    ]
})
export class SharedModule {}
