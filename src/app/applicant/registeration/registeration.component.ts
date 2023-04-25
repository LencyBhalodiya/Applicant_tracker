import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegistrationDataUploadingService } from './services/registration-data-uploading.service';
import { AuthService } from 'src/app/shared/auth/auth-services/auth.service';
import { Endpoints, URL } from '../registeration/enum/endpoints.enum';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-registeration',
    templateUrl: './registeration.component.html',
    styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent {
    /**
     * Consts
     */
    isLinear = false;
    getToken!: object;
    isTrue: boolean = false;
    isFalse: boolean = true;
    hasBaseDropZoneOver: boolean = false;
    hasAnotherDropZoneOver: boolean = false;
    response: string = "";
    fileUploader!: FileUploader;
    imgUploader!: FileUploader;
    fileURL = URL.baseURL + Endpoints.fileURL + this.getUserId();
    imgURL = URL.baseURL + Endpoints.imgURL + this.getUserId();

    /**
     * Converting to boolean Value
     */
    changeToTrueOffer() {
        if (this.isTrue) {
            this.secondFormGroup.value['anyCurrentOffer'] = true;
        }
    }
    changeToFalseOffer() {
        if (this.isFalse) {
            this.secondFormGroup.value['anyCurrentOffer'] = false;
        }
    }

    changeToTrueInterview() {
        if (this.isTrue) {
            this.secondFormGroup.value['upcomingInterview'] = true;
        }
    }
    changeToFalseInterview() {
        if (this.isFalse) {
            this.secondFormGroup.value['upcomingInterview'] = false;
        }
    }

    changeToTrueRelocate() {
        if (this.isTrue) {
            this.secondFormGroup.value['willingToRelocate'] = true;
        }
    }
    changeToFalseRelocate() {
        if (this.isFalse) {
            this.secondFormGroup.value['willingToRelocate'] = false;
        }
    }
    changeToTrueFreshOrExp() {
        if (this.isTrue) {
            this.secondFormGroup.value['isFresher'] = true;
        }
    }
    changeToFalseFreshOrExp() {
        if (this.isFalse) {
            this.secondFormGroup.value['isFresher'] = false;
        }
    }

    /**
     * 
     * @returns UserID
     */
    getUserId() {
        return this.authservice.getUserId();
    }
    /**
     * 
     * @param http 
     * @param authservice 
     */
    constructor(private http: RegistrationDataUploadingService, private authservice: AuthService, private snackbar: MatSnackBar) { }

    /**
     * Address Validations
     */
    firstFormGroup = new FormGroup({
        addressType: new FormControl(''),
        street: new FormControl(''),
        country: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
        pincode: new FormControl(''),
        user: new FormControl({ uid: this.getUserId() })
    })

    /**
     * Profile Validations
     */
    secondFormGroup = new FormGroup({
        stream: new FormControl(null),
        designation: new FormControl(null),
        totalExpYears: new FormControl(null),
        relevantExpYears: new FormControl(null),
        oldCtc: new FormControl(null),
        expectedCtc: new FormControl(null),
        willingToRelocate: new FormControl(),
        noticePeriod: new FormControl(null),
        roleAppliedFor: new FormControl(null),
        jobDescription: new FormControl(null),
        referralSource: new FormControl(),
        anyCurrentOffer: new FormControl<null | boolean>(null),
        upcomingInterview: new FormControl(),
        isFresher: new FormControl(),
        reasonForChange: new FormControl(null),
        user: new FormControl({ uid: this.getUserId() })
    })

    thirdFormGroup = new FormGroup({

    })
    /**
     * Array of Inputs
     */
    streamList!: any[];
    positionList: string[] = ['Junior', 'Senior', 'Intern'];
    referenceList: string[] = ['Linked-In', 'Personal Referal', 'Naukari.com', "Company's Career Page"];

    /**
     * Toggle
     */
    Fresh: any;
    Expe: any;

    fresherFunction() {
        this.Fresh = true;
        this.Expe = false;
    }

    experiencedFunction() {
        this.Fresh = false;
        this.Expe = true;
    }

    /**
     * Get Stream
     */
    ngOnInit() {
        this.setFileUploader();
        this.setImageUploader();
        this.getStreams();
    }
    /**
     * Get Streams
     */
    getStreams(){
        this.http.getStreams().subscribe((stream: any[]) => { this.streamList = stream }),
        (error: Error) => {
            console.error('An error occurred:', error);
        },
        () => { console.log('completed'); }
    }
    /**
     * Submit Address Details
     */
    submitAddressForm() {
        this.http.submitDetails(this.firstFormGroup.value).subscribe({
            next: (res: any) => {
                // this.snackbar.open('Address added successfully!', 'Dismiss', { duration: 3000 });
            },
            error: (err: any) => {
                // this.snackbar.open('Error adding address', 'Dismiss', { duration: 3000 });
            },
            
        })
    }
    /**
     * SUbmit Profile Details
     */
    submitProfileForm() {
        console.log(this.secondFormGroup.value);
        this.http.submitProfile(this.secondFormGroup.value).subscribe({
            next: (res: any) => {
                // this.snackbar.open('Profile Details added successfully', 'Dismiss', { duration: 3000 });
            },
            error: (err: any) => {
                // this.snackbar.open('Error adding address', 'Dismiss', { duration: 3000 });
                console.log(err);
            },
        })
    }
    /**
     *Upload File
     */
    setFileUploader() {
        this.fileUploader = new FileUploader({
            itemAlias: 'file',
            queueLimit: 1,
            maxFileSize: 5 * 1024 * 1024,
            allowedFileType: ['pdf'],
            url: this.fileURL,
        });
    }
    /**
     * Upload Image
     */
    setImageUploader() {
        this.imgUploader = new FileUploader({
            itemAlias: 'image',
            queueLimit: 1,
            maxFileSize: 3 * 1024 * 1024,
            allowedFileType: ['image'],
            url: this.imgURL,
        });
    }
    /**
     * 
     * @param e 
     */
    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

}
