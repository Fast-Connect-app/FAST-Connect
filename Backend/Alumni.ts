class Alumni extends User{
    private dateOfGraduation:Date;
    private profile:AlumniProfile;

    constructor(_name:string, _email:string, _password:string, _dateOfBirth:Date, _gender:string, _dateOfGraduation:Date){
        super(_name,_email,_password,_dateOfBirth,_gender);
        this.dateOfGraduation = _dateOfGraduation;

        this.profile = new AlumniProfile("", null, "", "")
    }
}