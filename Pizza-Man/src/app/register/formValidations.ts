import { AbstractControl ,FormGroup} from "@angular/forms";

export function validateUserName(control:FormGroup){
    if(control.value.length<3 && control.value.length>0){
    
        return {invalidName:true}
    }
    return null;
}
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