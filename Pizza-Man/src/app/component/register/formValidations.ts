import { AbstractControl ,FormGroup} from "@angular/forms";

// Reactive validation for username Registerationform
export function validateUserName(control:FormGroup){
    if(control.value.length<3 && control.value.length>0){
    
        return {invalidName:true}
    }
    return null;
}

// Reactive validation for email Registerationform
export function validateRegisterEmail(control:FormGroup){
    if(!control.value.endsWith('.com') && control.value.length>1){
        return {invalidEmail:true}
    }
    if(!control.value.includes('@') && control.value.length>1)
    {
        return {invalidEmail:true}
    }
    return null;
}