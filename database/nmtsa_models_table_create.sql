CREATE TABLE public.patient_data (
    patient_id int not null Auto_increment NOT NULL,
    role_id int not null NOT NULL,
    username tiny Text not null NOT NULL,
    password tiny Text not null NOT NULL,
    application_date date NOT NULL,
    first_name tiny Text not null NOT NULL,
    last_name tiny Text not null NOT NULL,
    address text not null NOT NULL,
    dob date not null NOT NULL,
    sex Boolean NOT NULL,
    city tiny text NOT NULL,
    state tiny text NOT NULL,
    zip_code tiny text NOT NULL,
    phone_number tiny text NOT NULL,
    relationship_to_person int not null FK NOT NULL,
    marrige_status int not null FK NOT NULL,
    employment_status int not null FK NOT NULL,
    PRIMARY KEY (patient_id)
);

CREATE INDEX ON public.patient_data
    (role_id);


CREATE TABLE public.role_id (
    role_id int not null NOT NULL,
    PRIMARY KEY (role_id)
);


CREATE TABLE public.appointment (
    appointment_id int not null auto_increment NOT NULL,
    patient_id int not null NOT NULL,
    therapist_id int not null NOT NULL,
    start_time datetime NOT NULL,
    end_time datetime NOT NULL,
    PRIMARY KEY (appointment_id)
);

CREATE INDEX ON public.appointment
    (patient_id);
CREATE INDEX ON public.appointment
    (therapist_id);


CREATE TABLE public.diagnosis (
    diagnosis_id int not null auto_increment NOT NULL,
    name tiny text not null NOT NULL,
    PRIMARY KEY (diagnosis_id)
);


CREATE TABLE public.user_to_diag (
    patient_id int not null NOT NULL,
    diagnosis_id int not null NOT NULL
);

CREATE INDEX ON public.user_to_diag
    (patient_id);
CREATE INDEX ON public.user_to_diag
    (diagnosis_id);


CREATE TABLE public.therapist (
    therapist_id int not null auto_increment NOT NULL,
    PRIMARY KEY (therapist_id)
);


CREATE TABLE public.specialize (
    therapist_id int not null NOT NULL,
    diagnosis_id int not null NOT NULL
);

CREATE INDEX ON public.specialize
    (therapist_id);
CREATE INDEX ON public.specialize
    (diagnosis_id);


CREATE TABLE public.insurance (
    insurance_id int not null auto_increment NOT NULL,
    patient_id int not null NOT NULL,
    responsible_id int not null NOT NULL,
    PRIMARY KEY (insurance_id)
);

CREATE INDEX ON public.insurance
    (patient_id);
CREATE INDEX ON public.insurance
    (responsible_id);


CREATE TABLE public.insured_data (
    responsible_id int not null auto_increment NOT NULL,
    first_name tiny text NOT NULL,
    last_name tiny text NOT NULL,
    dob date NOT NULL,
    sex boolean NOT NULL,
    address tiny text NOT NULL,
    city tiny text NOT NULL,
    state tiny text NOT NULL,
    zip_code tiny text NOT NULL,
    phone_number tiny text NOT NULL,
    insurance_company tiny text NOT NULL,
    insurance_number tiny text NOT NULL,
    group_number tiny text NOT NULL,
    employers_name tiny text NOT NULL,
    email_address tiny text NOT NULL,
    PRIMARY KEY (responsible_id)
);


CREATE TABLE public.session (
    appointment_id int not null NOT NULL,
    patient_id int not null NOT NULL,
    therapist_id int not null NOT NULL,
    observations_one text NOT NULL,
    observations_two text NOT NULL,
    progress_one float NOT NULL,
    progress_two float NOT NULL,
    intv_one tiny text NOT NULL,
    intv_two tiny text NOT NULL,
    additional_comments text NOT NULL
);

CREATE INDEX ON public.session
    (appointment_id);
CREATE INDEX ON public.session
    (patient_id);
CREATE INDEX ON public.session
    (therapist_id);


ALTER TABLE public.patient_data ADD CONSTRAINT FK_patient_data__role_id FOREIGN KEY (role_id) REFERENCES public.role_id(role_id);
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