CREATE TABLE public.patient_data (
    patient_id int not null Auto_increment ,
    username text not null ,
    password text not null ,
    application_date date ,
    first_name text not null ,
    last_name text not null ,
    address text not null ,
    dob date not null ,
    sex char ,
    city text ,
    state text ,
    zip_code text ,
    phone_number text ,
    relationship_to_person int not null FK ,
    marrige_status int not null FK ,
    employment_status int not null FK ,
    PRIMARY KEY (patient_id)
);


CREATE TABLE public.role_id (
    role_id int not null ,
    PRIMARY KEY (role_id)
);


CREATE TABLE public.appointment (
    appointment_id int not null auto_increment ,
    patient_id int not null ,
    therapist_id int not null ,
    start_time timestamp ,
    end_time timestamp ,
    PRIMARY KEY (appointment_id)
);

CREATE INDEX ON public.appointment
    (patient_id);
CREATE INDEX ON public.appointment
    (therapist_id);


CREATE TABLE public.diagnosis (
    diagnosis_id int not null auto_increment ,
    name text not null ,
    PRIMARY KEY (diagnosis_id)
);


CREATE TABLE public.user_to_diag (
    patient_id int not null ,
    diagnosis_id int not null 
);

CREATE INDEX ON public.user_to_diag
    (patient_id);
CREATE INDEX ON public.user_to_diag
    (diagnosis_id);


CREATE TABLE public.therapist (
    therapist_id int not null auto_increment ,
    username text ,
    passeword text ,
    PRIMARY KEY (therapist_id)
);


CREATE TABLE public.specialize (
    therapist_id int not null ,
    diagnosis_id int not null 
);

CREATE INDEX ON public.specialize
    (therapist_id);
CREATE INDEX ON public.specialize
    (diagnosis_id);


CREATE TABLE public.insurance (
    insurance_id int not null auto_increment ,
    patient_id int not null ,
    responsible_id int not null ,
    PRIMARY KEY (insurance_id)
);

CREATE INDEX ON public.insurance
    (patient_id);
CREATE INDEX ON public.insurance
    (responsible_id);


CREATE TABLE public.insured_data (
    responsible_id int not null auto_increment ,
    first_name text ,
    last_name text ,
    dob date ,
    sex char ,
    address text ,
    city text ,
    state text ,
    zip_code text ,
    phone_number text ,
    insurance_company text ,
    insurance_number text ,
    group_number text ,
    employers_name text ,
    email_address text ,
    PRIMARY KEY (responsible_id)
);


CREATE TABLE public.session (
    appointment_id int not null ,
    patient_id int not null ,
    therapist_id int not null ,
    observations_one text ,
    observations_two text ,
    progress_one float ,
    progress_two float ,
    intv_one text ,
    intv_two text ,
    additional_comments text 
);

CREATE INDEX ON public.session
    (appointment_id);
CREATE INDEX ON public.session
    (patient_id);
CREATE INDEX ON public.session
    (therapist_id);


CREATE TABLE public.comprehensive_assessment (
    assessment_id int not null auto_increment ,
    patient_id int not null ,
    therapist_id int not null ,
    allergies text ,
    precautions text ,
    protocols text ,
    emergency_contact text ,
    second_contact text ,
    third_contact text ,
    diagnosis_code text ,
    secondary_diagnosis_code text ,
    medical_history text ,
    family_history text ,
    therapy_history text ,
    additional_information text ,
    PRIMARY KEY (assessment_id)
);

CREATE INDEX ON public.comprehensive_assessment
    (patient_id);
CREATE INDEX ON public.comprehensive_assessment
    (therapist_id);


ALTER TABLE public.appointment ADD CONSTRAINT FK_appointment__patient_id FOREIGN KEY (patient_id) REFERENCES public.patient_data(patient_id);
ALTER TABLE public.appointment ADD CONSTRAINT FK_appointment__therapist_id FOREIGN KEY (therapist_id) REFERENCES public.therapist(therapist_id);
ALTER TABLE public.user_to_diag ADD CONSTRAINT FK_user_to_diag__patient_id FOREIGN KEY (patient_id) REFERENCES public.patient_data(patient_id);
ALTER TABLE public.user_to_diag ADD CONSTRAINT FK_user_to_diag__diagnosis_id FOREIGN KEY (diagnosis_id) REFERENCES public.diagnosis(diagnosis_id);
ALTER TABLE public.specialize ADD CONSTRAINT FK_specialize__therapist_id FOREIGN KEY (therapist_id) REFERENCES public.therapist(therapist_id);
ALTER TABLE public.specialize ADD CONSTRAINT FK_specialize__diagnosis_id FOREIGN KEY (diagnosis_id) REFERENCES public.diagnosis(diagnosis_id);
ALTER TABLE public.insurance ADD CONSTRAINT FK_insurance__patient_id FOREIGN KEY (patient_id) REFERENCES public.patient_data(patient_id);
ALTER TABLE public.insurance ADD CONSTRAINT FK_insurance__responsible_id FOREIGN KEY (responsible_id) REFERENCES public.insured_data(responsible_id);
ALTER TABLE public.session ADD CONSTRAINT FK_session__appointment_id FOREIGN KEY (appointment_id) REFERENCES public.appointment(appointment_id);
ALTER TABLE public.session ADD CONSTRAINT FK_session__patient_id FOREIGN KEY (patient_id) REFERENCES public.patient_data(patient_id);
ALTER TABLE public.session ADD CONSTRAINT FK_session__therapist_id FOREIGN KEY (therapist_id) REFERENCES public.therapist(therapist_id);
ALTER TABLE public.comprehensive_assessment ADD CONSTRAINT FK_comprehensive_assessment__patient_id FOREIGN KEY (patient_id) REFERENCES public.patient_data(patient_id);
ALTER TABLE public.comprehensive_assessment ADD CONSTRAINT FK_comprehensive_assessment__therapist_id FOREIGN KEY (therapist_id) REFERENCES public.therapist(therapist_id);
